using UnityEngine;
using System.Collections;

public class HitByBallon : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    void OnCollisionEnter2D(Collision2D col)
    {

        if (col.gameObject.tag == "star")
            Debug.Log(col.gameObject.name);
    }

}
