/*FILE: http://weblab.cs.uml.edu/~lreynold/scrabble.html
91.61 GUI Programming I
Assignment 9: Drag & Drop Scrabble
Liam Reynolds, University of MA, Lowell. CS.
liam_reynolds@student.uml.edu
Copyright(c) 25 November 2018. All rights reserved.*/

var tiles = [ //use amount and value when distributing and tallying pieces
    {"letter":"A", "value":1,  "amount":9},
    {"letter":"B", "value":3,  "amount":2},
    {"letter":"C", "value":3,  "amount":2},
    {"letter":"D", "value":2,  "amount":4},
    {"letter":"E", "value":1,  "amount":12},
    {"letter":"F", "value":4,  "amount":2},
    {"letter":"G", "value":2,  "amount":3},
    {"letter":"H", "value":4,  "amount":2},
    {"letter":"I", "value":1,  "amount":9},
    {"letter":"J", "value":8,  "amount":1},
    {"letter":"K", "value":5,  "amount":1},
    {"letter":"L", "value":1,  "amount":4},
    {"letter":"M", "value":3,  "amount":2},
    {"letter":"N", "value":1,  "amount":6},
    {"letter":"O", "value":1,  "amount":8},
    {"letter":"P", "value":3,  "amount":2},
    {"letter":"Q", "value":10, "amount":1},
    {"letter":"R", "value":1,  "amount":6},
    {"letter":"S", "value":1,  "amount":4},
    {"letter":"T", "value":1,  "amount":6},
    {"letter":"U", "value":1,  "amount":4},
    {"letter":"V", "value":4,  "amount":2},
    {"letter":"W", "value":4,  "amount":2},
    {"letter":"X", "value":8,  "amount":1},
    {"letter":"Y", "value":4,  "amount":2},
    {"letter":"Z", "value":10, "amount":1},
    {"letter":"_", "value":0,  "amount":2}
];

var tiles_placed = [  //store which draggable tile holds which letter piece
  {"id": "tile0", "letter": " "},
  {"id": "tile1", "letter": " "},
  {"id": "tile2", "letter": " "},
  {"id": "tile3", "letter": " "},
  {"id": "tile4", "letter": " "},
  {"id": "tile5", "letter": " "},
  {"id": "tile6", "letter": " "}
];

var game_board = [  //used to keep track of which tiles are occupied by a letter
  {"id": "drop0",  "tile": "empty"},
  {"id": "drop1",  "tile": "empty"},
  {"id": "drop2",  "tile": "empty"},
  {"id": "drop3",  "tile": "empty"},
  {"id": "drop4",  "tile": "empty"},
  {"id": "drop5",  "tile": "empty"},
  {"id": "drop6",  "tile": "empty"},
  {"id": "drop7",  "tile": "empty"},
  {"id": "drop8",  "tile": "empty"},
  {"id": "drop9",  "tile": "empty"},
  {"id": "drop10", "tile": "empty"},
  {"id": "drop11", "tile": "empty"},
  {"id": "drop12", "tile": "empty"},
  {"id": "drop13", "tile": "empty"},
  {"id": "drop14", "tile": "empty"}
];

function display_score(){

  var score = 0;
  for(var i = 0; i < 15; i++){  //loop through all active pieces of game_board
    if(game_board[i].tile != "empty"){  //if game board piece has a tile on it
        for(var j = 0; j < 7; j++){
            if(tiles_placed[j].id == game_board[i].tile){ //check all active tiles to see which letter was placed
                var letter = tiles_placed[j].letter;
                score += parseInt(find_score(letter) * letter_double(i)); //calculate score of single letter
                break;
              }
          }
      }
    }

  score = score * word_double();
  $("#score").html(score);
}

function find_score(letter){  //given an active letter, find its value using tiles object

  for(var i = 0; i < 27; i++){
    if(tiles[i].letter == letter){
      var score = tiles[i].value;
      return score;
    }
  }
}

function letter_double(i){  //use to double approriate letter tile values
  if(i == 6 || i == 8){
    return 2;
  }
  else return 1;
}

function word_double(){ //use to double entire word score if necessary
  if(game_board[2].tile != "empty" || game_board[12].tile != "empty"){
    return 2;
  }
  else return 1;
}

function find_tile(dropped){
  for(var i = 0; i < 15; i++){
    if(game_board[i].id == dropped){
      return i;
    }
  }
}

function load_tiles(){

  $("#tiles").html(" ");

  for(var i = 0; i < 7; i++){
    var rand_index = random(0, 26);
    while(tiles[rand_index].amount == 0){
        rand_index = random(0, 26);
    }
    tiles[rand_index].amount--;
    var tileid = "tile" + i;

    var tile = "<img id ='" + tileid + "' class = 'tileimg" + "' src = " + "'img/scrabbletiles/" +
      tiles[rand_index].letter + ".png" + "'></img>";

    tiles_placed[i].letter = tiles[rand_index].letter;

    tileid = "#" + tileid;
    $("#tiles").append(tile);
    $(tileid).draggable();
  }
}

function make_droppable(){

  for(var i = 0; i < 15; i++){
    var dropID = "#drop" + i;
    $(dropID).droppable({
      drop: function(event, ui){
        var dragged = ui.draggable.attr("id");
        var dropped = $(this).attr("id");
        game_board[find_tile(dropped)].tile = dragged;
      }
    });
  }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
