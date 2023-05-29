
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