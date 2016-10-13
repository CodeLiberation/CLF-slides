#include "testApp.h"
#include "BorderCollide.h"

float playerX;
float playerY;
float playerRadius;
float playerSpeed;
bool isHoldingObject;

int score;
int scoreX;
int scoreY;
float goalX;
float goalY;
float goalRadius;

const int numofObj = 10;
float objectX[numofObj];
float objectY[numofObj];
bool objectIsHeld[numofObj];
bool objectInGoal[numofObj];
float objectRadius;
float objectSpeedX[numofObj];
float objectSpeedY[numofObj];

// construct an instance of our BorderCollide class
BorderCollide collider;

ofTrueTypeFont font;

//--------------------------------------------------------------
void testApp::setup(){
    //initialize your variables!
    //everything in setup happens first and only once
    
    //the ball's radius
    objectRadius = 10;
    
    //set the player's position to be in the middle of the screen
    playerX = ofGetWidth()/2;
    playerY = ofGetHeight()/2;
    
    //set the players speed
    playerSpeed = 20;
    
    //the player isn't holding any balls at the start
    isHoldingObject = false;
    
    //set the player's radius
    playerRadius = 20;
    
    //set the goal to be at a random point within the screen
    goalX = ofRandom(ofGetWidth());
    goalY = ofRandom(ofGetHeight());
    
    //set the goal's radius
    goalRadius = 40;
    
    //the score is 0 at the start
    score = 0;
    scoreX = 20;
    scoreY = 30;
    font.loadFont("Biko_Regular.otf", 24);
    
    //build all of the little ball objects that the player will pick up
    for (int i = 0; i < numofObj; i++) {
        //set their positions at random points within the width of the screen
        objectX[i] = ofRandom(ofGetWidth());
        objectY[i] = ofRandom(ofGetWidth());
        // this creates a random number between -5 and 5
        // that way, some balls will move left, others will move right
        objectSpeedX[i] = ofRandom(10) - 5;
        objectSpeedY[i] = ofRandom(10) - 5;
        
        //they are not held nor are they in the goal at the start
        objectIsHeld[i] = false;
        objectInGoal[i] = false;
    }

    ofSetVerticalSync(true);
    
}

//--------------------------------------------------------------
void testApp::update(){
    //what should we do in update for this game?
    //update deals with calculations and happens every other frame (switching on and off with draw())
    ofVec3f player_pos = collider.calculate(playerX, playerY, objectRadius, ofGetWidth(), ofGetHeight());
    playerX = player_pos.x;
    playerY = player_pos.y;
    
    for (int i = 0; i < numofObj; i++) {        
       
        //sets the object position to be the same as the players position if object is held
        if (objectIsHeld[i]) {
            objectX[i] = playerX; 
            objectY[i] = playerY;
        } else if (!objectInGoal[i]) { //if the object is not in the goal and it's implicitly not being held then execute this code
            
            // calculate collisions between balls and border
            // collider is an instance of our BorderCollide class
            ofVec3f pos = collider.calculate(objectX[i], objectY[i],objectRadius, ofGetWidth(), ofGetHeight());
            objectX[i] = pos.x;
            
            // the z component of pos indicates whether either the left or right wall was just touched (1 == was touched)
            float bounced = pos.z;
            if (bounced == 1){
                // if either was, reverse the ball's movement direction
                objectSpeedX[i] *= -1;
            } else if (bounced == -1){
                objectSpeedY[i] *= -1;
            }
            objectY[i] = objectY[i] + objectSpeedY[i]*score;
            objectX[i] = objectX[i] + objectSpeedX[i]*score;
        }
        
        //ofDist calculates the distance between two points
        //In this case, between (objectX[i], objectY[i] and (playerX, playerY)
        //this if statement checks to see if the distance btw player and object is less than the sum of the object and player's radii
        if (ofDist(objectX[i], objectY[i], playerX, playerY) < objectRadius + playerRadius) { 
            
            if (!isHoldingObject && !objectInGoal[i]) {
                objectIsHeld[i] = true;
            }
        } else {
            objectIsHeld[i] = false;
        }

        //if the object is not in the goal, then check to see if it is
        //if it is, increment the score and have the player drop it
        if (!objectInGoal[i] && objectIsHeld[i]) {
            if (ofDist(objectX[i], objectY[i], goalX, goalY) < objectRadius + goalRadius) {
                score++;
                objectInGoal[i] = true;
                objectIsHeld[i] = false;
            }
        }
    }
    
}

//--------------------------------------------------------------
void testApp::draw(){
    //what should we do in draw for this game?
    //update deals with drawing (eg shapes and colors) and happens every other frame (switching on and off with update())
    ofFill();
    
    ofBackground(0, 106, 178);
    
    //tell oF you want it to fill the following shapes with color
    ofSetColor(120, 200, 255); //set the color
    ofCircle(playerX, playerY, playerRadius);
    
    ofSetColor(255, 151, 0);
    for (int i = 0; i < numofObj; i++) {
        ofCircle(objectX[i], objectY[i], objectRadius);
    }
    
    ofSetColor(178, 106, 0);
    ofCircle(goalX, goalY, goalRadius);
    
    ofSetColor(0, 0, 0);
    
    font.drawString("Score = " + ofToString(score), scoreX, scoreY);

}

//--------------------------------------------------------------
void testApp::keyPressed(int key){
    //this function listens for a key to be pressed
    //when a key is pressed, the code within the keyPressed brackets runs
    
    //move the player
    if (key == OF_KEY_UP) {
        playerY -= playerSpeed;
    } else if (key == OF_KEY_DOWN) {
        playerY += playerSpeed;
    } else if (key == OF_KEY_LEFT) {
        playerX -= playerSpeed;
    } else if (key == OF_KEY_RIGHT) {
        playerX += playerSpeed;
    }
}

//--------------------------------------------------------------
void testApp::keyReleased(int key){

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