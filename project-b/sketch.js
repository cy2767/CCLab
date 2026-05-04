//INTRO
let state;
let earthImg;

let earths = [];
let earthWords = [
  "Earth",
  "Tierra",
  "Terre",
  "Terra",
  "Erde",
  "Terra",
  "Aarde",
  "Jord",
  "Jord",
  "Jord",
  "Земля",
  "Ziemia",
  "Země",
  "Γη",
  "Terra",
  "Talamh",
  "Daear",
  "पृथ्वी",
  "زمین",
  "地球",
  "地球",
  "지구",
  "Dünya",
  "الأرض",
  "Bumi",
  "Maa",
  "Föld",
  "Dunia",
  "Trái Đất",
  "โลก",
  "Daigdig",
  "பூமி",
  "Дэлхий",
  "Pacha",
  "ਧਰਤੀ",
  "Pământ",
  "Ayé",
  "Bumi",
];
let earthN = 100;

let enters = [];
let enterWords = [
  "enter",
  "comienzo",
  "début",
  "inizio",
  "start",
  "início",
  "start",
  "Cтарт",
  "start",
  "začátek",
  "Aρχή",
  "initium",
  "tús",
  "dechrau",
  "开始",
  "開始",
  "시작",
  "başlangıç",
  "mulai",
  "alku",
  "kezdet",
  "mwanzo",
  "bắt đầu",
  "เริ่ม",
  "simula",
  "Эхлэл",
  "Qallariy",
  "ਸ਼ੁਰੂ",
  "Început",
  "ibẹrẹ",
  "mula",
];
let curText;
let hoverEnter = 0;

let mapImg;
let sunImg;
//let sunImg = [];
// let noRayImg = [];
// let rayImg = [];

// let suns = [];
// let curSun;
// let noRay;
// let ray;
let xOff = 0; //for scrolling

let suns = [];
let sunWords = [
  "Sun",
  "Sol",
  "Soleil",
  "Sole",
  "Sonne",
  "Sol",
  "Zon",
  "Sol",
  "Sol",
  "Sol",
  "Со́лнце",
  "Słońce",
  "Slunce",
  "Ήλιος",
  "Sol",
  "Grian",
  "Haul",
  "太阳",
  "太陽",
  "태양",
  "Güneş",
  "Matahari",
  "Aurinko",
  "Nap",
  "Jua",
  "Mặt Trời",
  "ดวงอาทิตย์",
  "Araw",
  "Нар",
  "Inti",
  "ਸੂਰਜ",
  "Soare",
  "Òòrùn",
  "Matahari",
];

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

let clouds = [];
let cloudWords = [
  "Cloud",
  "Nube",
  "Nuage",
  "Nuvola",
  "Wolke",
  "Nuvem",
  "Wolk",
  "Moln",
  "Skye",
  "Sky",
  "Облако",
  "Chmura",
  "Mrak",
  "Σύννεφο",
  "Nubes",
  "Scamall",
  "Cwmwl",
  "云",
  "雲",
  "구름",
  "Bulut",
  "Awan",
  "Pilvi",
  "Felhő",
  "Wingu",
  "Mây",
  "เมฆ",
  "Ulap",
  "Үүл",
  "Puyu",
  "ਬੱਦਲ",
  "Nor",
  "Awọsanma",
  "Awan",
];

let rains = [];
let rainWords = [
  "Rain",
  "Lluvia",
  "Pluie",
  "Pioggia",
  "Regen",
  "Chuva",
  "Regen",
  "Regn",
  "Regn",
  "Regn",
  "До́ждь",
  "Deszcz",
  "Déšť",
  "Βροχή",
  "Pluvia",
  "Báisteach",
  "Glaw",
  "बारिश",
  "باران",
  "雨",
  "雨",
  "비",
  "Yağmur",
  "مطر",
  "Hujan",
  "Sade",
  "Eső",
  "Mvua",
  "Mưa",
  "ฝน",
  "Ulan",
  "மழை",
  "Бороо",
  "Para",
  "ਮੀਂਹ",
  "Ploaie",
  "Òjò",
  "Hujan",
];

