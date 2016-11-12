using UnityEngine;
using System.Collections;
using System.IO.Ports; 
 

public class SerialReader : MonoBehaviour
{
    SerialPort stream = new SerialPort("COM3", 9600);
   

    // Use this for initialization
    void Start()
    {
        stream.Open();
    }

    // Update is called once per frame
    void Update()
    {
        stream.ReadTimeout = 40; // this is a safety catch in case the port hangs
        try
        {
            string value = stream.ReadLine();
            string[] sensors = value.Split(',');
            foreach (string s in sensors)
            {
                if(s !="")  
                    Debug.Log(s);
            }
            stream.BaseStream.Flush();
        }
        catch (System.Exception e) {
            Debug.Log("your serial port shit the bed. try unplugging your arduino and reloading your code on it"); 
        }
  
   }
}
