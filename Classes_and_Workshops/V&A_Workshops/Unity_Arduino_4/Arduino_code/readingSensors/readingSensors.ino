void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); 
}

void loop() {
  // put your main code here, to run repeatedly:
  int values[] = {analogRead(0), analogRead(1)};
  //Serial.flush; 
  for(int i=0; i < 2; i++) 
  {
    Serial.print(values[i]); 
    Serial.print(","); 
    Serial.println(); 
  //  delay(30); //I saw people say you needed this online but it seems to work w/out it just fine. 
    Serial.flush();
  } 
}
