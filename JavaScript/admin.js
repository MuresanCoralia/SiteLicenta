
import {addCandidate, web3Load, addVoters, getVotersList, voteResults, getChairPerson } from './blockchain.js';


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


//Retrieves the full array with all the candidates and their votes from blockchain
//and show in the screen
async function displayResults() {
    let result;
    await voteResults().then(allCandidates => {
        console.log('displayResults:allCandidates: ', allCandidates);
        allCandidates.forEach((candidate) => {
            console.log('displayResults:foreach:candidate: ', candidate);
            document.getElementById('candidate' + candidate.number).innerHTML = candidate.voteCount
        });
    });

}
/**
 *     await voteResults(0).then((result) => {
        document.getElementById('candidate0').innerHTML = result.voteCount
    })

    await voteResults(1).then((result) => {
        document.getElementById('candidate1').innerHTML = result.voteCount
    })

    await voteResults(2).then((result) => {
        document.getElementById('candidate2').innerHTML = result.voteCount
    })

    await voteResults(3).then((result) => {
        document.getElementById('candidate3').innerHTML = result.voteCount
    })
 */

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