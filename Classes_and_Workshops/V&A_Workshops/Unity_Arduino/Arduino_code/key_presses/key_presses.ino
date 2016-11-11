#include<Keyboard.h>
int switchState = 0; 
void setup() {
  // put your setup code here, to run once:
  pinMode(2, INPUT); 
  Serial.begin(9600); 
  
}
void loop() {
  // put your main code here, to run repeatedly:
  int switchState = digitalRead(2); 
  if(switchState == 1)
  {
    Keyboard.write('w');
    delay(500);   
  }
Serial.println(switchState); 
}
