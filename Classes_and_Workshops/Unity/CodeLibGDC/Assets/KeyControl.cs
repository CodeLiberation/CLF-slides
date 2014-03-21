using UnityEngine;
using System.Collections;

public class KeyControl : MonoBehaviour {

    float xpos, ypos; 

	// Use this for initialization
	void Start () {
        Debug.Log("I love indie games"); 
	}
	
	// Update is called once per frame
	void Update () {

        xpos = Input.GetAxis("Horizontal") * Time.deltaTime;
        ypos = Input.GetAxis("Vertical") * Time.deltaTime;
        transform.Translate(xpos,ypos, 0); 
	}
}
