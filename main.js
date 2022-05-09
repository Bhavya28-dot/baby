img = "";
status = "";
objects = [];
alert = "";

function preload() {
    alert = loadSound("alert.wav");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(380, 380);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status- Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Baby Found";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);

            if (objects[i].label = "person") {
                document.getElementById("status").innerHTML = "Baby is found";
                alert.stop();
            } else {
                document.getElementById("status").innerHTML = "Baby not found";
                alert.play();
            }
            if (objects.length = 0) {
                document.getElementById("status").innerHTML = "Baby not found";
                alert.play();
            }
        }
    }
}

function modelLoaded() {
    console.log("Model is Loaded!");
    status = true;

}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    }
    console.log(result);
    objects = result;
}