//LILYPAD VARIABLES
//lilypad coordinates
let cx, cy;
let angry; //lilypad state
let xySpeed;
let savedTime;
let currentTime;
let lilyGreen; //green of lilypad
let angle;
let targetAngle;

//LIGHT VARIABLES
//light coordinates
let lx, ly;
let lightX, lightY;

//to make lights draggable
let selected = null;
let x0, x1, x2, x3, x4, x5, x6;
let y0, y1, y2, y3, y4, y5, y6;

let showLight0,
    showLight1,
    showLight2,
    showLight3,
    showLight4,
    showLight5,
    showLight6;

//FROG VARIABLES
let targetX, targetY;
let frogX, frogY; //initial frog spawing coordinates; do I need fx fy? again, local vs global
let showFrog;

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");


    colorMode(RGB);

    //LILYPAD
    cx = random(0, width);
    cy = random(0, height);
    angry = false;
    xySpeed = 300;
    lilyGreen = 113;
    angle = 0;

    //LIGHT
    lx = 0;
    ly = 0;

    showLight0 = true;
    showLight1 = true;
    showLight2 = true;
    showLight3 = true;
    showLight4 = true;
    showLight5 = true;
    showLight6 = true;

    x0 = random(0, width);
    x1 = random(0, width);
    x2 = random(0, width);
    x3 = random(0, width);
    x4 = random(0, width);
    x5 = random(0, width);
    x6 = random(0, width);
    y0 = random(0, height);
    y1 = random(0, height);
    y2 = random(0, height);
    y3 = random(0, height);
    y4 = random(0, height);
    y5 = random(0, height);
    y6 = random(0, height);

    //FROG
    targetX = random(35, width - 35);
    targetY = random(35, height - 35);
    frogX = random(35, width - 35);
    frogY = random(35, height - 35);
    showFrog = false;
    savedTime = 0;
}

function draw() {
    //background(0, 0, 80);

    //BACKGROUND
    noStroke();
    push();
    colorMode(HSB);
    for (let x = 1; x < width; x += 4) {
        for (let y = 1; y < height; y += 4) {
            let noiseVal = noise(
                x / 500 + frameCount / 200,
                y / 500 + frameCount / 200
            );
            fill(map(noiseVal, 0, 1, 180, 220), 50, 100);
            square(x, y, 4);
        }
    }
    colorMode(RGB);
    pop();

    //How to make motion of lilypad more water like?
    cx = map(noise(frameCount / xySpeed), 0, 1, 0, width);
    cy = map(noise(frameCount / xySpeed + 100), 0, 1, 0, height);
    cx = constrain(cx, 50, width - 50);
    cy = constrain(cy, 50, height - 50);

    drawLilypad(cx, cy);

    //I wonder if there is way to make concise code + keep showLight + for loop
    for (let i = 0; i < 70; i = i + 10) {
        lightX = random(0, width);
        lightY = random(0, height);
        drawLight(lightX, lightY, i);
    }

    if (frameCount % 100 == 99 && millis() - savedTime > 10000) {
        showFrog = true;
    }

    if (showFrog == true) {
        drawFrog(frogX, frogY);
    }
}

function drawLilypad(cx, cy, speed = 1) {
    noStroke();

    targetAngle = atan2(cy, cx);
    angle = lerp(angle, targetAngle, 0.5);

    //to make lilypad rotate
    push();
    translate(cx, cy);
    fill(66, lilyGreen, 97);
    console.log(lilyGreen);

    if (mouseIsClose(cx, cy) == true) {
        speed = 2 * frameCount;
    }

    if (showFrog == true) {
        angry = true;
        //console.log("saved time: " + savedTime);
    } else if (showFrog == false) {
        angry = false;
    }

    if (angry == true) {
        speed = 5 * frameCount;
        xySpeed = 40;
        colorMode(RGB);
        fill(139, 59, 64); //changes to red, want to change to incremental based on time later
    } else if (angry == false) {
        colorMode(HSB);
        targetAngle = atan2(cy, cx);
        angle = lerp(angle, targetAngle, 0.5);
        xySpeed = 300;
    }
    //console.log("current time: " + millis());

    //targetAngle = atan2(cy, cx);
    //angle = lerp(angle, targetAngle, 0.5);

    rotate(angle);
    arc(0, 0, 100, 100, radians(20), radians(-20));
    //arc(0, 0, 100, 100, 0, radians(300));
    pop();
}

