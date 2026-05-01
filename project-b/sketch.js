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
let leafCount = 0;
let treeLangs = [
  "English",
  "Spanish",
  "French",
  "Italian",
  "German",
  "Portuguese",
  "Dutch",
  "Swedish",
  "Norwegian",
  "Danish",
  "Russian",
  "Polish",
  "Czech",
  "Greek",
  "Latin",
  "Irish",
  "Welsh",
  "Hindi",
  "Persian",
  "Chinese",
  "Japanese",
  "Korean",
  "Turkish",
  "Arabic",
  "Indonesian",
  "Finnish",
  "Hungarian",
  "Swahili",
  "Vietnamese",
  "Thai",
  "Tagalog",
  "Tamil",
  "Mongolian",
  "Quechua",
  "Punjabi",
  "Romanian",
  "Yoruba",
  "Malay",
];
let treeWords = [
  "Tree",
  "Árbol",
  "Arbre",
  "Albero",
  "Baum",
  "Árvore",
  "Boom",
  "Träd",
  "Tre",
  "Træ",
  "Дерево",
  "Drzewo",
  "Strom",
  "Δέντρο",
  "Arbor",
  "Crann",
  "Coeden",
  "पेड़",
  "درخت",
  "树",
  "木",
  "나무",
  "Ağaç",
  "شجرة",
  "Pohon",
  "Puu",
  "Fa",
  "Mti",
  "Cây",
  "ต้นไม้",
  "Puno",
  "மரம்",
  "Мод",
  "Mallki",
  "ਰੁੱਖ",
  "Copac",
  "Igi",
  "Pokok",
];
let treeFiles = [];
let switchLeaves = true; //boolean switch
let count;

//sounds
let leafSound;
let riverSound; //Stream, Water, C.wav by InspectorJ -- https://freesound.org/s/339324/ -- License: Attribution 4.0
let selected;
let lang;

function preload() {
  mapImg = loadImage("map-edit1.png");
  sunImg.push(loadImage("suns.png"));

  //sound
  leafSound = loadSound("stek59__autumn-wind-and-dry-leaves.wav");
  riverSound = loadSound("339324_inspectorj_stream-water-c.mp3");

  //would I have to preload all the audios for tree pronunciation here? = need a variable for all of them? can I push to array here without needing to make a variable name (ex. can just use treeFiles[i])
}

function setup() {
  createCanvas(800, 500); //windowWidth, windowHeight functionwindowResized in p5

  //SUN
  eraseBg(sunImg, 10);
  noRay = crop(sunImg, 0, 0, 300, 210);
  //noRay = sunImg.get(30, 0, 300, 180);
  ray = crop(sunImg, 0, 200, 300, 250);
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
  for (let i = 0; i < 75; i++) {
    //want to push more
    trees.push(new Tree(treeWords[i % treeWords.length]));
  }
}

function draw() {
  console.log(mouseX, mouseY);
  //image(mapImg, 0, 0);
  background(255);

  //SUN
  sun.display();
  //sun.move();

  //RIVER
  //if put rivers.push in draw, keep creating words
  for (let i = 0; i < rivers.length; i++) {
    rivers[i].display();
    rivers[i].move();
    rivers[i].sound();
  }

  //TREES
  for (let i = 0; i < trees.length; i++) {
    trees[i].display();
    trees[i].move();
    trees[i].sound(); //can I call my sound function like this
    // if(trees[i].isFalling == true){
    //   console.log("respawning");
    //   //trees.push(new Tree(this.tText));
    // }
  }

  //SCROLL
  if (keyIsPressed) {
    scroll();
  }
}

class Tree {
  constructor(tText) {
    for (let n = 0; n < 75; n++) {
      //hard coded to 75?
      for (let tries = 0; tries < 100; tries++) {
        let x = random(0, width);
        let y = random(0, height);
        if (this.isOverTree(x, y) == true) {
          this.x = x;
          this.y = y;
          break; // stop the loop right away
        }
      }
    }
    this.tText = tText;
    this.size = 20;
    this.angle = random(-0.5, 0.5);
    this.rand = random(0, 10);
    this.startHover = 0;
    this.isFalling = false;
    //time that mouse has been hovering over tree for
    this.hasRespawned = false;
    this.fallOffset = random(-PI, PI);

    let c = mapImg.get(this.x, this.y);
    if (green(c) == 255) {
      //if defining random r here happy accident-makes tree words flash
      if (this.rand < 5) {
        this.col = color(76, 166, 38);
      } else {
        this.col = color(69, 122, 0);
      }
    } else {
      if (this.rand < 5) {
        //fill(122, 73, 0); //dark brown
        //fill(222, 191, 120); light beige
        this.col = color(214, 176, 87); //med beige
      } else {
        this.col = color(204, 122, 0); //why do my leaves become brown
      }
    }
  }

