using UnityEngine;
using System.Collections;

public class health : MonoBehaviour {
    int myHealth = 0;
    public GUIText playerHealth; 
   
	// Use this for initialization
	void Start () {
	    
	}
	
	// Update is called once per frame
	void Update () {

        if (myHealth > 10)
        {
            playerHealth.text = "You win! Game Over!";
        }

	}
    //this function is called when the player clicks on the object the script is attached to 
    void OnMouseDown()
    {
        myHealth = myHealth + 1;
        playerHealth.text = "Player Health: " + myHealth; 
    } 

}
