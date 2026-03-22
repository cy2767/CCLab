let scanned = [];
let apples;
let springs;

let curApple = 0; //for cursor

let curSpinA = 0; //for rolling
let appleX = 50;
let appleSpeedX = 1; //can change value to change speed of rolling apple
let reverse;

let curSpring = 3;
let curSoloSpring = 0;

function preload() {
  for (let i = 1; i <= 4; i++) {
    scanned.push(loadImage("20260320115422-" + i + ".jpg"));
  }
}

function setup() {
  createCanvas(800, 500);

  eraseBg(scanned, 10); //remove background
  apples = crop(scanned, 50, 100, 500, 450);
  springs = crop(scanned, 1950, 900, 300, 750); //1800; 800; 600

  reverse = true;
}

function draw() {
  console.log(mouseX, mouseY);
  //background(255, 0, 0);
  background(255);

  /*
   * ROLLING APPLE
   */
  push();
  translate(appleX, height - (apples[0].height * 0.3) / 2 - 5);
  //adjust 12
  imageMode(CENTER);
  if (appleX > 480 || appleX < 50) {
    appleSpeedX = -appleSpeedX;
    reverse = !reverse;
  }
  //make reverse rotation directions
  if (reverse == false) {
    rotate(radians(-frameCount));
  } else if (reverse == true) {
    rotate(radians(frameCount));
  }
  image(apples[curSpinA], 0, 0, apples[0].width * 0.3, apples[0].height * 0.3);
  pop();
  //changes frame
  curSpinA = floor(map(sin(frameCount / 20), -1, 1, apples.length, 0));
  appleX += appleSpeedX;

  /*
   *
   * INTERACTNG SPRING
   *
   */
  image(
    springs[curSpring],
    720,
    350,
    springs[0].width * 0.4,
    springs[0].height * 0.4
  );
  let d = dist(mouseX, mouseY, 721, 166);
  console.log("d: " + d);
  if (mouseY > 160 && mouseX < 750 && mouseX > 699) {
    if (d < 40) {
      curSpring = 2;
    }
    if (d > 40 && d < 90) {
      curSpring = 1;
    }
    if (d > 100 && d < 200) {
      curSpring = 0;
    }
  } else {
    curSpring = 3;
  }
  //curSpring = floor(map(sin(frameCount / 10), -1, 1, 0, apples.length));

  /*
   *
   * SOLO BOUNCING SPRING
   *
   */
  push();
  translate(290, 80);
  rotate(radians(90));
  image(
    springs[curSoloSpring],
    0,
    0,
    springs[0].width * 0.5,
    springs[0].height * 0.8
  );
  pop();
  curSoloSpring = floor(map(sin(frameCount / 10), -1, 1, 0, springs.length));

  if (mouseX < 485 && mouseY < 90) {
    curSoloSpring = floor(map(sin(frameCount / 5), -1, 1, 0, springs.length));
  }

  /*
   *
   * APPLE CURSOR
   *
   */
  imageMode(CENTER);
  image(
    apples[curApple],
    mouseX,
    mouseY,
    apples[curApple].width * 0.25,
    apples[0].height * 0.25
  );
  //curApple = floor((frameCount / 20) % apples.length);
  curApple = floor(map(sin(frameCount / 10), -1, 1, apples.length, 0));
}



// You shouldn't need to modify these helper functions:

function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}

function eraseBg(imgs, threshold = 10) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
  // this function uses the pixels array
  // we will cover this later in the semester - stay tuned
}
