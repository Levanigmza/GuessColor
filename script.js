let level = 3;
let targetColor;
let cards = [];
let userName;
let userPoints = 0;

startBtn = document.getElementById('startBtn');
rules_container = document.getElementById('rules_container');
rules = document.getElementById('rules');
levelButtons = document.getElementById('levelButtons');
userInfo = document.getElementById('userInfo');
userNameInput = document.getElementById('userNameInput');
resetgame = document.getElementById('resetgame'); 


function showLevelButtons() {
    userName = document.getElementById('userNameInput').value;
    if (userName.trim() === "") {
        alert("გთხოვთ შეიყვანოთ სახელი.");
        return;
    }
    updateUserInfo();
    startBtn.style.display = 'none';
    rules_container.style.display = 'none';
    rules.style.display = 'none';
    levelButtons.style.display = 'block';
    userInfo.style.display = 'block';
    userNameInput.style.display = 'none';
    resetgame.style.display = 'block'; 
}

function startGame(selectedLevel) {
    rules_container.style.display = 'none';

    level = selectedLevel;
    document.getElementById('levelButtons').style.display = 'none';
    document.getElementById('cards').style.display = 'grid';
    document.getElementById('rgbDisplay').style.display = 'block';

    targetColor = generateRandomColor();
    const rgbDisplay = document.getElementById('rgbDisplay');
    rgbDisplay.innerHTML = `გამოიცანი ფერი , კოდით: <strong>${targetColor}</strong>`;

    cards = [];

    const cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = '';

    for (let i = 0; i < level; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.backgroundColor = generateRandomColor();
        card.addEventListener('click', () => selectCard(card));
        cardsContainer.appendChild(card);
        cards.push(card);
    }

    const randomIndex = Math.floor(Math.random() * level);
    cards[randomIndex].style.backgroundColor = targetColor;
    cards[randomIndex].textContent = " correct ";


    updateUserInfo();
    document.getElementById('resetgame').style.display = 'block';
    document.getElementById('levelchange').style.display = 'block';


}

function selectCard(card) {
    if (card.style.backgroundColor === targetColor) {
        alert('გილოცავ შენ გამოიცანი  ფერი !');
        userPoints += getPoints();
        startGame(level);
    }
         else {
        alert('არჩეული ფერი არასწორია !  თავიდან სცადე  <3 ');
        userPoints -= getPoints_Regress();
        startGame(level);

     }
    updateUserInfo();
}

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function resetGame() {
    if(confirm("ნამდვილად გსურთ თამაშის თავიდან დაწყება და არსებული პროგრესის განულება ?")){
    userName = '';
    userPoints = 0;

    updateUserInfo();
    document.getElementById('startBtn').style.display = 'block';
    document.getElementById('levelButtons').style.display = 'none';
    document.getElementById('cards').style.display = 'none';
    document.getElementById('rgbDisplay').style.display = 'none';
    document.getElementById('userInfo').style.display = 'none';
    document.getElementById('userNameInput').style.display = 'block';
    document.getElementById('resetgame').style.display = 'none';
    document.getElementById('levelchange').style.display = 'none';
    document.getElementById('rules_container').style.display = 'block';
    document.getElementById('rules').style.display = 'flex';
    }

}


function levelchange() {
    document.getElementById('rules_container').style.display = 'none';
    document.getElementById('levelButtons').style.display = 'block';
    document.getElementById('cards').style.display = 'none';
    document.getElementById('rgbDisplay').style.display = 'none';
    document.getElementById('levelchange').style.display = 'none';
    document.getElementById('resetgame').style.display = 'block';
    updateUserInfo();
}



function updateUserInfo() {
    if(userPoints < 0){
        userPoints = 0;
    }
    const userInfo = document.getElementById('userInfo');
    const scoreColor = userPoints > 0 ? 'green' : 'red';
    userInfo.innerHTML = `<p>სახელი: <span style="font-weight: bold;">${userName}</span></p><p> ქულა: <span style="font-weight: bold; color: ${scoreColor};">${userPoints}</span></p>`;
}


function getPoints() {
    switch (level) {
        case 3:
            return 10;
        case 6:
            return 20;
        case 9:
            return 30;
        default:
            return 0;
    }
}





function getPoints_Regress() {
    switch (level) {
        case 3:
            return 5;
        case 6:
            return 10;
        case 9:
            return 15;
        default:
            return 0;
    }
}





