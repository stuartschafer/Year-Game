$(document).ready(function() {
    let team1Name = "";
    let team2Name = "";
    let firstTeam = "";
    let secondTeam = "";
    let nextTeam = "";
    let question = 0;
    let team1Score = 0;
    let team2Score = 0;
    let guess = "";
    let arrowGuess = "";
    let timeframe = "";
    let x = -1;
    let coinflip = 0;
    let time = 0;
    let wrong = new Audio("sounds/trombone.mp3");
    let clap = new Audio("sounds/clap.wav");
    let boo = new Audio("sounds/boo.wav");
    $("#nextQuestion").hide();
    $("#guessArea").hide();
    $(".arrows").hide();
    $("#checkFinalAnswer").hide();
    $("#gameOver").hide();
    let questions = ["What year did the first POTBELLY open?",
    "What year did the first SUBWAY shop open?",
    "What year did the first WHOLE FOODS open?",
    "What year did TYSON FOODS begin?",
    "What year did the first HARDEE'S open?",
    "What year did the first FIVE GUYS BURGERS & FRIES open?",
    "What year did the first RED LOBSTER open?",
    "What year did the first CHIPOTLE open?",
    "What year did the first IHOP open?",
    "What year did the first CHICK-FIL-A open?"];
    let answers = [1977, 1965, 1980, 1935, 1960, 1986, 1968, 1993, 1958, 1967];
    let solutions = ["A couple who ran a Chicago antique shop one day decided to start selling toasted sandwiches and homemade desserts, and soon enough lines reached  around the block on a daily basis.",
    "A recent high school graduate, 17 year old Fred DeLuca, and family friend Dr. Peter Buck team up to open their first submarine sandwich shop in Bridgeport, Connecticut. Originally called “Pete's Super Submarines,” they sell 312 sandwiches the first day.",
    "The first Whole Foods store opened its doors in Austin in September 1980, after John Mackey and Renee Lawson Hardy, owners of the SaferWay health food store, joined forces with Craig Weller and Mark Skiles, owners of Clarksville Natural Grocery.",
    "The history of Tyson Foods started with an Arkansas farmer, John Tyson, who hauled about 50 chickens to sell in Chicago during 1935. He named his business Tyson Feed & Hatchery and began making a profit buying and selling chickens prior to World War II (1939–45).",
    "Wilber Hardee opened his first namesake restaurant in Greenville, North Carolina in 1960. Five months later he had his first franchisee and over the years his burger chain has spread to become a favorite throughout the Midwestern and Southeastern United States.",
    "The first Five Guys opened in 1986, in the Westmark strip mall (3235 Columbia Pike, Arlington, Va) at Columbia Pike and Glebe Road in Arlington, Va.",
    "The first Red Lobster restaurant was opened on January 18, 1968, in Lakeland, Florida, by entrepreneurs Bill Darden and Charley Woodsby.",
    "In 1993, Ells took what he learned in San Francisco and opened the first Chipotle Mexican Grill in Denver, Colorado, in a former Dolly Madison Ice Cream store at 1644 East Evans Avenue, near the University of Denver campus, using an $85,000 loan from his father.",
    "Jerry Lapin, Al Lapin, and Albert Kallis founded International House of Pancakes in 1958 with the help of Sherwood Rosenberg and William Kaye. The first restaurant opened in Toluca Lake, Los Angeles, California.",
    "On Nov. 24, 1967, Truett Cathy altered the “fast food” landscape forever when the first Chick-fil-A restaurant opened in Atlanta’s Greenbriar Mall, an idea as original as his Chicken Sandwich."];
    
    // This starts the beginning of the game when the "Flip to see who goes first" is clicked
    $("#beginGame").click(function() {
        $("#teamName").empty();
        team1Name = $("#team1Entry").val().trim();
        team2Name = $("#team2Entry").val().trim();

        if (team1Name === "" || team2Name === "") {
            boo.play();
            $("#teamName").html("Please enter a valid name for both teams.");
            return;
        }

        $(".teamArea").removeClass("hvr-bounce-to-bottom");
        $(".askName").css("color", "white");
        $(".teamArea").css("border", "5px solid darkgreen");
        $(".teamButtons").hide();
        $("#beginGame").hide();
        $("#team1").html(team1Name);
        $("#team2").html(team2Name);
        $("#team1Score").html("Score: 0");
        $("#team2Score").html("Score: 0");

        // Randomly selects the team to go first
        coinFlip = Math.floor((Math.random() * 2) + 1);
        
        if (coinFlip === 1) {
            firstTeam = team1Name;
            secondTeam = team2Name;
            $("#questionArea").html(team1Name + " will go first");
            $("#one").css("background-color", "green");
        } else {
            firstTeam = team2Name;
            secondTeam = team1Name;
            $("#questionArea").html(team2Name + " will go first");
            $("#two").css("background-color", "green");
        }
        $("#nextQuestion").fadeIn("slow");
    });

    // This brings up the next question
    $("#nextQuestion").click(function() {
        $(".infoSection").empty();
        $("#timer").empty();
        $("#nextQuestion").hide();
        $("#questionNumber").show();
        $(".teamArea").removeClass("pulse");
        $("#guess").val("");
        question++;
        $("#questionNumber").html("Question Number " + question);

        // This switches the 2 teams up (who guesses first) but only after the first round
        if (question > 1) {
            $(".teamArea").css("background-color", "black");
            if (firstTeam === team1Name) {
                firstTeam = team2Name;
                secondTeam = team1Name;
                $("#two").css("background-color", "green");
            } else {
                firstTeam = team1Name;
                secondTeam = team2Name;
                $("#one").css("background-color", "green");
            }
        }
        if (x === 2) {
            time = 3600;
            //time = 300;
        } else {
            time = 3300;
            //time = 600;
        }
        x++;
        $("#questionArea").html(questions[x]);
        timeframe = "firstGuess";
        timer();
    });

    // This only shows when the second team has to guess before or after AND they select before
    $("#upArrow").click(function() {
        clearInterval(intervalId);
        $(".infoSection").empty();
        $(".arrows").hide();
        arrowGuess = "BEFORE";
        checkAnswer();
    });

    // This only shows when the second team has to guess BEFORE or AFTER AND they select AFTER
    $("#downArrow").click(function() {
        clearInterval(intervalId);
        $(".infoSection").empty();
        $(".arrows").hide();
        arrowGuess = "AFTER";
        checkAnswer();
    });

    // This appears when the first team has to enter a % guess
    $("#firstGuess").click(function() {
        clearInterval(intervalId);
        $("#timer").css("font-size", "30px");
        $("#timer").css("color", "white");
        guess = Number($("#guess").val().trim());
        guessStr = $("#guess").val().trim();
        $("#teamName").empty();
        $("#guessArea").hide();

        if (guess < 1900 || guess > 2021 || guessStr === "") {
            boo.play();
            $("#teamName").html("Please guess an actual year");
            $("#guess").val("");
            $("#guessArea").show();
            return;
        }

        // Checks to see if it is the correct answer
        if (guess === answers[x]) {
            $("#guessArea").hide();
            awardPoint();
            return;
        }
        nextTeamGuess();
    });

    // This will appear after a teams has selected BEFORE or AFTER
    $("#checkFinalAnswer").click(function() {
        $("#questionNumber").empty();
        $("#checkFinalAnswer").hide();
        $("#message").show();
        $("#questionArea").html(solutions[x]);
        $("#teamGuess").show();
        awardPoint();
    });

    $("#gameOver").click(function() {
        gameOver();
    });

    // This runs to see who wins a point
    function awardPoint() {
        clap.play();
        let otherGuess = "";
        let correctGuess = "";
        if (arrowGuess === "BEFORE") {
                otherGuess = "BEFORE (" + answers[x] + ") <img class='smallArrow' src='images/afterarrowframe.gif'></img> ";
                correctGuess = "AFTER (" + answers[x] + ") <img class='smallArrow' src='images/beforearrowframe.gif'></img> ";
            } else {
                otherGuess = "BEFORE (" + answers[x] + ") <img class='smallArrow' src='images/beforearrowframe.gif'></img> ";
                correctGuess = "AFTER (" + answers[x] + ") <img class='smallArrow' src='images/afterarrowframe.gif'></img> ";
            }

        // firstTeam wins a point
        if ((guess > answers[x] && arrowGuess === "AFTER") || (guess < answers[x] && arrowGuess === "BEFORE") || (guess === answers[x])) {
            if (guess === answers[x]) {
                $("#timer").empty();
                $("#timer").append("<br> The answer is exactly (" + guess + ") thus, " + firstTeam + " wins the point!");
            } else {
                $("#timer").append("<br> The answer was <span id='finalAnswer'>" + otherGuess + "</span> thus, " + firstTeam + " wins the point!");
            }

            if (firstTeam === team1Name) {
                $("#one").addClass("pulse");
                $("#one").css("background-color", "green");
                team1Score++;
                $("#team1Score").html("Score: " + team1Score);
            } else {
                $("#two").addClass("pulse");
                $("#two").css("background-color", "green");
                team2Score++;
                $("#team2Score").html("Score: " + team2Score);
            }
        } else {
            // secondTeam wins a point
            $("#timer").append("<br> The answer was <span id='finalAnswer'>" + correctGuess + "</span> thus, " + secondTeam + " wins the point!");

            if (secondTeam === team1Name) {
                $("#one").addClass("pulse");
                $("#one").css("background-color", "green");
                team1Score++;
                $("#team1Score").html("Score: " + team1Score);
            } else {
                $("#two").addClass("pulse");
                $("#two").css("background-color", "green");
                team2Score++;
                $("#team2Score").html("Score: " + team2Score);
            }
        }

        // This swaps the teams
        if (firstTeam === team1Name) {
            nextTeam = team2Name;
        } else {
            nextTeam = team1Name;
        }
        $("#timer").css("font-size", "30px");
        $("#timer").css("color", "white");
        
        // This checks to see if the game is over
        if ((x >= 5) && (team1Score === team2Score)) {
            $("#timer").append("<br>WE HAVE A TIE, so 1 more question for a tie-breaker!!! <br>" + nextTeam + " will go first");
            $("#nextQuestion").show();
        } else if ((x >= 5) && (team1Score || team2Score)) {
            $("#gameOver").show();
        } else {
            $("#timer").append("<br><br><span id='guessNext'>" + nextTeam + " will be guessing first for the next round.</span>");
            $("#nextQuestion").show();
        }

    } 

    // This is for the count-down timer
    function timer() {
	    intervalId = setInterval(count, 10);
    }

    function count () {
        if (time === 0) {
            wrong.play();
            clearInterval(intervalId);
            $("#timer").css("font-size", "60px");
            $("#timer").html("TIME TO MAKE A GUESS");
            if (timeframe === "firstGuess") {
                
            }
            
        } else if (time % 100 === 0) { 
            $("#timer").css("font-size", "150px");
            if (time < 1100) {
                $("#timer").css("color", "red");
            }
            if (time < 3000) {
                $("#timer").html(time/100);
                if (timeframe === "firstGuess") {
                    $("#guessArea").show();
                }
            }
        }
        time--;
    }

    function nextTeamGuess() {
        $("#timer").hide();
        $(".teamArea").css("background-color", "black");
        $("#guessArea").hide();
        $(".arrows").fadeIn("slow");

        // For an exact guess
        if (guess === answers[x]) {
            $("#message").html("WAY TO GO " + firstTeam + "! You guessed it exactly!!! You win a point.");
            awardPoint();
        }

        // This changes the background color of the team's turn
        if (firstTeam === team1Name) {
            $("#teamName").html(team2Name + ",");
            $("#two").css("background-color", "green");
        } else {
            $("#teamName").html(team1Name + ",");
            $("#one").css("background-color", "green");
        }

        $("#message").html(" do you think it was BEFORE or AFTER the year ");
        $("#teamGuess").html(guess + "?");
        $("#timer").show();
        timeframe = "secondGuess";
        time = 3000;
        timer(); 
    }

    function checkAnswer() {
        $("#timer").show();
        $(".teamArea").css("background-color", "black");
        $("#timer").css("color", "white");
        $("#timer").css("font-size", "30px");
        $("#timer").html(firstTeam + " guessed " + guess + ", and " + secondTeam + " thinks it happened " + arrowGuess + " " + guess);
        if (arrowGuess === "BEFORE") {
            $("#timer").append("<img class='smallArrow' src='images/beforearrowframe.gif'></img> .");
        } else {
            $("#timer").append("<img class='smallArrow' src='images/afterarrowframe.gif'></img> .");
        }
        $("#checkFinalAnswer").fadeIn("slow");
    }

    function gameOver() {
        if (team1Score > team2Score) {
            $("#timer").html("Congradulations " + team1Name + "!, you have defeated " + team2Name);
        } else {
            $("#timer").html("Congradulations " + team2Name + "!, you have defeated " + team1Name);
        }
    }

});