
import {addCandidate, deleteCandidate, web3Load, addVoters, deleteVoter, getVotersList, getChairPerson, getCandidateList } from './blockchain.js';

//function to add candidates
function addCandidates() {
    const candidateName = document.getElementById("candidati").value;
    const candidateNumber = document.getElementById("numar").value;
    addCandidate(candidateName, candidateNumber);
    document.getElementById('candidati').value = null;
    document.getElementById('numar').value = null;
}

// function to delete one candidate
function deleteOneCandidate() {
    const candidateNumberToDelete = document.getElementById("numarSters").value;
    deleteCandidate(candidateNumberToDelete);
    document.getElementById('numarSters').value = null;
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
    document.getElementById('voter').value = null;
}

// function to delete one voter
function deleteOneVoter() {
    const voterToDelete = document.getElementById("alegatorSters").value;
    deleteVoter(voterToDelete);
    document.getElementById('alegatorSters').value = null;
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
            createResultstForm(element.name, element.number, "result");
            const br1 = document.createElement("br");
            const br2 = document.createElement("br");
            document.getElementById("result").appendChild(br1);
            document.getElementById("result").appendChild(br2);
            document.getElementById('Candidate' + element.number).innerHTML = element.voteCount;
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

    await getChairPerson().then((adminWallet) =>
        console.log("Admin wallet of this contract is: ", adminWallet)
    );

    // add candidate button
    const submitCandidate = document.getElementById("submitCandidate");
    // add the candidate on click    
    submitCandidate.addEventListener("click", addCandidates);

    // delete candidate button
    const deleteCandidate = document.getElementById("deleteCandidate");
    // delete the candidate on click    
    deleteCandidate.addEventListener("click", deleteOneCandidate);
    
    // add voter button
    const submitVoter = document.getElementById("submitVoter");
    // add the voter on click    
    submitVoter.addEventListener("click", submitVoters);

    // delete voter button
    const deleteVoter = document.getElementById("deleteVoter");
    // delete the voter on click    
    deleteVoter.addEventListener("click", deleteOneVoter);

    displayResults();
    displayVoters();
}

runPage();