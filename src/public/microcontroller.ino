// stepper motor
#define STEPPER_PIN_1 2
#define STEPPER_PIN_2 3
#define STEPPER_PIN_3 4
#define STEPPER_PIN_4 5

// stepper motor
#define STEPPER2_PIN_1 6
#define STEPPER2_PIN_2 7
#define STEPPER2_PIN_3 8
#define STEPPER2_PIN_4 9
// motor driver
#define IA1 10 //PWM
#define IA2 12
#define IB1 11 // PWM
#define IB2 13

int step_number = 0;
char read = 'z';
bool stop = true;

void setup()
{
  pinMode(STEPPER_PIN_1, OUTPUT);
  pinMode(STEPPER_PIN_2, OUTPUT);
  pinMode(STEPPER_PIN_3, OUTPUT);
  pinMode(STEPPER_PIN_4, OUTPUT);

  pinMode(STEPPER2_PIN_1, OUTPUT);
  pinMode(STEPPER2_PIN_2, OUTPUT);
  pinMode(STEPPER2_PIN_3, OUTPUT);
  pinMode(STEPPER2_PIN_4, OUTPUT);

  pinMode(IA1, OUTPUT);
  pinMode(IA2, OUTPUT);
  pinMode(IB1, OUTPUT);
  pinMode(IB2, OUTPUT);

  Serial.print("setup");
  // put your setup code here, to run once:
  Serial.begin(9600); // Begen listening on port 9600 for serial
}

void loop()
{
  if (Serial.available() > 0) // Read from serial port
  {
    char ReaderFromNode; // Store current character
    read = (char)Serial.read();
    //    convertToState(ReaderFromNode); // Convert character to state
  }
  convertToState(read);
  delay(2);
  // put your main code here, to run repeatedly:
}

void convertToState(char chr)
{
  Serial.print(chr);
  if (chr == 'l')
  {
    stop = false;
    OneStep(true, stop);
  }
  if (chr == 'r')
  {
    stop = false;
    OneStep(false, stop);
  }
  if (chr == 's')
  {
    stop = true;
    OneStep(false, stop);
  }
  if (chr == 'f')
  {
    All_Forward(200);
  }
  if (chr == 'b')
  {
    All_Backward(200);
  }
  if (chr == 's' || chr == 'z')
  {
    All_Forward(0);
  }
  if (chr == 'p')
  {
    Turn_Left(200);
  }
  if (chr == 'a')
  {
    Turn_Right(200);
  }
}

