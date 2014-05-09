color answerColor = color(0,118,191);
color questionColor = color(0,0,0);

float questionX = 20;
float questionY = 20;
String questionText = "How's it going?";

float answerOneX = 100;
float answerOneY = 100;
String answerOneText = "Good!";

float answerTwoX = 100;
float answerTwoY = 200;
String answerTwoText = "Ugh...";

float answerThreeX = 100;
float answerThreeY = 300;
String answerThreeText = "Ok--how about you?";

int screenCount = 1;

boolean answerClicked = false;

void setup(){
  //window size
  size(500,500);
}

void draw(){
  background(186,240,255);
  //setup the question and answer layout
  
  //question
  myText(questionText,questionX,questionY,questionColor);
  //answers
  myText(answerOneText,answerOneX,answerOneY,answerColor);
  myText(answerTwoText,answerTwoX,answerTwoY,answerColor);
  myText(answerThreeText,answerThreeX,answerThreeY,answerColor);
}

void mousePressed(){
  //keeping track of scenes based on answer clicks
  if(screenCount == 1){
    screenTwo();
  }
  if(screenCount == 2){
    screenThree();
  }


}

//this moves you forward a screen every time you click
void mouseReleased(){
  if(answerClicked == true){
    screenCount++;
    answerClicked = false;
  }
}

//use these functions as templates for each screen of your game
void screenTwo(){
  //each if statement checks to which answer the player clicked
  if(dist(mouseX,mouseY,answerOneX,answerOneY) < 50){
    nextTextSequence("Screen 2: New question based on pick 1","Answer 1","Answer 2","Answer 3");
    answerClicked = true;  
  }
  
  if(dist(mouseX,mouseY,answerTwoX,answerTwoY) < 50){
     nextTextSequence("Screen 2: New question based on pick 2","Answer 1","Answer 2","Answer 3");
     answerClicked = true;
  }
  
  if(dist(mouseX,mouseY,answerThreeX,answerThreeY) < 50){
     nextTextSequence("Screen 2: New question based on pick 3","Answer 1","Answer 2","Answer 3");
     answerClicked = true;
  }
}

void screenThree(){
  //each if statement checks to which answer the player clicked
  if(dist(mouseX,mouseY,answerOneX,answerOneY) < 50){
    nextTextSequence("Screen 3: New question based on pick 1","Answer 1","Answer 2","Answer 3");
  }
  
  if(dist(mouseX,mouseY,answerTwoX,answerTwoY) < 50){
     nextTextSequence("Screen 3: New question based on pick 2","Answer 1","Answer 2","Answer 3");
  }
  
  if(dist(mouseX,mouseY,answerThreeX,answerThreeY) < 50){
     nextTextSequence("Screen 3: New question based on pick 3","Answer 1","Answer 2","Answer 3");
  }
}

//use this function as a template for updating the text
//based on which answer the player picks
void nextTextSequence(String q, String a1, String a2, String a3){
  questionText = q;
  answerOneText = a1;
  answerTwoText = a2;
  answerThreeText = a3;
}

void myText(String s, float x, float y, color _color){
  fill(_color);
  textSize(18);
  text(s, x, y, 500, 500);
}

