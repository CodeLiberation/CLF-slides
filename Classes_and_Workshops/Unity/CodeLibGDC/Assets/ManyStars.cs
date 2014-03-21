using UnityEngine;
using System.Collections;

public class ManyStars : MonoBehaviour {
    int numCollected = 0;  
	// Use this for initialization
    public GameObject star; 

	void Start () {
     
        for (int i = 0; i < 20; i++)
        {
            GameObject newStar = Instantiate(star, transform.position, Quaternion.identity) as GameObject;
        }
	}
	
	// Update is called once per frame
	void Update () {
        guiText.text = "Stars Collected: " + numCollected + "    Time Remaining " + (10.0f - Time.time);

        if (Time.time > 10)
        {

            if (numCollected > 10)
            {
                guiText.text = "Game Over you win!";
            }
            else
            {
                guiText.text = "Game Over you lose!"; 
            }
        }
        
	}

    public void raiseScore()
    {
        Debug.Log("fired");
        numCollected++;
    }
}
