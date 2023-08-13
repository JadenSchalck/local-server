function updateAll(){
    //updateMainButton();
    updateMoney();
    updatePower();
    updateCatPrice();
    updateCats();
}

//unused
function updateMainButton(){
    document.getElementById("mainButton").value = document.getElementById("mainButton").value.substring(0, 10) + power.toFixed(2);
}

function updateMoney(){
    document.getElementById("money").innerHTML = document.getElementById("money").innerHTML.substring(0, 1) + money.toFixed(2);
}

function updatePower(){
    document.getElementById("mainButton").value = document.getElementById("mainButton").value.substring(0, 10) + power.toFixed(2);
    document.getElementById("clickPower").value = document.getElementById("clickPower").value.substring(0, 40) + powerCost;
}

function updateCatPrice(){
    //console.log(document.getElementById("catsPrice").innerHTML);
    document.getElementById("catsPrice").innerHTML = 
    document.getElementById("catsPrice").innerHTML.substring(0, 16) + catCost;
}

function updateCats(){
    document.getElementById("catsAmount").innerHTML = document.getElementById("catsAmount").innerHTML.substring(0, 11) + cats;
}