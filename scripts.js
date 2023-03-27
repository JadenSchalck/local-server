//3456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H
var money = 0
var power = 1

//increase the amount of moneywhen clicked
function buttonPressed(){
    console.log("button pressed");
    money += power;
    var text = document.getElementById("money").innerHTML;
    console.log(document.getElementById("money").innerHTML);
    console.log(text.substring(0, 9));
    console.log(text.substring(9 + money.toString().length));
    text = text.substring(0, 9) + 
        (money + power) + text.substring(9 + money.toString().length);
}

function upgradePower(){
    power++;
}