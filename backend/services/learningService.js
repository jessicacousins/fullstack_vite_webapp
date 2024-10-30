const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getLearningContent = async (label) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Provide educational insights about the following item type: ${label}. Include information such as its history, famous brands, and eco-friendly alternatives.`,
        },
      ],
      max_tokens: 150,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching educational content:", error);
    throw error;
  }
};

module.exports = { getLearningContent };
