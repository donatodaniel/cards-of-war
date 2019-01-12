/*
  Important = Player (who will play the game) | Opponnet  = the Machine(the logics created under the hood)
*/ 


$(document).ready(function () {

  let audio = new Audio("audio/bgaudio.mp3");
  audio.oncanplaythrough = function () {
    audio.play();
    audio.loop = true;
  }

  // Add a class 'active' to the first card of the player so that he can use right and left arrow to select his cards
  $("#card1").addClass("active");
  $("#fist1").addClass("activeActive");

  //Sets Opponnets and Players Life Points and Strength points on Dashboard
  newGame.totals();
  $("#oppDash").html("<span><strong>Machine<br/><img src='images/heart.png' title='oppLifePoints' width='18' height='15'> " + newGame.totals()[0] + " <img src='images/fist.png' title='oppLifePoints' width='20' height='15'> " + newGame.totals()[1] + "</strong></span>");
  $("#playerDash").html("<span><strong>You<br/><img src='images/heart.png' title='playerPoints' width='18' height='15'> " + newGame.totals()[2] + " <img src='images/fist.png' title='oppLifePoints' width='20' height='15'> " + newGame.totals()[3] + "<br/><i>XP</i></strong> "+ newGame.playerExperience+"</span>");



});

/* There are being created variables to control which div the user is currently on whenever his moving to the right or left
  amountCards = current card
  amountPower = is how many strength was selected to be played
  fightTime  = is used to count the second time button 'Enter' is pressed, so that it can set the battleField to appear on the screen
*/
let amountCards = 0;
let amountPower = 1;
let fightTime = 0;
document.onkeydown = function (e) {

  /*Here we have the control for the keys pressed by the user and change classes so that the elements appear of be heighlighted in the DOM
  If its in Pickup card mode users moves right or left
  If its in Select the Attach mode it increases the amountPower 
  If pressed Esc user can decide not to continue with that card
  */

  switch (e.keyCode) {
    //Left Button
    case 37:
      if (newGame.strengthSelection == 0) {
        if (amountCards >= 1) {
          $("div[class~='active'").prev().addClass("active");
          $("div[class~='active'").next().removeClass("active");
          let cardChange = new Audio('audio/cardChange.mp3');
          cardChange.play();
          amountCards--;
        }
      }
      if (newGame.strengthSelection == 1) {
        if (amountPower >= 2) {
          $("div[class~='fistActive'").last().removeClass("fistActive");
          $("#fist1").addClass("activeActive");
          let cardChange = new Audio('audio/cardChange.mp3');
          cardChange.play();
          amountPower--;
        }
        newGame.attackSetter(amountCards, amountPower);
      }
      break;
    // Right Button
    case 39:
      if (newGame.strengthSelection == 0) {
        if (amountCards <= 2) {
          $("div[class~='active'").next().addClass("active");
          $("div[class~='active'").prev().removeClass("active");
          let cardChange = new Audio('audio/cardChange.mp3');
          cardChange.play();
          $("#card1").removeClass("active");
          amountCards++;
        }
      }
      if (newGame.strengthSelection == 1) {
        if (amountPower <= (newGame.strengthPlayer - 1)) {
          $("div[class~='fistActive'").next().addClass("fistActive");
          amountPower++;
        }
        let fireIncrease = new Audio('audio/fireIncrease.mp3');
        fireIncrease.play();
        newGame.attackSetter(amountCards, amountPower);
      }
      break;
    case 13:
      if (newGame.strengthSelection == 0) {
        newGame.strengthSelection++;
        $("#attack").css("visibility", "visible");
      } else {
        newGame.strengthSelection--;
        $("#attack").css("visibility", "hidden")
      }
      if (fightTime >= 1) {
        newGame.playerChoosesFirst(amountCards, amountPower);
        newGame.showAnimation();
        let prepare = new Audio('audio/prepareYourself.mp3');
        prepare.play();
        amountPower = 1;
        $("div[class~='fistActive'").first().nextAll().removeClass("fistActive");
        fightTime = 0;
      } else {
        fightTime++;
        newGame.attackSetter(amountCards, amountPower);
      }
      break;
    case 27:
      if (newGame.strengthSelection == 1) {
        newGame.strengthSelection--;
        $("#attack").css("visibility", "hidden")
      }
      if (fightTime > 0) {
        fightTime--;
        $("div[class~='fistActive'").first().nextAll().removeClass("fistActive");
        amountPower = 1;
      }


      break;

  }
}
// Create a match constructor to start the Game with all variables needed for the game
let Match = function (cards) {
  this.cards = cards;
  this.level = 0;
  this.round = 1;
  this.round2 = 0;
  this.round3 = 0;
  this.round4 = 0;
  this.whoStarts = 1;
  this.strengthSelection = 0;

  this.lifePointsPlayer = 12;
  this.strengthPlayer = 12;
  this.attack = 0;
  this.pickedCardsPlayer = [];
  this.usedCardsPlayer = [];
  this.playerExperience = 0;

  this.lifePointsOpp = 12;
  this.strengthOpp = 12;
  this.pickedCardsOpp = [];
  this.usedCardsOpp = [];
  this.oppStrategy = [];
  this.log = [];

};

