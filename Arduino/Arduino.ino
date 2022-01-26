#include <SoftwareSerial.h>

SoftwareSerial bluetoothSerial(10, 11); // RX, TX

String readString;

void setup() {
  bluetoothSerial.begin(9600);
  pinMode(13, OUTPUT);
  digitalWrite(13, HIGH);  
}

void loop() {
  if (bluetoothSerial.available()) {
    readString = bluetoothSerial.readString();
    if(readString == "ACESSO"){
      digitalWrite(13, LOW);
      delay(10);
      digitalWrite(13, HIGH);
    }
  }      
}
