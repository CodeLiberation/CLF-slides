//
//  main.cpp
//  ReturningPointers
//
//  Created by Phoenix Perry on 7/17/13.
//  Copyright (c) 2013 Phoenix Perry. All rights reserved.
//

#include <iostream>

#include <vector>

using namespace std;

//returns a pointer to a string
string *ptrToElement(vector<string>* const pVect, int i);


int main(int argc, const char * argv[])
{
    vector<string>  inventory;
    inventory.push_back("sword");
    inventory.push_back("armor");
    inventory.push_back("shield");
    
    cout<< "sending the objects pointed to by returned pointer:\n";
    
    cout<< *(ptrToElement(&inventory, 0)) << endl;
    
    //assigning one pointer to another
    cout << "assigning one pointer to another"<< endl;
    string *pStr = ptrToElement(&inventory, 1);
    
    cout << *pStr << endl;
    
    cout << "assigning dereferenced pointer to string"<< endl;
    string str = *(ptrToElement(&inventory,2));
                   
    cout << str << endl;
    
    cout << "changing what it in the first vector slot via deference" << endl;
    *pStr = "crossbow";
    
    cout<< *(ptrToElement(&inventory, 1))<< endl;
    
    return 0;
}

    string *ptrToElement(vector<string>* const pVect, int i){
        return &((*pVect)[i]);
                   
    }
