from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

def giveSummary(code):
    openai.api_base = "http://localhost:1234/v1"
    openai.api_key = "not-needed"
    
    summarization_system = open('summarization_system.txt','r').readlines()
    
    completion = openai.ChatCompletion.create(
        model = "local-model",
        messages=[
            {"role": "system", "content": str(summarization_system)},
            {"role": "user", "content":code}
        ],
        temperature=0.7,
    )

    response = completion.choices[0].message.content
    return response

def optimizedCode(code):
    openai.api_base = "http://localhost:1234/v1"
    openai.api_key = "not-needed"
    
    optimization_system = open('optimization_system.txt','r').readlines()
    
    completion = openai.ChatCompletion.create(
        model="local-model",
        messages=[
            {"role": "system", "content": str(optimization_system)},
            {"role": "user", "content": code}
        ],
        temperature=0.7,
    )

    return completion.choices[0].message.content

def create_dependencyGraph(code):
    openai.api_base = "http://localhost:1234/v1"
    openai.api_key = "not-needed"
    
    dependency_graph_system = open('dependency_graph_system.txt','r').readlines()
    
    completion = openai.ChatCompletion.create(
        model="local-model",
        messages=[
            {"role": "system", "content": str(dependency_graph_system)},
            {"role": "user", "content": code}
        ],
        temperature=0.7,
    )

    return completion.choices[0].message.content

@app.route('/summarize', methods=['POST'])
def summarize_code():
    # Extract code from POST request
    data = request.json
    code = data.get('code')
    
    if not code:
        return jsonify({'error': 'No code provided'}), 400

    # Generate summary
    try:
        summary = giveSummary(code)
        return jsonify({'summary': summary})
    except Exception as e:
        return jsonify({'error': 'Failed to generate summary', 'details': str(e)}), 500

@app.route('/optimize', methods=['POST'])
def optimize_code():
    # Extract code from POST request
    data = request.json
    code = data.get('code')
    
    if not code:
        return jsonify({'error': 'No code provided'}), 400

    # Generate summary
    try:
        optimization = optimizedCode(code)
        return jsonify({'Optimization': optimization})
    except Exception as e:
        return jsonify({'error': 'Failed to generate Optimized Code', 'details': str(e)}), 500

@app.route('/dependency', methods=['POST'])
def dependency_code():
    data = request.json
    code = data.get('code')
    
    if not code:
        return jsonify({'error': 'No code provided'}), 400

    try:
        dependency = create_dependencyGraph(code)
        return jsonify({'dependencygraph': dependency})
    except Exception as e:
        return jsonify({'error': 'Failed to generate Dependency Graph', 'details': str(e)}), 500

@app.route('/explainEasy', methods=['POST'])
def explain_easy():
    data = request.json
    code = data.get('code')
    
    if not code:
        return jsonify({'error': 'No code provided'}), 400

    try:
        # Call function to get easy explanation
        explanation = get_easy_explanation(code)
        return jsonify({'explanation': explanation})
    except Exception as e:
        return jsonify({'error': 'Failed to generate Easy Explanation', 'details': str(e)}), 500

@app.route('/explainMedium', methods=['POST'])
def explain_medium():
    data = request.json
    code = data.get('code')
    
    if not code:
        return jsonify({'error': 'No code provided'}), 400

    try:
        # Call function to get medium explanation
        explanation = get_medium_explanation(code)
        return jsonify({'explanation': explanation})
    except Exception as e:
        return jsonify({'error': 'Failed to generate Medium Explanation', 'details': str(e)}), 500

@app.route('/explainHard', methods=['POST'])
def explain_hard():
    data = request.json
    code = data.get('code')
    
    if not code:
        return jsonify({'error': 'No code provided'}), 400

    try:
        # Call function to get hard explanation
        explanation = get_hard_explanation(code)
        return jsonify({'explanation': explanation})
    except Exception as e:
        return jsonify({'error': 'Failed to generate Hard Explanation', 'details': str(e)}), 500

def create_dependencyGraph(code):
    openai.api_base = "http://localhost:1234/v1"
    openai.api_key = "not-needed"
    
    dependency_graph_system = open('dependency_graph_system.txt','r').readlines()
    
    completion = openai.ChatCompletion.create(
        model="local-model",
        messages=[
            {"role": "system", "content": str(dependency_graph_system)},
            {"role": "user", "content": code}
        ],
        temperature=0.7,
    )

    return completion.choices[0].message.content

def get_easy_explanation(code):
    openai.api_base = "http://localhost:1234/v1"
    openai.api_key = "not-needed"
    
    explain_easy_system = open('explain_easy_system.txt','r').readlines()
    
    completion = openai.ChatCompletion.create(
        model="local-model",
        messages=[
            {"role": "system", "content": str(explain_easy_system)},
            {"role": "user", "content": code}
        ],
        temperature=0.7,
    )

    return completion.choices[0].message.content

def get_medium_explanation(code):
    openai.api_base = "http://localhost:1234/v1"
    openai.api_key = "not-needed"
    
    explain_medium_system = open('explain_medium_system.txt','r').readlines()
    
    completion = openai.ChatCompletion.create(
        model="local-model",
        messages=[
            {"role": "system", "content": str(explain_medium_system)},
            {"role": "user", "content": code}
        ],
        temperature=0.7,
    )

    return completion.choices[0].message.content

def get_hard_explanation(code):
    openai.api_base = "http://localhost:1234/v1"
    openai.api_key = "not-needed"
    
    explain_hard_system = open('explain_hard_system.txt','r').readlines()
    
    completion = openai.ChatCompletion.create(
        model="local-model",
        messages=[
            {"role": "system", "content": str(explain_hard_system)},
            {"role": "user", "content": code}
        ],
        temperature=0.7,
    )

    return completion.choices[0].message.content


if __name__ == '__main__':
    app.run(debug=True, port=5000)
