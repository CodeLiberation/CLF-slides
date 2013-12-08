//
//  BorderCollide.h
//  emptyExample
//
//  Created by Nina Freeman on 9/25/13.
//  Copyright (c) 2013 __MyCompanyName__. All rights reserved.
//

#ifndef emptyExample_BorderCollide_h
#define emptyExample_BorderCollide_h

#include "ofMain.h"

//this is the class interface, it defines the constructor and methods belonging to the class. You can use it to make objects that do lots of different things!
class BorderCollide{
public:
    //this is the declaration of the class constructor, it's like a blueprint
    BorderCollide();
    
    //calculate is a method of the BorderCollide class
    ofVec3f calculate(float objectX, float objectY, float objectRadius, float width, float height);
};

#endif
