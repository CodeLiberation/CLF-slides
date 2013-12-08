#include "testApp.h"

float snakeX[1000];
float snakeY[1000];
int arrayLength;
float snakeSpeed;
float snakeRadius;

float mineRadius;
int mineX;
int mineY;

int counter;
int timer;
int frames;

bool keyup;
bool keydown;
bool keyleft;
bool keyright;

bool playing;

//--------------------------------------------------------------
void testApp::setup(){
    arrayLength = 1000; //this is to prevent buffer overflow
    
    snakeSpeed = 5;
    snakeRadius = 5;
    
    timer = 0; //to time the increasing radius of the mine
    frames = 0; //counts frames per sec used in increasing timer
    
    counter = 10; //starts at 10 bc we start the game with 10 snake circles in set-up, thus new snake circles should start in array slots after that
    
    mineRadius = 5;
    
    playing = true;
    
    //for tracking keyPress
    keyup = false;
    keydown = false;
    keyleft = false;
    keyright = false;
    
    //start the game with a snake of 10 circles
    for (int i = 0; i < 10; i++) {
        snakeX[i] = (50+i)*2;
        snakeY[i] = (50+i)*2;
    }
    
    mineX = 500;
    mineY = 500;
}

//--------------------------------------------------------------
void testApp::update(){
    //every time a key is pressed, a new snake circle is added in the direction
    if (keyup == true){
        snakeY[counter] = snakeY[counter-1] - 2;
        snakeX[counter] = snakeX[counter-1];
    }
    if (keydown == true){
        snakeY[counter] = snakeY[counter-1] + 2;
        snakeX[counter] = snakeX[counter-1];
    }
    if (keyleft == true){
        snakeX[counter] = snakeX[counter-1] - 2;
        snakeY[counter] = snakeY[counter-1];
    }
    if (keyright == true){
        snakeX[counter] = snakeX[counter-1] + 2;
        snakeY[counter] = snakeY[counter-1];
    }
    if (keyright || keyleft || keyup || keydown){
        counter++;
    }
    
    frames++;
    if (frames%10 == 0) {
        //every ten frames we increment the timer and mine radius;
        timer++;
        mineRadius++;
    }
    
    if (timer%50 == 0 && timer != 0) {
        //game ends after timer hits 50
        playing = false;
    }
    
    if (counter == arrayLength) {
        //game ends once the snakes length is 1000 circles
        playing = false;
    }
    
    for (int i = 0; i < arrayLength; i++) {
        //detect collision btw all parts of the snake and the mine
        if (ofDist(snakeX[i], snakeY[i], mineX, mineY) < mineRadius + snakeRadius) {
            //on collision the timer and mine are reset
            timer = 0;
            mineX = ofRandom(ofGetWidth())-mineRadius;
            mineY = ofRandom(ofGetHeight())-mineRadius;
            mineRadius = 5;
        }
    }
}

//--------------------------------------------------------------
void testApp::draw(){  
    if (playing) {
        for (int i = 0; i < 1000; i++) {
            ofCircle(snakeX[i], snakeY[i], snakeRadius);
        }
    
        ofCircle(mineX, mineY, mineRadius);
    }

}

//--------------------------------------------------------------
void testApp::keyPressed(int key){
    if (key == OF_KEY_UP) {
        keyup = true;
        keydown = false;
        keyleft = false;
        keyright = false;
    }
    if (key == OF_KEY_DOWN) {
        keyup = false;
        keydown = true;
        keyleft = false;
        keyright = false;
    }
    if (key == OF_KEY_LEFT) {
        keyup = false;
        keydown = false;
        keyleft = true;
        keyright = false;
    }
    if (key == OF_KEY_RIGHT) {
        keyup = false;
        keydown = false;
        keyleft = false;
        keyright = true;
    }

}

//--------------------------------------------------------------
void testApp::keyReleased(int key){
    //need to set these to false when the player is no longer pressing a key or the snake would never stop moving
    keyup = false;
    keydown = false;
    keyleft = false;
    keyright = false;

}

//--------------------------------------------------------------
void testApp::mouseMoved(int x, int y){

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