
import {web3Load, voterLoad, voterWallet} from './blockchain.js';

await web3Load("Voteaza.html");

const profile = await voterLoad();

 // show voter wallet
 document.getElementById("address").innerHTML = voterWallet;
 // show votes quantity
 document.getElementById("votat").innerHTML = profile.weight;

if(profile.voted) {
    document.getElementById("votat").innerHTML = " Ați votat cu "  + profile.vote;
    document.getElementById("votePrezid").style.visibility='hidden';
} else {
    document.getElementById("votat").innerHTML = " Nu ați votat";
}       
