
import {web3Load, voterLoad, voterWallet, getCandidateList} from './blockchain.js';

await web3Load("Voteaza.html");

const profile = await voterLoad();

 // show voter wallet
 document.getElementById("address").innerHTML = voterWallet;
 // show votes quantity
 document.getElementById("votat").innerHTML = profile.weight;

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