function drawLight(lx, ly, idx) {
    fill(255);

    //how to make more water like? less acceleration, constant speed --> does mapping help?, using seed instead for noise?
    lx = map(noise(frameCount / 400 + 100 * idx), 0, 1, -3, 3);
    //lx = noise(frameCount/400 + 100 * idx) * width;
    ly = map(noise(frameCount / 400 + 200 * idx), 0, 1, -3, 3);
    //lx = constrain(lx, 10, width-10);
    //ly = constrain(ly, 10, height-10);

    /*
    console.log("lx: " + lx);
    console.log("ly: " + ly);
    console.log("showLight: " + showLight);
    */

    //light1
    if (idx == 0 && showLight0 == true) {
        let d = dist(x0, y0, cx, cy);
        if (d < 50) {
            showLight0 = false;
            lilyGreen = lilyGreen + 7;
        }
        stroke(255);
        x0 += lx;
        y0 += ly;

        if (x0 > width + 10) {
            x0 = -10;
        }
        else if (x0 < -10) {
            x0 = width + 10;
        }
        if (y0 > height + 10) {
            y0 = -10;
        }
        else if (y0 < -10) {
            y0 = height + 10;
        }

        //x0 = constrain(x0, 10, width - 10);
        //y0 = constrain(y0, 10, height - 10);

        circle(x0, y0, 20);
    }
    //light2
    if (idx == 10 && showLight1 == true) {
        let d = dist(x1, y1, cx, cy);
        if (d < 50) {
            showLight1 = false;
            lilyGreen = lilyGreen + 7;
        }
        x1 += lx;
        y1 += ly;

        if (x1 > width + 10) {
            x1 = -10;
        }
        else if (x1 < -10) {
            x1 = width + 10;
        }
        if (y1 > height + 10) {
            y1 = -10;
        }
        else if (y1 < -10) {
            y1 = height + 10;
        }

        //x1 = constrain(x1, 10, width - 10);
        //y1 = constrain(y1, 10, height - 10);

        circle(x1, y1, 20);
    }
    //light3
    if (idx == 20 && showLight2 == true) {
        let d = dist(x2, y2, cx, cy);
        if (d < 50) {
            showLight2 = false;
            lilyGreen = lilyGreen + 7;
        }
        x2 += lx;
        y2 += ly;

        if (x2 > width + 10) {
            x2 = -10;
        }
        else if (x2 < -10) {
            x2 = width + 10;
        }
        if (y2 > height + 10) {
            y2 = -10;
        }
        else if (y2 < -10) {
            y2 = height + 10;
        }

        //x2 = constrain(x2, 10, width - 10);
        //y2 = constrain(y2, 10, height - 10);

        circle(x2, y2, 20);
    }
    //light4
    if (idx == 30 && showLight3 == true) {
        let d = dist(x3, y3, cx, cy);
        if (d < 50) {
            showLight3 = false;
            lilyGreen = lilyGreen + 7;
        }
        x3 += lx;
        y3 += ly;

        if (x3 > width + 10) {
            x3 = -10;
        }
        else if (x3 < -10) {
            x3 = width + 10;
        }
        if (y3 > height + 10) {
            y3 = -10;
        }
        else if (y3 < -10) {
            y3 = height + 10;
        }

        //x3 = constrain(x3, 10, width - 10);
        //y3 = constrain(y3, 10, height - 10);

        circle(x3, y3, 20);
    }
    //light5
    if (idx == 40 && showLight4 == true) {
        let d = dist(x4, y4, cx, cy);
        if (d < 50) {
            showLight4 = false;
            lilyGreen = lilyGreen + 7;
        }

        x4 += lx;
        y4 += ly;

        if (x4 > width + 10) {
            x4 = -10;
        }
        else if (x4 < -10) {
            x4 = width + 10;
        }
        if (y4 > height + 10) {
            y4 = -10;
        }
        else if (y4 < -10) {
            y4 = height + 10;
        }

        //x4 = constrain(x4, 10, width - 10);
        //y4 = constrain(y4, 10, height - 10);

        circle(x4, y4, 20);
    }
    //light6
    if (idx == 50 && showLight5 == true) {
        let d = dist(x5, y5, cx, cy);
        if (d < 50) {
            showLight5 = false;
            lilyGreen = lilyGreen + 7;
        }
        //console.log(d);

        x5 += lx;
        y5 += ly;

        if (x5 > width + 10) {
            x5 = -10;
        }
        else if (x5 < -10) {
            x5 = width + 10;
        }
        if (y5 > height + 10) {
            y5 = -10;
        }
        else if (y5 < -10) {
            y5 = height + 10;
        }

        //x5 = constrain(x5, 10, width - 10);
        //y5 = constrain(y5, 10, height - 10);
        circle(x5, y5, 20);

    }
    //light7
    if (idx == 60 && showLight6 == true) {
        let d = dist(x6, y6, cx, cy);
        if (d < 50) {
            showLight6 = false;
            lilyGreen = lilyGreen + 7;
        }
        x6 += lx;
        y6 += ly;

        if (x6 > width + 10) {
            x6 = -10;
        }
        else if (x6 < -10) {
            x6 = width + 10;
        }
        if (y6 > height + 10) {
            y6 = -10;
        }
        else if (y6 < -10) {
            y6 = height + 10;
        }

        //x6 = constrain(x6, 10, width - 10);
        //y6 = constrain(y6, 10, height - 10);

        circle(x6, y6, 20);
    }
}

