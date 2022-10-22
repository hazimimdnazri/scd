# Simple Card Distributor
This is a simple card distributor written in TypeScript using ReactJS library for the frontend, and PHP for the backend.

### Function
52 cards in a deck will be distributed to a number of players set in the input.

| Characteristic     	  | Comments 	  			 					                |
| ----------------------| --------------------------------------------|
| Number Cards (2-9)    | As it is (still 1 - 9) 					            |
| Face Cards    		    | 1=A,10=X,11=J,12=Q,13=K					            |
| Symbols				        | Spade = S, Heart = H, Diamond = D, Club = C |

Hence, D-3 = 3 of Diamond.


### Instructions
Since Docker is being used, make sure no existing http service is running as the Docker will expose the application on port 80.

Clone the project into any desired location, navigate to the cloned project and type the following command in the terminal.

```
docker-compose build
docker-compose up -d
```
If error is present, retype the command with **sudo** privilege.

When the build and up process finished, navigate to `http://localhost/app` to view the application. You will be greeted with a card with an input along with 2 buttons.

![alt text](https://raw.githubusercontent.com/hazimimdnazri/scd/master/screenshots/image_1.png)
Enter any number from 1 - 52 to set the players and press the `Distribute Cards` button.


![alt text](https://raw.githubusercontent.com/hazimimdnazri/scd/master/screenshots/image_2.png)
The cards distribution for each player is shown in the table below the buttons. Press the `Reset` button the clear the card.

If an invalid input is entered, an alert will appear reminding the user that the input given is invalid.
