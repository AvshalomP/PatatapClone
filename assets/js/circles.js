/* To run this js file we need to:
	1. Altering in circles.html this line: <script type="text/paperscript" canvas="myCanvas"> ... </script>
	   to the following: <script type="text/paperscript" src="assets/js/circles.js" canvas="myCanvas"></script>
	   * remember to delete the content of the script tag and leave it empty as written in the line above.
	2. Now we can run httpServer from the directory of the project:
		1. open terminal
		2. cd projec_directory
		3. python -m SimpleHTTPServer
	3. Go to browser and type the url: http://localhost:8000/circles.html
	4. Enjoy.
*/

var circles = []; //empty array that will contain the future circle (represent every key pressed)

function onKeyDown(event) {
	// When a key is pressed, save it:
	var keyPressed = event.key;	//getting the character pressed
	console.log("Key pressed is: "+keyPressed);

	//extract the values of make point on the displayed screen:
	var maxPoint 	= new Point(view.size.width, view.size.height);	//getting the current display size
	var randomPoint = Point.random();								//get a random number between 0-1
	var point 		= maxPoint * randomPoint; 						//creating a ramdom point at the display

	//checking if the character pressed is between a-z
	if(keyData[keyPressed])
	{
		//creating a new circle with radios 10 at the radom point we radomized
		var newCircle = new Path.Circle(point, 200);
		newCircle.fillColor = keyData[keyPressed].color;
		keyData[keyPressed].sound.play();
		circles.push(newCircle);	//adding new circle to array
	}
	else
		console.log("Keys allowed are only a-z");
}

//this function called whenever the frame is refreshed
function onFrame(event)
{
	//looping every circle created and doing something
	for(var i=0; i<circles.length; i++)
	{
		circles[i].fillColor.hue +=1;	//changing the hue (i guess color) in every frame
		circles[i].scale(0.95);			//shrinking every circle by 0.1 in every frame refresh
		if(circles[i].area < 1)			//removing invisble circles
		{
			circles[i].remove(); // remove the circle from the canvas
      		circles.splice(i, 1); // remove the circle from the array
      		i--; // decrement i so that the loop doesn't skip a circle because of .splice()
      		//console.log(circles.length);
		}

	}
}