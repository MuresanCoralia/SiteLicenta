
import {web3Load, voterLoad, getCandidateList, accounts, getChairPerson} from './blockchain.js';

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

    //setElectionStart("1686054780","1686054960");
    let startDate = new Date( 1686054780 *1000);
    document.getElementById("start").innerHTML = startDate.toLocaleString();
    console.log(startDate.toLocaleString());
    let stopDate = new Date( 1686054960 *1000);
    document.getElementById("stop").innerHTML = stopDate.toLocaleString();
    console.log(stopDate.toLocaleString());
}