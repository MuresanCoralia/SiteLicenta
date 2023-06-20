
window.web3 = new Web3(window.ethereum);

const contracts = {
    // with the timer
    bsc: '0xc11f4690C1CfF6d076A722dBa058DfdF82277e2c'
    // without the timer
    //bsc: '0x9bf056217cF3e0485F96Ff30675c83c19D348bEC' 
}

export let accounts;
const contractAddress = contracts.bsc;
const abi = '[ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "uint256", "name": "number_", "type": "uint256" } ], "name": "addCandidate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "components": [ { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "number", "type": "uint256" }, { "internalType": "uint256", "name": "voteCount", "type": "uint256" } ], "internalType": "struct Election.Candidate[]", "name": "candidates_", "type": "tuple[]" } ], "name": "addCandidates", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address[]", "name": "allVoter_", "type": "address[]" } ], "name": "addVoters", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "voter", "type": "address" } ], "name": "addVotter", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "candidates", "outputs": [ { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "number", "type": "uint256" }, { "internalType": "uint256", "name": "voteCount", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "chairperson", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newAddress", "type": "address" } ], "name": "changeChairperson", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getCandidateList", "outputs": [ { "components": [ { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "number", "type": "uint256" }, { "internalType": "uint256", "name": "voteCount", "type": "uint256" } ], "internalType": "struct Election.Candidate[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getStartTime", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getStopTime", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getVotersList", "outputs": [ { "internalType": "address[]", "name": "listRetrunVoters", "type": "address[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "number", "type": "uint256" } ], "name": "removeCandidate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "voter", "type": "address" } ], "name": "removeVoter", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "start", "type": "uint256" }, { "internalType": "uint256", "name": "end", "type": "uint256" } ], "name": "setElectionStart", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "number", "type": "uint256" } ], "name": "vote", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "voters", "outputs": [ { "internalType": "uint256", "name": "weight", "type": "uint256" }, { "internalType": "bool", "name": "voted", "type": "bool" }, { "internalType": "uint256", "name": "vote", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]';
const jsonAbi = JSON.parse(abi);

// Instantiate the contract
export const contract = new web3.eth.Contract(jsonAbi, contractAddress);

// Returns the current admin wallet of the contract
export async function getChairPerson() {
    return await contract.methods.chairperson().call();
}

/* profile page */
// load log in 
export async function web3Load(page) {
    // Login page in case we do not have web3 present
    if (!window.ethereum) {
        location.href = page;
    }

    // Requesting the user's accounts
    accounts = await window.ethereum
        .request({
            method: "eth_requestAccounts",
        });
}

export let voterWallet;

// load data of the voter
export async function voterLoad() {
    voterWallet = accounts[0];
    const voter = await contract.methods.voters(voterWallet).call()
        .then((result) => {
            console.log("voterLoad:Result ", result)
            return result
        })
        .catch((error) => {
            console.log("voterLoad:Error ", error);
        });
    return voter;
}

// set the time of the election
export async function setElectionTime(start, stop) {
    const tx = contract.methods.setElectionStart(start, stop).send({
        from: accounts[0],
        to: contract.address
    })
        .then((result) => {
            console.log("Result ", result)
            return result
        })
        .catch((error) => {
            console.log("Error ", error);
        });
}

// get the start time of the election
export async function getStartTime() {
    let startTime = await contract.methods.getStartTime().call()
        .then((result) => {
            console.log("StartTime:Result ", result, typeof result)
            return result
        })
        .catch((error) => {
            console.log("StartTime:Error ", error);
        });
}

// get the end time of the election
export async function getStopTime() {
    let stopTime = await contract.methods.getStopTime().call()
        .then((result) => {
            console.log("StopTime:Result ", result, typeof result)
            return result
        })
        .catch((error) => {
            console.log("StopTime:Error ", error);
        });
}


/* admin page */
// load admin
export async function getAdmiWallet() {
    chairPerson = await contract.methods.chairperson().call()
        .then((result) => {
            console.log("voterChairPerson:Result ", result)
            return result
        })
        .catch((error) => {
            console.log("voterChairPerson:Error ", error);
        });
}

// add new candidates to vote
export async function addCandidate(name, number) {
    const tx = contract.methods.addCandidate(name, number).send({
        from: accounts[0],
        to: contract.address
    })
        .then((result) => {
            console.log("Result ", result)
            return result
        })
        .catch((error) => {
            console.log("Error ", error);
        });
}

// delete candidate 
export async function deleteCandidate(number) {
    const tx = contract.methods.removeCandidate(number).send({
        from: accounts[0],
        to: contract.address
    })
        .then((result) => {
            console.log("Result ", result)
            return result
        })
        .catch((error) => {
            console.log("Error ", error);
        });
}

// get the candidates list
export async function getCandidateList() {
    let finalCandidateList = []
    const candidateList = await contract.methods.getCandidateList().call({
        from: accounts[0]
    })
        .then((result) => {
            console.log("getCandidatesList:Result ", result)
            return result
        })
        .catch((error) => {
            console.log("getCandidatesList:Error ", error);
        });

    candidateList.forEach(element => {
        if (element.number != 0) {
            finalCandidateList.push(element);
        }
    });
    console.log("Blockchain", finalCandidateList);
    return finalCandidateList;
}

// add one single wallet allowed to vote
export async function addVoter(voterToAdd) {
    const tx = contract.methods.addVotter(voterToAdd).send({
        from: accounts[0],
        to: contract.address
    })
        .then((result) => {
            console.log("Result ", result)
            return result
        })
        .catch((error) => {
            console.log("Error ", error);
        });
}

// add a list of wallets allowed to vote
export async function addVoters(votersToAdd) {
    const tx = contract.methods.addVoters(votersToAdd).send({
        from: accounts[0],
        to: contract.address
    })
        .then((result) => {
            console.log("Result ", result)
            return result
        })
        .catch((error) => {
            console.log("Error ", error);
        });
}

// delete voter 
export async function deleteVoter(wallet) {
    const tx = contract.methods.removeVoter(wallet).send({
        from: accounts[0],
        to: contract.address
    })
        .then((result) => {
            console.log("Result ", result)
            return result
        })
        .catch((error) => {
            console.log("Error ", error);
        });
}

// retrieve the list of wallets allowed to vote
export async function getVotersList() {

    let finalVotersList = [];
    const votersList = await contract.methods.getVotersList().call({ from: accounts[0] })
        .then((result) => {
            console.log("getVotersList:Result ", result)
            return result
        })
        .catch((error) => {
            console.log("getVotersList:Error ", error);
        });

        votersList.forEach(element => {
        if (element != 0) {
            finalVotersList.push(element);
        }
    });
    console.log("BlockchainAAAAAAAAAAA", finalVotersList);
    return finalVotersList;
}

// Retrieves the array with all the candidates at once from blockchain 
// get the votes results
/*
export async function voteResults(candidate) {
    const allCandidates = await contract.methods.getCandidateList().call({ from: accounts[0] })
        .then((result) => {
            console.log("voteResults:Result ", result)
            return result
        })
        .catch((error) => {
            console.log("voteResults:Error ", error);
        });
    return allCandidates;
}
*/

/* vote page */
// vote the candidate in blockchain
export async function vote(myCandidate) {

    contract.methods.vote(myCandidate).send({
        from: accounts[0],
        to: contract.address
    }).then((result) => {
        console.log("Result ", result)
        return result
    })
        .catch((error) => {
            console.log("Error ", error);
        });
}
