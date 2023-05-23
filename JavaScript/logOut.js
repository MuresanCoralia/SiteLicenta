
// show the user's wallet address from the global userWalletAddress variable
const walletAddressEl = document.querySelector("#address");
walletAddressEl.innerHTML = window.localStorage.userWalletAddress;

// enables admin button
if (window.localStorage.userWalletAddress === "0x7ad0e3824eae5991ee2300f54f0337c4bbd5d592") {

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


// the log out button
const dezabonare = document.getElementById("logOut");

// web3 logout function
const logout = () => {

  // set the global userWalletAddress variable to null
  window.userWalletAddress = null;

  // remove the user's wallet address from local storage
  window.localStorage.removeItem("userWalletAddress");

  // get the user back to the main page
  location.href = "Voteaza.html";
};

// the log out click
dezabonare.addEventListener("click", logout);


// the vote presedentiale button
const voteButton = document.getElementById("votePrezid");

// vote function to redirect to the voting page
const votePrezid = () => {

  // get the user to the voting page
  location.href = "AlegeriPrezidentiale.html";
};

// the parlamentiale vote click
voteButton.addEventListener("click", votePrezid);