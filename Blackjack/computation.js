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

//cookie save lasts for 1 year
function saveAsCookie() {
    const ONE_YEAR = 31_556_952_000;//ms
    document.cookie = "money=" + money + " ;expires=" + new Date(Date.now() + ONE_YEAR).toUTCString() + " ;domain=192.168.3.129";
}

function loadFromCookie() {
    console.log(document.cookie);
    money = parseFloat(document.cookie.split("money=")[1].split(" ")[0]);
}

var bet = 0;
var money = 0;

function submitBet() {
    bet = parseFloat(document.getElementById("betAmount").value);

    if (money < bet) {
        document.getElementById("connotAffordText").innerHTML = "Cannot afford that!";
    } else {
        document.getElementById("connotAffordText").innerHTML = "";
        updateResult("");
        money -= bet;
        updateMoney();
        startGame();
    }
}

//game stuff
var cards = [
    "🂡","🂢","🂣","🂤","🂥","🂦","🂧","🂨","🂩","🂪","🂫","🂭","🂮",
    "🂱","🂲","🂳","🂴","🂵","🂶","🂷","🂸","🂹","🂺","🂻","🂽","🂾",
    "🃁","🃂","🃃","🃄","🃅","🃆","🃇","🃈","🃉","🃊","🃋","🃍","🃎",
    "🃑","🃒","🃓","🃔","🃕","🃖","🃗","🃘","🃙","🃚","🃛","🃝","🃞"
];
var dealerHand = [];
var playerHand = [];
function startGame() {
    //deal cards
    dealerHand = [Math.round(Math.random() * 51), Math.round(Math.random() * 51)];
    playerHand = [Math.round(Math.random() * 51), Math.round(Math.random() * 51)];
    document.getElementById("dealerHand").innerHTML = "🂠" + cards[dealerHand[1]];
    document.getElementById("playerHand").innerHTML = cards[playerHand[0]] + cards[playerHand[1]];

    //if player blackjack
    if (playerHand[0] % 13 === 0 && playerHand[1] >= 9 && playerHand[1] % 13 >= 9 || playerHand[1] % 13 === 0 && playerHand[0] >= 9 && playerHand[0] % 13 >= 9) {
        //reveal dealer card
        document.getElementById("dealerHand").innerHTML = cards[dealerHand[0]] + cards[dealerHand[1]];
        
        //if dealer blackjack
        if (dealerHand[0] % 13 === 0 && dealerHand[0] >= 9 && dealerHand[1] % 13 >= 9 || dealerHand[1] % 13 === 0 && dealerHand[0] >= 9 && dealerHand[0] % 13 >= 9) {
            updateResult("Push");
            money += bet;
            updateMoney();
        } else {
            updateResult("Blackjack 2.5x");
            money += bet * 2.5;
            updateMoney();
        }
    }

    //if dealer blackjack
    if (dealerHand[0] % 13 === 0 && dealerHand[0] >= 9 && dealerHand[1] % 13 >= 9 || dealerHand[1] % 13 === 0 && dealerHand[0] >= 9 && dealerHand[0] % 13 >= 9) {
        //reveal dealer card
        document.getElementById("dealerHand").innerHTML = cards[dealerHand[0]] + cards[dealerHand[1]];
        updateResult("Dealer wins");
    }
}

function hit() {
    //only draw if not busted
    if (!isBusted(playerHand)) {
        //draw card
        playerHand[playerHand.length] = Math.round(Math.random() * 51);
        updatePlayerHand();

        //check for bust
        if (isBusted(playerHand)){
            updateResult("Player busts");
        }
    }
}

function stand() {
    //only stand if not busted
    if (!isBusted(playerHand)) {
        //reveal card
        document.getElementById("dealerHand").innerHTML = cards[dealerHand[0]] + cards[dealerHand[1]];

        //keep drawing until over 17
        while (handValue(dealerHand) < 17) {
            dealerHand[dealerHand.length] = Math.round(Math.random() * 51)
            updateDealerHand();
        }

        //if dealer busted
        if (isBusted(dealerHand)) {
            updateResult("Dealer busts");
            money += bet * 2;
            updateMoney();
        }

        //check who won
        //if player wins
        else if (handValue(playerHand) > handValue(dealerHand)) {
            updateResult("You win");
            money += bet * 2;
            updateMoney();
        }

        //if draw
        else if (handValue(playerHand) === handValue(dealerHand)) {
            updateResult("Push");
            money += bet;
            updateMoney();
        }

        //if lose
        else if (handValue(playerHand) < handValue(dealerHand)) {
            updateResult("Dealer wins");
        }
    }
}

//helper fuctions
function handValue(hand) {
    //sum with low aces
    hand = hand.map((n) => (n % 13 >= 9) ? 10 : (n % 13) + 1);
    var total = hand.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    //if there is an ace and the total is low
    if (total <= 11 && hand.includes(1)) {
        return total + 10;
    }
    return total;
}

function isBusted(hand) {
    return 21 < handValue(hand);
}