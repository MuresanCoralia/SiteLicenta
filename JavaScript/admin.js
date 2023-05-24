
import {addCandidate, web3Load, addVoters, getVotersList, voteResults, getChairPerson, getCandidateList } from './blockchain.js';

//function to add candidates
function addCandidates() {
    const candidateName = document.getElementById("candidati").value;
    const candidateNumber = document.getElementById("numar").value;
    addCandidate(candidateName, candidateNumber);
}

//function to add votters
function submitVoters() {
    const voterWallet = document.getElementById("voter").value;
    const finalWallets = [];
    const walletList = voterWallet.split(",");
    walletList.forEach(element => {
        finalWallets.push(element.trim());
    });
    addVoters(finalWallets);
}

// function to display the wallets allowed to vote
async function displayVoters() {
    await getVotersList().then((result) => {
        const walletsToVote = document.getElementById('scroll');

        result.forEach(element => {
            const space = document.createElement("p");
            walletsToVote.appendChild(space);
            space.innerHTML = element;

        });
    })
}

// Retrieves the full array with all the candidates and their votes from 
// blockchain and show in the screen
async function displayResults() {

    // get the candidates list
    await getCandidateList().then((candidateData) => {

        candidateData.forEach(element => {
          createResultssForm(element.name, element.number, "result");
          const br1 = document.createElement("br");
          const br2 = document.createElement("br");
          document.getElementById("result").appendChild(br1);
          document.getElementById("result").appendChild(br2);
        });
    });
    
    // get the candidates vote results
    await voteResults().then(allCandidates => {
        console.log('displayResults:allCandidates: ', allCandidates);
        allCandidates.forEach((candidate) => {
            console.log('displayResults:foreach:candidate: ', candidate);
            document.getElementById('Candidate' + candidate.number).innerHTML = candidate.voteCount
        });
    });
}

// creates the results form with candidates
function createResultssForm(name, number, divName) {

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

    await getChairPerson().then((adminWallet) =>
        console.log("Admin wallet of this contract is: ", adminWallet)
    );
    
    // add voter button
    const submitVoter = document.getElementById("submitVoter");
    // add the voter on click    
    submitVoter.addEventListener("click", submitVoters);

    // add candidate button
    const submitCandidate = document.getElementById("submitCandidate");
    // add the candidate on click    
    submitCandidate.addEventListener("click", addCandidates);

    displayResults();
    displayVoters();
}

runPage();