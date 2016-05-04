#pragma once

#include "ofMain.h"

class testApp : public ofBaseApp{

	public:
		void setup();
		void update();
		void draw();

		void keyPressed  (int key);
		void keyReleased(int key);
		void mouseMoved(int x, int y );
		void mouseDragged(int x, int y, int button);
		void mousePressed(int x, int y, int button);
		void mouseReleased(int x, int y, int button);
		void windowResized(int w, int h);
		void dragEvent(ofDragInfo dragInfo);
		void gotMessage(ofMessage msg);
    
    /* Hello brave code explorer! Welcome to testApp.h.
     
     If you've programmed before/have done OOP before, these additional details may make sense to you. If not, don't worry about it!:
        - This is where you might define your global variables (rather than at the top of testApp.h)
        - You can also prototype your functions here.
     */
		
};