  display() {
    textAlign(CENTER, CENTER);
    let c = mapImg.get(this.x, this.y);
    fill(this.col);
    textSize(this.size);
    //want leaves to have random angle, does this work?
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    text(this.tText, 0, 0);
    pop();
  }

  isOverTree(x, y) {
    let c = mapImg.get(x, y);
    if ((blue(c) == 0 && green(c) == 255) || (blue(c) == 0 && green(c) == 73)) {
      return true;
    } else {
      return false;
    }
  }

  mouseOverLeaf(mouseX, mouseY) {
    let c = mapImg.get(this.x, this.y);
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 20 && blue(c) == 0 && green(c) == 255) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    let c = mapImg.get(this.x, this.y);
    let noiseRate = map(noise(frameCount), 0, 1, 5, 30);

    if (d < 50 && blue(c) == 0 && green(c) == 255) {
      //this.angle += map(noise(frameCount), 0, 1, radians(-10), radians(10)); //why does it only rotate one way
      this.angle += map(sin(frameCount / 5), -1, 1, radians(-5), radians(5));
      //this.angle += map(sin(frameCount / noiseRate), -1, 1, radians(-5), radians(5));

      if (this.startHover == 0) {
        this.startHover = millis();
      }
      // startHover is guaranteed to be set here (and not 0)
      if (millis() - this.startHover > 3000) {
        console.log("start falling");
        this.isFalling = true;
        //this.respawn = true; //new function??
      }
    } else {
      this.startHover = 0;
    }

    if (this.isFalling == true) {
      if (this.y < 380) {
        this.y += 2;
        this.x += map(sin(frameCount / 15 + this.fallOffset), -1, 1, -2, 2);
        //way to add offset so leaves dont' all move together? - changed sin cycle startpoint
      } else if (this.hasRespawned == false) {
        //confusing
        this.hasRespawned = true;
        console.log("new leaf respawned");

        trees.push(new Tree(this.tText));
      }
    }

    // if (this.isOverTree == false) { //want to spawn new leaves
    //   trees.push(new Tree(treeWords[this.tText]));
    //   console.log("respawning tree");
    //   // for (let tries = 0; tries < 100; tries++) {
    //   //   let x = random(0, width);
    //   //   let y = random(0, height);
    //   //   if (this.isOverTree(x, y) == true) {
    //   //     this.x = x;
    //   //     this.y = y;
    //   //     trees.push(new Tree(treeWords[this.tText]));
    //   //     break; // stop the loop right away
    //   //   }
    //   // }
    // }
  }

  sound() {
    //is this how while works?
    if (
      this.isOverTree(mouseX, mouseY) == true &&
      leafSound.isPlaying() == false
    ) {
      leafSound.loop(); //vs .play(); is there a way to lerp sound?
    } else if (this.isOverTree(mouseX, mouseY) == false) {
      leafSound.pause();
    }
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
    this.size = 20;
    //color
    this.speedX = random(3, 20);
    this.speedY = random(-3, 3);
    this.overWater = false;
  }

  display() {
    if (this.isOverWater(this.x, this.y) == true) {
      let r = random(0, 10); //happy accident-makes tree words flash
      if (r < 5) {
        fill(103, 188, 245);
      } else {
        fill(43, 141, 207);
      }
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
      //console.log("respawn");
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

  sound() {
    if (this.isOverWater(mouseX, mouseY) == true) {
      if (riverSound.isPlaying() == false) {
        riverSound.play();
      }
    } else {
      riverSound.pause();
    }
  }
}

class Sun {
  constructor() {
    this.speed = 5; //play with number
  }
  display() {
    //image(noRay[0], 792, 140);
    if (this.mouseOverSun() == true) {
      push();
      imageMode(CENTER);
      translate(686, 85); //translate coordinates?
      //translate(0, 0);
      rotate(radians(frameCount)); //want to make rotate in place when hovering
      image(ray[0], 0, 0);

      pop();
    } else {
      image(noRay[0], 550, 10); //fixed coordinates
    }
  }

  move() {
    //didn't work
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

  mouseOverSun() {
    let d = dist(mouseX, mouseY, 686, 85);
    if (d < 50) {
      return true;
    } else {
      return false;
    }
  }
}

function mouseClicked() {
  //turned off for debugging purposes
  //for tree
  if (trees[0].isOverTree(mouseX, mouseY) == true) {
    //go through all the tree words to see which
    for (let i = 0; i < trees.length; i++) {
      //why does it say trees.length is not a function
      let d = dist(mouseX, mouseY, trees[i].x, trees[i].y);
      if (d < 5) {
        //range? so many overlapped
        selected = treeLangs[i];
      } else {
        selected = null; //from lilypad dragging
      }
    }
    //if click, play sound?
    lang = selected + "Sound";
    lang.play(); //would this work to hold the string?
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
    //console.log(xOff, xSize, (xOff + rivers[i].x) % xSize);
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
