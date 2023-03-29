//3456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H
//money
var money = 0;

//power
var power = 1;
var powerCost = 10;
var powerCostScaling = 5;

//increase the amount of money when clicked
function buttonPressed(){
    console.log("Main button pressed");
    
    money += power;
    updateMoney();
}

//upgrade power
function upgradePower(){
    console.log("Power upgrade button pressed");

    if (money >= powerCost){
        money -= powerCost;
        powerCost += powerCostScaling;
        power++;
        updateMoney();
        updatePower();
    }else{
        alert("That's too expenive!");
    }
}

//cats
var cats = 0
var catCost = 100

//make cat price fluctuate. called once html is loaded.
function changeCatPrice(){
    console.log("Price is changing.")
    catCost += Math.random() - .5;
    catCost = Math.round(catCost * 100) / 100;

    if (catCost > 1000){
        catCost = 1000;
    }else if (catCost < 0){
        catCost = 0;
    }        updateCatPrice();
}
setInterval(changeCatPrice, 1000);

function buyCat(){
    if (money >= catCost){
        money -= catCost;
        cats++;
        updateMoney();
        updateCats();
    }else{
        alert("That's too expenive!");
    }
}

function sellCat(){
    if (cats > 0){
        cats--;
        money += catCost;
        updateMoney();
        updateCats();
    }else{
        alert("You don't have any cats to sell!");
    }
}