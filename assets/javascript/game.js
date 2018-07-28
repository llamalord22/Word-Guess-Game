

    var words = [
    "zelda",
    "warcraft",
    "streetfighter",
    "mario",
    "sonic",
    "tombraider",
    "bioshock",
    "elderscrolls",
    "counterstrike",
    "pokemon",
    ];

    var score = -1;
    var wordIndex = 0; //for the active word
    var playerWord = []; //players correct guesses
    var lettersUsed = []; //incorrect guesses
    var triesLeft = 0;  //attempts left
    var finishGame = false;
    const maxAttempts = 8;

    function restart() {
        triesLeft = maxAttempts;
    
        wordIndex = Math.floor(Math.random() * (words.length));
        console.log(words[wordIndex])

    lettersUsed = [];
    playerWord = [];

    for (var i = 0; i < words[wordIndex].length; i++) {
        playerWord.push("_");
    }

    document.getElementById("tryAgain").style.cssText= "display: none";
    document.getElementById("continue").style.cssText= "display: none";
    document.getElementById("league").style.cssText= "display:none";
    document.getElementById("streetfighter").style.cssText= "display: none";
    document.getElementById("anykey").style.cssText= "display: none";

    updateGame();

    };

    function updateGame() {
        document.getElementById("newScore").innerText = score;
        document.getElementById("activeWord").innerText = "";
        for (var i = 0; i < playerWord.length; i++) {
            document.getElementById("activeWord").innerText += playerWord[i];
        }
        document.getElementById("triesLeft").innerText = triesLeft;
        document.getElementById("lettersUsed").innerText = lettersUsed;
        if(triesLeft <= 0) {
            document.getElementById("continue").style.cssText = "display: block";
            document.getElementById("tryAgain").style.cssText = "display: block";
            finishGame = true;
        }
    };

    function pickLetter(letter) {
        if (lettersUsed.indexOf(letter) === -1 ) {
            lettersUsed.push(letter);
            evaluateGuess(letter);
        }
        updateGame()
        victory()
    };

    function evaluateGuess(letter) {
        var letterPlace = [];
        for (var i = 0; i < words[wordIndex].length; i++) {
            if(words[wordIndex][i] === letter) {
                letterPlace.push(i);
            }
        }

        if (letterPlace.length <= 0) {
            triesLeft--;
        }
        else {
            for(var i = 0; i < letterPlace.length; i++) {
                playerWord[letterPlace[i]] = letter;
            }
        }
    };

    function victory() {
        if(playerWord.indexOf("_") === -1) {
            document.getElementById("league").style.cssText = "display: block";
            document.getElementById("tryAgain").style.cssText = "display: block";
            score++;
            finishGame = true;
        }
    };

    document.onkeyup = function(event) {
        if(finishGame) {
            restart();
            finishGame = false;

        } else {
            if(event.keyCode >= 65 && event.keyCode <= 90) {
                pickLetter(event.key.toLowerCase());
            }
        }
    };

