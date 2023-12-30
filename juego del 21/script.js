let deck = [];
const suits = ['♠️', '♣️', '♥️', '♦️'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let playerHand = [];
let dealerHand = [];
let playerPoints = 0;
let dealerPoints = 0;
let gameOver = false;
function createDeck() {
  deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value, suit });
    }
  }
  return deck;
}
function shuffleDeck() {
  deck.sort(() => Math.random() - 0.5);
}
function dealCard() {
  return deck.pop();
}
function calculatePoints(hand) {
  let points = 0;
  let aceCount = 0;

  for (let card of hand) {
    if (card.value === 'A') {
      aceCount++;
      points += 11;
    } else if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
      points += 10;
    } else {
      points += parseInt(card.value);
    }
  }

  while (points > 21 && aceCount > 0) {
    points -= 10;
    aceCount--;
  }

  return points;
}
function showPlayerHand() {
  let playerHandString = '';
  for (let card of playerHand) {
    playerHandString += card.value + card.suit + ' ';
  }
  document.getElementById('player-hand').textContent = 'Cartas: ' + playerHandString;
}
function showDealerHand() {
  let dealerHandString = '';
  for (let card of dealerHand) {
    dealerHandString += card.value + card.suit + ' ';
  }
  document.getElementById('dealer-hand').textContent = 'Cartas: ' + dealerHandString;
}
function startGame() {
  createDeck();
  shuffleDeck();
  playerHand = [dealCard(), dealCard()];
  dealerHand = [dealCard(), dealCard()];
  playerPoints = calculatePoints(playerHand);
  dealerPoints = calculatePoints(dealerHand);
  showPlayerHand();
  document.getElementById('player-points').textContent = playerPoints;
  document.getElementById('dealer-points').textContent = dealerPoints;
}
document.getElementById('hit-btn').addEventListener('click', function () {
  if (!gameOver) {
    playerHand.push(dealCard());
    playerPoints = calculatePoints(playerHand);
    showPlayerHand();
    document.getElementById('player-points').textContent = playerPoints;

    if (playerPoints > 21) {
      document.getElementById('result').textContent = '¡Has perdido! Puntuación mayor a 21.';
      gameOver = true;
    }
  }
});
document.getElementById('stand-btn').addEventListener('click', function () {
  if (!gameOver) {
    while (dealerPoints < 17) {
      dealerHand.push(dealCard());
      dealerPoints = calculatePoints(dealerHand);
      showDealerHand();
      document.getElementById('dealer-points').textContent = dealerPoints;
    }

    if (dealerPoints > 21 || playerPoints > dealerPoints) {
      document.getElementById('result').textContent = '¡Has ganado!';
    } else if (playerPoints === dealerPoints) {
      document.getElementById('result').textContent = '¡Empate!';
    } else {
      document.getElementById('result').textContent = '¡Has perdido!';
    }

    gameOver = true;
  }
});
document.getElementById('restart-btn').addEventListener('click', function () {
  gameOver = false;
  playerHand = [];
  dealerHand = [];
  playerPoints = 0;
  dealerPoints = 0;
  document.getElementById('player-hand').textContent = 'Cartas: ';
  document.getElementById('dealer-hand').textContent = 'Cartas: ';
  document.getElementById('player-points').textContent = '0';
  document.getElementById('dealer-points').textContent = '0';
  document.getElementById('result').textContent = '';
  startGame();
});
startGame();