song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;

function preload()
{
    song = loadSound("music.mp3");
}
function setup()
{
    canvas = createCanvas(250, 300);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw()
{
    image(video, 0, 0, 250, 300);

    fill("blue");
    stroke("blue");
   if(scoreLeftWrist > 0.2)
   {
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/300;
    document.getElementById("volume").innerHTML = "Volume = "+ volume;
    setVolume(volume);
   }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1.5);
}

function modelLoaded()
{
    console.log('Posenet is loaded');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX+ "leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX+ "rightWristY = " + rightWristY);
    }
}