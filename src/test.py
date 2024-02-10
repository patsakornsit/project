
#%%
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/button-click', methods=['POST'])
def button_click():
    button_name = request.json['button_name']
    print(f"Button clicked: {button_name}")
    return 'Button click received by Python!'

if __name__ == '__main__':
    app.run(debug=True)

# %%
