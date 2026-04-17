let mapImg;
let xOff = 0; //for scrolling
let rivers = [];
let riverWords = ['river', '강', 'río', 'rivière', 'fluss', 'fiume', '河'];
let others = [];

let trees = [];
let treeLang = ['English', 'German', 'French', 'Spanish', 'Italian', 'Portuguese', 'Dutch', 'Swedish', 'Danish', 'Norwegian', 'Finnish', 'Russian', 'Georgian', 'Japanese', 'Chinese', 'Korean'];
let treeWords = ['木', '树', 'Tre', 'Árbol', 'Albero', 'Árvore', 'Boom', 'Träd', 'Træ', 'Arbre', 'Puu', 'Дерево', 'ხე', 'Tree', 'Baum', '나무'];
let treesX = [170, 170, 170, 170, 170, 170, 120, 120, 220, 220, 310, 270, 50, 50, 80, 80];
let treesY = [350, 310, 270, 230, 190, 130, 180, 80, 170, 100, 180, 80, 170, 100, 160, 50];

function preload() {
  mapImg = loadImage("map.png");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  createCanvas(800, 500); //windowWidth, windowHeight functionwindowResized in p5

  //rivers.push(new River(mouseX, mouseY, "river"));
  //rivers.push(new River(mouseX, mouseY, "river"));
  for (let i = 0; i < riverWords.length; i++) {
    rivers.push(new River(riverWords[i]));
  }

  for (let i = 0; i < treeWords.length; i++) {
    trees.push(new Tree(treeWords[i], treesX[i], treesY[i]));
    console.log(treeWords[i]);
  }
}

function draw() {
  console.log(mouseX, mouseY);
  image(mapImg, 0, 0);
  //background(220);


  //if put rivers.push in draw, keep creating words
  for (let i = 0; i < rivers.length; i++) {
    rivers[i].display();
    rivers[i].move();
    rivers[i].checkOverlap(rivers); //calling new method
  }

  //trees
  for (let i = 0; i < trees.length; i++) {
    trees[i].display();
  }
  //console.log(trees);

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
    fill(0);
    textSize(this.size);
    text(this.tText, this.x, this.y);
    //console.log(trees);
  }
}


class River {
  constructor(rText) {
    this.x = random(0, width);
    //want to make not spawn one each other + spawn in river
    this.y = random(400, height);
    this.rText = rText;
    this.size = random(20, 30);
    //color
    this.speedX = random(3, 20);
    this.speedY = random(-3, 3);
    this.isTouching = false;
    this.overWater = false;
  }

  display() {
    //textSize(15);
    fill(0); //replace with color variable later
    textSize(this.size);
    text(this.rText, this.x, this.y);
  }

  move() {
    //have to update so that words don't spawn on top of each other
    if (this.isTouching == true) {
      this.speedX = -1 * this.speedX;
      this.speedY = -1 * this.speedY;
      //console.log("touching");
      this.isTouching = false;
    }
    //want to stay within water
    //let c = mapImg.get(mouseX, mouseY);
    let c = mapImg.get(this.x, this.y);
    if (blue(c) == 255 && red(c) == 13) {
      this.overWater = true;
      //console.log("over water");
    } else {
      this.overWater = false;
      //console.log("out of bounds");
    }

    //can I make it visible only when it is over blue? right now loops around and appears in white
    if (this.overWater == false) {
      this.speedY = -1 * this.speedY;
      this.overWater = true;
    }


    //updating
    this.x += this.speedX;
    this.y += this.speedY;

    let noiseVal = noise(
      this.x / 50 + frameCount / 20,
      this.y / 50 + frameCount / 20
    );
    this.speedX = map(noiseVal, 0, 1, -0.5, 1.5);
    this.speedY = map(noiseVal, 0, 1, -1.5, 1.5);
    //this.speedY += 0.1;

    if (this.x > width) {
      this.x = 47;
      this.y = 450;
    }
  }

  checkOverlap(others) {
    for (let i = 0; i < others.length; i++) {
      if (others[i] != this) {
        let d = dist(this.x, this.y, others[i].x, others[i].y);
        if (d < this.size / 2 + others[i].size / 2) { //don't know if this number is good for this.size
          this.isTouching = true;
        }
      }
    }
  } //end of check overlap
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


