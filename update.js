function updateAll(){
    updateMoney();
    updatePower();
}

function updateMoney(){
    document.getElementById("money").innerHTML = document.getElementById("money").innerHTML.substring(0, 1) + money;
}

function updatePower(){
    document.getElementById("clickPower").value = document.getElementById("clickPower").value.substring(0, 40) + powerCost;
}