using UnityEngine;
using System.Collections;

public class RandomStars : MonoBehaviour { 
	// Use this for initialization
    GameObject scoreManager; 

    public GameObject starManager; 
	void Start () {
        float xloc = Random.RandomRange(-4,4);
        float yloc = Random.RandomRange(-4, 4);
        transform.position = new Vector3(xloc, yloc, -1);
        scoreManager = GameObject.Find("starManager"); 
	}
	
	// Update is called once per frame
	void Update () {
	
	}
    
    void OnMouseDown()
    {
        scoreManager.GetComponent<ManyStars>().SendMessage("raiseScore");
        Destroy(gameObject);
    }
}
