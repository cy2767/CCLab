let mapImg;
let sunImg = [];
let noRayImg = [];
let rayImg = [];

// let suns = [];
// let curSun;
let noRay;
let ray;
let xOff = 0; //for scrolling

let rivers = [];
let riverWords = [
  "Water",
  "Agua",
  "Eau",
  "Acqua",
  "Wasser",
  "Água",
  "Water",
  "Vatten",
  "Vann",
  "Vand",
  "Вода",
  "Woda",
  "Voda",
  "Νερό",
  "Aqua",
  "Uisce",
  "Dŵr",
  "水",
  "물",
  "Su",
  "Air",
  "Vesi",
  "Víz",
  "Maji",
  "Nước",
  "น้ำ",
  "Tubig",
  "Ус",
  "Yaku",
  "ਪਾਣੀ",
  "Apă",
  "Omi",
  "Air",
];

let others = [];

let trees = [];
let treeLang = [
  "English",
  "German",
  "French",
  "Spanish",
  "Italian",
  "Portuguese",
  "Dutch",
  "Swedish",
  "Danish",
  "Norwegian",
  "Finnish",
  "Russian",
  "Georgian",
  "Japanese",
  "Chinese",
  "Korean",
];
let treeWords = [
  "木",
  "树",
  "Tre",
  "Árbol",
  "Albero",
  "Árvore",
  "Boom",
  "Träd",
  "Træ",
  "Arbre",
  "Puu",
  "Дерево",
  "ხე",
  "Tree",
  "Baum",
  "나무",
];
let treesX = [
  170,
  170,
  170,
  170,
  170,
  170,
  120,
  120,
  220,
  220,
  310,
  270,
  50,
  50,
  80,
  80,
];
let treesY = [
  350,
  310,
  270,
  230,
  190,
  130,
  180,
  80,
  170,
  100,
  180,
  80,
  170,
  100,
  160,
  50,
];

function preload() {
  mapImg = loadImage("map.png");
  sunImg.push(loadImage("suns.png"));
}

function setup() {
  createCanvas(800, 500); //windowWidth, windowHeight functionwindowResized in p5

  //SUN
  eraseBg(sunImg, 10);
  noRay = crop(sunImg, 0, 0, 300, 210);
  //noRay = sunImg.get(30, 0, 300, 180);
  ray = crop(sunImg, 0, 250, 300, 500);
  //ray = sunImg.get(0, 200, 300, 500);
  // suns.push(noRay);
  // suns.push(ray);
  // curSun = 0;
  sun = new Sun();

  //RIVER
  //hard coded number of water words
  for (let i = 0; i < 75; i++) {
    rivers.push(new River(riverWords[i % riverWords.length]));
  }

  //TREE
  for (let i = 0; i < treeWords.length; i++) {
    trees.push(new Tree(treeWords[i], treesX[i], treesY[i]));
    console.log(treeWords[i]);
  }
}

function draw() {
  console.log(mouseX, mouseY);
  //image(mapImg, 0, 0);
  background(255);

  //SUN
  sun.display();
  sun.move();

  //RIVER
  //if put rivers.push in draw, keep creating words
  for (let i = 0; i < rivers.length; i++) {
    rivers[i].display();
    rivers[i].move();
  }

  //  for (let i = 0; i < rivers.length; i--) {
  //   if (rivers[i].isOverWater == false) {
  //     console.log("respawn");
  //     // rivers.push(new River(rivers[i].rText));
  //     // rivers.splice(i, 1);
  //     for (let tries = 0; tries < 100; tries++) {
  //       let x = random(0, width);
  //       let y = random(0, height);
  //       if (this.isOverWater(x, y) == true) {
  //         this.x = x;
  //         this.y = y;
  //         break; // stop the loop right away
  //       }
  //     }
  //   }
  // }

  //TREES
  for (let i = 0; i < trees.length; i++) {
    trees[i].display();
  }
  //console.log(trees);

  //SCROLL
  if (keyIsPressed) {
    scroll();
  }
}

