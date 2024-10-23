const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const moderateContent = async (content) => {
  try {
    const response = await openai.moderations.create({
      input: content,
    });

    const moderationResult = response.results[0];
    return moderationResult; // Returns flagged categories and confidence levels
  } catch (error) {
    console.error("Error in content moderation:", error);
    return null;
  }
};

module.exports = { moderateContent };
