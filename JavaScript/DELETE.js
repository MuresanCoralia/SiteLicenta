///////STEP 1, ADD THE CHOICES //////////////////////

        //Fake/sample array of candidates 
        const candidatesList = [
            { name: "Vlad Tepes", number: 17 },
            { name: "Mihai Viteazu", number: 22 },
            { name: "Nicolai Ceausecu", number: 57 },
            { name: "Maria Regina", number: 88 },
            { name: "Nicolai Balcescu", number: 90 },
            { name: "Klaus Iohannis", number: 91 },
        ];

	//helper to avoid influencing the user on his choice
        const invalidCandidate = 999999999999999999999
       
	 //This variable will the number of the candidate chosen by the user
        //therefore we initialize it wwith a non existent candidate
        var usersChosenCadidate = invalidCandidate;

        //Get the div that will contain the options
        const container = document.getElementById("divRadioButtons");

        //Create a message in the top of the div
        const message = document.createElement("p");
        message.innerHTML = "Dear Cora, all the content on this div is placed dynamically"
	const message2 = document.createElement("p");
	message2.innerHTML = "The missing submit button will appear after you click on any candidate";

        //Add the message to the div so that it appears in the screen
        container.appendChild(message);
	container.appendChild(message2);
        //Add some spacing
        container.appendChild(document.createElement("br"));
	

        //The ids of the radios will be formed by this variable 
        //concatenated with the candidate's number
        const prefixForTheRadiosId = "candidate";

        //Create radio buttons for every candidate
        //Cora, notice the use of the "for of" loop . 
        //It could be any "for" loop, like , for(), array.forEach... but I wanted t use thist one :)
        for (candidate of candidatesList) {
            //assemble the input id
            var inputId = prefixForTheRadiosId + candidate.number;

            //creade an input tag
            var radio = document.createElement("input")

            //set the name of the input. They all must have 
            //the same name to function as a group
            radio.setAttribute("name", "radioInputCandidate")

            //set the input type as radio
            radio.setAttribute("type", "radio")

            //set the id of the input as nemtioned on line 36
            //The input id was assmbled in line 52
            radio.setAttribute("id", inputId)

            //set the value of this particular input
            radio.setAttribute("value", candidate.number)

            //Add and event listener to the "click" event so that our variable 
            //receive the user's choice
            radio.addEventListener("click", setUserChoice);


            //Add the radio/input to the div
            container.appendChild(radio);

            /*******/

            //Crate a label for this input
            var label = document.createElement("label")

            //Associate it with the input.
            //The input id was assmbled in line 52
            label.setAttribute("for", inputId)

            //Add the text that will be visible to the user
            label.innerHTML = " " + candidate.name + ", " + candidate.number;

            //Show the label to the user
            container.appendChild(label);


            /*********/

            //Add a line brake
            container.appendChild(document.createElement("br"))

        }


        ///////STEP 2- Collect the value of the input clicked //////////////////////
        //When the user clicks on the input radio this function will be called
        //and it will update our variable that holds the user's choice (line 14)
        function setUserChoice() {
            //Add the submit button in the first time the user clicks
            //on a candidate
            if (usersChosenCadidate == invalidCandidate) {
                //The button should be added only once
                addSubmitButton();
            }
            usersChosenCadidate = this.value;
            alert("I really want <" + candidateName(this.value) + ">  to win!");
        }

        ///////STEP 3 - Submit the choice ///////////////////////

        function submitVote() {

            //TODO:Call the contracts function "vote" 
            // at this point he choice made by the user is already 
            //stored in the variable usersChosenCadidate 
            //You just have to call the contract E.g submitVote(usersChosenCadidate)
            //

            //Let the user know that hi have completed the voting prcocess
            showMessage("You voted to candidate " + candidateName());
        }

        //Submit button only will be added after the user clicks
        //on one of the candidates. This function is called when the user clicks        
        function addSubmitButton() {
            //Create the submit button
            const submitBtn = document.createElement("button")
            //Add it's event listener
            submitBtn.addEventListener("click", submitVote);

            //Give it some text
            submitBtn.innerHTML = "Submit my Vote";


            //Add a line brake
            container.appendChild(document.createElement("br"))
            //Add the button to the div
            container.appendChild(submitBtn);
        }

        //////SETP 4 - Give the user a feed back
        function showMessage(message) {

            alert(message);
        }

        //Auxiliar function to get the name of the candidade
        //from the array
        function candidateName(number) {
            let candidateName;
            for (candidate of candidatesList) {
                if (candidate.number == usersChosenCadidate) {
                    candidateName = candidate.name;
                }
            }
            return candidateName;
        }