
import {web3Load, voterLoad, getCandidateList, accounts, getChairPerson, setElectionTime} from './blockchain.js';

runPage();

async function runPage() {

    await web3Load("Voteaza.html");

    const profile = await voterLoad();
    // show voter wallet
    const voterWallet = document.getElementById("address");
    voterWallet.innerHTML = accounts[0];
    // show votes quantity
    document.getElementById("votat").innerHTML = profile.weight;

    await getChairPerson().then((chairPersonWallet) => {
        
        // enables admin button
        if (accounts[0].toLowerCase() === chairPersonWallet.toLowerCase()) {

            // the admin button
            const admin = document.getElementById("admin");
            admin.style.visibility = "visible";
  
            // admin function
            const adminLogIn = () => {
  
                // get the user to the voting page
                location.href = "Admin.html";
            };
  
            // the admin click
            admin.addEventListener("click", adminLogIn);
        }
    });


    if(profile.voted) {
        // if the voter voted it displays the choice and hiddes the voteaza button
        getCandidateList().then((candidateData) => {
            candidateData.forEach(element => {
                if (candidateData.indexOf(element) == profile.vote) 
                    document.getElementById("votat").innerHTML = " Ați votat cu "  + element.name;
            });
        }).catch((error) => {
            console.log(error);
        })
        document.getElementById("votePrezid").style.visibility='hidden';
    } else {
        document.getElementById("votat").innerHTML = " Nu ați votat";
    } 

    // set the time of election and changes options for voter accordingly
    //setElectionTime("1686682800","1686686400");
    let startDate = new Date( 1686682800 * 1000);
    let stopDate = new Date( 1686686400 * 1000);
    let currentDate = new Date();
    document.getElementById("start").innerHTML = startDate.toLocaleString('ro-RO');
    document.getElementById("stop").innerHTML = stopDate.toLocaleString('ro-RO');
    if ((stopDate.toLocaleTimeString('ro-RO') < currentDate.toLocaleTimeString('ro-RO')) && (stopDate.toLocaleDateString('ro-RO') <= currentDate.toLocaleDateString('ro-RO'))) {
        // no longer able to vote
        document.getElementById('votePrezid').innerHTML = "Rezultate";
        const resultsButton = document.getElementById("votePrezid");
        const seeRezult = () => {
          // get the user to the results page
          location.href = "Rezultate.html";
        };
        resultsButton.addEventListener("click", seeRezult);
    }
}