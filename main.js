var img = "";
var canvas = "";
var status = "";
var array_of_objects = [];
var percent = 0;
var x = 0;
var y = 0;
var r = 0;
var g = 0;
var b = 0;
var q = false;
var ringtone = "";
var video = "";
function preload(){
    ringtone = loadSound('ringtone.mp3');
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        object_detector.detect(video, gotResult);
        for(i=0; i<array_of_objects.length; i++){
            r = random(255);
            g = random(255);
            b = random(255);
            x=array_of_objects[i].x;
            y=array_of_objects[i].y;
            percent = floor(array_of_objects[i].confidence * 100);
            text(array_of_objects[i].label + " " + percent + "%", x, y);
            noFill();
            stroke(r, g, b);
            rect(x, y, array_of_objects[i].width, array_of_objects[i].height);
            if(array_of_objects[i].label == "person"){
                document.getElementById("status").innerHTML = "Baby found";
            }
            else{
                document.getElementById("status").innerHTML = "Baby not found";
                if(q == false){
                    ringtone.play();
                    q = true;
                }
            }
        }
    }
}
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting baby.";

    
}
function modelLoaded(){
    console.log("Model loaded!");
    status = true;
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        array_of_objects = results;
    }
}