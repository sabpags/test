var arrChosenVal = [];
var currPlayerScore = 0, currDealerScore = 0;

function chooseRandNumber(max = 52, min = 1){
	var rand = ((Math.random() * max - min) + min);
	rand = Math.ceil(rand);
	if(arrChosenVal.includes(rand)){
		var rand = chooseRandNumber();
		return rand;
	}
	else{
		arrChosenVal.push(rand);
		return rand;
	}
}

function setDealerScore(score1){
	var score = document.getElementById('dealerScore');
	currDealerScore += score1;
	score.innerHTML = currDealerScore;
}

function setPlayerScore(score1){
	var score = document.getElementById('playerScore');
	currPlayerScore += score1;
	score.innerHTML = currPlayerScore;
}

function getCardNumber(num){
	var newNum = num % 13;
	if(newNum == 1){
		newNum = 11;
	}
	else if(newNum >= 10 || newNum == 0){
		newNum = 10;
	}
	return newNum;
}

function createImage(imageVal){
	var image = document.createElement("img");
	image.setAttribute('src',"./img/"+ imageVal +".png");
	return image;
}

function disableBtns() {
	document.getElementById('btnHold').disabled = true;
	document.getElementById('btnDraw').disabled = true;
}

function getDealerCard(dealerCard) {
	var dealerCardNum = chooseRandNumber();
	dealerCard.setAttribute('src',"./img/"+ dealerCardNum +".png");
	var dealerCardNumVal = getCardNumber(dealerCardNum);
	setDealerScore(dealerCardNumVal);

	return dealerCard;
}

function getPlayerCard(playerCard) {
	var playerCardNum = chooseRandNumber();
	playerCard.setAttribute('src',"./img/"+ playerCardNum +".png");
	var playerCardNumVal = getCardNumber(playerCardNum);
	setPlayerScore(playerCardNumVal);

	return playerCard;
}

function deal() {

	var dealerCard1 = document.getElementById('dealer1');
	getDealerCard(dealerCard1);

	var dealerCard2 = document.getElementById('dealer2');
	getDealerCard(dealerCard2);

	var playerCard1 = document.getElementById('player1');
	getPlayerCard(playerCard1);
	
	var playerCard2 = document.getElementById('player2');
	getPlayerCard(playerCard2);

	if(currPlayerScore == 21 && currDealerScore == 21){
		var dealerScore = document.getElementById("dealerScore").innerHTML += '<br/>Draw!';
	}
	else if(currPlayerScore == 21 || currDealerScore > 21){
		var playerScore = document.getElementById('playerScore').innerHTML += '<br/>Player has won the hand!';
		var player = document.getElementById("playerLabel").style.background = '#4CAF50';
		disableBtns();
		
	}
	else if(currDealerScore == 21 || currPlayerScore > 21){
		var dealerScore = document.getElementById('dealerScore').innerHTML += '<br/>Dealer has won the hand!';
		var dealer = document.getElementById("dealerLabel").style.background = '#4CAF50';
		disableBtns();
	}
}

function requestPlayerCard(){
	if(currPlayerScore <= 21){
		var tableData = document.getElementById('playerHand');
		var imageVal = chooseRandNumber();
		tableData.appendChild(createImage(imageVal));
		setPlayerScore(getCardNumber(imageVal));
	}

	if(currPlayerScore == 21){
		var playerScore = document.getElementById('playerScore').innerHTML += '<br/>Player has won the hand!';
		var player = document.getElementById("playerLabel").style.background = '#4CAF50';
		disableBtns();
	}

	if (currPlayerScore > 21){
		var dealerScore = document.getElementById("dealerScore").innerHTML += '<br/>Dealer has won the hand!';
		var dealer = document.getElementById("dealerLabel").style.background = '#4CAF50';
		disableBtns();
	}
}

function completeDealerHand(){
	disableBtns();

	while(currDealerScore <= 16){
		var tableData = document.getElementById('dealerHand');
		var imageVal = chooseRandNumber();
		tableData.appendChild(createImage(imageVal));
		setDealerScore(getCardNumber(imageVal));
	}

	if(currDealerScore > 21 || currPlayerScore > currDealerScore){
		var playerScore = document.getElementById('playerScore').innerHTML += '<br/>Player has won the hand!';
		var player = document.getElementById("playerLabel").style.background = '#4CAF50';
	}
	else if(currDealerScore == 21 || currDealerScore > currPlayerScore){
		var dealerScore = document.getElementById("dealerScore").innerHTML += '<br/>Dealer has won the hand!';
		var dealer = document.getElementById("dealerLabel").style.background = '#4CAF50';
	}
	else if(currDealerScore == currPlayerScore){
		var dealerScore = document.getElementById("dealerScore").innerHTML += '<br/>Draw!';

	}
}
