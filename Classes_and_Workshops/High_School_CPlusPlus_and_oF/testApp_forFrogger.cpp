#include "testApp.h"

int numCircle;
float circleX[10];
float circleY[10];
float circleXRow2[10];
float circleYRow2[10];
float circleXRow3[10];
float circleYRow3[10];
int radius;

float playerX;
float playerY;
float playerSpeed;
int playerRadius;

float color[10];
float color2[10];
float color3[10];

float speedOne[10];
float speedTwo[10];
float speedThree[10];

bool keyup;
bool keydown;
bool keyleft;
bool keyright;

bool playing;
bool winning;

ofTrueTypeFont font;

//--------------------------------------------------------------
void testApp::setup(){
    numCircle = 10;
    radius = 50;
    
    playerX = ofGetWidth()/2;
    playerY = 10;
    playerSpeed = 3;
    playerRadius = 20;
    playing = false;
    winning = false;
    
    font.loadFont("Biko_Regular.otf", 24);
    
    //setup 3 rows of circles + their speed and accel
    for(int i = 0; i < numCircle; i++){
        //range of spawn is one radius short of each screen edge
        circleX[i] = ofRandom(ofGetWidth()-radius*2)+radius;
        circleY[i] = 200;
        
        circleXRow2[i] = ofRandom(ofGetWidth()-radius*2)+radius;
        circleYRow2[i] = 400;
        
        circleXRow3[i] = ofRandom(ofGetWidth()-radius*2)+radius;
        circleYRow3[i] = 600;
        
        speedOne[i] = 5;
        speedTwo[i] = 6;
        speedThree[i] = 8;

    }

}

//--------------------------------------------------------------
void testApp::update(){

    for(int i = 0; i < numCircle; i++){
        //circles start out moving right
        circleX[i] += speedOne[i];
        circleXRow2[i] += speedTwo[i];
        circleXRow3[i] += speedThree[i];
        
        //if first row of circles hit the side of screen they bounce
        if (circleX[i]+radius > ofGetWidth()){
            speedOne[i] *= -1;
        }
        
        if (circleX[i]-radius < 0){
            speedOne[i] *= -1;
        }
        
        //if second row of circles hit the side of screen they bounce
        if (circleXRow2[i]+radius > ofGetWidth()){
            speedTwo[i] *= -1;
        }
        
        if (circleXRow2[i]-radius < 0){
            speedTwo[i] *= -1;
        }
        
        //if third row of circles hit the side of screen they bounce
        if (circleXRow3[i]+radius > ofGetWidth()){
            speedThree[i] *= -1;
        }
        
        if (circleXRow3[i]-radius < 0){
            speedThree[i] *= -1;
        }
        
        //check to see if the player hits the circles
        if (ofDist(playerX, playerY, circleX[i], circleY[i]) < radius + playerRadius) {
            playing = false;
        }
        
        if (ofDist(playerX, playerY, circleXRow2[i], circleYRow2[i]) < radius + playerRadius) {
            playing = false;
        }
        
        if (ofDist(playerX, playerY, circleXRow3[i], circleYRow3[i]) < radius + playerRadius) {
            playing = false;
        }
        
        //set colors for all circles
        color[i] = ofMap(circleX[i], 0, ofGetWidth(), 0, 255, true); 
        color2[i] = ofMap(circleX[i]*3, 0, ofGetWidth(), 0, 255, true); 
        color3[i] = ofMap(circleX[i]*ofRandom(255), 0, ofGetWidth(), 0, 255, true);
    }
    
    //player movement based on bools set in keyPressed
    if (keyup == true) {
        playerY -= playerSpeed;
    }
    if (keydown == true) {
        playerY += playerSpeed;
    }
    if (keyright == true) {
        playerX += playerSpeed;
    }
    if (keyleft == true) {
        playerX -= playerSpeed;
    }
    
    if (playerY > ofGetHeight() - 20) {
        playing = false;
        winning = true;
    }
    
    if(winning == true){
        font.drawString("Win!", 100, ofGetHeight()/2);
    }
    
}

//--------------------------------------------------------------
void testApp::draw(){  
    ofBackground(125, 54, 200);
    
    if (winning == true) {
        ofSetColor(255, 255, 255);
        ofFill();
        font.drawString("You Win! Press Enter to play again!", ofGetWidth()/2, ofGetHeight()/2);
        //reset players position
        playerX = ofGetWidth()/2;
        playerY = 10;
        
    }
    
    if (playing == false){
        ofSetColor(255, 255, 255);
        ofFill();
        font.drawString("Press Enter to Start!", ofGetWidth()/2, ofGetHeight()/2);
        //reset players position
        playerX = ofGetWidth()/2;
        playerY = 10;
    } else if (playing == true) {
        ofSetColor(255, 255, 255);
        ofFill();
        font.drawString("Reach here to win!", ofGetWidth()/2, ofGetHeight()-20);
        ofCircle(playerX, playerY, playerRadius);
    
        for(int i = 0; i < numCircle; i++){
            ofSetColor(color[i], color2[i], color3[i]);
            ofFill();
            ofCircle(circleX[i], circleY[i], radius);
            ofCircle(circleXRow2[i], circleYRow2[i], radius);
            ofCircle(circleXRow3[i], circleYRow3[i], radius);
        }
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
    
    if (!playing){
        if (key == OF_KEY_RETURN) {
            playing = true;
            winning = false;
        }
    }
}

//--------------------------------------------------------------
void testApp::keyReleased(int key){

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