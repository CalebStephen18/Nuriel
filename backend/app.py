from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoModelForCausalLM, AutoTokenizer

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load the model and tokenizer
checkpoint = "bigcode/starcoder2-15b"
device = "cuda"  # or "cpu" if using CPU
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
model = AutoModelForCausalLM.from_pretrained(checkpoint).to(device)

@app.route('/summarize', methods=['POST'])
def summarize_code():
    data = request.json
    code_snippet = data.get('code')
    if not code_snippet:
        return jsonify({"error": "No code provided"}), 400

    try:
        # Encode the input code snippet and generate a summary
        inputs = tokenizer.encode(code_snippet, return_tensors="pt").to(device)
        outputs = model.generate(inputs)
        summary = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        return jsonify({"summary": summary})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
