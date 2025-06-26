class Upgrade {
  constructor(
    name,
    description,
    moneyCost,
    moreAxePowerValue,
    morePickaxePowerValue
  ) {
    this.name = name;
    this.description = description;
    this.moneyCost = moneyCost;
    this.moreAxePowerValue = moreAxePowerValue;
    this.morePickaxePowerValue = morePickaxePowerValue;
  }
}

let mainMenuThemeAudio = new Audio("Audio/MainSong.mp3");
mainMenuThemeAudio.loop = true;
mainMenuThemeAudio.volume = 0.5;

let ambianceAudio = new Audio("Audio/ambience.mp3");
ambianceAudio.loop = true;
ambianceAudio.volume = 0.3;

let woodCollected = 0;

let woodChopAudio = new Audio("Audio/woodChop.mp3");

let rocksCollected = 0;

let rockMineAudio = new Audio("Audio/rockMine.wav");

let money = 0;

let axePower = 1;

let pickaxePower = 1;

let upgradeLevel = -1;

let upgrades = null;

function GenerateUpgrades() {
  var upgrade1;
  var upgrade2;
  var upgrade3;

  if (upgradeLevel === 0) {
    upgrade1 = new Upgrade(
      "Axe Upgrade I",
      "It upgrades your axe power by 1",
      40,
      1,
      0
    );
    upgrade2 = new Upgrade(
      "Axe Upgrade II",
      "It upgrades your axe power by 2",
      60,
      2,
      0
    );
    upgrade3 = new Upgrade(
      "Axe Upgrade III",
      "It upgrades your axe power by 4",
      320,
      4,
      0
    );
  } else if (upgradeLevel === 1) {
    upgrade1 = new Upgrade(
      "Pickaxe Upgrade I",
      "It upgrades your pickaxe power by 1",
      500,
      0,
      1
    );
    upgrade2 = new Upgrade(
      "Pickaxe Upgrade II",
      "It upgrades your pickaxe power by 2",
      820,
      0,
      2
    );
    upgrade3 = new Upgrade(
      "Pickaxe Upgrade III",
      "It upgrades your pickaxe power by 2",
      1120,
      0,
      4
    );
  }

  let upgradeArray = [upgrade1, upgrade2, upgrade3];

  return upgradeArray;
}

function ShowUpgrades(axeArray) {
  axeArray.forEach((element) => {
    let upgradeDiv = document.createElement("div");
    upgradeDiv.className = "upgrade";
    upgradeDiv.setAttribute("name", element.name);

    let upgradeTitle = document.createElement("p");
    upgradeTitle.className = "upgradeTitle";
    upgradeTitle.textContent = element.name;

    let upgradeDescr = document.createElement("p");
    upgradeDescr.className = "upgradeDescr";
    upgradeDescr.textContent = element.description;

    let moneyCost = document.createElement("p");
    upgradeDescr.className = "moneyCostText";
    upgradeDescr.textContent = "Cost: " + element.moneyCost;

    let upgradeButton = document.createElement("button");
    upgradeButton.className = "upgradeButton";
    upgradeButton.value =
      element.moreAxePowerValue +
      " " +
      element.morePickaxePowerValue +
      " " +
      element.moneyCost;
    upgradeButton.onclick = BuyUpgrade;
    upgradeButton.textContent = "Buy";

    upgradeDiv.appendChild(upgradeTitle);
    upgradeDiv.appendChild(upgradeDescr);
    upgradeDiv.appendChild(upgradeButton);

    document.getElementById("upgradeContainer").appendChild(upgradeDiv);
  });
}

function SellChecker() {
  let sellButton = document.getElementById("sellButton");

  if (woodCollected > 0 || rocksCollected > 0) {
    sellButton.style.backgroundColor = "rgba(43, 255, 0, 0.418)";
  } else {
    sellButton.style.backgroundColor = "rgba(255, 0, 0, 0.418)";
  }
}

function CheckForUpgrades() {
  if (upgrades === null) {
    upgradeLevel++;
    console.log(upgradeLevel);
    upgrades = GenerateUpgrades();
    ShowUpgrades(upgrades);
  } else if (upgrades.length <= 0) {
    upgradeLevel++;
    console.log(upgradeLevel);
    upgrades = GenerateUpgrades();
    ShowUpgrades(upgrades);
  }
  console.log(upgrades.length);
}

