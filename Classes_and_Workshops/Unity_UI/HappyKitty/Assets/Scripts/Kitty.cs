using UnityEngine;
using UnityEngine.UI;

public class Kitty : MonoBehaviour {

	public float maxTime = 5f;
	public float timeLeft = 5f; //timer of the round
	public int points = 0; //points user got
	public GameObject gameOver; // gameover object


	float timeWaiting = 0f; //how long kitten was waiting for petting
	Animator animator;

	void Start() {
		//Find an animator on the object
		animator = GetComponent<Animator> ();
		gameOver.SetActive (false); // gameOver object
	}

	public void Restart() {
		points = 0;
		timeLeft = maxTime;
		gameOver.SetActive (false); // gameOver object
		animator.Play ("KittySadAnimation");

	}

	void Update() {

		if (timeLeft > 0) { 
			//IF timer still running:
			//decrease the timeleft
			//increase the timeWaiting
			timeLeft -= Time.deltaTime;
			timeWaiting += Time.deltaTime;

			if (Input.GetMouseButtonUp (0)) {
				//If user touched the kitty, reset waiting time to 0 and give user 5 points
				timeWaiting = 0f;
				points += 5;

				if (points > 30) {
					//If got more then 30 points animate kitty being happy
					animator.Play ("KittyHappyAnimation");
				}
			}


			if (timeWaiting > 1f && points > 30) {
				//if not touching for more then a second, after already animated happy kitten, animate it to being sad
				animator.Play ("KittySadAnimation");
			}
		} else {
			//End the game
			gameOver.SetActive(true); // gameOver Object
		
		}
	}
}
