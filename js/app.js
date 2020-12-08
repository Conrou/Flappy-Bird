var csv = document.getElementById("canvas");
var ctx = csv.getContext("2d");


var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

var gap = 90;

//fly
document.addEventListener("keydown", moveUp);

function moveUp(){
    yPos -= 30;
}
//blocks
var pipe = [];

pipe[0] = {
    x:csv.width,
    y:0
}

//bird coordinate
var xPos = 10;
var yPos = 150;
var gravity = 1;
var score = 0;

function draw(){
    ctx.drawImage(bg, 0,0);
    

    for (var i =0; i<pipe.length;i++){
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y+pipeUp.height+gap);

    pipe[i].x--;

    if (pipe[i].x == 125){
        pipe.push({
            x:csv.width,
            y:Math.floor(Math.random()*pipeUp.height)-pipeUp.height
        });
    }

    if (xPos+bird.width >= pipe[i].x 
    && xPos<= pipe[i].x+pipeUp.width 
    && (yPos<= pipe[i].y+pipeUp.height 
    || yPos+bird.height >= pipe[i].y+pipeUp.height +gap)
    || yPos +bird.height>= csv.height-fg.height){
            location.reload();
        }
    
    if (pipe[i].x == 5){
        score++;
    }
}
ctx.drawImage(fg, 0, csv.height-fg.height);
ctx.drawImage(bird, xPos,yPos);
    yPos +=gravity;


    ctx.fillStyle = "#000";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, csv.height - 20);

    
    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
