//3456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H

var money = 0;
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