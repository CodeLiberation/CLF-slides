//
//  main.cpp
//  EnumsRandomsForLoopsOhMy
//
//  Created by Phoenix Perry on 6/26/13.
//  Copyright (c) 2013 Phoenix Perry. All rights reserved.
//

#include <iostream>
#include <stdio.h> //printf, NULL
#include <time.h> //time -- aka the system clock
#include <stdlib.h> //random
#include <vector>
using namespace std;

//this is an enum, a special primative data type in c++ that associates words with unsigned ints.
//to use it you first must declare it
enum difficulty {NOVICE, EASY, HARD};
//then you must instantiate it to a variable.
difficulty mydifficulty = EASY;
int main(int argc, const char * argv[])
{
    //now we can use it as a condition ofr a if statement. 
    if(mydifficulty == EASY){
        
        cout << "this player is just getting started in easy mode"<< endl;
        
    }
    //you can call it by name or number
    if(mydifficulty == 1){
        cout << "this also works to tell me the player is in easy mode"<< endl;
    }
    
    
    //This will be the same every time this program runs
    printf("random number that's always the same:\n" , rand()%100);
    
    //seed it with the current time
    srand(time(0));
    //random numbers in a range. This will be the different every time a program runs
    //note that %d is an escape character
    printf("random number %d\n", rand()%100);
    
    //random numbers in a range. This will be the exact every time a program runs
    srand(1);
    printf("srand seed to 1 will always be: ", rand());
    
    //however if we immediately reseed it it will be at the same time as the first value, 0, hence the same
    srand(time(0));
    printf("another number at the same time as the first value: \n", rand()%100);
    
    //here's how to get a range from 0 to 5
    for (int nCount=0; nCount <10; ++nCount) {
        //ok here's easy modulus and how I always think of it. In this case it's an interval counter counting down to 0 to the number after %. Hence, every 5 numbers you get a line break. Oh so much easier than math. :)
            //also note /t is a tab escape character
        cout<< rand()%5 << "\t";
        if((nCount+1)%5 ==0)
            cout<< endl;
    }
    
    //here's how to get a range of numbers
    int low = 10;
    int high = 20;
    
    for(int i =0; i<5; i++)
    {
        int mynum = rand()% (high-low +1)+low;
        cout << "a random in a range of 10 to 20 " << mynum << endl;
    }
    
    
    // we use the dot syntax to access the member function of the string object and find where a word starts
    string myString = "game over";
    
    int location = myString.find("over");
    
    cout << location << " this is the location of the start of over" <<endl;
    if(myString.find("eggplant") == string::npos){
        cout<< "eggplant is not in mySting"<<endl;
    }
    

    string myNewWord = "hey!";
    
    myString += "hey";
  
    
    cout << myString << "after adding hey" << endl;
   
    //your first dumb container, an array. It's super stupid in c++ - it doesn't even know how large it is. Really.
    //they are the dumbest arrays you will ever encounter. also their size MUST be a const or a whole number values.
    const int SLOTS= 10;
    int myFirstArray[SLOTS] ={ 22,55,33,2523,10,2,3,4,5,1 };
    //string myFirstStringArray[3] = { "sam", "george" , "fred"};
    
    for (int i = 0; i < SLOTS; i++) {
        cout << myFirstArray[i] << " element in myFirstArray "<< endl;
    }
    
    myFirstArray[0] = 5;
    
    for (int i = 0; i < 5; i++) {
        cout << myFirstArray[i] << " element in myFirstArray "<< endl;
    }
    
 
    //here's a multidimentional array. arrays can be made of rows and colums like tables of data. read your book here!
    
    
    
    const int ROWS = 3;
    const int COLUMNS = 3;
    
    string board[ROWS][COLUMNS] = {
        { "x", "x", "x"},
        { "x", "x", "o"},
        { "o", "x", "o"},
    };
    
    //for loops turn out to be really handy for iterating over arrays.  
    for(int i =0; i < ROWS; i++){
        for(int j = 0; j < COLUMNS; j ++) {
            cout<< board[i][j];
        }
        cout << endl;
    }
    
    //vectors, oh so much more awesome than arrays. flexible, smart and great. just don't try and add things with []
    vector<string> list;
    
    list.push_back("axe");
    list.push_back("sword");
    list.push_back("shield");

    list.pop_back();

    vector<string> myStrings(10, "nothing");
    myStrings.clear();
    
    
    
    //iterators - aka your sticky on the object that will allow you to dereference them to get to the object itself.
    //i know... reference types can be deferenced with this little asterisk *. this is where c++ is different that
    //anything else you have ever used. reference types must be memory managed from the stack. primatives are managed from the heap. More on this in the next class.
    
    vector <string> :: iterator iter;
    
    for(iter = list.begin(); iter!=list.end(); ++iter){
        cout << *iter << endl;
    }
    
    
    
    //ok run screaming! :) 
    return 0;
}


