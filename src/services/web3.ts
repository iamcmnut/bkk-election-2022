import contract from '../contracts/Election.json'

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const abi = contract.abi

export const checkWalletIsConnected = () => {
  const ethereum = (window as any).ethereum
  if (!ethereum) {
    console.log('Make sure you have metamask installed and logged in')
    return
  } else {
    console.log('Wallet is connected')
  }
}

export const connectWalletHandler = async () => {
  const ethereum = (window as any).ethereum
  if (!ethereum) {
    alert("Please install MetaMask")
  }

  try {
    const account = await ethereum.request({ method: 'eth_requestAccounts' })
    console.log("Found an account address: ", account[0])
  } catch (err) {
    console.log(err)
  }
}

export const getCandidates = () => {}

export const vote = () => {}