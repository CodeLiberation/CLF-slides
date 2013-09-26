//
//  BorderCollide.cpp
//  emptyExample
//
//  Created by Nina Freeman on 9/25/13.
//  Copyright (c) 2013 __MyCompanyName__. All rights reserved.
//

#include <iostream>
#include "BorderCollide.h"

//all class methods must be prefixed with the name of the class it belongs to

BorderCollide::BorderCollide(){}

/**
 * the calculate method returns a 3-element vector containing
 * - the new x position of the collided item
 * - the new y position of the collided item
 * - the number 1 if the item touched the left or right wall, 0 otherwise
 */
ofVec3f BorderCollide::calculate(float objectX, float objectY, float objectRadius, float width, float height){
    int bounced = 0;
    
    if (objectX > width - objectRadius) { //right side
        objectX = width - objectRadius;
        bounced = 1;
    } else if (objectX < 0 + objectRadius) { //left side
        objectX = 0 + objectRadius;
        bounced = 1;
    }
    if (objectY > height - objectRadius) { //bottom
        objectY = height - objectRadius;
        bounced = -1;
    } else if (objectY < 0 + objectRadius) { //top
        objectY = 0 + objectRadius;
        bounced = -1;
    }
    return ofVec3f(objectX, objectY, bounced);
}