let houses = [];
let houseWords = [
  "House",
  "Casa",
  "Maison",
  "Casa",
  "Haus",
  "Casa",
  "Huis",
  "Hus",
  "Hus",
  "Hus",
  "До́м",
  "Dom",
  "Dům",
  "Σπίτι",
  "Domus",
  "Teach",
  "Tŷ",
  "房子",
  "家",
  "집",
  "Ev",
  "Rumah",
  "Talo",
  "Ház",
  "Nyumba",
  "Nhà",
  "บ้าน",
  "Bahay",
  "Гэр",
  "Wasi",
  "ਘਰ",
  "Casă",
  "Ilé",
  "Rumah",
];
// let houseXs = [];
// let houseYs = []; //I want a grid
let houseXYs = [];

let smokes = [];

//sounds
let leafSound;
let riverSound; //Stream, Water, C.wav by InspectorJ -- https://freesound.org/s/339324/ -- License: Attribution 4.0
let rainSound;
let houseSound;
//2024.02.01 Sauteing food by TeamEnFil -- https://freesound.org/s/721390/ -- License: Attribution 4.0
let sunSound;
let selected;
let lang;

function preload() {
  mapImg = loadImage("assets/map-edit4.png");
  sunImg = loadImage("assets/mapSun-edit2.png");
  earthImg = loadImage("assets/earthMap-800.png");

  //sound
  leafSound = loadSound("assets/457318__stek59__autumn-wind-and-dry-leaves.wav");
  riverSound = loadSound("assets/339324_inspectorj_stream-water-c.mp3");
  rainSound = loadSound("assets/28283__acclivity__undertreeinrain.mp3");
  houseSound = loadSound("assets/721390_teamenfil_202402.mp3");
  sunSound = loadSound("assets/52740_eric5335_town-or-suburbs-amb-spring-day.mp3");

  leafSound.setVolume(0);
  riverSound.setVolume(0);
  rainSound.setVolume(0);
  houseSound.setVolume(0);
  sunSound.setVolume(0);
}

function setup() {
  createCanvas(800, 500); //want to rescale to full window width and height
  state = 1;
  textFont("Noto Sans");
  textStyle(NORMAL); //for font

  //INTRO
  for (let i = 0; i < earthN; i++) {
    //want to push more
    earths.push(new Earth(earthWords[i % earthWords.length]));
  }

  //only push 1 because only have 1 word showing at a time
  // if have more in loop, will all flash when go thorugh random words
  enters.push(new Enter("enter"));

  //SUN
  for (let i = 0; i < 25; i++) {
    suns.push(new Sun(sunWords[i % sunWords.length]));
  }

  //RIVER
  //hard coded number of water words
  for (let i = 0; i < 150; i++) {
    rivers.push(new River(riverWords[i % riverWords.length]));
  }

  //TREE
  for (let i = 0; i < 75; i++) {
    //want to push more
    trees.push(new Tree(treeWords[i % treeWords.length]));
  }

  //CLOUD
  for (let i = 0; i < 25; i++) {
    //want to push more
    clouds.push(new Cloud(cloudWords[i % cloudWords.length]));
  }

  //RAIN
  for (let i = 0; i < 20; i++) {
    rains.push(new Rain(rainWords[i % rainWords.length]));
  }

  //HOUSE GRID?
  for (let y = 45; y < 345; y = y + 16) {
    //rows
    for (let x = width + xOff; x < 1300 + xOff; x = x + 16) {
      let c = mapImg.get(x, y);
      if (
        (red(c) == 80 && green(c) == 33 && blue(c) == 174) ||
        (red(c) == 140 && green(c) == 82 && blue(c) == 255)
      ) {
        let pos = { x: x, y: y }; //google says can store coordinates as objects in array like this
        houseXYs.push(pos);
        //break;
      }
    }
  }
  //HOUSE
  for (let i = 0; i < 140; i++) {
    houses.push(new House(houseWords[i % houseWords.length]));
  }

  //SMOKE
  for (let i = 0; i < 30; i++) {
    smokes.push(new Smoke(houseWords[i % houseWords.length]));
  }
}

