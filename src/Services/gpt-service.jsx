import axios from "axios";

const apiKey = process.env.REACT_APP_KEY_OPENAI_API_BASE_URL;
const openAIAPIBaseURL = "https://api.openai.com/v1/";

export function createChatCompletions(textToBeSentToGpt) {
  const response = axios.post(
    openAIAPIBaseURL + "chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: textToBeSentToGpt,
        },
      ],
      max_tokens: 100,
      temperature: 0.7,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response;
}

export function createCompletions(textToBeSentToGpt) {
  const response = axios.post(
    openAIAPIBaseURL + "completions",
    {
      model: "text-davinci-003",
      prompt: textToBeSentToGpt,
      max_tokens: 75,
      temperature: 0.7,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response;
}