// Suffle the array of cards
Match.prototype.shuflleCards = function () {

  for (let i = this.cards.length - 1; i >= 0; i--) {
    let randomNum = Math.floor(Math.random() * (i + 1));
    let value = this.cards[randomNum];
    this.cards[randomNum] = this.cards[i];
    this.cards[i] = value;
  }


  // Decide who starts the first round if it's 1 so the Plater should start otherwhise the opponent starts
  this.whoStarts = Math.random() > 0.5 ? 1 : 0;

};

// Choose  4 random cards for both the player and the Opponent and set them as background in the DOM Divs
Match.prototype.pickCards = function () {
  for (j = 0; j <= 3; j++) {
    this.pickedCardsPlayer.push(this.cards[j]);
    $("#card" + (j + 1)).css("background-image", "url('images/" + this.pickedCardsPlayer[j].img + "')");
    $("#card" + (j + 1)).css("background-repeat", "no-repeat");
    $("#card" + (j + 1)).css("background-size", "cover");
    $("#card" + (j + 1)).css("background-size", "105% 105%");
    $("#card" + (j + 1)).css("background-position", "center");
    $("#card" + (j + 1)).attr("title", this.pickedCardsPlayer[j].description);
    this.cards[j].status = true;
  }

  for (k = 4; k <= 7; k++) {
    this.pickedCardsOpp.push(this.cards[k]);
    $("#opp" + k).css("background-image", "url('images/" + this.pickedCardsOpp[(k - 4)].img + "')");
    $("#opp" + k).css("background-repeat", "no-repeat");
    $("#opp" + k).css("background-size", "cover");
    $("#opp" + k).css("background-size", "105% 105%");
    $("#opp" + k).css("background-position", "center");
    $("#opp" + k).attr("title", this.pickedCardsOpp[(k - 4)].description);
    this.cards[k].status = true;
  }
};
// For each round the script chooses one out of the 4 card the Opponent has to battle, and also chooses how many strength capsules are going to be used against player
Match.prototype.opponentStrategy = function () {
  let oppAttack = 0;
  let chooseCard = 0;
  if (this.round == 1) {
    chooseCard = Math.floor(Math.random() * this.pickedCardsOpp.length);
    this.pickedCardsOpp[chooseCard].status = false;
    this.usedCardsOpp.push(this.pickedCardsOpp[chooseCard]);
    oppAttack = this.pickedCardsOpp[chooseCard].power * (this.strengthOpp <= 1 ? 1 : Math.floor(Math.random() * (this.strengthOpp)));

  } else if (this.round == 2) {
    this.round2 = this.pickedCardsOpp.filter(function (e) {
      return e.status == true;
    });
    chooseCard = Math.floor(Math.random() * this.round2.length);
    this.round2[chooseCard].status = false;
    this.usedCardsOpp.push(this.round2[chooseCard]);
    oppAttack = this.round2[chooseCard].power * (this.strengthOpp <= 1 ? 1 : Math.floor(Math.random() * (this.strengthOpp)));

  } else if (this.round == 3) {

    this.round3 = this.round2.filter(function (f) {
      return f.status == true;
    });
    chooseCard = Math.floor(Math.random() * this.round3.length);
    this.round3[chooseCard].status = false;
    this.usedCardsOpp.push(this.round3[chooseCard]);
    oppAttack = this.round3[chooseCard].power * (this.strengthOpp <= 1 ? 1 : Math.floor(Math.random() * (this.strengthOpp)));

  } else {
    this.round4 = this.round3.filter(function (g) {
      return g.status == true;
    });
    chooseCard = this.round4.length;
    this.round4[0].status = false;
    this.usedCardsOpp.push(this.round4[0]);
    oppAttack = this.round4[0].power * (this.strengthOpp <= 1 ? 1 : Math.floor(Math.random() * this.strengthOpp));
  }

  return [this.usedCardsOpp[this.usedCardsOpp.length - 1], oppAttack == 0 ? this.usedCardsOpp[this.usedCardsOpp.length - 1].power : oppAttack];
}