function draw() {
  background(0);

  if (state == 1) {
    //background(0);
    intro();
    enterClicked();
  } else if (state == 2) {

    push();
    translate(-xOff, 0);

    //SUN
    for (let i = 0; i < suns.length; i++) {
      suns[i].display();
      suns[i].move();
      suns[i].sound();
    }

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
    }

    //CLOUDS
    for (let i = 0; i < clouds.length; i++) {
      clouds[i].display();
      clouds[i].move();
    }

    //RAIN
    for (let i = 0; i < rains.length; i++) {
      rains[i].display();
      rains[i].move();
      rains[i].sound();
    }

    //HOUSE
    for (let i = 0; i < houses.length; i++) {
      houses[i].display();
      // houses[i].move(); //unlock
      houses[i].sound();
    }

    //SMOKE
    for (let i = 0; i < smokes.length; i++) {
      smokes[i].display();
      smokes[i].move();
    }

    for (let i = rains.length - 1; i >= 0; i--) {
      if (rains[i].dead == true) {
        rains.splice(i, 1);
      }
    }
    for (let i = smokes.length - 1; i >= 0; i--) {
      if (smokes[i].dead == true) {
        smokes.splice(i, 1);
      }
    }

    //SCROLL
    if (keyIsPressed) {
      scroll();
    }

    pop();
  } //END OF INSIDE STATE 2 
}


function intro() {
  for (let i = 0; i < earths.length; i++) {
    earths[i].display();
    earths[i].move();
  }
  earthRespawn();

  //title
  fill(255);
  textSize(50);
  text("Our wor ds!", width / 2, 75);
  if (frameCount % 60 > 20) {
    fill(0);
  } else {
    fill(0, 102, 19);
  }
  text("l", width / 2 + 65, 75); //blinking letter l

  for (let i = 0; i < enters.length; i++) {
    enters[i].display();
  }

}

class Earth {
  constructor(eText) {
    textAlign(CENTER);
    this.x = 0;
    this.y = 0;
    for (let n = 0; n < 75; n++) {
      //hard coded to 75?
      for (let tries = 0; tries < 100; tries++) {
        let x = random(0, width);
        let y = random(0, height);
        if (this.isOverEarth(x, y) == true) {
          this.x = x;
          this.y = y;
          break; // stop the loop right away
        }
      }
    }

    //this.y = random(400, height);
    this.eText = eText;
    this.size = 20;
    //color
    this.speedX = 0.5;
    this.overEarth = false;
  }

  display() {
    let d = dist(mouseX + xOff, mouseY, this.x, this.y);
    //console.log(mouseX, mouseY, xOff);
    if (d < 10) {
      this.size = 40;
    } else {
      this.size = 20;
    }

    let c = earthImg.get(this.x, this.y);
    if (blue(c) == 230) {
      fill(0, 164, 224);
    } else if (blue(c) == 19) {
      fill(0, 102, 19);
    }

    if (this.isOverEarth(this.x, this.y) == true) {
      textSize(this.size);
      text(this.eText, this.x, this.y);
    }
  }

  move() {
    let c = earthImg.get(this.x, this.y);
    if (blue(c) == 230 || blue(c) == 19) {
      this.overEarth = true;
    } else {
      this.overEarth = false;
    }
    this.x += this.speedX;
  }

  isOverEarth(x, y) {
    let c = earthImg.get(x, y);
    if (blue(c) == 230 || blue(c) == 19) {
      return true;
    } else {
      return false;
    }
  }
}

class Enter {
  constructor(enText) {
    textAlign(CENTER);
    this.enText = enText;
    this.size = 40;
    this.x = width / 2;
    this.y = 450;
  }

  display() {
    fill(255);
    textSize(this.size);
    if (mouseOverEnter() == true) {
      //for(let i = 0; i < enterWords.length; i++){
      if (frameCount % 20 == 19) {
        //console.log("frameCount test");
        //curText = enterWords[i % enterWords.length];
        curText = enterWords[int(random(enterWords.length))];
      }
      //}
    } else {
      curText = enterWords[0];
      this.hoverEnter = 0;
    }

    text(curText, this.x, this.y);
  }

  move() { }
}

function earthRespawn() {
  for (let i = earths.length - 1; i >= 0; i--) {
    if (earths[i].overEarth == false) {
      // console.log("not over earth");
      // console.log(earths[i].isOverEarth);
      earths.splice(i, 1);
    }
  }

  //console.log(earths.length);

  if (earths.length != earthN) {
    //console.log("earth length not 100");
    earths.push(new Earth(earthWords[int(random(earthWords.length))])); //earthWords[] only takes int not decimals
  }
}

