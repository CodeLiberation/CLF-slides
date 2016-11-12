using UnityEngine;
using System.Collections;

public class Mover : MonoBehaviour {
    
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
        transform.Translate(Input.GetAxis("Horizontal"), 0.0f, 0.0f); 
	}
}
