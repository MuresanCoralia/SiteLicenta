
import {web3Load, getCandidateList } from './blockchain.js';

// Retrieves the full array with all the candidates and their votes from 
// blockchain and show in the screen
async function displayResults() {

    // get the candidates list
    await getCandidateList().then((candidateData) => {

        candidateData.forEach(element => {
            createResultstForm(element.name, element.number, "formRezultate");
            const br1 = document.createElement("br");
            const br2 = document.createElement("br");
            document.getElementById("formRezultate").appendChild(br1);
            document.getElementById("formRezultate").appendChild(br2);
            if (element.voteCount == 1) 
                document.getElementById('Candidate' + element.number).innerHTML = element.voteCount + " vot";
            else
                document.getElementById('Candidate' + element.number).innerHTML = element.voteCount + " voturi";
        });
    });
}

// creates the results form with candidates
function createResultstForm(name, number, divName) {

    const id = "Candidate" + number;
    const candidateName = document.createElement("label");
    candidateName.innerHTML = name + " " + number + "  " + ": ";
    const candidateNumber = document.createElement("label");
    candidateNumber.setAttribute("class", 'results');
    candidateNumber.setAttribute("id", id);
    document.getElementById(divName).appendChild(candidateName);
    document.getElementById(divName).appendChild(candidateNumber);
}


async function runPage() {
    await web3Load("Profil.html");

    displayResults();

    // the back button
    const buttonBack = document.getElementById("back");
    // back function
    const voteBack = () => {

        // get the user to the voting choice page
        location.href = "Profil.html";
    };
    // the back vote click
    buttonBack.addEventListener("click", voteBack);

}

runPage();