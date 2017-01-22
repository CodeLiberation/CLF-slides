using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class scoreBar : MonoBehaviour {

	public Text scoreText;
	public Image progressBar;

	public Kitty kitty;
	// Use this for initialization
	void Start () {
		//kitty = FindObjectOfType<Kitty> ();
	
	}
	
	// Update is called once per frame
	void Update () {
		scoreText.text = kitty.points.ToString ();
		progressBar.fillAmount = kitty.timeLeft / kitty.maxTime;
	}
}