void OneStep(bool dir, bool stop)
{
  if (stop == false)
  {
    if (dir)
    {
      switch (step_number)
      {
      case 0:
        digitalWrite(STEPPER_PIN_1, HIGH);
        digitalWrite(STEPPER_PIN_2, LOW);
        digitalWrite(STEPPER_PIN_3, LOW);
        digitalWrite(STEPPER_PIN_4, LOW);

        digitalWrite(STEPPER2_PIN_1, HIGH);
        digitalWrite(STEPPER2_PIN_2, LOW);
        digitalWrite(STEPPER2_PIN_3, LOW);
        digitalWrite(STEPPER2_PIN_4, LOW);
        break;
      case 1:
        digitalWrite(STEPPER_PIN_1, LOW);
        digitalWrite(STEPPER_PIN_2, HIGH);
        digitalWrite(STEPPER_PIN_3, LOW);
        digitalWrite(STEPPER_PIN_4, LOW);

        digitalWrite(STEPPER2_PIN_1, LOW);
        digitalWrite(STEPPER2_PIN_2, HIGH);
        digitalWrite(STEPPER2_PIN_3, LOW);
        digitalWrite(STEPPER2_PIN_4, LOW);
        break;
      case 2:
        digitalWrite(STEPPER_PIN_1, LOW);
        digitalWrite(STEPPER_PIN_2, LOW);
        digitalWrite(STEPPER_PIN_3, HIGH);
        digitalWrite(STEPPER_PIN_4, LOW);

        digitalWrite(STEPPER2_PIN_1, LOW);
        digitalWrite(STEPPER2_PIN_2, LOW);
        digitalWrite(STEPPER2_PIN_3, HIGH);
        digitalWrite(STEPPER2_PIN_4, LOW);
        break;
      case 3:
        digitalWrite(STEPPER_PIN_1, LOW);
        digitalWrite(STEPPER_PIN_2, LOW);
        digitalWrite(STEPPER_PIN_3, LOW);
        digitalWrite(STEPPER_PIN_4, HIGH);

        digitalWrite(STEPPER2_PIN_1, LOW);
        digitalWrite(STEPPER2_PIN_2, LOW);
        digitalWrite(STEPPER2_PIN_3, LOW);
        digitalWrite(STEPPER2_PIN_4, HIGH);
        break;
      }
    }
    else
    {
      switch (step_number)
      {
      case 0:
        digitalWrite(STEPPER_PIN_1, LOW);
        digitalWrite(STEPPER_PIN_2, LOW);
        digitalWrite(STEPPER_PIN_3, LOW);
        digitalWrite(STEPPER_PIN_4, HIGH);

        digitalWrite(STEPPER2_PIN_1, LOW);
        digitalWrite(STEPPER2_PIN_2, LOW);
        digitalWrite(STEPPER2_PIN_3, LOW);
        digitalWrite(STEPPER2_PIN_4, HIGH);
        break;
      case 1:
        digitalWrite(STEPPER_PIN_1, LOW);
        digitalWrite(STEPPER_PIN_2, LOW);
        digitalWrite(STEPPER_PIN_3, HIGH);
        digitalWrite(STEPPER_PIN_4, LOW);

        digitalWrite(STEPPER2_PIN_1, LOW);
        digitalWrite(STEPPER2_PIN_2, LOW);
        digitalWrite(STEPPER2_PIN_3, HIGH);
        digitalWrite(STEPPER2_PIN_4, LOW);
        break;
      case 2:
        digitalWrite(STEPPER_PIN_1, LOW);
        digitalWrite(STEPPER_PIN_2, HIGH);
        digitalWrite(STEPPER_PIN_3, LOW);
        digitalWrite(STEPPER_PIN_4, LOW);

        digitalWrite(STEPPER2_PIN_1, LOW);
        digitalWrite(STEPPER2_PIN_2, HIGH);
        digitalWrite(STEPPER2_PIN_3, LOW);
        digitalWrite(STEPPER2_PIN_4, LOW);
        break;
      case 3:
        digitalWrite(STEPPER_PIN_1, HIGH);
        digitalWrite(STEPPER_PIN_2, LOW);
        digitalWrite(STEPPER_PIN_3, LOW);
        digitalWrite(STEPPER_PIN_4, LOW);

        digitalWrite(STEPPER2_PIN_1, HIGH);
        digitalWrite(STEPPER2_PIN_2, LOW);
        digitalWrite(STEPPER2_PIN_3, LOW);
        digitalWrite(STEPPER2_PIN_4, LOW);
      }
    }
    step_number++;
    if (step_number > 3)
    {
      step_number = 0;
    }
    if (stop == true)
    {
      Serial.print("stop");
    }
  }
  else
  {
    Serial.print("Stop \n");
  }
}

void All_Forward(int speed)
{
  MB2_Backward(speed);
  MA2_Backward(speed);
}

void All_Backward(int speed)
{
  MB1_Forward(speed);
  MA1_Forward(speed);
}

void Turn_Left(int speed)
{
  MB1_Forward(speed);
  MA2_Backward(speed);
}

void Turn_Right(int speed)
{
  MB2_Backward(speed);
  MA1_Forward(speed);
}

void MA1_Forward(int Speed1) //fast decay; Speed = High duty-cycle
{
  analogWrite(IA1, Speed1);
  digitalWrite(IA2, LOW);
}

void MA2_Backward(int Speed1) //slow decay; Speed = Low duty-cycle
{
  int Speed2 = 255 - Speed1;
  analogWrite(IA1, Speed2);
  digitalWrite(IA2, HIGH);
}

void MB1_Forward(int Speed1)
{
  analogWrite(IB1, Speed1);
  digitalWrite(IB2, LOW);
}

void MB2_Backward(int Speed1)
{
  int Speed2 = 255 - Speed1;
  analogWrite(IB1, Speed2);
  digitalWrite(IB2, HIGH);
}
