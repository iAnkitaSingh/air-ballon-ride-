var balloon,balloonImage1,balloonImage2;
var database;
var height;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("HotAirBallon-01.png");
   balloonImage2=loadAnimation("HotAirBallon-01.png","HotAirBallon-01.png",
   "HotAirBallon-01.png","HotAirBallon-02.png","HotAirBallon-02.png",
   "HotAirBallon-02.png","HotAirBallon-03.png","HotAirBallon-03.png","HotAirBallon-03.png");
  }


function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonHeight=database.ref('ballon/position');
  balloonHeight.on("value",readHeight, showError);
  textSize(20); 
}


function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
 

}


function updateHeight(x,y){
  database.ref('ballon/position').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}