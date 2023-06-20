import { web3Load, setElectionTime } from './blockchain.js';

//function to add candidates
function setTime() {
    const startDate = document.getElementById("startTime").value;
    const stopDate = document.getElementById("stopTime").value;
    setElectionTime(startDate, stopDate);
    document.getElementById('startTime').value = null;
    document.getElementById('stopTime').value = null;
}

runPage();

async function runPage() {

    await web3Load("Profil.html");

    // add set time button
    const submitTime = document.getElementById("submitTime");
    // add the times on click    
    submitTime.addEventListener("click", setTime);

    // the back button
    const buttonBack = document.getElementById("back");
    // back function
    const timeBack = () => {

        // get the admin to the voting choice page
        location.href = "Profil.html";
    };
    // the back click
    buttonBack.addEventListener("click", timeBack);

}