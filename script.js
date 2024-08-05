$(document).ready(function() {
    $(".title").addClass("title-highlight");
    $(".title").addClass("title-box");
    const GAME_TYPES = {
        TWO_PLAYERS: "TWO_PLAYERS",
        EASY_AI: "EASY_AI",
        HARD_AI: "HARD_AI"
    };

    const PLAYER_TURNS = {
        HUMAN: "HUMAN",
        COMPUTER: "COMPUTER"
    };

    const ICON_CHARS = ['X', 'O'];
    let currentIconType = 0;
    let playerTurn = PLAYER_TURNS.HUMAN;
    let gameType = GAME_TYPES.TWO_PLAYERS;
    let gameState = {
        position: "",
        isTie: false
    };

    const X = '<i class="fa fa-times fa-4x" aria-hidden="true"></i>';
    const O = '<i class="fa fa-circle-o fa-4x" aria-hidden="true"></i>';
    const divArray = ["#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8", "#9"];

    function updateInfo() {
        let textInfo = '';

        if (gameState.isTie) {
            textInfo = 'Tie!';
        } else {
            if (gameType === GAME_TYPES.TWO_PLAYERS) {
                if (gameState.position === "") {
                    textInfo = `It's player(${ICON_CHARS[currentIconType]}) turn`;
                } else {
                    textInfo = `Player(${ICON_CHARS[1 - currentIconType]}) wins!`;
                }
            } else {
                if (gameState.position === "") {
                    if (playerTurn === PLAYER_TURNS.HUMAN) textInfo = `It's your turn`;
                    else textInfo = `It's computer turn`;
                } else {
                    if (playerTurn === PLAYER_TURNS.HUMAN) textInfo = `Computer wins!`;
                    else textInfo = `You win!`;
                }
            }
        }

        console.log("Update Info: ", textInfo);
    $(".info").addClass("update-info").text(textInfo);
    }

    function checkWin(a) {
        if ($("#1").hasClass(a) && $("#2").hasClass(a) && $("#3").hasClass(a) ||
            $("#4").hasClass(a) && $("#5").hasClass(a) && $("#6").hasClass(a) ||
            $("#7").hasClass(a) && $("#8").hasClass(a) && $("#9").hasClass(a) ||
            $("#1").hasClass(a) && $("#5").hasClass(a) && $("#9").hasClass(a) ||
            $("#3").hasClass(a) && $("#5").hasClass(a) && $("#7").hasClass(a) ||
            $("#1").hasClass(a) && $("#4").hasClass(a) && $("#7").hasClass(a) ||
            $("#2").hasClass(a) && $("#5").hasClass(a) && $("#8").hasClass(a) ||
            $("#3").hasClass(a) && $("#6").hasClass(a) && $("#9").hasClass(a)) {
            gameState.position = a;
            updateInfo();
            $(".cell").unbind();
            $(".cell").css("opacity", "0.6");
            $(".new-game-popup").show();
            return true;
        } else {
            return false;
        }
    }

    function checkTie() {
        if (!checkWin("cross") && !checkWin("circle")) {
            var tie = 0;
            for (var i = 0; i < divArray.length; i++) {
                if ($(divArray[i]).hasClass("cross") || $(divArray[i]).hasClass("circle")) {
                    tie += 1;
                }
            }
            if (tie === 9) {
                gameState.isTie = true;
                updateInfo();
                $(".cell").unbind();
                $(".cell").css("opacity", "0.6");
                $(".new-game-popup").show();
            }
        }
    }

    function newGame() {
        $(".cell").empty();
        $(".cell").removeClass("cross circle");
        $(".cell").css("opacity", "1");
        $(".new-game-popup").hide();
        $(".text").hide();
        gameState = {
            position: "",
            isTie: false
        };
        updateInfo();
        bindCellClickEvents();
    }

    function bindCellClickEvents() {
        $(".cell").unbind();
        if (gameType === GAME_TYPES.TWO_PLAYERS) {
            $(".cell").click(function() {
                if ($(this).html().length == 0) {
                    if (currentIconType === 0) {
                        $(X).appendTo($(this));
                        $(this).addClass("cross");
                        checkWin("cross");
                        checkTie();
                        currentIconType = 1;
                    } else {
                        $(O).appendTo($(this));
                        $(this).addClass("circle");
                        checkWin("circle");
                        checkTie();
                        currentIconType = 0;
                    }
                    updateInfo();
                }
            });
        } else if (gameType === GAME_TYPES.EASY_AI) {
            if (playerTurn === PLAYER_TURNS.HUMAN) {
                $(".cell").click(easyAi);
            } else {
                easyMove();
                $(".cell").click(easyAi);
            }
        } else if (gameType === GAME_TYPES.HARD_AI) {
            if (playerTurn === PLAYER_TURNS.HUMAN) {
                $(".cell").click(hardAi);
            } else {
                greatCounter();
                $(".cell").click(hardAi);
            }
        }
    }

    function easyMove() {
        if (!checkWin("cross")) {
            var emptyCells = $(".cell:empty");
            if (emptyCells.length > 0) {
                var randomIndex = Math.floor(Math.random() * emptyCells.length);
                var randomCell = emptyCells.eq(randomIndex);
                $(O).appendTo(randomCell);
                randomCell.addClass("circle");
                checkWin("circle");
                checkTie();
                $(".cell").click(easyAi);
            }
        }
    }

    function easyAi() {
        if ($(this).html().length == 0) {
            $(X).appendTo($(this));
            $(this).addClass("cross");
            checkWin("cross");
            checkTie();
            easyMove();
        }
    }

    function hardAi() {
        if ($(this).html().length == 0) {
            $(X).appendTo($(this));
            $(this).addClass("cross");
            checkWin("cross");
            checkTie();
            greatCounter();
        }
    }

    function youCantWin(side, a, b, c) {
        if ($(a).hasClass(side) && $(b).hasClass(side) && $(c).is(":empty") ||
            $(c).hasClass(side) && $(a).hasClass(side) && $(b).is(":empty") ||
            $(b).hasClass(side) && $(c).hasClass(side) && $(a).is(":empty")) {
            if ($(a).is(":empty")) {
                $(O).appendTo($(a));
                $(a).addClass("circle");
                checkWin("circle");
                checkTie();
                hardAi();
            } else if ($(b).is(":empty")) {
                $(O).appendTo($(b));
                $(b).addClass("circle");
                checkWin("circle");
                checkTie();
                hardAi();
            } else {
                $(O).appendTo($(c));
                $(c).addClass("circle");
                checkWin("circle");
                checkTie();
                hardAi();
            }
        } else {
            return false;
        }
    }

    function greatCounter() {
        if ($('.circle').length == 0 && $("#5").is(":empty")) {
            $(O).appendTo($("#5"));
            $("#5").addClass("circle");
        } else if ($('.circle').length == 1 && $("#5").hasClass("circle") && !youCantWin("cross", "#1", "#2", "#3") &&
            !youCantWin("cross", "#4", "#5", "#6") &&
            !youCantWin("cross", "#7", "#8", "#9") &&
            !youCantWin("cross", "#1", "#4", "#7") &&
            !youCantWin("cross", "#2", "#5", "#8") &&
            !youCantWin("cross", "#3", "#6", "#9") &&
            !youCantWin("cross", "#1", "#5", "#9") &&
            !youCantWin("cross", "#3", "#5", "#7")) {
            if ($("#1").hasClass("cross") && $("#9").hasClass("cross") || $("#3").hasClass("cross") && $("#7").hasClass("cross")) {
                $(O).appendTo($("#2"));
                $("#2").addClass("circle");
                checkWin("circle");
                checkTie();
                hardAi();
            } else {
                if ($("#3").hasClass("cross") && $("#7").is(":empty") && ($("#4").hasClass("cross") || $("#8").hasClass("cross"))) {
                    $(O).appendTo($("#7"));
                    $("#7").addClass("circle");
                    checkWin("circle");
                    checkTie();
                    hardAi();
                } else if ($("#7").hasClass("cross") && $("#3").is(":empty") && ($("#2").hasClass("cross") || $("#6").hasClass("cross"))) {
                    $(O).appendTo($("#3"));
                    $("#3").addClass("circle");
                    checkWin("circle");
                    checkTie();
                    hardAi();
                } else if ($("#1").hasClass("cross") && $("#9").is(":empty") && ($("#6").hasClass("cross") || $("#8").hasClass("cross"))) {
                    $(O).appendTo($("#9"));
                    $("#9").addClass("circle");
                    checkWin("circle");
                    checkTie();
                    hardAi();
                } else if ($("#9").hasClass("cross") && $("#1").is(":empty") && ($("#2").hasClass("cross") || $("#4").hasClass("cross"))) {
                    $(O).appendTo($("#1"));
                    $("#1").addClass("circle");
                    checkWin("circle");
                    checkTie();
                    hardAi();
                } else {
                    if ($("#3").is(":empty") && ($("#4").is(":empty") || $("#8").is(":empty"))) {
                        $(O).appendTo($("#3"));
                        $("#3").addClass("circle");
                        checkWin("circle");
                        checkTie();
                        hardAi();
                    } else {
                        $(O).appendTo($("#7"));
                        $("#7").addClass("circle");
                        checkWin("circle");
                        checkTie();
                        hardAi();
                    }
                }
            }
        } else if ($('.circle').length == 0 && $("#5").hasClass("cross") && $("#1").is(":empty")) {
            $(O).appendTo($("#1"));
            $("#1").addClass("circle");
            checkWin("circle");
            checkTie();
            hardAi();
        } else if ($("circle").length == 1 && $("cross").length == 1) {
            if ($("#1").is(":empty")) {
                $(O).appendTo($("#1"));
                $("#1").addClass("circle");
                checkWin("circle");
                checkTie();
                hardAi();
            } else {
                $(O).appendTo($("#7"));
                $("#7").addClass("circle");
                checkWin("circle");
                checkTie();
                hardAi();
            }
        } else {
            youCantWin("circle", "#1", "#2", "#3");
            youCantWin("circle", "#4", "#5", "#6");
            youCantWin("circle", "#7", "#8", "#9");
            youCantWin("circle", "#1", "#4", "#7");
            youCantWin("circle", "#2", "#5", "#8");
            youCantWin("circle", "#3", "#6", "#9");
            youCantWin("circle", "#1", "#5", "#9");
            youCantWin("circle", "#3", "#5", "#7");
            youCantWin("cross", "#1", "#2", "#3");
            youCantWin("cross", "#4", "#5", "#6");
            youCantWin("cross", "#7", "#8", "#9");
            youCantWin("cross", "#1", "#4", "#7");
            youCantWin("cross", "#2", "#5", "#8");
            youCantWin("cross", "#3", "#6", "#9");
            youCantWin("cross", "#1", "#5", "#9");
            youCantWin("cross", "#3", "#5", "#7");
            easyMove();
        }
    }

    $(".vsHuman").click(function() {
        gameType = GAME_TYPES.TWO_PLAYERS;
        newGame();
        updateInfo();
    });

    $(".vsEasy").click(function() {
        gameType = GAME_TYPES.EASY_AI;
        newGame();
        playerTurn = Math.floor(Math.random() * 2) === 1 ? PLAYER_TURNS.HUMAN : PLAYER_TURNS.COMPUTER;
        updateInfo();
    });

    $(".vsAI").click(function() {
        gameType = GAME_TYPES.HARD_AI;
        newGame();
        playerTurn = Math.floor(Math.random() * 2) === 1 ? PLAYER_TURNS.HUMAN : PLAYER_TURNS.COMPUTER;
        updateInfo();
    });

    $("#newGameBtn").click(function() {
        newGame();
        $(".new-game-popup").hide();
        updateInfo();
    });

    $(".vsHuman").click();
});
