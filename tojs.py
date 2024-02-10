#%%
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def get_variable():
    variable_value = "This is the value from Python"
    return jsonify({'value': variable_value})

if __name__ == '__main__':
    app.run()

# %%
