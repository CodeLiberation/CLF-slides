using UnityEngine;
using System.Collections;

public class StartButton : MonoBehaviour {

	public void StartGame () {
		Application.LoadLevel ("Game");
	}
}
