//LILYPAD VARIABLES
//lilypad coordinates
let cx, cy;
let dxLily, dyLily;
let angry; //lilypad state
let xySpeed;
let savedTime;
let lilyGreen; //green of lilypad
let angle;
let targetAngle;

//LIGHT VARIABLES
//light coordinates
let lx, ly;
let lightX, lightY;
let radius = 20;

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
let frogTarget;
let frogAngle;
let frogX, frogY; //initial frog spawing coordinates; do I need fx fy? again, local vs global
let showFrog;

let howClose; //integer determining mouseIsClose

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");

    colorMode(RGB);

    //LILYPAD
    cx = random(0, width);
    cy = random(0, height);

    angry = false;
    xySpeed = 200;
    lilyGreen = 123;
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
    frogAngle = 0;
    frogTarget = 0;
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
    /*
    for (let x = 1; x < width; x += 4) {
      for (let y = 1; y < height; y += 4) {
        let noiseVal = noise(
          x / 500 + frameCount / 200,
          y / 500 + frameCount / 200
        );
        fill(map(noiseVal, 0, 1, 180, 220), 50, 100);
        square(x, y, 4);
      }
    } */
    for (let x = 1; x < width; x += 4) {
        for (let y = 1; y < height; y += 4) {
            let noiseVal = noise(
                x / 100 + frameCount / 150,
                y / 50 + frameCount / 150
            );
            fill(map(noiseVal, 0, 1, 185, 195), 50, 100);
            square(x, y, 4);
        }
    }
    colorMode(RGB);
    pop();

    //How to make motion of lilypad more water like?
    dxLily = map(noise(frameCount / 500 + 1000), 0.3, 0.7, -3, 3);
    dyLily = map(noise(frameCount / 500 + 100), 0.3, 0.7, -3, 3);

    cx = cx + dxLily;
    cy = cy + dyLily;

    cx = constrain(cx, 60, width - 60);
    cy = constrain(cy, 60, height - 60);

    console.log("cx: " + cx);
    console.log("dxLily: " + dxLily);
    console.log("cy: " + cy);
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
    stroke(154, 205, 50);
    //stroke(199, 214, 109);
    strokeWeight(4);

    fill(88, lilyGreen, 2);

    targetAngle = atan2(dyLily, dxLily);
    angle = lerp(angle, targetAngle, 0.5);

    if (mouseIsClose(cx, cy, 50) == true) {
        speed = 2 * frameCount;
    }

    if (showFrog == true) {
        angry = true;
    } else if (showFrog == false) {
        angry = false;
    }

    if (angry == true) {
        speed = 2 * frameCount;
        //xySpeed = 100;
        cx = cx + dxLily + random(-2, 2);
        cy = cy + dyLily + random(-2, 2);
        //fill(225, 50, 50);
        fill(242, 95, 92);
        stroke(139, 0, 0);
    } else if (angry == false) {
        xySpeed = 200;
    }

    let distL0 = dist(x0, y0, cx, cy);
    let distL1 = dist(x1, y1, cx, cy);
    let distL2 = dist(x2, y2, cx, cy);
    let distL3 = dist(x3, y3, cx, cy);
    let distL4 = dist(x4, y4, cx, cy);
    let distL5 = dist(x5, y5, cx, cy);
    let distL6 = dist(x6, y6, cx, cy);

    //to make lilypad rotate
    push();
    translate(cx, cy);
    if (distL0 < 200) {
        //when close enough
        targetAngle = atan2(y0 - cy, x0 - cx);
        angle = lerp(angle, targetAngle, 0.05);
    }
    if (distL1 < 200) {
        //when close enough
        targetAngle = atan2(y1 - cy, x1 - cx);
        angle = lerp(angle, targetAngle, 0.05);
    }
    if (distL2 < 200) {
        //when close enough
        targetAngle = atan2(y2 - cy, x2 - cx);
        angle = lerp(angle, targetAngle, 0.05);
    }
    if (distL3 < 200) {
        //when close enough
        targetAngle = atan2(y3 - cy, x3 - cx);
        angle = lerp(angle, targetAngle, 0.05);
    }
    if (distL4 < 200) {
        //when close enough
        targetAngle = atan2(y4 - cy, x4 - cx);
        angle = lerp(angle, targetAngle, 0.05);
    }
    if (distL5 < 200) {
        //when close enough
        targetAngle = atan2(y5 - cy, x5 - cx);
        angle = lerp(angle, targetAngle, 0.05);
    }
    if (distL6 < 200) {
        //when close enough
        targetAngle = atan2(y6 - cy, x6 - cx);
        angle = lerp(angle, targetAngle, 0.05);
    }
    angle = lerp(angle, targetAngle, 0.05);
    rotate(angle * speed);
    arc(0, 0, 100, 100, radians(20), radians(-20), PIE);
    pop();
}

