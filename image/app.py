import os
import json
from flask import Flask, jsonify
import requests
app = Flask(__name__)

@app.route('/')
def test():
    return jsonify({"message": "pong!!!" })

@app.route('/env')
def env():
    resp = []
    for item, value in os.environ.items():
        resp.append({item: value})
    return json.dumps(resp, indent='    ')

@app.route('/get')
def get_env():
    try: 
        resp = requests.get(os.environ.get('ECS_CONTAINER_METADATA_URI_V4'))
        metadata = resp.json()
        metadata.get('Labels').get('com.amazonaws.ecs.task-arn')
        return metadata.get('Labels').get('com.amazonaws.ecs.task-arn')
    except:
        return 'Something Error'


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000)