// Receive a card and see what is the card Power and multiplies the Power of the card by the strength chosen 
// The strategy of the Opponent and the player strategy Card and attack for each one receives the index of the card the player wants to use
Match.prototype.playerChoosesFirst = function (index, strength) {

  this.card = this.pickedCardsPlayer[index];
  this.attack = this.card.power * strength;
  this.oppStrategy = this.opponentStrategy();
  let ind = this.pickedCardsOpp.indexOf(this.oppStrategy[0]);

  setTimeout(function () {
    let newBattle = new Audio('audio/fight.mp3');
    newBattle.play();

    let fightSound = new Audio('audio/FightSound.mp3');
    fightSound.play();
  }, 1750)

  //Even though the player or opponnent run out of Strength points they always be granted with at least 1 Strength Point
  if (this.strengthPlayer < 1) {
    this.strengthPlayer = 1;
  } else {
    this.strengthPlayer -= strength;
  }

  let oppAttack = this.oppStrategy[1] == 0 ? this.oppStrategy[0].power : this.oppStrategy[1];
  if (this.strengthOpp < 1) {
    this.strengthOpp = 1;
  } else {
    this.strengthOpp -= (this.oppStrategy[1] / this.oppStrategy[0].power);
  }

  //Show the battlefield and the current cards to be dueling in the field
  $("#battlefield").css("background-image", "url(images/fightingArena" + this.round + ".jpg)");
  $("#oppTitle").html("<strong>Machine<br/>" + oppAttack + "</strong><br><img src='images/fist.png' title='oppLifePoints' width='35' height='30'> " + this.oppStrategy[0].power + " X " + (oppAttack / this.oppStrategy[0].power));
  $("#oppAttack").css("background-image", "url('images/" + this.pickedCardsOpp[ind].img + "')");
  $("#playerAttack").css("background-image", "url('images/" + this.pickedCardsPlayer[index].img + "')");
  $("#oppAttack").css("background-repeat", "no-repeat");
  $("#oppAttack").css("background-size", "cover");
  $("#oppAttack").css("background-size", "105% 105%");
  $("#oppAttack").css("background-position", "center");
  $("#playerTitle").html("<strong>You<br/>" + this.attack + "</strong><br><img src='images/fist.png' title='oppLifePoints' width='35' height='30'> " + this.card.power + " X " + (this.attack / this.card.power));
  $("#playerAttack").css("background-repeat", "no-repeat");
  $("#playerAttack").css("background-size", "cover");
  $("#playerAttack").css("background-size", "105% 105%");
  $("#playerAttack").css("background-position", "center");


  //At this moment we compare who wins the current round based on who has the bigger attack and zeros the Player attack for next round
  if (this.attack > oppAttack) {
    this.lifePointsOpp -= this.card.damage;
    this.playerExperience += (this.attack - oppAttack);
    $("#oppAttack").addClass("defeated");
    $('#opp' + (ind + 4)).html("<img src='images/x.png' width=150 height=70>");
    $('#opp' + (ind + 4)).addClass("defeated");
    $('#card' + (index + 1)).html("<img src='images/winner.png' width=110 height=90>");
    
    setTimeout(function () {
      newResult = new Audio('audio/youwin.mp3');
      newResult.play();
    }, 6500);
    this.attack = 0;

  } else if (this.attack == oppAttack) {

    this.attack = 0;
  } else {
    this.lifePointsPlayer -= this.oppStrategy[0].damage;
    this.attack = 0;
    this.oppStrategy[0].status = false;
    $('#card' + (index + 1)).html("<img src='images/x.png' width=150 height=70>");
    $('#card' + (index + 1)).addClass("defeated");
    $('#opp' + (ind + 4)).html("<img src='images/winner.png' width=110 height=90>");
    $("#playerAttack").addClass("defeated");
    setTimeout(function () {
      newResult = new Audio('audio/youlose.mp3');
      newResult.play();
    }, 6500);

  }

  //Show the effect that seems lightbeams are being triggered between dueling cards
  setTimeout(function () {
    $('#battlefield').css('visibility', 'visible');
    $('canvas').css('visibility', 'visible');
    let audio = new Audio('audio/attack.mp3');
    audio.play();

    setTimeout(function () {
      $('#battlefield').css('visibility', 'hidden');
      $('canvas').css('visibility', 'hidden');
      $("#playerAttack").removeClass("defeated");
      $("#oppAttack").removeClass("defeated");
    }, 9000);
  }, 1200);

  //Update the round Dashboards
  this.updateRound();
  this.updateDash();

};