//FROG
function drawFrog(fx, fy) {
    stroke(255);
    fill(133, 163, 67);

    //let jumpX = random(70, 100);
    //let jumpY = random(70, 100);

    //moving whole frog
    push();
    frogX = lerp(frogX, targetX, 0.1);
    frogY = lerp(frogY, targetY, 0.1);
    translate(fx, fy);
    // new target every 100 frames
    if (frameCount % 10 == 9) {
        //want to replace 70 with jumpX later
        targetX = random(frogX - 100, frogX + 100);
        targetY = random(frogY - 100, frogY + 100);
    }
    frogX = constrain(frogX, 80, width - 80);
    frogY = constrain(frogY, 80, height - 80);

    //drawing frog itself
    scale(1, -1);
    beginShape();
    //right side
    curveVertex(0, 40);
    curveVertex(0, 40);
    curveVertex(-15, 31);
    vertex(-14, 24);
    vertex(-20, 25);
    vertex(-22, 29);
    vertex(-20, 32);
    vertex(-28, 35);
    vertex(-33, 30);
    vertex(-28, 28);
    vertex(-22, 18);
    vertex(-16, 19);
    vertex(-20, 6);
    vertex(-18, -2);
    vertex(-32, 4);
    vertex(-30, -8);
    vertex(-40, 0);
    vertex(-43, -10);
    vertex(-12, -24);
    vertex(-15, -15);
    vertex(0, -22);
    vertex(0, 35);
    vertex(0, 35);
    endShape();
    //left side
    //scale(-1, 1);
    beginShape();
    scale(-1, 1); //may need to revert later
    curveVertex(1, 40);
    curveVertex(1, 40);
    curveVertex(-15, 31);
    vertex(-14, 24);
    vertex(-20, 25);
    vertex(-22, 29);
    vertex(-20, 32);
    vertex(-28, 35);
    vertex(-33, 30);
    vertex(-28, 28);
    vertex(-22, 18);
    vertex(-16, 19);
    vertex(-20, 6);
    vertex(-18, -2);
    vertex(-32, 4);
    vertex(-30, -8);
    vertex(-40, 0);
    vertex(-43, -10);
    vertex(-12, -24);
    vertex(-15, -15);
    curveVertex(0, -22);
    curveVertex(1, 40);
    endShape();
    scale(-1, 1); //reverting back to normal
    pop(); //end of frog movement

    //"catch" frog by clicking on it + change frog color when hovered
    let frogD = dist(mouseX, mouseY, frogX, frogY);
    //console.log(frogD);
    //console.log(", " + (frogD < 80));

    if (frogD < 80 == true) {
        fill(random(0, 360), random(0, 360), random(0, 360), 80); //why won't it change fill colors?
        if (mouseIsPressed) {
            showFrog = false;
            savedTime = millis();
        }
    }
}

//interaction: make circle spin faster
function mouseIsClose(x, y) {
    let d = dist(mouseX, mouseY, x, y);
    if (d < 50) {
        return true;
    } else {
        return false;
    }
}

function mousePressed() {
    let d0 = dist(mouseX, mouseY, x0, y0);
    let d1 = dist(mouseX, mouseY, x1, y1);
    let d2 = dist(mouseX, mouseY, x2, y2);
    let d3 = dist(mouseX, mouseY, x3, y3);
    let d4 = dist(mouseX, mouseY, x4, y4);
    let d5 = dist(mouseX, mouseY, x5, y5);
    let d6 = dist(mouseX, mouseY, x6, y6);

    if (d6 < 10) {
        selected = 6;
    } else if (d5 < 10) {
        selected = 5;
    } else if (d4 < 10) {
        selected = 4;
    } else if (d3 < 10) {
        selected = 3;
    } else if (d2 < 10) {
        selected = 2;
    } else if (d1 < 10) {
        selected = 1;
    } else if (d0 < 10) {
        selected = 0;
    } else {
        selected = null;
    }
}

function mouseDragged() {
    if (selected == 0) {
        x0 += mouseX - pmouseX;
        y0 += mouseY - pmouseY;
    } else if (selected == 1) {
        x1 += mouseX - pmouseX;
        y1 += mouseY - pmouseY;
    } else if (selected == 2) {
        x2 += mouseX - pmouseX;
        y2 += mouseY - pmouseY;
    } else if (selected == 3) {
        x3 += mouseX - pmouseX;
        y3 += mouseY - pmouseY;
    } else if (selected == 4) {
        x4 += mouseX - pmouseX;
        y4 += mouseY - pmouseY;
    } else if (selected == 5) {
        x5 += mouseX - pmouseX;
        y5 += mouseY - pmouseY;
    } else if (selected == 6) {
        x6 += mouseX - pmouseX;
        y6 += mouseY - pmouseY;
    }
    console.log(selected);
}

function mouseReleased() {
    selected = null;
}
