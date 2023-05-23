
var selected="editCandidate";
var disp="candidate";

document.getElementById('editCandidate').style.backgroundColor = "rgba(0, 0, 0, 0.01)";  

// the admin menu screen => change screens
function show(a,b)
{
    document.getElementById(selected).style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    document.getElementById(disp).style.display = "none";
    document.getElementById(a).style.backgroundColor = "rgba(0, 0, 0, 0.01)";      
    document.getElementById(b).style.display = "block";
    selected=a;
    disp=b;
}

// the back button
const buttonBack = document.getElementById("back");

// back function
const profileBack = () => {

  // get the admin back to the profile page
  location.href = "Profil.html";
};

// the back button click
buttonBack.addEventListener("click", profileBack);