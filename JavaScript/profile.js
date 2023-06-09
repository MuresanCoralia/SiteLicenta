
import {web3Load, voterLoad, getCandidateList, accounts, getChairPerson, getStartTime, getStopTime} from './blockchain.js';

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

            // the time button
            const time = document.getElementById("setTime");
            time.style.visibility = "visible";

            // time function
            const adminSetTime = () => {
  
                // get the user to the voting page
                location.href = "Time.html";
            };
  
            // the time click
            time.addEventListener("click", adminSetTime);
          
        }
    });


    // if the voter voted it displays the choice and hiddes the voteaza button
    if(profile.voted) {
        getCandidateList().then((candidateData) => {
            candidateData.forEach(element => {
                if (candidateData.indexOf(element) == profile.vote) 
                    document.getElementById("votat").innerHTML = " Ați votat cu "  + element.name;
            });
        }).catch((error) => {
            console.log(error);
        })
        document.getElementById("votePrezid").style.visibility = 'hidden';
    } else {
        document.getElementById("votat").innerHTML = " Nu ați votat";
    } 
    
    // set the time of election 
    const start = await getStartTime();
    let startDate = new Date( Number(start) * 1000);
    const stop = await getStopTime();
    let stopDate = new Date( Number(stop) * 1000);
    let currentDate = new Date();

    // show the time once it is set
    // if the admin has set the time it hides the timp button
    if ( stopDate.getFullYear() == 1970 ) {
        document.getElementById("start").innerHTML = "...";
        document.getElementById("stop").innerHTML = "...";
    } else {
        document.getElementById("start").innerHTML = startDate.toLocaleString('ro-RO');
        document.getElementById("stop").innerHTML = stopDate.toLocaleString('ro-RO');
        document.getElementById("setTime").style.visibility = 'hidden';
    }

    // no longer able to vote
    // changes options for voter 
    if ((stopDate.toLocaleTimeString('ro-RO') < currentDate.toLocaleTimeString('ro-RO')) && (stopDate.toLocaleDateString('ro-RO') <= currentDate.toLocaleDateString('ro-RO'))) {
    
        if(profile.voted)
            document.getElementById("votePrezid").style.visibility = 'visible';
        document.getElementById('votePrezid').innerHTML = "Rezultate";
        const resultsButton = document.getElementById("votePrezid");
        const seeRezult = () => {
          // get the user to the results page
          location.href = "Rezultate.html";
        };
        resultsButton.addEventListener("click", seeRezult);
    }
}