class Tree {
  constructor(tText, x, y) {
    // this.x = x;
    // this.y = y;
    this.x = x;
    this.y = y;
    this.tText = tText;
    this.size = random(20, 30);
  }

  display() {
    fill(15, 92, 20);
    textSize(this.size);
    text(this.tText, this.x, this.y);
    //console.log(trees);
  }
}

class River {
  constructor(rText) {
    //teleporting method
    for (let n = 0; n < 50; n++) {
      for (let tries = 0; tries < 100; tries++) {
        let x = random(0, width);
        let y = random(0, height);
        if (this.isOverWater(x, y) == true) {
          this.x = x;
          this.y = y;
          break; // stop the loop right away
        }
      }
    }
    //this.y = random(400, height);
    this.rText = rText;
    this.size = random(20, 30);
    //color
    this.speedX = random(3, 20);
    this.speedY = random(-3, 3);
    this.overWater = false;
  }

  display() {
    if (this.isOverWater(this.x, this.y) == true) {
      //textSize(15);
      fill("blue");
      textSize(this.size);
      text(this.rText, this.x, this.y);
    }
  }

  isOverWater(x, y) {
    let c = mapImg.get(x, y);
    if (blue(c) == 255 && red(c) == 13) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    let c = mapImg.get(this.x, this.y);
    if (blue(c) == 255 && red(c) == 13) {
      this.overWater = true;
    } else {
      this.overWater = false;
    }

    // if (this.overWater == false) {
    //   this.speedY = -1 * this.speedY;
    //   this.overWater = true;
    // }

    //updating
    this.x += this.speedX;
    this.y += this.speedY;

    let noiseVal = noise(
      this.x / 50 + frameCount / 20,
      this.y / 50 + frameCount / 20
    );
    this.speedX = map(noiseVal, 0, 1, -0.5, 1.5);
    this.speedY = map(noiseVal, 0, 1, -1.5, 1.5);

    if (this.overWater == false) {
      console.log("respawn");
      // rivers.push(new River(rivers[i].rText));
      // rivers.splice(i, 1);
      for (let tries = 0; tries < 100; tries++) {
        let x = random(0, width);
        let y = random(0, height);
        if (this.isOverWater(x, y) == true) {
          this.x = x;
          this.y = y;
          break; // stop the loop right away
        }
      }
    }
  }
}

class Sun {
  constructor() {
    this.speed = 5; //play with number
  }
  display() {
    if (mouseX > 630 && mouseX < 730 && mouseY > 40 && mouseY < 130) {
      image(ray[0], 565, 22);
    } else {
      image(noRay[0], 580, 20);
    }
    //image(suns[curSun], 600, 20, suns[0].width * 0.8, suns[0].height * 0.8);
  }
  move() {
    let d = dist(mouseX, mouseY, 686, 85);
    if (d < 50) {
      push();
      translate(0, 0);
      imageMode(CENTER);
      rotate(radians(frameCount));
      //display();
      pop();
    }
  }
}

function scroll() {
  let xSize = 1200;
  //let x = 250; //for example

  //river class

  // circle((xOff + x) % xSize - 50, height/2, 100);
  // console.log(xOff, xSize, (xOff + x) % xSize);
  //in xOff + x % xSize, subtract size/2 to make it loop smoothly

  for (let i = 0; i < rivers.length; i++) {
    xOff = 0;
    if (keyIsPressed) {
      xOff++;
    }
    //rivers[i].x = (rivers[i].x + xOff) % xSize - rivers[i].size/2;
    rivers[i].x = (rivers[i].x + xOff) % xSize;
    console.log(xOff, xSize, (xOff + rivers[i].x) % xSize);
  }
}

//IMAGE HELPER FUNCTIONS from reci8
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
