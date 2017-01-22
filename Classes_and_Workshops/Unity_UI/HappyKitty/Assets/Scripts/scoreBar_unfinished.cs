using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class scoreBar_unfinished : MonoBehaviour {
	public Text pointsText;
	public Image progressBar;

	public Kitty kitty;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		pointsText.text = kitty.points.ToString ();
		progressBar.fillAmount = kitty.timeLeft / kitty.maxTime;
	}
}
