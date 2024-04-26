let lang = 'geo';

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




function changeLanguage(newLang) {
    lang = newLang;

    const languageButtons = document.querySelectorAll('.language-buttons button');
    languageButtons.forEach(button => {
        button.style.fontWeight = 'normal';
        button.style.backgroundColor = 'rgba(179, 169, 169, 0.842)';

    });
    const selectedButton = document.querySelector(`.language-buttons button[data-lang='${lang}']`);
    if (selectedButton) {
        selectedButton.style.fontWeight = 'bold';
        selectedButton.style.backgroundColor = 'rgba(255, 255, 255, 0.842)';

    }
    const translations = {
        'geo': {
            'header_title': 'გამოიცანი ფერი',
            'start_game_button': 'თამაშის დაწყება',
            'rules_title': 'წესები',
            'rules_content_p1': '• მოთამაშეს აქვს 3 დონიდან ერთ-ერთის ამორჩევის უფლება (მარტივი, საშუალო, რთული) ',
            'rules_content_p2': ' • თითოეული დონე ნიშნავს ერთით მეტ რიგს (row)',
            'rules_content_p3': ' • ფერი რაც უნდა გამოიცნოს მომხარებელმა შესაძლოა გამოვიდეს, როგორც rgb შიფრი ',
            'rules_content_p4': ' • სწორი ფერის არჩევის შემთხვევაში თამაში, თავიდან დააგენერირებს ახალ ფერებს, გამოიტანს success ალერტს და მოემატება ქულა დონის შესაბამისად, წინააღმდეგ შემთხვევაში გამოვა error ალერტი და ქულას დააკლებს.',
            'rules_content_p5': '• შეფასების სისტემა დონეების მიხედვით:',
            'rules_table_p1': 'დონე',
            'rules_table_p2': 'მოგება',
            'rules_table_p3': 'წაგება',
            'rules_table_p4': 'მარტივი',
            'rules_table_p5': 'საშუალო',
            'rules_table_p6': 'რთული',

            'level_select': 'აირჩიე სირთულის დონე',
            'level_easy': 'მარტივი',
            'level_medium': 'საშუალო',
            'level_hard': 'რთული',
            'username_placeholder': 'შეიყვანე შენი სახელი',
            'reset_button': 'თავიდან დაწყება',
            'more_info_button': 'მეტი ინფორმაცია',
            'footer_text': ' ლევანი გამეზარდაშვილი',
            'level_change': 'დონის შეცვლა'
        },
        'eng': {
            'header_title': 'Guess Color',
            'start_game_button': 'Start Game',
            'rules_title': 'Rules',
            'rules_content_p1': '• Player has the right to choose one of 3 levels (easy, medium, hard)',
            'rules_content_p2': '• Each level indicates one more row',
            'rules_content_p3': '• The color the player must recognize may appear as an rgb code',
            'rules_content_p4': ' • In case of correct color selection, the game generates new colors, displays a success alert, and adds points according to the level, in case of an error, an error alert appears and deducts points.',
            'rules_content_p5': '• Evaluation system according to levels:',

            'rules_table_p1': 'level',
            'rules_table_p2': 'win',
            'rules_table_p3': 'loss',
            'rules_table_p4': 'Easy',
            'rules_table_p5': 'Medium',
            'rules_table_p6': 'Hard',

            'level_select': 'Choose Gaming Level',
            'level_easy': 'Easy',
            'level_medium': 'Medium',
            'level_hard': 'Hard',
            'username_placeholder': 'Enter your name',
            'reset_button': 'Reset Game',
            'more_info_button': 'More Information',
            'footer_text': ' Levani Gamezardashvili',
            'level_change': 'Change Level'

        }
    };

    const elements = document.querySelectorAll('[data-lang-key]');
    elements.forEach(element => {
        const key = element.dataset.langKey;
        if (translations[lang][key]) {
            if (key === 'username_placeholder') {
                element.placeholder = translations[lang][key];
            } else {
                element.innerText = translations[lang][key];
            }
        }
    });
}







function showLevelButtons() {
    userName = document.getElementById('userNameInput').value;
    if (userName.trim() === "") {
        if (lang === 'geo') {
            alert("გთხოვთ შეიყვანოთ სახელი.");

        } else {
            alert("Please Enter Your Name");
        }
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

    if (lang === 'geo') {
        rgbDisplay.innerHTML = `გამოიცანი ფერი , კოდით: <strong>${targetColor}</strong>`;

    } else {
        rgbDisplay.innerHTML = `Guess Color , via code : <strong>${targetColor}</strong>`;
    }

    cards = [];

    const cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = '';

    for (let i = 0; i < level; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.backgroundColor = generateRandomColor();
        card.addEventListener('click', function () {
            if (!card.classList.contains('disabled')) {
                selectCard(card);
            }
        });
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
    disableCardClick();

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
    }, 200);
    updateUserInfo();
}



function checkCGuess(card) {
    disableCardClick();

    if (card.style.backgroundColor === targetColor) {
        // alert('გილოცავ შენ გამოიცანი  ფერი !');

        if (lang === 'geo') {
            showAlert('გილოცავ შენ გამოიცანი ფერი ! ', true);
        } else {
            showAlert('Congratulations, you guessed the color !', true);
        }

        userPoints += getPoints();
    }
    else {
        if (lang === 'geo') {
            showAlert('არჩეული ფერი არასწორია !  თავიდან სცადე <3', false);
        } else {
            showAlert('You lost, the chosen color is wrong! Try again', false);
        }


        // alert('არჩეული ფერი არასწორია !  თავიდან სცადე <3');
        userPoints -= getPoints_Regress();
    }
}

function showAlert(AlertText, type) {



    const popup = document.getElementById('correctPopup');
    popup.style.display = "flex";

    popup.classList.add('show');
    popup.classList.remove('hidden');

    popup.innerHTML = '';

    const textElement = document.createElement('p');
    textElement.textContent = AlertText;
    popup.appendChild(textElement);

    if (type) {
        const imageElementwin = document.createElement('img');

        imageElementwin.src = '7626666.png'
        popup.appendChild(imageElementwin);
    }
    else {
        const imageElementlost = document.createElement('img');

        imageElementlost.src = '8608319.png'
        popup.appendChild(imageElementlost);
    }

    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.addEventListener('click', function () {
        popup.classList.add('hidden');
        setTimeout(() => {
            popup.style.display = "none";
            popup.classList.remove('hidden');
            startGame(level);
            enableCardClick();

        }, 100);
    });
    popup.appendChild(okButton);
    disableCardClick();

}


function disableCardClick() {
    cards.forEach(card => {
        card.classList.add('disabled');
    });
}

function enableCardClick() {
    cards.forEach(card => {
        card.classList.remove('disabled');
    });
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

    if (lang === 'geo') {


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
    else {
        if (confirm("Do you really want to start the game from scratch and cancel your current progress?")) {
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
    if (lang === 'geo') {
        userInfo.innerHTML = `<p>სახელი: <span style="font-weight: bold;">${userName}</span></p><p> ქულა: <span style="font-weight: bold; color: ${scoreColor};">${userPoints}</span></p>`;

    } else {
        userInfo.innerHTML = `<p>Name: <span style="font-weight: bold;">${userName}</span></p><p> Point: <span style="font-weight: bold; color: ${scoreColor};">${userPoints}</span></p>`;
    }

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







