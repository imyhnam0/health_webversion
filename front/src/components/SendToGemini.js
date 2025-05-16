// 1️⃣ 먼저 Gemini API 호출 함수를 하나 만들어야 해요.
// sendToGemini.js

const API_KEY = "AIzaSyDShhPzKN-KoONmXkAVWqYgdtZ-_i66GHE"; // 발급받은 API 키 입력

const sendToGemini = async (userInput) => {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `다음 식단을 바탕으로 음식별 열량, 탄수화물, 단백질, 지방을 계산해줘:
${userInput}`
          }
        ]
      }
    ]
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const json = await response.json();
  return json.candidates?.[0]?.content?.parts?.[0]?.text || "응답 없음";
};

export default sendToGemini;
