Liam Reynolds
GUI Progamming I
Assignment 9


  This scrabble game only contains one line of a typical game, but provides seven random tiles
for the player each time the board is reset. Based on the tiles places, the player's score is summed
using the appropriate score modifiers. When a word is submitted, the user's total score will remain, and
they are able to play an unlimited amount of additional rounds. I've found that after a large number of resets,
the large amount of .png's being loaded dynamically into the game slows down the runtime.
Although the board space resets every time a player generates new tiles, I haven't been able to solve the
runtime problem.

  The user manually resets the board after a word is played, and I was not able to implement the procedure
to generate just enough tiles to reset the player's hand to seven. Instead, all seven tiles are reset and the
game is continued. The score value is kept throughout a game over multiple rounds, and is only reset when
the page is refreshed. The structure of the game board implementation will allow for future improvements to
the game space, as well as additional ease-of-use features.
