
PImage img1;
PImage img2;
PImage img3;
ArrayList imgs;
float prob1 = 2; 
float prob2  = 4; 
float prob3 = 7; 

int squareSize = 50; 
int cols; 
int xpos, ypos=0; 
void setup(){
    
    imgs = new ArrayList();
    img1 = loadImage("01.png");
    img2 = loadImage("02.png");
    img3 = loadImage("03.png");
    imgs.add(img1);
    imgs.add(img2);
    imgs.add(img3);
    size(800,800);
    cols = int(width/squareSize);
    print(cols); 
    rectMode(CENTER);

  make(); 
}

void make(){
     
  for(int i = 0; i < cols; i++)
  {
    
    for(int j = 0; j < cols; j++) 
    {
        float num = random(0, 10);   
        
        if(num < prob1)
        {   
          tint(#FF00FF); 
          pushMatrix(); 
          translate(xpos, ypos);
         float angle = radians(90);  
          rotate(angle);  
          image(img1, xpos, ypos);
          popMatrix();
        } 
        
        else if(num < prob1+ prob2)
        {   
          tint(#b3ccFF); 
          image(img2, xpos, ypos); 
        } 
        
        else{
          tint(#FF00B3); 
          image(img3, xpos, ypos); 
        }        
        ypos+=squareSize;
      
    }
    xpos+=squareSize; 
    ypos =0; 
    println(xpos); 
  }   
}
void draw(){}
  void mousePressed (){
    xpos=0; 
    ypos = 0; 
     background(0); 
    make(); 
  }

