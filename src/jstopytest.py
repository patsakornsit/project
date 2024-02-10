#%%
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/send-data', methods=['POST'])
def receive_data():
    received_data = request.json.get('data')
    # Do something with the received data (process it, save to a database, etc.)
    # For example, just echoing it back in this case
    return jsonify({'message': f'Data received: {received_data}'})

if __name__ == '__main__':
    app.run(debug=True)




# %%
