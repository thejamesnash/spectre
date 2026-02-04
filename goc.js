/* ----------------------------------------
   Player setup
---------------------------------------- */
const playerArray = [
  'ste',
  'bob',
  'ian',
  'ben',
  'dave',
  'earl',
  'g',
  'nash',
  'liam',
  'fod',
  'dan',
  'con'
];

const deck = document.querySelector('ul');
const playerCards = document.querySelectorAll('li');

/* ----------------------------------------
   Utility: shuffle array (Fisher–Yates)
---------------------------------------- */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[rand];
    arr[rand] = temp;
  }
}

shuffleArray(playerArray);

/* ----------------------------------------
   Shuffle cards and reset state
---------------------------------------- */
function shuffleCards() {
  shuffleArray(playerArray);
  playerCards.forEach((card, index) => {
    card.dataset.active = false;
    card.dataset.src = playerArray[index];
  });
  deck.dataset.state = 'shuffle';
}

/* ----------------------------------------
   Card click handling (always fair)
---------------------------------------- */
playerCards.forEach(card => {
  card.dataset.active = false;

  card.addEventListener('click', () => {
    console.log('CAR CLICKED');
    if( deck.dataset.state === 'fanpick' ){
        console.log('DECK IS AT PICK STATE');
        card.dataset.active = true;
        deck.dataset.state = 'fanpickreveal'
    }
    
    

    // setTimeout(() => {
    //   deck.dataset.state = 'fanreveal';
    // }, 3000);
  });
});

/* ----------------------------------------
   Button handling
---------------------------------------- */
const allButtons = document.querySelectorAll('button');

allButtons.forEach(button => {
  button.addEventListener('click', () => {
    const activeCard = document.querySelector('li[data-active="true"]');
    if (activeCard) {
      activeCard.dataset.active = false;
    }

    if (button.id === 'shuffle') {
      shuffleCards();
    } else if (button.id === 'pick') {
      deck.dataset.state = 'fanpick';
    } else if (button.id === 'show') {
      deck.dataset.state = 'revealall';
    }
  });
});
