import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  ChevronRight, 
  ChevronLeft,
  User, 
  Activity, 
  Heart, 
  Pill, 
  AlertTriangle,
  Calendar,
  Target,
  Moon,
  Zap,
  Shield,
  Check
} from 'lucide-react';
import { supabase } from '../supabaseClient';

const HealthQuizCard: React.FC<{ onQuizComplete: () => void }> = ({ onQuizComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [quizData, setQuizData] = useState({
    birthDate: '',
    biologicalSex: '',
    lifestyle: '',
    goals: [] as string[],
    conditions: '',
    medications: '',
    allergies: '',
    energyLevel: '',
    sleepQuality: '',
    pain: { hasPain: false, location: '' },
  });
  const [showWarning, setShowWarning] = useState(false);
  const [earlyRetryWarning, setEarlyRetryWarning] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [lastQuizDate, setLastQuizDate] = useState<Date | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const totalSteps = 3;

  useEffect(() => {
    const fetchUserAndQuiz = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Fetched user:', user);
      if (!user) {
        console.error('No authenticated user found');
        setSubmitError('No authenticated user found. Please log in.');
        return;
      }
      setUser(user);

      const { data: existingProfile, error: fetchError } = await supabase
        .from('medical_profiles')
        .select('last_quiz_completed_at, birth_date, biological_sex, lifestyle, goals, conditions, medications, allergies, energy_level, sleep_quality, pain')
        .eq('user_id', user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching quiz data:', fetchError);
        setSubmitError('Failed to load existing profile.');
      } else if (!existingProfile && !fetchError) {
        // Create default profile if it doesn't exist
        const { error: insertError } = await supabase
          .from('medical_profiles')
          .insert({ user_id: user.id });
        if (insertError) {
          console.error('Error creating default profile:', insertError);
          setSubmitError(`Failed to create user profile: ${insertError.message}`);
          return;
        }
      } else if (existingProfile) {
        setQuizData({
          birthDate: existingProfile.birth_date || '',
          biologicalSex: existingProfile.biological_sex || '',
          lifestyle: existingProfile.lifestyle || '',
          goals: existingProfile.goals || [],
          conditions: existingProfile.conditions || '',
          medications: existingProfile.medications || '',
          allergies: existingProfile.allergies || '',
          energyLevel: existingProfile.energy_level || '',
          sleepQuality: existingProfile.sleep_quality || '',
          pain: { hasPain: !!existingProfile.pain, location: existingProfile.pain || '' },
        });
        setLastQuizDate(existingProfile.last_quiz_completed_at ? new Date(existingProfile.last_quiz_completed_at) : null);
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        if (existingProfile.last_quiz_completed_at && new Date(existingProfile.last_quiz_completed_at) > twoWeeksAgo) {
          setEarlyRetryWarning(true);
        }
      }
    };
    fetchUserAndQuiz().catch(err => console.error('Unexpected error in useEffect:', err));
  }, []);

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!user) {
      console.error('No user logged in');
      setSubmitError('You must be logged in to submit the quiz.');
      return; 
    }

    const birthDate = new Date(quizData.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear() - (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()) ? 1 : 0);
    if (age < 13) {
      setShowWarning(true);
      return;
    }

    console.log('Submitting quiz data with user_id:', user.id);
    setSubmitError(null);
    try {
      const { error } = await supabase
        .from('medical_profiles')
        .upsert({
          user_id: user.id,
          last_quiz_completed_at: new Date().toISOString(),
          birth_date: quizData.birthDate,
          biological_sex: quizData.biologicalSex,
          lifestyle: quizData.lifestyle,
          goals: quizData.goals,
          conditions: quizData.conditions,
          medications: quizData.medications,
          allergies: quizData.allergies,
          energy_level: quizData.energyLevel,
          sleep_quality: quizData.sleepQuality,
          pain: quizData.pain.hasPain ? quizData.pain.location : null,
        }, { onConflict: 'user_id' });

      if (error) {
        console.error('Supabase upsert error:', error);
        setSubmitError(`Failed to save quiz data: ${error.message}`);
      } else {
        console.log('Quiz submitted successfully');
        onQuizComplete();
      }
    } catch (err) {
      console.error('Unexpected error during submit:', err);
      setSubmitError('An unexpected error occurred. Please try again.');
    }
  };

  const QuestionCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    className?: string;
  }> = ({ icon, title, children, className = "" }) => (
    <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20 ${className}`}>
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mr-3">
          {icon}
        </div>
        <h4 className="text-lg font-medium text-white/90">{title}</h4>
      </div>
      {children}
    </div>
  );

  const CustomSelect: React.FC<{
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder: string;
    required?: boolean;
  }> = ({ value, onChange, options, placeholder, required = false }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-white/90 border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-300 focus:border-transparent cursor-pointer"
      required={required}
    >
      <option value="">{placeholder}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );

  const CustomInput: React.FC<{
    type: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
  }> = ({ type, value, onChange, placeholder, required = false }) => (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-white/90 border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
      placeholder={placeholder}
      required={required}
    />
  );

  const GoalCheckbox: React.FC<{
    goal: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }> = ({ goal, checked, onChange }) => (
    <label className="flex items-center p-3 bg-white/10 rounded-lg border border-white/20 cursor-pointer hover:bg-white/20">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={`w-5 h-5 rounded border-2 ${
          checked 
            ? 'bg-blue-400 border-blue-400' 
            : 'border-white/40 bg-white/10'
        }`}>
          {checked && <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />}
        </div>
      </div>
      <span className="ml-3 text-white/90 font-medium">{goal}</span>
    </label>
  );

  const renderStep = () => {
    if (earlyRetryWarning) {
      return (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
          </div>
          <p className="text-white/90 text-lg mb-6">For the most accurate health insights, we recommend updating your quiz only every 14 days.</p>
          <button
            onClick={() => setEarlyRetryWarning(false)}
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold transition-all duration-200"
          >
            Continue Anyway
          </button>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <QuestionCard icon={<Calendar className="w-5 h-5 text-white" />} title="When were you born?">
              <p className="text-white/70 text-sm mb-3">This helps us provide age-appropriate health insights</p>
              <CustomInput
                type="date"
                value={quizData.birthDate}
                onChange={(value) => setQuizData({ ...quizData, birthDate: value })}
                required
              />
            </QuestionCard>

            <QuestionCard icon={<User className="w-5 h-5 text-white" />} title="What's your biological sex?">
              <p className="text-white/70 text-sm mb-3">This helps us understand your health profile better</p>
              <CustomSelect
                value={quizData.biologicalSex}
                onChange={(value) => setQuizData({ ...quizData, biologicalSex: value })}
                options={[
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                  { value: 'Prefer not to say', label: 'Prefer not to say' }
                ]}
                placeholder="Please select"
                required
              />
            </QuestionCard>

            <QuestionCard icon={<Activity className="w-5 h-5 text-white" />} title="How would you describe your lifestyle?">
              <p className="text-white/70 text-sm mb-3">Be honest - this helps us give you the right recommendations</p>
              <CustomSelect
                value={quizData.lifestyle}
                onChange={(value) => setQuizData({ ...quizData, lifestyle: value })}
                options={[
                  { value: 'Sedentary', label: 'Mostly sitting (desk job, minimal exercise)' },
                  { value: 'Lightly active', label: 'Light activity (occasional walks, light exercise)' },
                  { value: 'Moderately active', label: 'Regular activity (exercise 3-4 times/week)' },
                  { value: 'Very active', label: 'High activity (daily exercise, active job)' }
                ]}
                placeholder="Choose your activity level"
                required
              />
            </QuestionCard>

            <QuestionCard icon={<Target className="w-5 h-5 text-white" />} title="What are your main health goals?">
              <p className="text-white/70 text-sm mb-4">Select all that apply - we'll personalize your experience</p>
              <div className="space-y-3">
                {[
                  'Reduce stress and anxiety',
                  'Boost energy levels',
                  'Improve sleep quality',
                  'Maintain healthy weight',
                  'Manage existing conditions',
                  'Track general wellness'
                ].map(goal => (
                  <GoalCheckbox
                    key={goal}
                    goal={goal}
                    checked={quizData.goals.includes(goal)}
                    onChange={(checked) => {
                      const newGoals = checked
                        ? [...quizData.goals, goal]
                        : quizData.goals.filter(g => g !== goal);
                      setQuizData({ ...quizData, goals: newGoals });
                    }}
                  />
                ))}
              </div>
            </QuestionCard>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <QuestionCard icon={<Heart className="w-5 h-5 text-white" />} title="Do you have any medical conditions?">
              <p className="text-white/70 text-sm mb-3">List any diagnosed conditions (optional but helpful)</p>
              <CustomInput
                type="text"
                value={quizData.conditions}
                onChange={(value) => setQuizData({ ...quizData, conditions: value })}
                placeholder="e.g., Diabetes, Hypertension, Asthma"
              />
            </QuestionCard>

            <QuestionCard icon={<Pill className="w-5 h-5 text-white" />} title="Are you taking any medications?">
              <p className="text-white/70 text-sm mb-3">Include prescription drugs, supplements, or vitamins</p>
              <CustomInput
                type="text"
                value={quizData.medications}
                onChange={(value) => setQuizData({ ...quizData, medications: value })}
                placeholder="e.g., Aspirin, Vitamin D, Multivitamin"
              />
            </QuestionCard>

            <QuestionCard icon={<Shield className="w-5 h-5 text-white" />} title="Do you have any allergies?">
              <p className="text-white/70 text-sm mb-3">Food, environmental, or medication allergies</p>
              <CustomInput
                type="text"
                value={quizData.allergies}
                onChange={(value) => setQuizData({ ...quizData, allergies: value })}
                placeholder="e.g., Peanuts, Pollen, Penicillin"
              />
            </QuestionCard>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <QuestionCard icon={<Zap className="w-5 h-5 text-white" />} title="How's your energy level lately?">
              <p className="text-white/70 text-sm mb-3">Think about the past few weeks</p>
              <CustomSelect
                value={quizData.energyLevel}
                onChange={(value) => setQuizData({ ...quizData, energyLevel: value })}
                options={[
                  { value: 'Never', label: 'I feel energetic most of the time' },
                  { value: 'Occasionally', label: 'Sometimes I feel tired' },
                  { value: 'Often', label: 'I often feel low energy' },
                  { value: 'Daily', label: 'I struggle with fatigue daily' }
                ]}
                placeholder="Select your energy level"
                required
              />
            </QuestionCard>

            <QuestionCard icon={<Moon className="w-5 h-5 text-white" />} title="How well do you sleep?">
              <p className="text-white/70 text-sm mb-3">Quality matters more than quantity</p>
              <CustomSelect
                value={quizData.sleepQuality}
                onChange={(value) => setQuizData({ ...quizData, sleepQuality: value })}
                options={[
                  { value: 'Excellent', label: 'Excellent - I wake up refreshed' },
                  { value: 'Good', label: 'Good - Usually sleep well' },
                  { value: 'Fair', label: 'Fair - Some nights are better' },
                  { value: 'Very poor', label: 'Poor - I struggle with sleep' }
                ]}
                placeholder="Rate your sleep quality"
                required
              />
            </QuestionCard>

            <QuestionCard icon={<AlertTriangle className="w-5 h-5 text-white" />} title="Are you experiencing any pain?">
              <p className="text-white/70 text-sm mb-4">Ongoing or frequent discomfort</p>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <label className="flex items-center p-3 bg-white/10 rounded-lg border border-white/20 cursor-pointer hover:bg-white/20 flex-1">
                    <input
                      type="radio"
                      value="no"
                      checked={!quizData.pain.hasPain}
                      onChange={() => setQuizData({ ...quizData, pain: { hasPain: false, location: '' } })}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      !quizData.pain.hasPain 
                        ? 'bg-blue-400 border-blue-400' 
                        : 'border-white/40 bg-white/10'
                    }`}>
                      {!quizData.pain.hasPain && <div className="w-2 h-2 bg-white rounded-full absolute top-1.5 left-1.5" />}
                    </div>
                    <span className="ml-3 text-white/90 font-medium">No pain</span>
                  </label>
                  <label className="flex items-center p-3 bg-white/10 rounded-lg border border-white/20 cursor-pointer hover:bg-white/20 flex-1">
                    <input
                      type="radio"
                      value="yes"
                      checked={quizData.pain.hasPain}
                      onChange={() => setQuizData({ ...quizData, pain: { ...quizData.pain, hasPain: true } })}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      quizData.pain.hasPain 
                        ? 'bg-blue-400 border-blue-400' 
                        : 'border-white/40 bg-white/10'
                    }`}>
                      {quizData.pain.hasPain && <div className="w-2 h-2 bg-white rounded-full absolute top-1.5 left-1.5" />}
                    </div>
                    <span className="ml-3 text-white/90 font-medium">Yes, I have pain</span>
                  </label>
                </div>
                {quizData.pain.hasPain && (
                  <div>
                    <CustomInput
                      type="text"
                      value={quizData.pain.location}
                      onChange={(value) => setQuizData({ ...quizData, pain: { ...quizData.pain, location: value } })}
                      placeholder="Where do you feel pain? (e.g., Lower back, Knees, Headaches)"
                    />
                  </div>
                )}
              </div>
            </QuestionCard>
          </div>
        );

      default:
        return null;
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm text-gray-500">{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Main Quiz Card */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-64 h-64 transform rotate-12">
            <ClipboardCheck className="w-full h-full" />
          </div>
        </div>

        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Personal Health Assessment
            </h2>
            <p className="text-white/80 text-lg">
              Help us understand your health to provide personalized insights
            </p>
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {renderStep()}
          </div>

          {/* Warning Messages */}
          {showWarning && (
            <div className="bg-red-500/90 backdrop-blur-sm text-white p-6 rounded-xl mt-6 border border-red-400">
              <div className="flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0" />
                <p className="font-medium">
                  EZCare is only available to users aged 13 and older. If you're under 13, you cannot access the platform for legal reasons.
                </p>
              </div>
            </div>
          )}

          {submitError && (
            <div className="bg-red-500/90 backdrop-blur-sm text-white p-6 rounded-xl mt-6 border border-red-400">
              <div className="flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0" />
                <p className="font-medium">{submitError}</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-between items-center">
            {currentStep > 1 ? (
              <button
                onClick={handlePrevious}
                className="flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-all duration-200 backdrop-blur-sm border border-white/20"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="flex items-center px-8 py-3 bg-white text-blue-700 hover:bg-blue-50 rounded-xl font-bold transition-all duration-200 shadow-lg"
              >
                Continue
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-all duration-200 shadow-lg"
              >
                Complete Assessment
                <Check className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthQuizCard;