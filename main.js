lastRide = "";
neverFold = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
rideLast = "";
scoreRightWrist = 0;
foldnever = "";

function setup() {
    canvas = createCanvas(600, 530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload() {
    lastRide = loadSound("The Last Ride.mp3");
    neverFold = loadSound("Never Fold.mp3");
}

function draw() {
    image(video, 0, 0, 600, 530);

    fill("#FF0000");
    stroke("#FF0000");
    
    rideLast = lastRide.isPlaying();
    console.log(rideLast);

    foldnever = neverFold.isPlaying();
    console.log(foldnever);

    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        neverFold.stop();
        if (rideLast == false) {
            lastRide.play();
        }
        else {
            document.getElementById("song_name").innerHTML = "Song Name : The Last Ride";
        }
    }

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        lastRide.stop();
        if (foldnever == false) {
            neverFold.play();
        }
        else {
            document.getElementById("song_name").innerHTML = "Song Name : Never Fold";
        }
    }
}

function modelLoaded(){
    console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}