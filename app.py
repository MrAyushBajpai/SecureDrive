# app.py
from flask import Flask, request, jsonify, render_template
import cv2
import face_recognition
import os

app = Flask(__name__)

# Load a sample picture and learn how to recognize it.
known_image = face_recognition.load_image_file("known_faces/test_taker.jpg")
known_encoding = face_recognition.face_encodings(known_image)[0]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit_answer', methods=['POST'])
def submit_answer():
    data = request.json
    print(f"Received answer: {data['answer']} for question {data['question_number']}")
    return jsonify({'status': 'success'})

@app.route('/verify_identity', methods=['POST'])
def verify_identity():
    if 'file' not in request.files:
        return jsonify({'identity_verified': False, 'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'identity_verified': False, 'error': 'No selected file'})

    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    unknown_image = face_recognition.load_image_file(file_path)
    try:
        unknown_encoding = face_recognition.face_encodings(unknown_image)[0]
    except IndexError:
        return jsonify({'identity_verified': False, 'error': 'No face detected'})

    results = face_recognition.compare_faces([known_encoding], unknown_encoding)
    os.remove(file_path)  # Remove the uploaded file after processing
    return jsonify({'identity_verified': results[0]})

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)
