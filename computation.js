//3456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H

//hide
function hide(id) {
    document.getElementById(id).style.display = "none";
}

//settings
function settingsToggle() {
    var settingsMenu = document.getElementById("settingsBox");
    console.log("Settings pressed");
    if (settingsMenu.style.display === "none") {
        settingsMenu.style.display = "block";
      } else {
        settingsMenu.style.display = "none";
      }
}

//Saves are just JSON
var saveCode = "";
function save() {
    saveCode = JSON.stringify({date: Date.now(), money: money, power: {power: power, powerCost: powerCost}, cats: {cats: cats, catCost: catCost}});
    updateSettings();
}

function load() {
    saveCode = JSON.parse(document.getElementById("loadField").value);
    var timeElapsed = Date.now() - saveCode["date"];//might be used in the future
    money = saveCode["money"];
    power = saveCode["power"]["power"];
    powerCost = saveCode["power"]["powerCost"];
    cats = saveCode["cats"]["cats"];
    catCost = saveCode["cats"]["catCost"];
    updateAll();
}

//money
var money = 0;

//power
var power = 1;
var powerCost = 10;
var powerCostScaling = 5;

//increase the amount of money when clicked
function buttonPressed() {
    console.log("Main button pressed");
    
    money += power;
    updateMoney();
}

//upgrade power
function upgradePower() {
    console.log("Power upgrade button pressed");

    if (money >= powerCost) {
        money -= powerCost;
        powerCost += powerCostScaling;
        power++;
        updateMoney();
        updatePower();
    } else {
        alert("That's too expenive!");
    }
}

//cats
var cats = 0;
var catCost = 100;

//make cat price fluctuate. called once html is loaded.
function changeCatPrice() {
    //change cat cost based on whaen a cat was last bought
    //TODO
    catCost += (Math.random() * 5 - 2.5);
    catCost = Math.round(catCost * 100) / 100;

    if (catCost > 1000) {
        catCost = 1000;
    } else if (catCost < 0) {
        catCost = 0;
    }
    updateCatPrice();
}
//run func every 100 ms
setInterval(changeCatPrice, 100);

function buyCat() {
    if (money >= catCost) {
        money -= catCost;
        cats++;
        updateMoney();
        updateCats();
    } else {
        alert("That's too expenive!");
    }
}

function sellCat() {
    if (cats > 0) {
        cats--;
        money += catCost;
        updateMoney();
        updateCats();
    } else {
        alert("You don't have any cats to sell!");
    }
}

//monke

var gorillaSpinMult = 0;
var frictionPerSecond = .9;
var reduceFrictionCost = 50;
function spinGorilla() {
    gorillaSpinMult++;
    updateRotationSpeed();
}

function reduceFriction(){
    if (money >= reduceFrictionCost) {
        money -= reduceFrictionCost;
        frictionPerSecond *= .9;
        reduceFrictionCost += 50;

        if (frictionPerSecond <= 0) {
            frictionPerSecond = Number.MIN_VALUE;
        }

        updateReduceFrictionButton();
        updateFrictionPerSecond();
    } else {
        alert("Too expensive!");
    }
}

function changeGorillaSpinMult() {
    money += gorillaSpinMult;

    if (gorillaSpinMult > 0) {
        gorillaSpinMult *= 1 - frictionPerSecond;
    }
    
    if (gorillaSpinMult <= .1) {
        gorillaSpinMult = 0;
    }

    //update relevant variables
    updateGorillaVideo();
    updateMoney();
    updateRotationSpeed();
}
setInterval(changeGorillaSpinMult, 1000);