function mouseOverEnter() {
  if (
    mouseX + xOff > 340 &&
    mouseX + xOff < 450 &&
    mouseY > 415 &&
    mouseY < 460
  ) {
    return true;
  } else {
    return false;
  }
}

function enterClicked() {
  if (mouseOverEnter() == true && mouseIsPressed == true) {
    state = 2;
  }
}

class Tree {
  constructor(tText) {
    this.x = 0;
    this.y = 0;
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
    let d = dist(mouseX + xOff, mouseY, this.x, this.y);
    if (d < 20 && blue(c) == 0 && green(c) == 255) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    let d = dist(mouseX + xOff, mouseY, this.x, this.y);
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
      if (millis() - this.startHover > 500) {
        //console.log("start falling");
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
        //switch
        this.hasRespawned = true;
        //console.log("new tree respawned");

        trees.push(new Tree(this.tText));
      }
    }
  }

  sound() {
    if (
      this.isOverTree(mouseX + xOff, mouseY) == true &&
      leafSound.isPlaying() == false
    ) {
      leafSound.loop(); //vs .play(); is there a way to lerp sound?
      leafSound.setVolume(1.0, 0.5);
    } else if (this.isOverTree(mouseX + xOff, mouseY) == false) {
      leafSound.setVolume(0, 0.2);
      if (leafSound.getVolume() <= 0.1) {
        leafSound.pause();
      }
    }
  }
}

class River {
  constructor(rText) {
    this.x = 0;
    this.y = 0;
    //teleporting method
    for (let n = 0; n < treeWords.length; n++) {
      //why was it at n < 50
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
    if (this.isOverWater(mouseX + xOff, mouseY) == true) {
      if (riverSound.isPlaying() == false) {
        riverSound.loop();
        riverSound.setVolume(1.0, 0.5);
      }
    } else {
      riverSound.setVolume(0, 0.2);

      if (riverSound.getVolume() <= 0.2) {
        //if mouse comes back too quickly, volumen still present, can't play right away
        riverSound.pause();
      }
    }
  }
}

class Sun {
  constructor(sText) {
    this.x = 0;
    this.y = 0;
    for (let n = 0; n < 75; n++) {
      //hard coded to 75?
      for (let tries = 0; tries < 100; tries++) {
        let x = random(0, 1200);
        let y = random(-100, 350);
        if (this.isOverLight(x, y) == true) {
          this.x = x;
          this.y = y;
          break; // stop the loop right away
        }
      }
    }

    let dy;
    let dx;
    if (this.x < 740 + xOff) {
      //left ray
      dy = 500 - 0; //top and bottom of rays (700, 0) (272, 500)
      dx = 275 - 700;
      this.angle = atan2(dy, dx) + PI;
    } else {
      dy = 500 - 0; //top and bottom of rays (760, 0) (810, 500)
      dx = 810 - 760;
      this.angle = atan2(dy, dx);
    }

    this.sText = sText;

    let sunSize = map(this.y, 0, height, 10, 30);
    this.size = sunSize;

  }

  display() {
    this.opacity = map(sin(frameCount / 30), -1, 1, 0, 100);

    let d = dist(mouseX + xOff, mouseY, this.x, this.y);
    if (d < 20) {
      this.opacity = 255;
    }
    textAlign(CENTER, CENTER);

    fill(color(255, 212, 0, this.opacity));
    textSize(this.size);
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    text(this.sText, 0, 0);
    pop();

    text("sun", 735, 10);
  }

  isOverLight(x, y) {
    let c = sunImg.get(x, y);
    if (red(c) == 255 && green(c) == 222) {
      return true;
    } else {
      return false;
    }
  }

  move() { }

