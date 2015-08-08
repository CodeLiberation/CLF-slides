using UnityEngine;
using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class TopBar : MonoBehaviour {

	public Text pointsText;
	public Image progressBar;

	Kitty kitty;

	// Use this for initialization
	void Start () {
		kitty = FindObjectOfType<Kitty> ();
	}

	// Update is called once per frame
	void Update () {
		pointsText.text = kitty.points.ToString();
		progressBar.fillAmount = kitty.timeLeft / kitty.maxTime;
	}
}
