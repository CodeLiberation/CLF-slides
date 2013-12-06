#include "testApp.h"

/* When I start programming, I try to brainstorm all the values I'll need to keep track of.
 I make variables to hold each of those values. */

float playerRadius; /* I'll use this for:
                     1) my circle-drawing function (it needs to know how wide to make the circle)
                     2) my collision detection function (it needs to know how wide it is)
                     */
float enemyRadius; // Same as above!

float enemySpeed; // We're gonna have our enemy change speed, so we make a variable for it too.
float enemyX; // The position of our enemy will definitely change, so we make a var.
float enemyY; // As above!

int score; /* We want to store our score as well. It's an int because our score will always be 
            a whole number: 1, 2, 5, 10000... if we wanted to be able to have a score like, say,
            4.5, we'd make this a float instead. */

bool hasLostGame; /* When should we display the losing message? During the game? No way! We only
                   want to display the "you lost" message IF the player has lost the game. We
                   use this boolean (true/false) as a way to keep track of whether we've lost
                   the game yet. */

//--------------------------------------------------------------
void testApp::setup(){ // Runs once, right when our app starts.
    // Give your variables a value!
    
    playerRadius = 60; // Initialize playerRadius with a value
    
    enemyY = 0 - enemyRadius; /* This starts enemyY above the screen. The x and y-points of a circle
                               are, by default, in its center, so if we made enemyY = 0, we'd see
                               half the circle hanging around at the top. If you don't believe me,
                               change this to 0 and see what happens!*/
    enemyX = ofRandom(ofGetWidth()); /* ofGetWidth() returns a value between 0 and the app's width.
                                      ofRandom, in this format, chooses a number between 0 and
                                      whatever number you pop into its parentheses.
                                      What we're saying here: choose a random number between 0
                                      and the width of the screen, and assign that value to the
                                      enemyX. */
    enemyRadius = 30; // Initialize enemyRadius with a value
    enemySpeed = 5; // Decide on the starting speed for the enemy (play with this!)
    
    score = 0; // The score should start at 0 (even if it changes later on in the game)
    
    ofSetVerticalSync(true); // Prevents screen tearing
    
    hasLostGame = false; // When we start the game, the player hasn't lost yet.
}

//--------------------------------------------------------------
void testApp::update(){
    if (hasLostGame == false) { // If we haven't lost the game yet...
        if (enemyY > ofGetHeight()) { // If the enemy went down off the bottom of the screen...
            score++; // We successfully dodged it!
            enemySpeed = enemySpeed + 2; // So make the enemy faster...
            enemyRadius = enemyRadius + 1; // And make the enemy a little bigger...
            enemyX = ofRandom(ofGetWidth()); // And choose a random x-position...
            
            enemyY = 0 - enemyRadius; // And reset the enemy at the top!
        }
        
        enemyY = enemyY + enemySpeed; /* What we are saying here is:
                                       Every frame...
                                       Take the current y-position...
                                       Find the new y-position by adding speed to the current position
                                       Take that value and store it in our current y-position var
                                       
                                       This is how we create movement!*/
        
        if (ofDist(mouseX, mouseY, enemyX, enemyY) <= playerRadius + enemyRadius) {
            /* This is long, but all we're saying is:
                If we haven't lost the game...
                Each frame...
                See if the distance between the mouse and the enemy's centerpoint...
                Is less than...
                The player radius + the enemy radius
             
                Think of it like two circles touching. When do they touch? When there's no
                distance between them. When is there no distance between them? When the distance
                you're checking is less than or equal to the sum of their radii.
             
                Try drawing it out!
            */
            hasLostGame = true; // If that happens, we've lost the game!
        }
        
        
    }
    
}

//--------------------------------------------------------------
void testApp::draw(){ // where we draw stuff
    ofBackground(255, 255, 255); // The background should always be white
    if (hasLostGame == false) { // If we haven't lost the game...
        ofSetColor(255, 0, 0); // paint the next shapes red
        ofCircle(enemyX, enemyY, enemyRadius); // draw our enemy at its x, y and with its radius
        
        ofSetColor(0, 255, 0); // change our color to green
        ofCircle(mouseX, mouseY, playerRadius); // draw our player at our mouse and with our radius
        
        ofSetColor(0); // change our color to black
        ofDrawBitmapString("Score: " + ofToString(score), 20, 20); // Draw our score
    }
    
    if (hasLostGame == true) { // If we have lost the game...
        ofDrawBitmapString("Sorry, you lost! \nYour final score: " + ofToString(score) + "\nPress any key to restart!", 20, 20); // Draw our losing message and final score.
    }
    
    /* 
     ofDrawBitmapString is a function that draws a string in a system font at a given location.
     Is our score a string? No--if you scroll up, you see we stored it as an int! We can change it
     to a string by using ofToString, though. We glue it to the end of our other string by using
     the + operator.
     
     \n is an escape character that just means: put a paragraph break here!
     
     The last two numbers are just the x and y position of the top-left corner of your string.
     */
    
}

//--------------------------------------------------------------
void testApp::keyPressed(int key){

}

//--------------------------------------------------------------
void testApp::keyReleased(int key){ // Fires when any key is released
    if (hasLostGame) {  /* Why do we need this if-statement? Well, should you be able to 
                         restart the game if you haven't lost yet? For some games, sure.
                         For this game, we're limiting your ability to restart to when
                         you've actually lost the game.
                         */
        
        /* We just reset all our starting variables and change hasLostGame to false, so
         our game actually plays again.
         
         You might notice this is a copy of code we've already written. In general, we want
         to avoid that. For an extra challenge, see if you can encapsulate this code in a
         function!
         */
        enemyY = 0 - enemyRadius;
        enemyX = ofRandom(ofGetWidth());
        enemyRadius = 30;
        enemySpeed = 5;
        
        score = 0;
        
        hasLostGame = false;
    }

}

//--------------------------------------------------------------
void testApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void testApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void testApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void testApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void testApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void testApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void testApp::dragEvent(ofDragInfo dragInfo){ 

}