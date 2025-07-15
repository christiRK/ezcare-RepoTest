-- Create tables

-- Users table
CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    firebase_uid text NOT NULL,
    email text NOT NULL,
    role text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_firebase_uid_key UNIQUE (firebase_uid),
    CONSTRAINT users_role_check CHECK (role = ANY (ARRAY['patient'::text, 'doctor'::text, 'admin'::text]))
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users subscription status table
CREATE TABLE public.users_subscription_status (
    user_id uuid NOT NULL,
    subscription_status text,
    subscription_end_date timestamp without time zone,
    CONSTRAINT users_subscription_status_pkey PRIMARY KEY (user_id),
    CONSTRAINT users_subscription_status_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
    CONSTRAINT users_subscription_status_subscription_status_check CHECK (subscription_status = ANY (ARRAY['Free'::text, 'Essential'::text, 'Proactive'::text, 'Premium'::text]))
);

ALTER TABLE public.users_subscription_status ENABLE ROW LEVEL SECURITY;

-- Medical profiles table
CREATE TABLE public.medical_profiles (
    user_id uuid NOT NULL,
    last_quiz_completed_at timestamp without time zone,
    birth_date date,
    biological_sex text,
    lifestyle text,
    goals jsonb,
    conditions text,
    medications text,
    allergies text,
    energy_level text,
    sleep_quality text,
    pain jsonb,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT medical_profiles_pkey PRIMARY KEY (user_id),
    CONSTRAINT medical_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
    CONSTRAINT medical_profiles_biological_sex_check CHECK (biological_sex = ANY (ARRAY['Male'::text, 'Female'::text, 'Prefer not to say'::text])),
    CONSTRAINT medical_profiles_lifestyle_check CHECK (lifestyle = ANY (ARRAY['Sedentary'::text, 'Lightly active'::text, 'Moderately active'::text, 'Very active'::text])),
    CONSTRAINT medical_profiles_energy_level_check CHECK (energy_level = ANY (ARRAY['Never'::text, 'Occasionally'::text, 'Often'::text, 'Daily'::text])),
    CONSTRAINT medical_profiles_sleep_quality_check CHECK (sleep_quality = ANY (ARRAY['Very poor'::text, 'Fair'::text, 'Good'::text, 'Excellent'::text]))
);

ALTER TABLE public.medical_profiles ENABLE ROW LEVEL SECURITY;

-- Appointments table
CREATE TABLE public.appointments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    doctor_name text,
    appointment_date timestamp without time zone,
    symptom_summary text,
    status text,
    CONSTRAINT appointments_pkey PRIMARY KEY (id),
    CONSTRAINT appointments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
    CONSTRAINT appointments_status_check CHECK (status = ANY (ARRAY['Scheduled'::text, 'Completed'::text, 'Cancelled'::text]))
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Organizations table
CREATE TABLE public.organizations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT organizations_pkey PRIMARY KEY (id)
);

-- Organization members table
CREATE TABLE public.organization_members (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    organization_id uuid,
    role text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT organization_members_pkey PRIMARY KEY (id),
    CONSTRAINT organization_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
    CONSTRAINT organization_members_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),
    CONSTRAINT organization_members_role_check CHECK (role = ANY (ARRAY['admin'::text, 'hr'::text, 'doctor'::text]))
);

-- Clinics table
CREATE TABLE public.clinics (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    organization_id uuid,
    name text NOT NULL,
    location text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT clinics_pkey PRIMARY KEY (id),
    CONSTRAINT clinics_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)
);

-- Consultations table
CREATE TABLE public.consultations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    prompt text NOT NULL,
    response text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT consultations_pkey PRIMARY KEY (id),
    CONSTRAINT consultations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- EZ Scores table
