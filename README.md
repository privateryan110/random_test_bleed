# random_test_bleed
Generates a trippy pixelated pattern where each pixel's color is based off of the color of the other pixels.

This was just a curiousity created to see what would happen on a screen if every pixel was an average of all the other pixels rgb color values. 

Created with p5 and CCapture.js

For each frame the red, green, and blue values are found by averaging all the other pixels' values of the same color. 

I was shocked by how beautiful and hypnotic the result was. 

I added some functionality such as a play, pause, and restart buttn. As well as a button that changes the mode, where instead of displaying the actual color, each pixel just prints out it's green value as text. 

I also wanted to be able to record this beautiful pattern and use it as a vsualizer for a song, so I used CCapture.js framework so that, when the record button is pressed, each frame can be downloaded into a specified folder. 

These frames can then be imported into After Effects or a similar program and used to create an animation.


