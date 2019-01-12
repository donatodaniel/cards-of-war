$(document).ready(function () {

  var audio = new Audio("audio/bgaudio.mp3");

  audio.oncanplaythrough = function () {
    audio.play();
    audio.loop = true;
  }

  $("#card1").addClass("active");
  $("#fist1").addClass("activeActive");
  newGame.totals();
  $("#oppDash").html("<span><strong>PC<br/><img src='images/heart.png' title='oppLifePoints' width='18' height='15'> " + newGame.totals()[0] + " <img src='images/fist.png' title='oppLifePoints' width='20' height='15'> " + newGame.totals()[1] + "</strong></span>");
  $("#playerDash").html("<span><strong>You<br/><img src='images/heart.png' title='oppLifePoints' width='18' height='15'> " + newGame.totals()[2] + " <img src='images/fist.png' title='oppLifePoints' width='20' height='15'> " + newGame.totals()[3] + "</strong></span>");

});

// let background = new Audio('audio/bg.mp3');
// background.play();
let amountCards = 0;
let amountPower = 1;
let fightTime = 0;
document.onkeydown = function (e) {

  switch (e.keyCode) {
    case 37:
      if (newGame.strengthSelection == 0) {
        if (amountCards >= 1) {
          $("div[class~='active'").prev().addClass("active");
          $("div[class~='active'").next().removeClass("active");
          var cardChange = new Audio('audio/cardChange.mp3');
          cardChange.play();
          amountCards--;
        }
      }
      if (newGame.strengthSelection == 1) {
        if (amountPower >= 2) {
          $("div[class~='fistActive'").last().removeClass("fistActive");
          $("#fist1").addClass("activeActive");
          console.log('left' + amountPower);
          var cardChange = new Audio('audio/cardChange.mp3');
          cardChange.play();
          amountPower--;
        }
        newGame.attackSetter(amountCards, amountPower);
        console.log(amountPower);
      }
      break;
    // Right button
    case 39:
      if (newGame.strengthSelection == 0) {
        if (amountCards <= 2) {
          $("div[class~='active'").next().addClass("active");
          $("div[class~='active'").prev().removeClass("active");
          // currentCard = $("div[class~='active'")[0].id.split('')[4];
          console.log(amountCards);
          var cardChange = new Audio('audio/cardChange.mp3');
          cardChange.play();
          $("#card1").removeClass("active");
          amountCards++;
        }
      }
      if (newGame.strengthSelection == 1) {
        if (amountPower <= (newGame.strengthPlayer - 1)) {
          $("div[class~='fistActive'").next().addClass("fistActive");
          console.log('right' + amountPower);
          amountPower++;
        }
        var fireIncrease = new Audio('audio/fireIncrease.mp3');
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
        console.log(amountPower);
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
      console.log(newGame.strengthSelection);
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


      console.log(newGame.strengthSelection);
      // $("#attack").css("visibility","visible").toggle();
      break;
    // case 38:
    //   $("div[class~='fistActive'").next().addClass("fistActive");
    // break;
    // case 40:
    //  $("div[class~='fistActive'").last().removeClass("fistActive");
    //  $("#fist1").addClass("activeActive");
    // break;

  }
}
// Create a match constructor
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

  // Shuffles the deck array
  for (let i = this.cards.length - 1; i >= 0; i--) {
    let randomNum = Math.floor(Math.random() * (i + 1));
    let value = this.cards[randomNum];

    this.cards[randomNum] = this.cards[i];
    this.cards[i] = value;
  }


  // Decide who starts the first round if it's 1 so the Plater should start otherwhise the opponent starts
  this.whoStarts = Math.random() > 0.5 ? 1 : 0;
  console.log(this.whoStarts);

};