function drawLight(lx, ly, idx) {
    fill(255);
    stroke(255);
    strokeWeight(4);

    lx = map(noise(frameCount / 400 + 100 * idx), 0, 1, -2, 2);
    ly = map(noise(frameCount / 400 + 200 * idx), 0, 1, -2, 2);

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
        } else if (x0 < -10) {
            x0 = width + 10;
        }
        if (y0 > height + 10) {
            y0 = -10;
        } else if (y0 < -10) {
            y0 = height + 10;
        }

        if (mouseIsClose(x0, y0, 20) == true) {
            fill(random(0, 255), random(0, 255), random(0, 255), 150);
            radius = map(noise(frameCount / 100), 0, 1, 18, 30);
        } else {
            radius = 20;
        }
        circle(x0, y0, radius);
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
        } else if (x1 < -10) {
            x1 = width + 10;
        }
        if (y1 > height + 10) {
            y1 = -10;
        } else if (y1 < -10) {
            y1 = height + 10;
        }

        //x1 = constrain(x1, 10, width - 10);
        //y1 = constrain(y1, 10, height - 10);

        if (mouseIsClose(x1, y1, 20) == true) {
            fill(random(0, 255), random(0, 255), random(0, 255), 150);
            radius = map(noise(frameCount / 100), 0, 1, 18, 30);
        } else {
            radius = 20;
        }
        circle(x1, y1, radius);
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
        } else if (x2 < -10) {
            x2 = width + 10;
        }
        if (y2 > height + 10) {
            y2 = -10;
        } else if (y2 < -10) {
            y2 = height + 10;
        }

        //x2 = constrain(x2, 10, width - 10);
        //y2 = constrain(y2, 10, height - 10);
        if (mouseIsClose(x2, y2, 20) == true) {
            fill(random(0, 255), random(0, 255), random(0, 255), 150);
            radius = map(noise(frameCount / 100), 0, 1, 18, 30);
        } else {
            radius = 20;
        }

        circle(x2, y2, radius);
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
        } else if (x3 < -10) {
            x3 = width + 10;
        }
        if (y3 > height + 10) {
            y3 = -10;
        } else if (y3 < -10) {
            y3 = height + 10;
        }

        if (mouseIsClose(x3, y3, 20) == true) {
            fill(random(0, 255), random(0, 255), random(0, 255), 150);
            radius = map(noise(frameCount / 100), 0, 1, 18, 30);
        } else {
            radius = 20;
        }
        circle(x3, y3, radius);
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
        } else if (x4 < -10) {
            x4 = width + 10;
        }
        if (y4 > height + 10) {
            y4 = -10;
        } else if (y4 < -10) {
            y4 = height + 10;
        }

        if (mouseIsClose(x4, y4, 20) == true) {
            fill(random(0, 255), random(0, 255), random(0, 255), 150);
            radius = map(noise(frameCount / 100), 0, 1, 18, 30);
        } else {
            radius = 20;
        }
        circle(x4, y4, radius);
    }
    //light6
    if (idx == 50 && showLight5 == true) {
        let d = dist(x5, y5, cx, cy);
        if (d < 50) {
            showLight5 = false;
            lilyGreen = lilyGreen + 7;
        }

        x5 += lx;
        y5 += ly;

        if (x5 > width + 10) {
            x5 = -10;
        } else if (x5 < -10) {
            x5 = width + 10;
        }
        if (y5 > height + 10) {
            y5 = -10;
        } else if (y5 < -10) {
            y5 = height + 10;
        }

        if (mouseIsClose(x5, y5, 20) == true) {
            fill(random(0, 255), random(0, 255), random(0, 255), 150);
            radius = map(noise(frameCount / 100), 0, 1, 18, 30);
        } else {
            radius = 20;
        }
        circle(x5, y5, radius);
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
        } else if (x6 < -10) {
            x6 = width + 10;
        }
        if (y6 > height + 10) {
            y6 = -10;
        } else if (y6 < -10) {
            y6 = height + 10;
        }

        if (mouseIsClose(x6, y6, 20) == true) {
            fill(random(0, 255), random(0, 255), random(0, 255), 150);
            radius = map(noise(frameCount / 100), 0, 1, 18, 30);
        } else {
            radius = 20;
        }
        circle(x6, y6, radius);
    }
}

//FROG
function drawFrog(fx, fy) {
    stroke(255);
    strokeWeight(1);
    fill(133, 163, 67);

    //moving whole frog
    push();

    translate(fx, fy);


    if (frameCount % 50 == 49) {
        targetX = random(frogX - 100, frogX + 100);
        targetY = random(frogY - 100, frogY + 100);
    }

    frogX = lerp(frogX, targetX, 0.1);
    frogY = lerp(frogY, targetY, 0.1);
    frogTarget = atan2(targetY - frogY, targetX - frogX);
    frogAngle = lerp(frogAngle, frogTarget, 0.2); //key
    // new target every 100 frames
    frogX = constrain(frogX, 80, width - 80);
    frogY = constrain(frogY, 80, height - 80);

    if (mouseIsClose(frogX, frogY, 50) == true) {
        fill(random(0, 255), 163, random(0, 255), 255);
        //strokeWeight(4);
        if (mouseIsPressed) {
            showFrog = false;
            savedTime = millis();
        }
    }
    rotate(frogAngle + PI / 2); //key
    console.log(frogTarget);
    //put push here?
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
}

//interaction: make circle spin faster
function mouseIsClose(x, y, howClose) {
    let d = dist(mouseX, mouseY, x, y);
    if (d < howClose) {
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
    //console.log(selected);
}

function mouseReleased() {
    selected = null;
}
