# **Sea Battle Game - light edition**
Sea Battle Game - is a light console version of the popular game all over the world!

## To install sea-battle
```sh
$ git clone git@github.com:dkalabukhov/hexlet-sea-battle.git
$ make install
```

## Game rules
The player is asked to determine the square of the playing field with sides from 4 to 10 cells.\
The game uses single-deck ships (1 ship - 1 cell).\
The player is also asked to choose the number of ships (no more than 5 is recommended).

Game designations:\
&#x21AF; - hit\
&#x2716; - miss\
&#x0394; - player's ship\
&#x2248; - sea wave ("fog of war")

Victory condition: the player must be the first to destroy all enemy ships.

## To play sea-battle
```sh
$ make sea-battle
```

## Playthrough Gameplay
[![asciicast](https://asciinema.org/a/7UBQ6p029cZ0ESFavu2CdsEvX.svg)]( https://asciinema.org/a/7UBQ6p029cZ0ESFavu2CdsEvX)
