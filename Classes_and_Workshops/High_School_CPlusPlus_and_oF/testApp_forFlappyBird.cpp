#include "testApp.h"

float playerX;
float playerY;
float playerRadius;

int numOfRects = 4;
float rectGroupX[4];
float rectGroupY[4];
float rectGroupW[4];
float rectGroupH[4];

float rectGroupLowX[4];
float rectGroupLowY[4];
float rectGroupLowW[4];
float rectGroupLowH[4];

bool space;

//--------------------------------------------------------------
void testApp::setup(){
    playerX = 100;
    playerY = ofGetHeight()/2+200;
    playerRadius = 20;
    space = false;
    
    for (int i = 0; i < numOfRects; i++) {
        rectGroupW[i] = 100;
        rectGroupH[i] = ofRandom(600);
        rectGroupY[i] = 0;
        rectGroupLowW[i] = rectGroupW[i];
        rectGroupLowH[i] = 600;
        
        if(i <= 0){
            //the first rectangle
            rectGroupX[i] = ofRandom(ofGetWidth());
        } else {
            //all of the later rectangles
            rectGroupX[i] = rectGroupX[i-1]+(rectGroupW[i]+200);
        }
        
        rectGroupLowX[i] = rectGroupX[i];
        rectGroupLowY[i] = rectGroupY[i]+(rectGroupH[i]+200);
    }
}

//--------------------------------------------------------------
void testApp::update(){
    for(int i = 0; i < numOfRects; i++){
        rectGroupX[i] -= 1;
        rectGroupLowX[i] -= 1;
        
        if(rectGroupX[i] < 0-rectGroupW[i]) {
            rectGroupX[i] = ofGetWidth()+rectGroupW[i];
            rectGroupLowX[i] = ofGetWidth()+rectGroupLowW[i];
        }
        
        //is the players position less than the bottom of the rect
        if(playerY+playerRadius < rectGroupY[i]+rectGroupH[i]){
            
            //is the players positions greater than the top of the rect
            if(playerY+playerRadius > rectGroupY[i]){
                
                //is the players position less than the right side of the rect
                if(playerX+playerRadius < rectGroupX[i]+rectGroupW[i]){
                    
                    //is the players position greater than the left side of the rect
                    if (playerX+playerRadius > rectGroupX[i]) {
                        ofBackground(100, 100, 100);
                    }
                }
            }
        }
        
        if(playerY+playerRadius < rectGroupLowY[i]+rectGroupLowH[i]){
            if(playerY+playerRadius > rectGroupLowY[i]){
                if(playerX+playerRadius < rectGroupLowX[i]+rectGroupLowW[i]){
                    if(playerX+playerRadius > rectGroupLowX[i]){
                        ofBackground(0, 0, 0);
                    }
                }
            }
        }
    }
    
    if(space){
        playerY += 3;
    } else {
        playerY -= 1;
    }
}

//--------------------------------------------------------------
void testApp::draw(){
    ofCircle(playerX, playerY, playerRadius);
    
    for(int i = 0; i < numOfRects; i++){
        ofRect(rectGroupX[i], rectGroupY[i], rectGroupW[i], rectGroupH[i]);
        ofRect(rectGroupLowX[i], rectGroupLowY[i], rectGroupLowW[i], rectGroupLowH[i]);
    }

}

//--------------------------------------------------------------
void testApp::keyPressed(int key){
    if(key == ' '){
        space = true;
    }
}

//--------------------------------------------------------------
void testApp::keyReleased(int key){
    space = false;
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