  sound() {
    if (this.isOverLight(mouseX + xOff, mouseY) == true) {
      if (sunSound.isPlaying() == false) {
        sunSound.loop();
        sunSound.setVolume(1.0, 0.5);
      }
    } else {
      sunSound.setVolume(0, 0.2);

      if (sunSound.getVolume() <= 0.2) {
        //if mouse comes back too quickly, volumen still present, can't play right away
        sunSound.pause();
      }
    }
  }
}

class Cloud {
  constructor(cText) {
    this.x = 0;
    this.y = 0;
    //teleporting method
    for (let n = 0; n < cloudWords.length; n++) {
      //why was it at n < 50
      for (let tries = 0; tries < 100; tries++) {
        let x = random(0, width);
        let y = random(0, height);
        if (this.isOverCloud(x, y) == true) {
          this.x = x;
          this.y = y;
          break; // stop the loop right away
        }
      }
    }
    this.cText = cText;
    this.size = 20;
    this.col = color(212, 230, 248); //light bluey
    this.angle = 0;
  }

  display() {
    let d = dist(mouseX + xOff, mouseY, this.x, this.y);
    if (d < 30) {
      //this.col = color(181, 178, 170); //darker grey
      this.col = color(227, 190, 195); //pink!
    } else {
      //this.col = color(222, 220, 217); //light grey
      //this.col = color(253, 215, 195); //yellowy
      this.col = color(212, 230, 248); //light bluey
    }

    textAlign(CENTER, CENTER);
    let c = mapImg.get(this.x, this.y);
    fill(this.col);
    textSize(this.size);
    text(this.cText, this.x, this.y);
  }

  isOverCloud(x, y) {
    //having issues
    let c = mapImg.get(x, y);
    if (blue(c) == 0 && red(c) == 0 && green(c) == 0) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    this.x += map(sin(frameCount / 20), -10, 10, -2, 2); //made sin range bigger to make cloud move less
    this.y += map(sin(frameCount / 30), -10, 10, -1, 1);
  }
}

class Rain {
  constructor(raText) {
    this.x = 0;
    this.y = 0;
    //teleporting method
    for (let n = 0; n < 75; n++) {
      for (let tries = 0; tries < 100; tries++) {
        let x = random(0, width);
        let y = random(0, height);
        if (this.isInCloud(x, y) == true) {
          //arguments x y
          this.x = x;
          this.y = y;
          break; // stop the loop right away
        }
      }
    }
    this.raText = raText;
    this.size = random(10, 15);
    this.col = color(255);
    this.angle = 90;
    this.rand = random(10);
    this.startHover = 0;
    this.isFalling = false;
    this.ySpeed = random(1, 3);
    this.hasRespawned = false;
    this.dead = false;

    let c = mapImg.get(this.x, this.y);
    if (this.rand < 5) {
      this.col = color(120, 187, 255);
    } else {
      this.col = color(46, 150, 255);
    }
  }

  display() {
    if (this.y < 280 && this.y > 155) {
      textAlign(CENTER, CENTER);
      fill(this.col);
      textSize(this.size);
      push();
      translate(this.x, this.y);
      rotate(radians(this.angle));
      text(this.raText, 0, 0);
      pop();
    }
    // else if (this.y >= 300){
    //   this.falling = false;
    // }
  }

  move() {
    let d = dist(mouseX + xOff, mouseY, this.x, this.y);
    let c = mapImg.get(this.x, this.y);

    if (d < 50) {
      if (this.startHover == 0) {
        this.startHover = millis();
      }
      // startHover is guaranteed to be set here (and not 0)
      if (millis() - this.startHover > 100) {
        //console.log("start falling");
        this.isFalling = true;
        //this.respawn = true; //new function??
      }
    } else {
      this.startHover = 0;
    }

    if (this.isFalling == true) {
      if (this.y < 300) {
        this.y += this.ySpeed;
        this.size = map(sin(frameCount / 5), -1, 1, 10, 15);
      } else if (this.hasRespawned == false) {
        //switch
        this.hasRespawned = true;
        rains.push(new Rain(this.raText));
        this.dead = true;
      }
    }
  }

  isInCloud(x, y) {
    let c = mapImg.get(x, y); //arguments?
    if (blue(c) == 0 && red(c) == 0 && green(c) == 0) {
      return true;
    } else {
      return false;
    }
  }

