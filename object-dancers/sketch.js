/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new ChaeDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class ChaeDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:
    this.size = 160;
    this.bodyCol = color(random(0, 255), random(0, 255), random(0, 255));
    this.baseSway = 0;
    this.middleSway = 0;
    this.topSway = 0;
    this.xShift = 0;
    this.leftSway1 = 0;
    this.leftSway2 = 0;
    this.rightSway1 = 0;
    this.rightSway2 = 0;
    this.mouseOver = false;
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    //prof gohai helped
    // this.baseSway = map(sin(frameCount / 20), -1, 1, -30, 30);
    // this.middleSway = map(sin(frameCount / 20), -1, 1, -10, 10);

    this.xShift = map(sin(frameCount / 20), -1, 1, -5, 5);
    this.baseSway = map(sin(frameCount / 20), -1, 1, -15, 15); //15
    this.middleSway = map(sin(frameCount / 20), -1, 1, -10, 10);
    this.topSway = map(sin(frameCount / 20), -1, 1, -5, 5);

    this.leftSway1 = map(cos(frameCount / 20), -1, 1, -20, 20);
    this.leftSway2 = map(sin(frameCount / 20), -1, 1, -5, 5);
    this.rightSway1 = map(sin(frameCount / 30), -1, 1, -20, 20);
    this.rightSway2 = map(sin(frameCount / 20), -1, 1, 5, -5);

    console.log("x: " + mouseX + ", y: " + mouseY);
    console.log("thisx: " + this.x + ", this.y: " + this.y);
    if (mouseX > this.x - 35 && mouseX < this.x + 35 && mouseY > this.y - this.size / 2 && mouseY < this.y + this.size / 2) {
      this.mouseOver = true;
      console.log("this is true");
      this.leftSway2 = map(sin(frameCount / 15), -1, 1, -10, 10);
      this.rightSway2 = map(sin(frameCount / 15), -1, 1, 10, -10);

      this.xShift = map(sin(frameCount / 15), -1, 1, -5, 5);
      this.baseSway = map(sin(frameCount / 15), -1, 1, -15, 15); //15
      this.middleSway = map(sin(frameCount / 15), -1, 1, -10, 10);
      this.topSway = map(sin(frameCount / 15), -1, 1, -5, 5);
    }
    else {
      this.mouseOver = false;
    }


  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    fill(this.bodyCol);
    noStroke();

    /* 
    * prof gohai examlpe
    *

    // push();
    // translate(0, 100);
    // console.log(this.baseSway);
    // rotate(radians(this.baseSway));
    // rect(-20, -100, 40, 100);

    // push();
    // translate(0, -100);
    // rotate(radians(this.middleSway));
    // rect(-15, -80, 30, 80);
    // pop();

    // pop();
    */

    //EXPERIMENTING MOVING BODY PARTS
    //BASE
    push();
    translate(this.xShift, 0);
    rect(0, 55, this.size / 6, this.size / 5); //bottom not moving
    pop();

    //MOVING BODY PARTS
    push();

    translate(0, 80);
    rotate(radians(this.baseSway));
    rect(0, -100, this.size / 6, this.size / 2);

    push();

    translate(0, -80);
    rotate(radians(this.middleSway));
    rect(0, -40, this.size / 6, this.size / 4);

    push();
    translate(0, -40);
    rotate(radians(this.topSway));
    rect(0, -30, this.size / 6, this.size / 4);

    //face
    //cheeks
    fill(255, 201, 244);
    ellipse(6, -8, 6, 5);
    ellipse(22, -8, 6, 5);
    fill(0);
    if (this.mouseOver == true) {
      text(">", 5, -11);
      text("<", 15, -11);
    } else {
      ellipse(8, -15, 5, 10);
      ellipse(20, -15, 5, 10);
    }
    arc(14, -5, 15, 20, 0, PI);



    //hair
    push();
    translate(0, -29);
    fill(this.bodyCol);
    let t = 5;
    for (let i = 1; i < 25; i = i + 5) {
      triangle(i, 0, i + 5, 0, i + 2, -10);
    }
    pop(); //end of hair

    //LEFT ARM
    fill(this.bodyCol);
    push();
    rotate(radians(this.leftSway1));
    //rect(-this.size / 2, 10, this.size / 2, this.size / 20);
    rect(-this.size / 4 + 10, 10, this.size / 4, this.size / 20);
    // rotate(this.leftSway2);
    // rect(0, 0, this.size / 4, this.size / 20);

    push();
    translate(-this.size / 4 + 13, 14);
    rotate(this.leftSway2);
    rect(0, -5, this.size / 4, this.size / 20);
    pop(); //end leftSway2
    pop(); //end leftSway1

    //right arm
    push();
    //translate(0, 0);
    rotate(radians(this.rightSway1));
    rect(20, 15, this.size / 4, this.size / 20);

    push();
    translate(this.size / 4 + 15, 18);
    rotate(this.rightSway2);
    rect(0, -5, this.size / 4, this.size / 20);
    pop();

    pop(); //end rightsway1


    pop(); //end of topsway
    pop(); //end of middlesway
    pop(); //end of base sway


    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/