Match.prototype.updateRound = function () {
  if (this.round > 3) {
    this.endOfMatch();
    this.round = 1;
  } else {
    this.round++;

  }
}

Match.prototype.updateLoserCard = function (index) {

}


Match.prototype.updateDash = function () {
  $("#oppDash").html("<span><strong>Machine<br/><img src='images/heart.png' title='oppLifePoints' width='18' height='15'> " + this.lifePointsOpp + "<img src='images/fist.png' title='oppLifePoints' width='20' height='15'> " + this.strengthOpp + "</strong></span><br/>");
  $("#playerDash").html("<span><strong>You<br/><img src='images/heart.png' title='oppLifePoints' width='18' height='15'> " + this.lifePointsPlayer + "<img src='images/fist.png' title='oppLifePoints' width='20' height='15'> " + this.strengthPlayer + "<br/>XP</strong> "+ this.playerExperience+"</span>");
}

Match.prototype.totals = function () {
  return [this.lifePointsOpp, this.strengthOpp, this.lifePointsPlayer, this.strengthPlayer];
};

Match.prototype.showAnimation = function () {



};

Match.prototype.endOfMatch = function () {
  let newResult;
  let winner = '';
  if (this.lifePointsPlayer > this.lifePointsOpp) {
    winner = 'You win! You\'ve increased your XP points to ' + this.playerExperience + '!';
  } else if (this.lifePointsPlayer < this.lifePointsOpp) {
    winner = 'Game Over! The Machine is the winner';
    this.playerExperience = 0;
  } else {
    winner = 'It\'s a draw';

  }
  setTimeout(function () {

    newResult = new Audio('audio/matchEnd.mp3');
    newResult.play();
    alert(winner);
  }, 5500);
  this.pickedCardsOpp = [];
  this.pickedCardsPlayer = [];
  this.lifePointsOpp = 12;
  this.lifePointsPlayer = 12;
  this.strengthOpp = 12;
  this.strengthPlayer = 12;
  this.round2 = [];
  this.round3 = [];
  this.round4 = [];
  this.shuflleCards();
  this.pickCards();
  $('.cells').removeClass('defeated');
  $('.cells').html('');



}

Match.prototype.attackSetter = function (index, amountPower) {

  $("#selectedCard").css("background-image", "url('images/" + this.pickedCardsPlayer[index].img + "')");
  $("#selectedCard").css("background-repeat", "no-repeat");
  $("#selectedCard").css("background-size", "cover");
  $("#selectedCard").css("background-size", "105% 105%");
  $("#selectedCard").css("background-position", "center");
  $("#selectedCard").css("filter", "none");
  $("#selectedDescription").html("<h1><stron>Attack:</strong> " + (amountPower * this.pickedCardsPlayer[index].power) + "</h1><br/><stron>Name:</stron> " + this.pickedCardsPlayer[index].name + "<br/><stron>Element:</stron> " + this.pickedCardsPlayer[index].element + "<br/><stron>Description:</strong> " + this.pickedCardsPlayer[index].description + "<br/>");

}

Match.prototype.createMatch = function () {
  for (let g = 1; g <= 4; g++) {
    // round 1
    switch (this.round) {
      case 1:
        if (this.whoStarts == 1) {
          //Player start to select cards
        } else {
          //Show opponents cards
        }
        break;
      case 2:
        if (this.whoStarts == 1) {
          //Show opponents cards
        } else {
          //Player start to select cards
        }
        break;
      case 3:
        if (this.whoStarts == 1) {
          //Player start to select cards
        } else {
          //Show opponents cards
        }
        break;
      case 4:
        if (this.whoStarts == 1) {
          //Show opponents cards
        } else {
          //Player start to select cards
        }
        break;
    }

  }

}

let newGame = new Match(deck);

newGame.shuflleCards();
newGame.pickCards();
newGame.createMatch();

