const video = document.getElementById('video');
const message = document.getElementById('message');
const startButton = document.getElementById('start-recognition');

let faceDetectionInterval;
let faceNotDetectedCount = 0;
const maxNoFaceCount = 5; // Number of intervals with no face before stopping test

// Load face-api.js models
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
]).then(startVideo);

function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            console.error("Error accessing webcam: ", err);
            message.innerText = "Webcam access denied.";
        });
}

async function detectFace() {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
    if (detections.length === 0) {
        faceNotDetectedCount++;
    } else {
        faceNotDetectedCount = 0;
    }
    
    if (faceNotDetectedCount >= maxNoFaceCount) {
        stopTest();
    }
}

function startTest() {
    message.innerText = "";
    startButton.disabled = true;
    faceNotDetectedCount = 0;
    faceDetectionInterval = setInterval(detectFace, 1000); // Check for face every second
}

function stopTest() {
    clearInterval(faceDetectionInterval);
    message.innerText = "Face not detected. Test stopped.";
    startButton.disabled = false;
}

startButton.addEventListener('click', startTest);
