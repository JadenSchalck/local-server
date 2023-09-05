function updateAll() {
    updateMoney();
    updateResult();
}

function updateMoney() {
    document.getElementById("money").innerHTML = document.getElementById("money").innerHTML.substring(0, 1) + money.toFixed(2);
}

function updateDealerHand() {
    document.getElementById("dealerHand").innerHTML = dealerHand.map((n) => cards[n]).join("");
}

function updatePlayerHand() {
    document.getElementById("playerHand").innerHTML = playerHand.map((n) => cards[n]).join("");
}

function updateResult(str) {
    document.getElementById("result").innerHTML = str;
}