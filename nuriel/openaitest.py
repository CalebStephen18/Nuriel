import openai

def giveSummary(code):
    openai.api_base = "http://localhost:1234/v1"
    openai.api_key = "not-needed"

    completion = openai.ChatCompletion.create(
        model = "local-model",
        messages=[
            {"role": "system", "content": "You are an AI specialized in providing detailed summaries, explanations, and insights for Python code. Your primary function is to analyze Python code snippets, offering clear and concise descriptions of their functionality, usage, and any relevant context. You should focus on identifying the purpose of the code, the algorithms or techniques it employs, potential use cases, and any assumptions or requirements it makes. If presented with non-code text or requests for general conversation, your response should be, 'Sorry, I can only provide summaries and explanations for Python code.'"},
            {"role": "user", "content":code}
        ],
        temperature=0.7,
    )

    response = completion.choices[0].message.content
    return response

