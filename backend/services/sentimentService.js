const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const analyzeSentiment = async (commentText) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Analyze the sentiment of this comment: "${commentText}" and provide the percentage likelihood of being positive, neutral, or negative. Format the response as: Positive: x%, Neutral: y%, Negative: z%.`,
        },
      ],
      max_tokens: 100,
    });

    const sentiment = response.choices[0].message.content.toLowerCase();
    let sentimentType = "neutral";
    let positiveProbability = 0.0;
    let neutralProbability = 0.0;
    let negativeProbability = 0.0;

    // Extracting probabilities from the response
    positiveProbability = parseFloat(
      sentiment.match(/positive:\s*([\d.]+)%/)?.[1] || 0
    );
    neutralProbability = parseFloat(
      sentiment.match(/neutral:\s*([\d.]+)%/)?.[1] || 0
    );
    negativeProbability = parseFloat(
      sentiment.match(/negative:\s*([\d.]+)%/)?.[1] || 0
    );

    // Determine the sentiment type based on highest probability
    if (
      positiveProbability > neutralProbability &&
      positiveProbability > negativeProbability
    ) {
      sentimentType = "positive";
    } else if (negativeProbability > neutralProbability) {
      sentimentType = "negative";
    }

    return {
      sentiment: sentimentType,
      positiveProbability,
      neutralProbability,
      negativeProbability,
    };
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    return {
      sentiment: "neutral", // Default to neutral in case of an error
      positiveProbability: 0.0,
      neutralProbability: 0.0,
      negativeProbability: 0.0,
    };
  }
};

module.exports = { analyzeSentiment };
