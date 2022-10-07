// rooms
class Room {
  constructor(name, description, character, roomItem) {
    this._name = name;
    this._description = "";
    this._character = "";
    this._roomItem = "";
    this._linkedRoom = {};
  }
  key(direction) {
    return this._linkedRoom[direction] !== undefined;
  }
  toNextZone(direction) {
    if (direction in this._linkedRoom) {
      return this._linkedRoom[direction];
    } else {
      return this;
    }
  }
  inforamtion() {
    return "" + this._name + "" + this._description;
  }
  linkRoom(direction, space) {
    this._linkedRoom[direction] = space;
  }
}
// ROOMS DESCRIPTIONS
let LandingZone = new Room(
  "<h2>Landing Bay</h2><br><h4>BepBop...We are here Padawon!<h4><br>"
);
LandingZone._description =
  "<h4>In the bay area big bustle,great commotion and the troops were marching in haste.</h4>";
let Hall = new Room(
  "<h2>The Hall</h2><br><h4>...a narrow hall and iron walls with three exits he had appeared before us.</4><br>"
);
Hall._description = "<h4>Were to from here...<h4>";
let DarkRoom = new Room("<h2>Darkroom</h2><br>");
DarkRoom._description =
  "<h4>A darkness that cuts into your brain. I need a light to move forward.</h4>";
let PrisonRoom = new Room("<h2>Prisonroom</h2><br>");
PrisonRoom._description =
  "<h4>Lahru is being held captive here somewhere.</h4>";
let StormTroopersRoom = new Room("<h2>Storm Troopers fourth</h2>");
StormTroopersRoom._description = "";
let KeyRoom = new Room("<h2>Armory</h2><br>");
KeyRoom._description = "<h4>A room with a key hanging from a hanger.</h4>";
let LightSaberRoom = new Room("<h2>Lightsaber Room</h2>");
LightSaberRoom._description =
  "<h4>In the middle of the room lies the lightsaber.</h4>";
let VaderRoom = new Room("<h2>Vader room</h2>");
VaderRoom._description =
  "<h4>Dark room with red lights and an overwhelming silence.</h4>";

// LINKED ROOMS
LandingZone.linkRoom("up", Hall);
Hall.linkRoom("left", KeyRoom);
Hall.linkRoom("right", DarkRoom);
Hall.linkRoom("up", StormTroopersRoom);
DarkRoom.linkRoom("up", PrisonRoom);
PrisonRoom.linkRoom("left", StormTroopersRoom);
StormTroopersRoom.linkRoom("up", VaderRoom);
VaderRoom.linkRoom("down", StormTroopersRoom);
StormTroopersRoom.linkRoom("down", Hall);
Hall.linkRoom("down", LandingZone);
KeyRoom.linkRoom("up", LightSaberRoom);
KeyRoom.linkRoom("right", Hall);
LightSaberRoom.linkRoom("down", KeyRoom);
PrisonRoom.linkRoom("down", DarkRoom);
StormTroopersRoom.linkRoom("right", PrisonRoom);
DarkRoom.linkRoom("left", Hall);

// NAVIGATION
function displayAreaInfo(Lev) {
  document.getElementById("levels").innerHTML = Lev.inforamtion();
  let up = document.getElementById("up");
  let down = document.getElementById("down");
  let left = document.getElementById("left");
  let right = document.getElementById("right");

  if (Lev.key("up")) {
    up.style.display = "block";
  } else {
    up.style.display = "none";
  }

  if (Lev.key("left")) {
    left.style.display = "block";
  } else {
    left.style.display = "none";
  }

  if (Lev.key("down")) {
    down.style.display = "block";
  } else {
    down.style.display = "none";
  }

  if (Lev.key("right")) {
    right.style.display = "block";
  } else {
    right.style.display = "none";
  }
}

// LETS MOVE FROM ROOM TO ROOM
let levelArea = LandingZone;
function moveTo(direction) {
  let nextLev = levelArea.toNextZone(direction);

  displayAreaInfo(nextLev);
  levelArea = nextLev;
}

function moveUp() {
  moveTo("up");
}

function moveLeft() {
  moveTo("left");
}

function moveRight() {
  moveTo("right");
}
function moveDown() {
  moveTo("down");
}
// start
function startGame() {
  document.getElementById("buttonStart").style.display = "none";
  document.getElementById("button").style.display = "block";
  displayAreaInfo(levelArea);
}

// ITEMS
let lightsaber = new Item("it can be use in many ways.");
let keycard = new Item("A keycard");
class Item {
  constructor(name, description) {
    this._name = name;
    this._description = "";
  }
}

KeyRoom.roomItem = lightsaber;

// CHARACTERS
class Character {
  constructor(name) {
    this._name = name;
  }
}

let Boy = new Character("Padawan");
let Troopers = new Character("StormTroopers");
let Boss = new Character("Vader");
let Prisionar = new Character("Lahru");