export async function POST(request) {
  const { input } = await request.json();
  
  // Gemini API 호출
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `출처 분석: ${input}` }] }]
      })
    }
  );
  
  const data = await response.json();
  return Response.json(data);
}