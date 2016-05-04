#include "testApp.h"
float playerRadius; 
float enemyRadius; 

float enemySpeed; // We're gonna have our enemy change speed, so we make a variable for it too.
float enemyX; // The position of our enemy will definitely change, so we make a var.
float enemyY; // As above!

int score; 

bool hasLostGame; 

//--------------------------------------------------------------
void testApp::setup(){
	kinect.initSensor(); 
	kinect.initSkeletonStream(true);
	kinect.initColorStream(640, 480, true);
	kinect.initDepthStream(640, 480, true);
	kinect.start(); 
	ofDisableAlphaBlending();
	ofSetWindowShape(1280,480);
	playerRadius = 60;
	enemyY = 0 -enemyRadius;
	enemyX = ofRandom(ofGetWidth());
	enemyRadius = 30;
	enemySpeed = 5;
	score = 0;
	ofSetVerticalSync(true);
	hasLostGame = false;
}

//--------------------------------------------------------------
void testApp::update(){
	kinect.update();
	if(hasLostGame == false)
	{
		if(enemyY > ofGetHeight())
		{
			//if they dodge the circle, make it harder
			score++; //player got out the way!
			enemySpeed = enemySpeed +2;
			enemyRadius = enemyRadius +1;
			//reset the enemy position and start again
			enemyX = ofRandom(ofGetWidth());
			enemyY = 0 - enemyRadius;
		}
		enemyY = enemyY + enemySpeed;

		if(ofDist(mouseX, mouseY, enemyX, enemyY) <= playerRadius+enemyRadius)
		{
			//they are touching!
			hasLostGame = true;
		}
	}
}

//--------------------------------------------------------------
void testApp::draw(){
	//kinect.draw(640,0);
	//kinect.drawDepth(0, 0);

	ofPushStyle();
	ofSetColor(255, 0, 0);
	ofBackground(0);
	ofSetLineWidth(3.0f);
	auto skeletons = kinect.getSkeletons();
	for(auto & skeleton : skeletons) {
		for(auto & bone : skeleton) {
			if(hasLostGame == false)
			{
			ofSetColor(255,0, 0);
			ofCircle(enemyX, enemyY, enemyRadius);

			ofSetColor(0, 255, 0);
			auto head = skeleton.find(NUI_SKELETON_POSITION_HEAD);

			ofCircle(head->second.getScreenPosition(), playerRadius); 

			//ofCircle( mouseY, playerRadius);

			ofSetColor(0);
			ofDrawBitmapString("Score: "+ ofToString(score), 20, 20);
		}
		if(hasLostGame==true)
			ofDrawBitmapString("Sorry you lost! \nYour final score: " + ofToString(score)+
			"\nPress any key to go again", 20,20);
		}
	}
	//ofBackground(255, 255, 255);
	/*if(hasLostGame == false)
	{
		ofSetColor(255,0, 0);
		ofCircle(enemyX, enemyY, enemyRadius);

		ofSetColor(0, 255, 0);
		ofCircle(mouseX, mouseY, playerRadius);

		ofSetColor(0);
		ofDrawBitmapString("Score: "+ ofToString(score), 20, 20);
	}
	if(hasLostGame==true)
		ofDrawBitmapString("Sorry you lost! \nYour final score: " + ofToString(score)+
		"\nPress any key to go again", 20,20);*/
	ofPopStyle();
}

//--------------------------------------------------------------
void testApp::keyPressed(int key){

}

//--------------------------------------------------------------
void testApp::keyReleased(int key){
	if(hasLostGame)
	{
		enemyY = 0 - enemyRadius;
		enemyX = ofRandom(ofGetWidth());
		enemySpeed = 5;
		score = 0;
		hasLostGame=false;
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
