let level = 3;
let targetColor;
let cards = [];
let userName;
let userPoints = 0;
let randomIndex;
let generatingColors = false;

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

    randomIndex = Math.floor(Math.random() * level);
    cards[randomIndex].style.backgroundColor = targetColor;
    //  cards[randomIndex].textContent = " correct";

    updateUserInfo();
    document.getElementById('resetgame').style.display = 'block';
    document.getElementById('levelchange').style.display = 'block';


}

function selectCard(card) {

    cards.forEach((c) => {
        if (c.style.backgroundColor === targetColor) {
            c.classList.add('correct-card');
            c.textContent = 'Correct';
            if (c.style.backgroundColor === card.style.backgroundColor) {
                card.style.transform = 'rotate(-0.1deg)'
            }
        }
    });
    setTimeout(() => {
        checkCGuess(card)
    }, 400);
    updateUserInfo();
}



function checkCGuess(card) {
    if (card.style.backgroundColor === targetColor) {
        // alert('გილოცავ შენ გამოიცანი  ფერი !');
        showAlert('გილოცავ შენ გამოიცანი  ფერი !', false);

        userPoints += getPoints();
    }
    else {
        showAlert('არჩეული ფერი არასწორია !  თავიდან სცადე <3', false);

        // alert('არჩეული ფერი არასწორია !  თავიდან სცადე <3');
        userPoints -= getPoints_Regress();
    }
}

function showAlert(AlertText, type) {
    const body = document.body;
    const popup = document.getElementById('correctPopup');
    popup.style.display = "block";

    popup.classList.add('show');
    popup.classList.remove('hidden');

    popup.innerHTML = '';

    const textElement = document.createElement('p');
    textElement.textContent = AlertText;
    popup.appendChild(textElement);

    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.addEventListener('click', function () {
        popup.classList.add('hidden'); 
        setTimeout(() => {
            popup.style.display = "none";
            popup.classList.remove('hidden'); 
            startGame(level);

        }, 600);
    });
    popup.appendChild(okButton);

}


function generateRandomColor() {
    let r;
    let g;
    let b;

    if (level === 3) {
        r = Math.floor(Math.random() * 256);
        if (r > 180) {
            g = Math.floor(Math.random() * 20);
            b = Math.floor(Math.random() * 8);
        }
        else if (r < 180 && r > 100) {
            g = Math.floor(Math.random() * 250);
            if (g > 150) {
                b = Math.floor(Math.random() * 30);
            }
            else {
                b = Math.floor(Math.random() * 20);
            }
        }
        else {
            g = Math.floor(Math.random() * 85);
            b = Math.floor(Math.random() * 250);

        }
    }
    else if (level === 6) {
        r = Math.floor(Math.random() * 256);
        if (r > 200) {
            g = Math.floor(Math.random() * 100);
            b = Math.floor(Math.random() * 180);
        }
        else if (r < 200 && r > 100) {
            g = Math.floor(Math.random() * 256);
            if (g > 200) {
                b = Math.floor(Math.random() * 125);
            }
            else {
                b = Math.floor(Math.random() * 200);
            }
        }
        else {
            g = Math.floor(Math.random() * 150);
            b = Math.floor(Math.random() * 256);

        }
    }
    else {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    }

    return `rgb(${r}, ${g}, ${b})`;
}

function resetGame() {
    if (confirm("ნამდვილად გსურთ თამაშის თავიდან დაწყება და არსებული პროგრესის განულება ?")) {
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
        document.getElementById('userNameInput').value = ''
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
    if (userPoints < 0) {
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







