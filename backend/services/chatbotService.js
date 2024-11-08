const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getChatbotResponse = async (message) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      max_tokens: 150,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching response from GPT:", error);
    return "Sorry, I couldn't process your request. Please try again.";
  }
};

const getProductRecommendations = async (productCategory) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a product recommendation assistant.",
        },
        {
          role: "user",
          content: `Recommend similar products to a user interested in ${productCategory}.`,
        },
      ],
      max_tokens: 150,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return "We couldn't generate recommendations at this time.";
  }
};

module.exports = { getChatbotResponse, getProductRecommendations };

// module.exports = { getChatbotResponse };
