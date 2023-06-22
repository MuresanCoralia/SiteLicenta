
// displays the tas selected by the admin
function show(evt, formName) {
  var i, admin, menu;
  document.getElementById("seecandidate").style.backgroundColor = "rgba(0, 0, 0, 0.6)";
  document.getElementById("seevoters").style.backgroundColor = "rgba(0, 0, 0, 0.6)";
  document.getElementById("seeresult").style.backgroundColor = "rgba(0, 0, 0, 0.6)";

  admin = document.getElementsByClassName("admin");
  for (i = 0; i < admin.length; i++) {
    admin[i].style.display = "none";
  }

  menu = document.getElementsByClassName("menu");
  for (i = 0; i < menu.length; i++) {
    menu[i].className = menu[i].className.replace(" active", "");
  }

  document.getElementById(formName).style.display = "block";
  document.getElementById("see" + formName).style.backgroundColor = "rgba(0, 0, 0, 0.01)";
  evt.currentTarget.className += " active";
}

document.getElementById("seecandidate").style.backgroundColor = "rgba(0, 0, 0, 0.01)";

// the back button
const buttonBack = document.getElementById("back");

// back function
const profileBack = () => {

  // get the admin back to the profile page
  location.href = "Profil.html";
};

// the back button click
buttonBack.addEventListener("click", profileBack);