using UnityEngine;
using System.Collections;

public class move_script : MonoBehaviour {

public Vector3 myVect; 

	// Use this for initialization
	void Start () {
		myVect = new Vector3(0.0f,0.0f,0.0f);
	}	
	
	// Update is called once per frame
	void Update () {
 
		transform.Translate(myVect, Space.Self); 
		myVect.x += .10f; 
		transform.Rotate(myVect*360); 
	}
}
