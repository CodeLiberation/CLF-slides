using UnityEngine;
using System.Collections;

public class Kittens : MonoBehaviour {

    int numKittens=0; 

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
        numKittens = numKittens + 1;
        Debug.Log(numKittens); 
	}
}
