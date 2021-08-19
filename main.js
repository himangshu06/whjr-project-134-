
status = "";
object = [];
song = "";
function preload(){
    song = loadSound("alarm_sound.mp3");
}
function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status: detecting Objects";
}
function modelLoaded(){
    console.log("modelLoaded");
    status = true;
}
function gotResult(error,results){
    if (error){
    console.log(error);
    }
    console.log(results);
    object = results;
}
function draw(){
    image(video,0,0,400,400);
if (status != ""){
    r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotResult);
        for(i = 0;i <object.length;i++){
            document.getElementById("status").innerHTML="Object Detected";
            fill(r,g,b);
            percent = floor(object[i].confidence*100);
            text(object[i].label+""+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if (object[i].label == "Person"){
                document.getElementById("number_of_objects").innerHTML="baby Found!";
                console.log("STOP!");
                song.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML="baby not Found!";
                console.log("Play!");
                song.play();
            }
            
        }
        if (object.length == 0){
            document.getElementById("number_of_objects").innerHTML="baby not Found!";
            console.log("PLAY!");
            song.play();
        }
}
}