CREATE TABLE public.ezscores (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    score double precision,
    category text,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ezscores_pkey PRIMARY KEY (id),
    CONSTRAINT ezscores_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- Daily tips table
CREATE TABLE public.daily_tips (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    tip text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT daily_tips_pkey PRIMARY KEY (id)
);

ALTER TABLE public.daily_tips ENABLE ROW LEVEL SECURITY;

-- Tips completed today table
CREATE TABLE public.tips_completed_today (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    tip_id uuid,
    date date DEFAULT CURRENT_DATE,
    CONSTRAINT tips_completed_today_pkey PRIMARY KEY (id),
    CONSTRAINT tips_completed_today_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
    CONSTRAINT tips_completed_today_tip_id_fkey FOREIGN KEY (tip_id) REFERENCES public.daily_tips(id)
);

ALTER TABLE public.tips_completed_today ENABLE ROW LEVEL SECURITY;

-- Referrals table
CREATE TABLE public.referrals (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    referrer_id uuid,
    referred_id uuid,
    referral_link text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    reward_status text,
    reward_end_date timestamp without time zone,
    CONSTRAINT referrals_pkey PRIMARY KEY (id),
    CONSTRAINT referrals_referrer_id_fkey FOREIGN KEY (referrer_id) REFERENCES public.users(id),
    CONSTRAINT referrals_referred_id_fkey FOREIGN KEY (referred_id) REFERENCES public.users(id),
    CONSTRAINT referrals_reward_status_check CHECK (reward_status = ANY (ARRAY['Pending'::text, 'Granted'::text]))
);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Uploads table
CREATE TABLE public.uploads (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    file_url text NOT NULL,
    type text,
    description text,
    uploaded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uploads_pkey PRIMARY KEY (id),
    CONSTRAINT uploads_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
    CONSTRAINT uploads_type_check CHECK (type = ANY (ARRAY['pdf'::text, 'image'::text, 'audio'::text, 'other'::text]))
);

-- FAQs table
CREATE TABLE public.faqs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    question text NOT NULL,
    answer text,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT faqs_pkey PRIMARY KEY (id)
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Testimonials table
CREATE TABLE public.testimonials (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    title text NOT NULL,
    quote text NOT NULL,
    image_url text,
    feature text NOT NULL,
    feature_icon text,
    color text,
    rating integer DEFAULT 5,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT testimonials_pkey PRIMARY KEY (id)
);

-- Trust badges table
CREATE TABLE public.trust_badges (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    image_url text NOT NULL,
    rating real NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT trust_badges_pkey PRIMARY KEY (id, image_url, rating, description, created_at)
);

ALTER TABLE public.trust_badges ENABLE ROW LEVEL SECURITY;

-- Create indexes for foreign keys
CREATE INDEX idx_appointments_user_id ON public.appointments(user_id);
CREATE INDEX idx_consultations_user_id ON public.consultations(user_id);
CREATE INDEX idx_ezscores_user_id ON public.ezscores(user_id);
CREATE INDEX idx_organization_members_user_id ON public.organization_members(user_id);
CREATE INDEX idx_organization_members_organization_id ON public.organization_members(organization_id);
CREATE INDEX idx_clinics_organization_id ON public.clinics(organization_id);
CREATE INDEX idx_referrals_referrer_id ON public.referrals(referrer_id);
CREATE INDEX idx_referrals_referred_id ON public.referrals(referred_id);
CREATE INDEX idx_tips_completed_today_user_id ON public.tips_completed_today(user_id);
CREATE INDEX idx_tips_completed_today_tip_id ON public.tips_completed_today(tip_id);
CREATE INDEX idx_uploads_user_id ON public.uploads(user_id);


-- Ajouter la table plans
CREATE TABLE public.plans (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    price_monthly numeric NOT NULL,
    price_annual numeric NOT NULL,
    period text NOT NULL,
    features jsonb NOT NULL,
    not_included jsonb NOT NULL,
    cta text NOT NULL,
    popular boolean NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT plans_pkey PRIMARY KEY (id)
);

ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

-- Insérer les données initiales
INSERT INTO public.plans (name, description, price_monthly, price_annual, period, features, not_included, cta, popular)
VALUES
    (
        'Basic',
        'Essential health insights for individuals',
        14.99,
        9.99,
        '/month',
        '[
            "Symptom checker",
            "Basic health insights",
            "Medical term explanations",
            "Health journal",
            "Limited consults",
            "Email support"
        ]'::jsonb,
        '[
            "Lab result analysis",
            "Personalized health plans",
            "Doctor consultations",
            "Family accounts",
            "Priority support"
        ]'::jsonb,
        'Get Started',
        false
    ),
    (
        'Plus',
        'Comprehensive health management for families',
        29.99,
        19.99,
        '/month',
        '[
            "Everything in Basic",
            "Unlimited symptom checks",
            "Lab result analysis",
            "Personalized health plans",
            "Up to 3 family members",
            "Priority support",
            "Chat consultations"
        ]'::jsonb,
        '[
            "Video consultations with specialists",
            "Medication analysis",
            "Health trends & analytics"
        ]'::jsonb,
        'Get Plus',
        true
    ),
    (
        'Premium',
        'Complete healthcare solution with specialist access',
        69.99,
        49.99,
        '/month',
        '[
            "Everything in Plus",
            "Up to 6 family members",
            "Video consultations",
            "Specialist referrals",
            "Comprehensive health analytics",
            "Medication analysis & reminders",
            "24/7 priority support",
            "Concierge health service"
        ]'::jsonb,
        '[]'::jsonb,
        'Get Premium',
        false
    );
