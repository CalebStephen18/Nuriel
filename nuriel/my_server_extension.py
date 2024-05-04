# my_server_extension.py
from jupyter_server.base.handlers import APIHandler
import tornado
from tornado.web import authenticated
import json
import requests  # Ensure requests is installed
import openai

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

class LLMHandler(APIHandler):
    @authenticated
    async def post(self):
        input_data = self.get_json_body()
        code = input_data['code']
        
        response = giveSummary(code)

        if response:
            self.finish(json.dumps({"summary": response}))
        else:
            self.set_status(500)
            self.finish(json.dumps({"error": "Failed to generate summary"}))


def setup_handlers(web_app):
    host_pattern = ".*$"
    base_url = web_app.settings["base_url"]
    print(base_url)

    route_pattern = tornado.escape.url_concat(base_url, "api/llm")  # Ensure this is a correct concatenation
    handlers = [(route_pattern, LLMHandler)]
    web_app.add_handlers(host_pattern, handlers)
    