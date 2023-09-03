function updateAll(){
    //updateSettings();
    //updateMainButton();
    updateMoney();
    updatePower();

    updateCatPrice();
    updateCats();

    updateFrictionPerSecond();
    updateRotationSpeed();
    updateReduceFrictionButton();
    updateGorillaVideo();
}

//unused
function updateSettings() {
    document.getElementById("saveCodeOutput").innerHTML = saveCode;
    console.log(saveCode);
}

//unused
function updateMainButton() {
    document.getElementById("mainButton").value = document.getElementById("mainButton").value.substring(0, 11) + power.toFixed(2);
}


function updateMoney() {
    document.getElementById("money").innerHTML = document.getElementById("money").innerHTML.substring(0, 1) + money.toFixed(2);
}

function updatePower() {
    document.getElementById("mainButton").value = document.getElementById("mainButton").value.substring(0, 11) + power.toFixed(2);
    document.getElementById("clickPower").value = document.getElementById("clickPower").value.substring(0, 40) + powerCost;
}


//cats
function updateCatPrice() {
    //console.log(document.getElementById("catsPrice").innerHTML);
    document.getElementById("catsPrice").innerHTML = 
    document.getElementById("catsPrice").innerHTML.substring(0, 16) + catCost;
}

function updateCats() {
    document.getElementById("catsAmount").innerHTML = document.getElementById("catsAmount").innerHTML.substring(0, 11) + cats;
}


//gorilla
function updateFrictionPerSecond() {
    document.getElementById("frictionPerSecond").innerHTML = document.getElementById("frictionPerSecond").innerHTML.substring(0, 17) + frictionPerSecond;
}

function updateRotationSpeed() {
    document.getElementById("rotationSpeed").innerHTML = document.getElementById("rotationSpeed").innerHTML.substring(0, 16) + gorillaSpinMult.toFixed(2);
}

function updateReduceFrictionButton() {
    document.getElementById("reduceFrictionButton").value = document.getElementById("reduceFrictionButton").value.substring(0, 25) + reduceFrictionCost;
}

function updateGorillaVideo() {
    //console.log(gorillaSpinMult);
    document.querySelector("video").playbackRate = gorillaSpinMult;
}