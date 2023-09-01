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
    saveCode = createSaveCode();
    updateSettings();
}

//cookie save lasts for 1 year
function saveAsCookie() {
    const ONE_YEAR = 31_556_952_000;//ms
    document.cookie = "JSON=" + createSaveCode() +" ;expires=" + new Date(Date.now() + ONE_YEAR).toUTCString();
}

//autosave
function autoSave() {
    if (document.getElementById("autoSaveCheckbox").checked) {
        saveAsCookie();
    }
}
//run func every 10s
setInterval(autoSave, 10000);

//helper
function createSaveCode() {
    return JSON.stringify({
        date: Date.now(), money: money, 
        power: {power: power, powerCost: powerCost}, 
        cats: {cats: cats, catCost: catCost}, 
        gorilla: {gorillaSpinMult: gorillaSpinMult, frictionPerSecond: frictionPerSecond, reduceFrictionCost: reduceFrictionCost}
    });
}

//load
function load(save) {
    if (save === undefined) {
        saveCode = JSON.parse(document.getElementById("loadField").value);
    } else {
        saveCode = save;
    }
    
    if (saveCode["date"] >= 0) {
        var timeElapsed = Date.now() - saveCode["date"];//might be used in the future
    }
    if (saveCode["money"] >= 0) {money = saveCode["money"];}

    if (saveCode["power"]["power"] >= 0) {power = saveCode["power"]["power"];}
    if (saveCode["power"]["powerCost"] >= 0) {powerCost = saveCode["power"]["powerCost"];}

    if (saveCode["cats"]["cats"] >= 0) {cats = saveCode["cats"]["cats"];}
    if (saveCode["cats"]["catCost"] >= 0) {catCost = saveCode["cats"]["catCost"];}

    if (saveCode["gorilla"]["gorillaSpinMult"] >= 0) {gorillaSpinMult = saveCode["gorilla"]["gorillaSpinMult"];}
    if (saveCode["gorilla"]["frictionPerSecond"] >= 0) {frictionPerSecond = saveCode["gorilla"]["frictionPerSecond"];}
    if (saveCode["gorilla"]["reduceFrictionCost"] >= 0) {reduceFrictionCost = saveCode["gorilla"]["reduceFrictionCost"];}
    updateAll();
}

function loadFromCookie() {
    load(JSON.parse(document.cookie.split("=")[3]));
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
    updateGorillaVideo();
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