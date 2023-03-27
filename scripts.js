//3456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H
var money = 0
var power = 1

//increase the amount of moneywhen clicked
function buttonPressed(){
    console.log("button pressed");
    money += power;

    document.getElementById("money").innerHTML = document.getElementById("money").innerHTML.substring(0, 1) + money;
}

function upgradePower(){
    power++;
}