// Choose  4 random cards for both the player and the Opponent
Match.prototype.pickCards = function () {
  //take 4 first cards from the shuffled array for the player
  for (j = 0; j <= 3; j++) {
    this.pickedCardsPlayer.push(this.cards[j]);
    $("#card" + (j + 1)).css("background-image", "url('images/" + this.pickedCardsPlayer[j].img + "')");
    $("#card" + (j + 1)).css("background-repeat", "no-repeat");
    $("#card" + (j + 1)).css("background-size", "cover");
    $("#card" + (j + 1)).css("background-size", "105% 105%");
    $("#card" + (j + 1)).css("background-position", "center");
    $("#card" + (j + 1)).attr("title", this.pickedCardsPlayer[j].description);
    // $("#card"+(j+1)).html("Name: "+this.pickedCardsPlayer[j].name +"  <br/>Power: "+this.pickedCardsPlayer[j].power+" <br/>Damage: "+this.pickedCardsPlayer[j].damage);
    console.log(this.pickedCardsPlayer[j].img);
  }

  //take 4 consecutive cards from the shuffled array for the opponent
  for (k = 4; k <= 7; k++) {
    this.pickedCardsOpp.push(this.cards[k]);
    $("#opp" + k).css("background-image", "url('images/" + this.pickedCardsOpp[(k - 4)].img + "')");
    $("#opp" + k).css("background-repeat", "no-repeat");
    $("#opp" + k).css("background-size", "cover");
    $("#opp" + k).css("background-size", "105% 105%");
    $("#opp" + k).css("background-position", "center");
    $("#opp" + k).attr("title", this.pickedCardsOpp[(k - 4)].description);
    // $("#opp"+k).html("Name: "+this.pickedCardsOpp[(k-4)].name +"  <br/>Power: "+this.pickedCardsOpp[(k-4)].power+" <br/>Damage: "+this.pickedCardsOpp[(k-4)].damage);
  }
};
// card , attack
Match.prototype.opponentStrategy = function () {
  let oppAttack = 0;
  let chooseCard = 0;
  if (this.round == 1) {
    chooseCard = Math.floor(Math.random() * this.pickedCardsOpp.length);
    this.pickedCardsOpp[chooseCard].status = false;
    this.usedCardsOpp.push(this.pickedCardsOpp[chooseCard]);
    oppAttack = this.pickedCardsOpp[chooseCard].power * (this.strengthOpp <= 1 ? 1 : Math.floor(Math.random() * (this.strengthOpp)));
    console.log(this.usedCardsOpp);

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
    
  } else  {
    this.round4 = this.round3.filter(function (g) {
      return g.status == true;
    });
    // chooseCard = 0;
    console.log(this.round4[0]);
    chooseCard = this.round4.length;
    this.round4[0].status = false;
    this.usedCardsOpp.push(this.round4[0]);
    oppAttack = this.round4[0].power * (this.strengthOpp <= 1 ? 1 : Math.floor(Math.random() * this.strengthOpp));
  }

  return [this.usedCardsOpp[this.usedCardsOpp.length - 1], oppAttack == 0 ? this.usedCardsOpp[this.usedCardsOpp.length - 1].power : oppAttack];
}

