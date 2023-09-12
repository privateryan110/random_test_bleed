//color nodes where the states of each node are based off of an average of all the other states
let nodeList = [];
//let frameCount = 0;
let exportFrames = 18000; //ten per second

//----------------------------------------------------DRAWING-------------------------------------
let p5canvas; //name for the canvas
function setup(){
    p5canvas = createCanvas(1500,900); //og 1500 x 900
    p5canvas.parent("main");
    pixelDensity(1);
    //populates the canvas with the nodes
    for(let i = 0; i < 60; i++){
        for(let j = 0; j < 60; j++){
            nodeList.push(new Node(i * 25, j * 15, random(1,2), random(1,2), random(1,2))); //i * 25, j * 15 
        }
    }
    frameRate(10);
}

function draw(){
    if (state == 0){ //running
        if (recording == 1 && frameCount == (startFrame + 1)){
            capturer.start();
        }
        background(0);
        for (let i = 0; i < nodeList.length; i++){
            //nodeList[i].draw();
            nodeList[i].chooseState(nodeList, i);
        }

        for (let i = 0; i < nodeList.length; i++){
            nodeList[i].draw();
            //nodeList[i].chooseState(nodeList, i);
        }  

        if(recording === 1){
            capturer.capture(p5canvas.canvas);
        }
    }
    
    else if (state == 1){ //paused
        
    }
}


//----------------------------------------------------NODES-------------------------------------
class Node{
    constructor(x, y, colorRed, colorGreen, colorBlue){
        this.x = x;
        this.y = y;
        this.stateRed = colorRed;
        this.stateGreen = colorGreen;
        this.stateBlue = colorBlue;
    }
    
    draw = function(){
        noStroke();
        //red
        if (this.stateRed > 200){
            this.stateRed = this.stateRed % 200;
        }
        //Green
        if (this.stateGreen > 200){
            this.stateGreen = this.stateGreen % 200;
        }
        //Blue
        if (this.stateBlue > 200){
            this.stateBlue = this.stateBlue %  200;
        }
        
        if(displayMode == 0){
            fill(this.stateRed, this.stateGreen, this.stateBlue);
            rect(this.x, this.y, 24, 14); // 24 x 14
            //drawingContext.filter = 'blur(1px)';
        }
        
        else{
            fill(0,255,0);
            textSize(8);
            text(int(this.stateGreen), this.x, this.y + 9);   
        }
        
    }
    
    chooseState = function(nodeList, i){
        let statusRed = 0;
        let statusGreen = 0;
        let statusBlue = 0;
        for(let j = 0; j < nodeList.length; j++){
            if (nodeList[i] != nodeList[j]){
                statusRed += nodeList[j].stateRed;
                statusGreen += nodeList[j].stateGreen;
                statusBlue += nodeList[j].stateBlue;
            }
        } 
        this.stateRed += statusRed / nodeList.length;
        this.stateGreen += statusGreen / nodeList.length;
        this.stateBlue += statusBlue / nodeList.length;
    }
    
}


//----------------------------------------------FUNCTIONS---------------------------------------------------
//PAUSING/PLAYING
let state = 0; //0 for running, 1 for paused
function pause(){
    if(state == 0){
        state = 1;
        
        //changes the pause button
        document.getElementById("play_or_pause").src="assets/play_button.png";

    }
    else{
        state = 0;
        
        //changes the pause button
        document.getElementById("play_or_pause").src="assets/pause_button.png";
    }
}

//ANIMATION MODE
let displayMode = 0; //zero for colors, 1 for green matrix numbers
function mode(){
    if(displayMode == 0){
        displayMode = 1; 
        
        //changes the mode button
        document.getElementById("mode").style.backgroundColor = "green";
        document.getElementById("mode").innerHTML = "Mode 1"
        document.getElementById("mode").style.color = "black";
        
    }
    else{
        displayMode = 0;
        
        //changes the mode button
        document.getElementById("mode").style.backgroundColor = "rgb(0,0,0)";
        document.getElementById("mode").innerHTML = "Mode 0";
        document.getElementById("mode").style.color = "white";
    }
}

//RECORDING
const capturer = new CCapture({
    framerate: 10, 
    format: "png",
    name: "movie",
    quality: 100,
    verbose: true,
});

let recording = 0; //0 for not recording, 1 for recording
let startFrame;
function record(){
    if (recording == 0){
        recording = 1;
        console.log("recording");
        if(state = 1){
            pause();
        }
        startFrame = frameCount;
        
        //changes the record button
        document.getElementById("recording").src="assets/recording_on.png";
    }
    
    else{
        recording = 0;
        console.log("recording stopped");
        capturer.stop();
        capturer.save();
        pause(); //pauses the animtion
        
        //changes the record button
        document.getElementById("recording").src="assets/recording_off.png";
    }
}

//RESTART
function restart(){
    for(let i = 0; nodeList.length; i++){
        nodeList[i].stateRed = random(1,2);
        nodeList[i].stateGreen = random(1,2);
        nodeList[i].stateBlue = random(1,2);
    }
}