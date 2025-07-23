import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateAIResponse = async (messages: { role: 'user' | 'assistant' | 'system'; content: string }[], messageCount: number) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are Ez, an AI medical assistant. Follow these guidelines:

For message 1-2:
- Keep responses brief and clear
- Provide basic health advice and self-care tips
- Ask follow-up questions to understand the situation better

For message 3:
- Acknowledge their situation
- Provide a final piece of general advice
- Suggest subscribing to our platform for more detailed guidance and personalized health insights
- Keep it natural and helpful, not pushy`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 150,
      presence_penalty: 0.4,
      frequency_penalty: 0.4
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I'm having trouble right now. Please try again.";
  }
};