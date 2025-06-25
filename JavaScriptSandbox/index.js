class Upgrade {
  constructor(name, description, moneyCost, moreAxePowerValue) {
    this.name = name;
    this.description = description;
    this.moneyCost = moneyCost;
    this.moreAxePowerValue = moreAxePowerValue;
  }
}

let woodCollected = 0;

let rocksCollected = 0;

let money = 0;

let axePower = 1;

let upgradeLevel = -1;

let upgrades = null;
function GenerateUpgrades() {
  var axeUpgrade1;
  var axeUpgrade2;
  var axeUpgrade3;

  if (upgradeLevel === 0) {
    axeUpgrade1 = new Upgrade(
      "Axe Upgrade I",
      "It upgrades your axe power by 1",
      20,
      1
    );
    axeUpgrade2 = new Upgrade(
      "Axe Upgrade II",
      "It upgrades your axe power by 2",
      40,
      2
    );
    axeUpgrade3 = new Upgrade(
      "Axe Upgrade III",
      "It upgrades your axe power by 4",
      160,
      4
    );
  } else if (upgradeLevel === 1) {
    axeUpgrade1 = new Upgrade(
      "Axe Upgrade IV",
      "It upgrades your axe power by 6",
      250,
      1
    );
    axeUpgrade2 = new Upgrade(
      "Axe Upgrade V",
      "It upgrades your axe power by 10",
      410,
      2
    );
    axeUpgrade3 = new Upgrade(
      "Axe Upgrade VI",
      "It upgrades your axe power by 15",
      560,
      4
    );
  }

  let axeArray = [axeUpgrade1, axeUpgrade2, axeUpgrade3];

  return axeArray;
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
    upgradeDescr.textContent = element.moneyCost;

    let upgradeButton = document.createElement("button");
    upgradeButton.className = "upgradeButton";
    upgradeButton.value = element.moreAxePowerValue + " " + element.moneyCost;
    upgradeButton.onclick = BuyUpgrade;
    upgradeButton.textContent = "Buy";

    upgradeDiv.appendChild(upgradeTitle);
    upgradeDiv.appendChild(upgradeDescr);
    upgradeDiv.appendChild(upgradeButton);

    document.getElementById("upgradeContainer").appendChild(upgradeDiv);
  });
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

  document.getElementById("header").style.display = "flex";

  document.getElementById("mainMenu").style.display = "none";

  let rows = 10;
  let columns = 25;

  let map = new Array(rows);

  for (let i = 0; i < map.length; i++) {
    map[i] = new Array(columns);
  }

  let matrixContainer = document.getElementById("matrixContainer");

  for (let i = 0; i < map.length; i++) {
    let rowContainer = document.createElement("div");
    for (let j = 0; j < map[i].length; j++) {
      map[i][j] = Math.floor(Math.random() * (15 - 1) + 1);

      let imageContent = document.createElement("img");

      if (map[i][j] % 2 === 0 && map[i][j] != 4) {
        imageContent.src = "images/tree.png";
        imageContent.name = "tree";

        let damage = Math.floor(Math.random() * (6 - 3) + 3);

        imageContent.style.width = 4 + "rem";
        imageContent.style.height = 4 + "rem";

        imageContent.id = damage;
        imageContent.className = damage;
        imageContent.onclick = TreeBreak;
      } else if (map[i][j] === 3) {
        imageContent.src = "images/rock.png";
        imageContent.name = "rock";

        let damage = Math.floor(Math.random() * (10 - 4) + 4);

        imageContent.style.width = 3 + "rem";
        imageContent.style.height = 3 + "rem";

        imageContent.id = damage;
        imageContent.className = damage;
        imageContent.onclick = RockBreak;
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

  treeDamage -= axePower;
  if (treeDamage > 0) {
    event.target.id = treeDamage;
  } else {
    event.target.style.visibility = "hidden";
    woodCollected += Number(event.target.className);
    document.getElementById("woodCount").textContent = "Wood: " + woodCollected;
  }
}

function RockBreak() {
  let rockBreakDamage = Number(event.target.id);

  rockBreakDamage -= axePower;
  if (rockBreakDamage > 0) {
    event.target.id = rockBreakDamage;
  } else {
    event.target.style.visibility = "hidden";
    rocksCollected += Number(event.target.className);
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

  if (money >= upgradeValue[1]) {
    axePower += Number(upgradeValue[0]);
    money -= upgradeValue[1];
    document.getElementById("moneyCount").textContent = "Money: " + money;

    var foundUpgrade = upgrades.find(
      (x) => x.name == event.target.parentNode.name
    );
    console.log("Upgrades: " + upgrades);
    console.log("found Upgrade: " + foundUpgrade);
    if (foundUpgrade != null) {
      upgrades.splice(upgrades.indexOf(foundUpgrade), 1);
      
    }

    event.target.parentNode.style.display = "none";
  }
}