function GameStart() {
  setInterval(CheckForUpgrades, 100);
  setInterval(SellChecker, 100);

  mainMenuThemeAudio.play();
  ambianceAudio.play();

  document.getElementById("header").style.display = "flex";

  document.getElementById("mainMenu").style.display = "none";

  GenerateMap();
}

function GenerateMap() {
  let rows = 10;
  let columns = 25;

  let map = new Array(rows);

  for (let i = 0; i < map.length; i++) {
    map[i] = new Array(columns);
  }

  let matrixContainer = document.getElementById("matrixContainer");

  matrixContainer.innerHTML = "";

  for (let i = 0; i < map.length; i++) {
    let rowContainer = document.createElement("div");
    for (let j = 0; j < map[i].length; j++) {
      map[i][j] = Math.floor(Math.random() * (15 - 1) + 1);

      let imageContent = document.createElement("img");

      if (map[i][j] % 2 === 0 && map[i][j] != 4) {
        imageContent.src = "images/tree.png";
        imageContent.name = "tree";

        let damage = Math.floor(Math.random() * (15 - 5) + 5);

        imageContent.style.width = 4 + "rem";
        imageContent.style.height = 4 + "rem";

        imageContent.id = damage;
        imageContent.className = damage;
        imageContent.onclick = TreeBreak;
      } else if (map[i][j] === 3) {
        imageContent.src = "images/rock.png";
        imageContent.name = "rock";

        let damage = Math.floor(Math.random() * (20 - 10) + 10);

        imageContent.style.width = 3 + "rem";
        imageContent.style.height = 3 + "rem";

        imageContent.id = damage;
        imageContent.className = damage;
        imageContent.onclick = RockBreak;
      } else if (13 % map[i][j] === 6) {
        imageContent.src = "images/water.png";

        imageContent.style.width = 4 + "rem";
        imageContent.style.height = 4 + "rem";
      } else if (map[i][j] === 4) {
        imageContent.src = "images/flower.png";
        imageContent.name = "flower";

        imageContent.style.width = 3 + "rem";
        imageContent.style.height = 3 + "rem";
      } else {
        imageContent.src = "images/images.jpg";
        imageContent.style.width = "4rem";
        imageContent.style.height = "4rem";
      }

      rowContainer.appendChild(imageContent);
    }
    matrixContainer.appendChild(rowContainer);
  }
}

function TreeBreak() {
  let treeDamage = Number(event.target.id);

  woodChopAudio.play();
  treeDamage -= axePower;
  if (treeDamage > 0) {
    event.target.id = treeDamage;
  } else {
    event.target.style.visibility = "hidden";
    woodCollected += Math.floor(Number(event.target.className) / 2);
    document.getElementById("woodCount").textContent = "Wood: " + woodCollected;
  }
}

function RockBreak() {
  let rockBreakDamage = Number(event.target.id);

  rockMineAudio.play();
  rockBreakDamage -= pickaxePower;
  if (rockBreakDamage > 0) {
    event.target.id = rockBreakDamage;
  } else {
    event.target.style.visibility = "hidden";
    rocksCollected += Math.floor(Number(event.target.className) / 2);
    document.getElementById("rockCount").textContent =
      "Rocks: " + rocksCollected;
  }
}

function Sell() {
  money += woodCollected * 2;
  money += rocksCollected * 2;
  document.getElementById("moneyCount").textContent = "Money: " + money;
  woodCollected = 0;
  rocksCollected = 0;
  document.getElementById("woodCount").textContent = "Wood: " + woodCollected;
  document.getElementById("rockCount").textContent = "Rocks: " + rocksCollected;
}

function BuyUpgrade() {
  let upgradeValue = event.target.value.split(" ");

  if (money >= upgradeValue[2]) {
    axePower += Number(upgradeValue[0]);
    pickaxePower += Number(upgradeValue[1]);
    document.getElementById("axePower").textContent = "Axe Power: " + axePower;
    document.getElementById("pickaxePower").textContent =
      "Pickaxe Power: " + pickaxePower;

    money -= upgradeValue[2];
    document.getElementById("moneyCount").textContent = "Money: " + money;

    var foundUpgrade = upgrades.find(
      (x) => x.name == event.target.parentNode.getAttribute("name")
    );
    console.log("found Upgrade: " + foundUpgrade);
    if (foundUpgrade != null) {
      upgrades.splice(upgrades.indexOf(foundUpgrade), 1);
    }

    event.target.parentNode.style.display = "none";
  }
}