  sound() {
    if (this.isInCloud(mouseX + xOff, mouseY) == true) {
      if (rainSound.isPlaying() == false) {
        rainSound.loop();
        rainSound.setVolume(1.0, 0.5);
      }
    } else {
      rainSound.setVolume(0, 0.5);

      if (rainSound.getVolume() <= 0.01) {
        //if mouse comes back too quickly, volume still present, can't play right away
        rainSound.pause();
      }
    }
  }
}

class House {
  constructor(hText) {
    this.x = 0;
    this.y = 0;
    //I need even numbers
    let index = int(random(houseXYs.length)); //wrap so no decimal
    this.x = houseXYs[index].x;
    this.y = houseXYs[index].y;
    if (houseXYs.length != 0) {
      houseXYs.splice(index, 1); //don't want house double up
    }

    this.hText = hText;
    this.size = 15;
    this.col = color(0);
    this.angle = 0;

    let c = mapImg.get(this.x, this.y); //DEBUGGING
    if (red(c) == 80) {
      this.col = color(179, 46, 5); //brick red
    } else if (red(c) == 140) {
      this.col = color(252, 167, 141); //light red
    }
  }

  display() {
    if (this.x < 800 + xOff) {
      textAlign(LEFT, CENTER);
    } else {
      textAlign(RIGHT, CENTER); //I can't get it to align the way I want it
    }
    fill(this.col);
    textSize(this.size);
    text(this.hText, this.x, this.y);
  }

  isOverHouse(x, y) {
    let c = mapImg.get(x, y);
    if (
      (red(c) == 80 && green(c) == 33 && blue(c) == 174) ||
      (red(c) == 140 && green(c) == 82 && blue(c) == 255)
    ) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    //smoke?
  }

  sound() {
    if (this.isOverHouse(mouseX + xOff, mouseY) == true) {
      if (houseSound.isPlaying() == false) {
        houseSound.loop();
        houseSound.setVolume(0.6, 0.5);
      }
    } else {
      houseSound.setVolume(0, 0.5);

      if (houseSound.getVolume() <= 0.01) {
        //if mouse comes back too quickly, volume still present, can't play right away
        houseSound.pause();
      }
    }
  }
}

class Smoke {
  constructor(smText) {
    //teleporting method
    for (let n = 0; n < 75; n++) {
      for (let tries = 0; tries < 100; tries++) {
        let x = random(0, 1200);
        let y = random(0, 500);
        if (this.isInChimney(x, y) == true) {
          //arguments x y
          this.x = x;
          this.y = y;
          break; // stop the loop right away
        }
      }
    }
    this.smText = smText;
    this.size = random(10, 15);
    this.rand = random(10);
    this.startHover = 0;
    this.isRising = false;
    this.ySpeed = random(-1, -0.5);
    //this.xSpeed = sin(frameCount / 10) ; //all moves...
    //this.xSpeed = random(-1, 1);
    this.hasRespawned = false;
    this.dead = false;
    this.opacity = 200;
    this.col = color(255, this.opacity);
  }

  display() {
    if (this.y < 60) {
      fill(this.col);
      textAlign(CENTER, CENTER);

      textSize(this.size);
      text(this.smText, this.x, this.y);
    }
  }

  move() {
    let d = dist(mouseX + xOff, mouseY, this.x, this.y);
    let c = mapImg.get(this.x, this.y);

    if (d < 50) {
      if (this.startHover == 0) {
        this.startHover = millis();
        //console.log("mouse over chimney");
      }
      // startHover is guaranteed to be set here (and not 0)
      if (millis() - this.startHover > 100) {
        //console.log("start falling");
        this.isRising = true;
      }
    } else {
      this.startHover = 0;
    }

    if (this.isRising == true) {
      if (this.y > 0) {
        this.y += this.ySpeed;
      } else if (this.hasRespawned == false) {
        //switch
        this.hasRespawned = true;
        smokes.push(new Smoke(this.smText));
        this.dead = true;
      }
    }
  }

  isInChimney(x, y) {
    let c = mapImg.get(x, y); //arguments?
    if (red(c) == 80 && x > 1040 && x < 1100) {
      return true;
    } else {
      return false;
    }
  }
}

function scroll() {
  if (keyCode == LEFT_ARROW) {
    xOff -= 5;
  } else if (keyCode == RIGHT_ARROW) {
    xOff += 5;
  }

  if (xOff >= 1200) {
    //1200
    xOff = -800; //-200
  } else if (xOff <= -800) {
    xOff = 1200;
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
