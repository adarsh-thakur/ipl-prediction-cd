(function () {
    var PREVIOUS_MATCH = Object.freeze([{
        time: new Date('Mon Jul 18 2022 19:30:00 GMT+0530'),
        teams: ['Mumbai', "Chennai"],
        winner: 'Mumbai',
        wonBy: '180 Runs'
    }, {
        time: new Date('Tue Jul 19 2022 19:30:00 GMT+0530'),
        teams: ['Delhi', "Punjab"],
        winner: 'Delhi',
        wonBy: '180 Runs'
    }, {
        time: new Date('Wed Jul 20 2022 19:30:00 GMT+0530'),
        teams: ['Kolkata', "Bangalore"],
        winner: 'Kolkata',
        wonBy: '180 Runs'
    }, {
        time: new Date('Thu Jul 21 2022 19:30:00 GMT+0530'),
        teams: ['Rajasthan', "Hyderabad"],
        winner: 'Rajasthan',
        wonBy: '180 Runs'
    }]);
    var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var nextMatch = ['Mumbai', 'Chennai'];
    var selectedTeam = "";
    addTimerToNextMatch();
    addPreviousMatchDetails();
    updateNextMatchTime();
    updateTeamPicker();
    listenToSubmit();
    function updateNextMatchTime() {
        var nextMatchEle = document.getElementById('next-match-date');
        nextMatchEle.innerHTML = getNextMatchTime().toDateString() + " " + getNextMatchTime().getHours() % 12 + ":" + getNextMatchTime().getMinutes();
    }
    function updateTeamPicker() {
        var teamSelectionPicker = document.getElementById('team-selection-picker');
        var teamWrapper = document.createElement('div');
        teamWrapper.style.width = "100px";
        teamWrapper.style.height = "100px";
        teamWrapper.style.position = 'relative';
        var teamOne = teamWrapper.cloneNode(true);
        teamOne.appendChild(getImage({
            src: './assets/Jerseys/' + nextMatch[0].toLowerCase() + '_jersey.png',
            class: 'jersey-image',
            id: nextMatch[0] + 'jersey-image'
        }))
        teamOne.appendChild(getCheckMark(nextMatch[0], 'left'))
        teamSelectionPicker.appendChild(teamOne);
        teamSelectionPicker.appendChild(getTextElement({
            content: 'VS',
            class: 'vs-text'
        }))

        var teamTwo = teamWrapper.cloneNode(true);
        teamTwo.appendChild(getImage({
            src: './assets/Jerseys/' + nextMatch[1].toLowerCase() + '_jersey.png',
            class: 'jersey-image',
            id: nextMatch[1].toLowerCase() + 'jersey-image'
        }));
        teamTwo.appendChild(getCheckMark( nextMatch[1], 'right'))
        teamSelectionPicker.appendChild(teamTwo);
    }
    function listenToSubmit() {
        var submitButton = document.getElementById('score-submit-btn');
        submitButton.addEventListener('click', onSubmit);
    }
    function onSubmit() {
        var submittedScore;
        var inputValue = document.getElementById('score-prediction-input').value
        if (inputValue && !isNaN(inputValue) && selectedTeam) {
            submittedScore = parseInt(inputValue);
            document.getElementById('score-submit-btn').style.display = "none";
            document.getElementById('score-prediction-input').readOnly = true;
            var scorePrediction = document.getElementById('score-prediction-message');
            scorePrediction.style.display = 'block';
            scorePrediction.innerHTML = scorePrediction.innerHTML.replace('$TEAM', selectedTeam);
            scorePrediction.innerHTML = scorePrediction.innerHTML.replace('$SCORE', submittedScore);
        } else {
            alert('Pleas select a team and enter a number')
        }
    }
    function addTimerToNextMatch() {
        var matchTime = getNextMatchTime() / 1000;
        var timer = document.getElementById("timer-to-next-match");
        var nextMatchTimer = setInterval(updateTimer, 1000);
        var hasMatchStarted = false;

        function updateTimer() {
            var timeElapsed = new Date() / 1000;
            var totalSec = matchTime - timeElapsed;
            var hours = parseInt(totalSec / 3600)
            var minutes = parseInt(totalSec / 60) % 60;
            var seconds = parseInt(totalSec % 60, 10);
            if (hours <= 0 && minutes <= 30) {
                timer.innerHTML = "Match has already stared";
                hasMatchStarted = true;
            } else {
                var result = hours + " hours : " + minutes + " minutes : " + seconds + " seconds ";
                timer.innerHTML = "Time Left to predict : " + "<b>" + result + "</b>";
            }
        }
    }
    function addPreviousMatchDetails() {
        var previousMatchWrapper = document.getElementById('previous-matches');
        PREVIOUS_MATCH.forEach((match, index) => {
            var child = document.createElement('div');
            child.setAttribute('id', 'prev-match-' + index);
            child.setAttribute('class', 'prev-match-child');
            child.appendChild(getMatchTimeElement(match));
            child.appendChild(getMatchBetweenElement(match));
            child.appendChild(getTextElement({
                elementType: 'div',
                content: match.winner,
                class: 'prev-match-result'
            }));
            child.appendChild(getTextElement({
                elementType: 'div',
                content: match.wonBy,
                class: 'prev-match-won-by'
            }));
            previousMatchWrapper.appendChild(child);
        })
    }
    function getMatchTimeElement(match) {
        var timeElementDiv = document.createElement('div');
        timeElementDiv.setAttribute('class', 'prev-match-time');
        timeElementDiv.innerHTML = DAYS[match.time.getDay()]
            + ", " + match.time.getDate()
            + ", "
            + MONTHS[match.time.getMonth()]
            + ", " + match.time.getHours() % 12
            + " : " + match.time.getMinutes()
            + " " + ((match.time.getHours() > 12) ? 'PM' : 'AM');
        return timeElementDiv;
    }
    function getMatchBetweenElement(match) {
        var matchBtwDiv = document.createElement('div');
        matchBtwDiv.setAttribute('class', 'prev-match-btw');
        matchBtwDiv.appendChild(getImage({
            src: './assets/Jerseys/' + match.teams[0].toLowerCase() + '_jersey.png',
            class: 'jersey-image',
            id: match.teams[0].toLowerCase() + 'jersey-image'
        }));
        matchBtwDiv.appendChild(getTextElement({
            content: 'VS',
            class: 'vs-text'
        }))
        matchBtwDiv.appendChild(getImage({
            src: './assets/Jerseys/' + match.teams[1].toLowerCase() + '_jersey.png',
            class: 'jersey-image',
            id: match.teams[1].toLowerCase() + 'jersey-image'
        }));
        return matchBtwDiv;
    }
    function getImage(config) {
        var imageEle = document.createElement('img');
        imageEle.setAttribute('id', config.id);
        imageEle.setAttribute('src', config.src);
        imageEle.setAttribute('class', config.class);
        return imageEle;
    }
    function getTextElement(config) {
        var textElem = document.createElement(config.elementType || 'span');
        textElem.setAttribute('id', config.id);
        textElem.setAttribute('class', config.class);
        textElem.innerHTML = config.content;
        return textElem;
    }
    function getNextMatchTime() {
        var now = new Date();
        if (now.getHours() > 20 && now.getMinutes() > 30) {
            now.setDate(now.getDate() + 1);
        }
        now.setHours(19);
        now.setMinutes(30);
        return now;
    }
    function getCheckMark(team, position) {
        var checkMark = document.createElement('div');
        checkMark.id = team;
        checkMark.setAttribute('class', 'team-check-mark '+ position);
        checkMark.onclick = function () {
            var opposition = document.getElementById(nextMatch[position !== 'left' ? 0 : 1]);
            if (!checkMark.style.backgroundImage) {
                selectedTeam = team;
                checkMark.style.backgroundImage = "url(./assets/Misc/tick.png)";
                opposition.style.backgroundImage = null;
            } else {
                checkMark.style.backgroundImage = null;
            }
        }
        return checkMark;
    }
})();