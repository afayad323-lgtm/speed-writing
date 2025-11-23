//Array of words 
const words = {
    Easy: [
        "Hello", "Code", "HTML", "CSS", "Town", "Car", "Book", "Test", "Tree"
    ],
    Normal: [
        "Programming", "JavaScript", "Internet", "Country", "Linkedin",
        "Python", "Styling", "Delete", "Sudan"
    ],
    Hard: [
        "GitHub", "Advanced", "Framework", "Component", "Database",
        "Scripting", "Asynchronous", "Algorithm", "Optimization"
    ]
};
//setting levels

const lvls = {
    'Easy': 6,
    'Normal': 4,
    'Hard':2
};







//Default level
let select = document.querySelector('#choose');


let defaultLevelName = select.value; //change level from here

function updateHighScoreDisplay() {

    let savedHighScore = localStorage.getItem(`highScore_${defaultLevelName}`) || 0;
document.querySelector('.high-score').innerHTML = savedHighScore;
document.querySelector('.level-name-display').innerHTML = defaultLevelName;
};
updateHighScoreDisplay();


let defaultLevelSeconds = lvls[defaultLevelName];
let currentWords = [...words[defaultLevelName]];
select.addEventListener('change',function(){
    defaultLevelName = this.value;
    defaultLevelSeconds = lvls[defaultLevelName];

    levelNameSpan.innerHTML = defaultLevelName;
    levelTimeSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    currentWords = [...words[defaultLevelName]];
    scoreTotal.innerHTML = currentWords.length;
    updateHighScoreDisplay();
});

//catch selectors
let startBtn = document.querySelector('.start');
let levelNameSpan = document.querySelector('.message .lvl');
let levelTimeSpan = document.querySelector('.message .seconds');
let theWord = document.querySelector('.the-word');
let upComingWords = document.querySelector('.upcoming-words');
let input = document.querySelector('.input');
let timeLeftSpan = document.querySelector('.time span');
let scoreGot = document.querySelector('.score .got');
let scoreTotal = document.querySelector('.score .total');
let finish = document.querySelector('.finish');
let restart = document.querySelector('.restart');

//setting level name +second +score

levelNameSpan.innerHTML = defaultLevelName;
levelTimeSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = currentWords.length;

//disable paste event
input.onpaste = function (){
    return false;
}


//start game
startBtn.onclick = function(){
    this.remove();
    input.focus();
    //generate word function
    genWords();

}

document.addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        genWords();
        startBtn.remove();
        input.focus();
    }
})

function genWords(){
    //get random word from array
    let randomWord = currentWords[Math.floor(Math.random() * currentWords.length)];
    //get word index
    let wordIndex = currentWords.indexOf(randomWord);
    //remove word from array
    currentWords.splice(wordIndex, 1);
    //show the randomword
    theWord.innerHTML = randomWord;
    //empty upcoming word
    upComingWords.innerHTML = '';
    //generate words
    for (let i=0; i<currentWords.length;i++){
        //create div element
        let div = document.createElement('div');
        let txt = document.createTextNode(currentWords[i]);
        div.appendChild(txt);
        upComingWords.appendChild(div);
    }
    //start play function 
   startPlay();
}


function saveHighScore(level, score) {
    let currentHighScore = localStorage.getItem(`highScore_${level}`) || 0;
    if (score > currentHighScore) {
        localStorage.setItem(`highScore_${level}`, score);
        }}









 function startPlay() {
        timeLeftSpan.innerHTML = defaultLevelSeconds;
        let start = setInterval(() => {
            timeLeftSpan.innerHTML--;
            if (timeLeftSpan.innerHTML === '0'){
                clearInterval(start);
                //compare Words
                if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()){
                    //empty input field
                    input.value = '';
                    scoreGot.innerHTML++;
                    if (currentWords.length > 0) {
                        genWords();
                    }else{
                        let span = document.createElement('span')
                    span.className = 'good';
                    let spanText = document.createTextNode('Congrate');
                    span.appendChild(spanText);
                    finish.appendChild(span);
                    //remove upcoming word
                    upComingWords.remove();
                    restart.style.display = 'block';
                    // ---------- Save High Score ----------

                saveHighScore(defaultLevelName, parseInt(scoreGot.innerHTML))

                    }
                }else{
                    let span = document.createElement('span')
                    span.className = 'bad';
                    let spanText = document.createTextNode('Game Over');
                    span.appendChild(spanText);
                    finish.appendChild(span);
                                        restart.style.display = 'block';
                                        // ---------- Save High Score ----------

                saveHighScore(defaultLevelName, parseInt(scoreGot.innerHTML));
                updateHighScoreDisplay();

                }
            }
        }, 1000);
    }

    restart.addEventListener('click', function(){
        window.location.reload();
    })



let footer = document.querySelector('footer');
footer.innerHTML = 'Created By Ahmed Fayad &copy'

