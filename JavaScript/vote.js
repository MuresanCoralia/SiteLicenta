
import {getCandidateList, vote, web3Load} from './blockchain.js';

var usersChosenCandidate = 0;

// function to display the candidates on the voting page
async function getCandidatesList() {
 await getCandidateList().then((candidateData) => {

  candidateData.forEach(element => {
    createCandidatesForm(element.name, element.number, "formVotare");
    const br1 = document.createElement("br");
    const br2 = document.createElement("br");
    document.getElementById("formVotare").appendChild(br1);
    document.getElementById("formVotare").appendChild(br2);
  });
})
}

// creates the voting form with candidates
function createCandidatesForm(name, number, divName) {

  const id = "Candidate" + number;
  const candidateName = document.createElement("label");
  candidateName.setAttribute("for", id);
  candidateName.setAttribute("style", "font-size: 20px;");
  candidateName.innerHTML = name + " " + number + "  ";
  const candidateNumber = document.createElement("input");
  candidateNumber.setAttribute("type", 'radio');
  candidateNumber.setAttribute("name", 'choice');
  candidateNumber.setAttribute("value", number);
  candidateNumber.setAttribute("id", id);
  candidateNumber.addEventListener("click", setUserChoice);
  document.getElementById(divName).appendChild(candidateName);
  document.getElementById(divName).appendChild(candidateNumber);
}

// function to get the chosen candidate
function setUserChoice() {
  usersChosenCandidate = this.value;
  // the submit button only appears if they selected an candidate
  document.getElementById("submit").style.visibility = "visible";
}

// function to get the voting choice
function submit() {

  vote(usersChosenCandidate);
  alert("Ați votat candidatul: " + candidateName());
  //location.href = "Profil.html"; 
}

// function to get the name of the cazndidate
function candidateName() {
  getCandidateList().then((candidateData) => {
    candidateData.forEach(element => {
      if (element.number == usersChosenCandidate) 
        return element.name;
    });
  })
}
 

async function runPage() {
  await web3Load("Profil.html");

  // the back button
  const buttonBack = document.getElementById("back");
  // back function
  const voteBack = () => {

    // get the user to the voting choice page
    location.href = "Profil.html";
  };
  // the back vote click
  buttonBack.addEventListener("click", voteBack);

  getCandidatesList();

  // submit button
  const buttonSubmit = document.getElementById("submit");
  // save the vote on click
  buttonSubmit.addEventListener("click", submit);

}

runPage();