$(document).ready(function() {
  var turn = true;
  var X = '<i class="fa fa-times fa-4x" aria-hidden="true"></i>';
  var O = '<i class="fa fa-circle-o fa-4x" aria-hidden="true"></i>';
  var divArray = ["#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8", "#9"];

  function checkWin(a) {
      console.log("Checking win for:", a);
      if ($("#1").hasClass(a) && $("#2").hasClass(a) && $("#3").hasClass(a) ||
          $("#4").hasClass(a) && $("#5").hasClass(a) && $("#6").hasClass(a) ||
          $("#7").hasClass(a) && $("#8").hasClass(a) && $("#9").hasClass(a) ||
          $("#1").hasClass(a) && $("#5").hasClass(a) && $("#9").hasClass(a) ||
          $("#3").hasClass(a) && $("#5").hasClass(a) && $("#7").hasClass(a) ||
          $("#1").hasClass(a) && $("#4").hasClass(a) && $("#7").hasClass(a) ||
          $("#2").hasClass(a) && $("#5").hasClass(a) && $("#8").hasClass(a) ||
          $("#3").hasClass(a) && $("#6").hasClass(a) && $("#9").hasClass(a)) {
          console.log(a + " wins!");
          $(".cell").unbind();
          $(".cell").css("opacity", "0.6");
          $(".text h1").html(a + " Wins!");
          $(".text").show();
          return true;
      } else {
          return false;
      }
  }

  function checkTie() {
      console.log("Checking for tie");
      if (checkWin("cross") === false && checkWin("circle") === false) {
          var tie = 0;
          for (var i = 0; i < divArray.length; i++) {
              if ($(divArray[i]).hasClass("cross") || $(divArray[i]).hasClass("circle")) {
                  tie += 1;
              }
          }
          if (tie === 9) {
              console.log("It's a tie!");
              $(".cell").unbind();
              $(".cell").css("opacity", "0.6");
              $(".text h1").html("It's a Tie!");
              $(".text").show();
          }
      } else {
          checkWin("cross");
          checkWin("circle");
      }
  }

  function newGame() {
      console.log("Starting a new game");
      $(".cell").empty();
      $(".cell").removeClass("cross circle");
      $(".cell").css("opacity", "1");
      $(".text").hide();
      $(".cell").unbind();
  }

  function easyMove() {
      console.log("Easy AI is making a move");
      if (checkWin("cross") === false) {
          var emptyCells = $(".cell:empty");
          if (emptyCells.length > 0) {
              var randomIndex = Math.floor(Math.random() * emptyCells.length);
              var randomCell = emptyCells.eq(randomIndex);
              console.log("Easy AI places O in:", randomCell.attr("id"));
              $(O).appendTo(randomCell);
              randomCell.addClass("circle");
              checkWin("circle");
              checkTie();
              $(".cell").click(easyAi);
          }
      } else {
          checkWin("cross");
          checkWin("circle");
          checkTie();
      }
  }

  function easyAi() {
      console.log("Human moves vs Easy AI");
      if ($(this).html().length == 0) {
          $(X).appendTo($(this));
          $(this).addClass("cross");
          checkWin("cross");
          checkTie();
          easyMove();
      }
  }

  function hardAi() {
      console.log("Human moves vs Hard AI");
      if ($(this).html().length == 0) {
          $(X).appendTo($(this));
          $(this).addClass("cross");
          checkWin("cross");
          checkTie();
          greatCounter();
      }
  }

  function youCantWin(side, a, b, c) {
      console.log("AI is checking youCantWin for side:", side);
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
      console.log("Hard AI is making a move");
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
      console.log("Starting Human vs Human game");
      newGame();
      $(".cell").click(function() {
          if ($(this).html().length == 0) {
              if (turn) {
                  $(X).appendTo($(this));
                  $(this).addClass("cross");
                  checkWin("cross");
                  checkTie();
                  turn = false;
              } else {
                  $(O).appendTo($(this));
                  $(this).addClass("circle");
                  checkWin("circle");
                  checkTie();
                  turn = true;
              }
          }
      });
  });

  $(".vsEasy").click(function() {
      console.log("Starting Human vs Easy AI game");
      newGame();
      var chooseFirst = Math.floor(Math.random() * 2);
      if (chooseFirst === 1) {
          $(".cell").click(easyAi);
      } else {
          easyMove();
          $(".cell").click(easyAi);
      }
  });

  $(".vsAI").click(function() {
      console.log("Starting Human vs Hard AI game");
      newGame();
      var chooseFirst = Math.floor(Math.random() * 2);
      if (chooseFirst === 1) {
          greatCounter();
          $(".cell").click(hardAi);
      } else {
          $(".cell").click(hardAi);
      }
  });

  $(".vsHuman").click();
});