// Receive a card and see what is the card Power and multiplies the Power of the card by the strength chosen 
// The strategy of the PC and the player strategy Card and attack for each one receives the index of the card the player wants to use
Match.prototype.playerChoosesFirst = function (index, strength) {

  this.card = this.pickedCardsPlayer[index];
  this.attack = this.card.power * strength;
  this.oppStrategy = this.opponentStrategy();
  let ind = this.pickedCardsOpp.indexOf(this.oppStrategy[0]);

  setTimeout(function () {
    let newBattle = new Audio('audio/fight.mp3');
    newBattle.play();
   
    // audio.pause();
    let fightSound = new Audio('audio/FightSound.mp3');
    fightSound.play();
    // $("#oppAttack").css("background-image","url('images/back.png')");
    // $("#playerAttack").css("background-image","url('images/back.png')");
  }, 1750)

  console.log(ind);
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
  console.log(this.oppStrategy[0]);
  console.log("Opp Strength used: " + this.strengthOpp);
  console.log("Opp Attack: " + oppAttack);

  $("#battlefield").css("background-image","url(images/fightingArena"+this.round+".jpg)");
  $("#oppTitle").html("<strong>" + oppAttack + "</strong><br><img src='images/fist.png' title='oppLifePoints' width='35' height='30'> " + this.oppStrategy[0].power + " X " + (oppAttack / this.oppStrategy[0].power));

  $("#oppAttack").css("background-image", "url('images/" + this.pickedCardsOpp[ind].img + "')");
  $("#playerAttack").css("background-image", "url('images/" + this.pickedCardsPlayer[index].img + "')");

  $("#oppAttack").css("background-repeat", "no-repeat");
  $("#oppAttack").css("background-size", "cover");
  $("#oppAttack").css("background-size", "105% 105%");
  $("#oppAttack").css("background-position", "center");
  $("#playerTitle").html("<strong>" + this.attack + "</strong><br><img src='images/fist.png' title='oppLifePoints' width='35' height='30'> " + this.card.power + " X " + (this.attack / this.card.power));

  $("#playerAttack").css("background-repeat", "no-repeat");
  $("#playerAttack").css("background-size", "cover");
  $("#playerAttack").css("background-size", "105% 105%");
  $("#playerAttack").css("background-position", "center");


  if (this.attack > oppAttack) {
    this.lifePointsOpp -= this.card.damage;
    // $('#battlefield').html("Opp Attack: "+oppAttack+" vs Player Attack: "+this.attack+"<br> You won the round");
    this.attack = 0;

    // $('#opp'+chooseCard).addClass('attackCells');
    // $('#card'+chooseCard).addClass('attackCells');
    $("#oppAttack").addClass("defeated");
    $('#opp' + (ind + 4)).html("<img src='images/x.png' width=150 height=70>");
    $('#opp' + (ind + 4)).addClass("defeated");
    $('#card' + (index + 1)).html("<img src='images/winner.png' width=110 height=90>");
    setTimeout(function(){
    newResult = new Audio('audio/youwin.mp3');
    newResult.play();
    },6500);
    // return "Player";
  } else if (this.attack == oppAttack) {

    this.attack = 0;
    // return "Draw";
  } else {
    this.lifePointsPlayer -= this.oppStrategy[0].damage;
    // $('#battlefield').html("Opp Attack: "+oppAttack+" vs Player Attack: "+this.attack+"<br>  PC won the round");
    this.attack = 0;
    this.oppStrategy[0].status = false;
    $('#card' + (index + 1)).html("<img src='images/x.png' width=150 height=70>");
    $('#card' + (index + 1)).addClass("defeated");
    $('#opp' + (ind + 4)).html("<img src='images/winner.png' width=110 height=90>");

    $("#playerAttack").addClass("defeated");
    setTimeout(function(){
      newResult = new Audio('audio/youlose.mp3');
    newResult.play();
    },6500);
    
    // return "Opponent";       
  }

  setTimeout(function () {
    $('#battlefield').css('visibility', 'visible');
    $('canvas').css('visibility', 'visible');
    var audio = new Audio('audio/obliterate.wav');
    audio.play();
    // var effect = new Plugin();
    // effect.Plugin();

    setTimeout(function () {
      $('#battlefield').css('visibility', 'hidden');
      $('canvas').css('visibility', 'hidden');
      $("#playerAttack").removeClass("defeated");
      $("#oppAttack").removeClass("defeated");
    }, 9000);
  }, 1200);

  this.updateRound();
  this.updateDash();

};

Match.prototype.updateRound = function () {
  if (this.round > 3) {
    this.endOfMatch();
    this.round = 1;
  } else {
    this.round++;

    // $('.attackCells').first().nextAll().removeClass('attackCells');
    console.log(this.round);
  }
}

Match.prototype.updateLoserCard = function (index) {

}


Match.prototype.updateDash = function () {
  $("#oppDash").html("<span><strong>PC<br/><img src='images/heart.png' title='oppLifePoints' width='18' height='15'> " + this.lifePointsOpp + "<img src='images/fist.png' title='oppLifePoints' width='20' height='15'> " + this.strengthOpp + "</strong></span>");
  $("#playerDash").html("<span><strong>You<br/><img src='images/heart.png' title='oppLifePoints' width='18' height='15'> " + this.lifePointsPlayer + "<img src='images/fist.png' title='oppLifePoints' width='20' height='15'> " + this.strengthPlayer + "</strong></span>");
}

//Show the player the layout if Opponet card already defined
// Match.prototype.opponentChoosesFirst = function(){
//   let oppAttack = this.opponentStrategy()[1];

// };
Match.prototype.totals = function () {
  return [this.lifePointsOpp, this.strengthOpp, this.lifePointsPlayer, this.strengthPlayer];
};

Match.prototype.showAnimation = function () {



};

Match.prototype.endOfMatch = function () {
  console.log(this.lifePointsOpp);
  console.log(this.lifePointsPlayer);
  let newResult;
  let winner = '';
  if (this.lifePointsPlayer > this.lifePointsOpp) {
    winner = 'Player is the winner';
    newResult = new Audio('audio/youwin.mp3');
  } else if (this.lifePointsPlayer < this.lifePointsOpp) {
    winner = 'Opponent is the winner';
    newResult = new Audio('audio/youlose.mp3');
  } else {
    winner = 'It\'s a draw';

  }
  setTimeout(function () {
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

