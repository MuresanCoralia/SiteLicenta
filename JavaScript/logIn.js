
// Create global userWalletAddress variable
window.userWalletAddress = null;
// the log in button
const connectare = document.getElementById("signIn");

// function to redirect the user
const showUserAccount = async () => {
    
  // if the user is not logged in - userWalletAddress is null
  if (!window.userWalletAddress) {
    return false;
  }

  // get the user to the account
  location.href = "Profil.html";
};

// when the browser is ready
window.onload = async (event) => {
  // check if ethereum extension is installed
  if (window.ethereum) {
    // create web3 instance
    window.web3 = new Web3(window.ethereum);
  } else {
    // prompt user to install Metamask
    alert("Please install MetaMask or any Ethereum Extension Wallet");
    window.open("https://metamask.io/download/", "_blank");
  }

  // check if user is already logged in and update the global userWalletAddress variable
  window.userWalletAddress = window.localStorage.getItem("userWalletAddress");

  // show the user account
  showUserAccount();
};

// Web3 login function
const loginWithEth = async () => {
  // check if there is global window.web3 instance
  if (window.web3) {
    try {
      // get the user's ethereum account - prompts metamask to login
      const selectedAccount = await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => accounts[0])
        .catch(() => {
          // if the user cancels the login prompt
          throw Error("Please select an account");
        });

      // set the global userWalletAddress variable to selected account
      window.userWalletAddress = selectedAccount;

      // store the user's wallet address in local storage
      window.localStorage.setItem("userWalletAddress", selectedAccount);

      // show the user account
      showUserAccount();
    } catch (error) {
      alert(error);
    }
  } else {
    alert("wallet not found");
    window.open("https://metamask.io/download/", "_blank");
  }
};

// enable the button
connectare.addEventListener("click", loginWithEth);