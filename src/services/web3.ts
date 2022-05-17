import { ethers } from 'ethers'

import contract from '../contracts/Election.json'
import { Election } from '../contracts/typechain/Election'

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const abi = contract.abi

export const checkWalletIsConnected = async () => {
  const ethereum = (window as any).ethereum
  if (!ethereum) {
    console.log('Make sure you have metamask installed and logged in')
    return
  } else {
    console.log('Wallet is connected')
  }

  const accounts = await ethereum.request({ method: 'eth_accounts' })

  if (accounts.length !== 0) {
    console.log("Found an account address: ", accounts[0])
  } else {
    console.log("No account found")
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

export const getCandidate = async (no: number) => {
  no = no - 1

  const ethereum = (window as any).ethereum
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const electionContract = new ethers.Contract(contractAddress, abi, signer) as Election

    try {
      console.log('Initialize getCandidate')
      const point = await electionContract.candidates(ethers.BigNumber.from(no))
      return point
    } catch (err) {
      console.log(err)
      throw err
    }
  } else {
    throw new Error("Please install MetaMask")
  }
}

export const getCandidates = async () => {
  const ethereum = (window as any).ethereum
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const electionContract = new ethers.Contract(contractAddress, abi, signer) as Election

    try {
      console.log('Initialize getCandidate')
      const points = await electionContract.getCandidates()
      console.log("Points", points)
      return points
    } catch (err) {
      console.log(err)
      throw err
    }
  } else {
    throw new Error("Please install MetaMask")
  }
}

export const vote = async (no: number) => {
  const ethereum = (window as any).ethereum
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const electionContract = new ethers.Contract(contractAddress, abi, signer) as Election

    try {
      console.log('Initialize vote')
      const txNo = await electionContract.vote(ethers.BigNumber.from(no))
      return txNo
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export const start = async () => {
  const id = 1
  const ethereum = (window as any).ethereum
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const electionContract = new ethers.Contract(contractAddress, abi, signer) as Election

    try {
      console.log('Initialize start')
      const txNo = await electionContract.start()
      return txNo
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export const stop = async () => {
  const id = 1
  const ethereum = (window as any).ethereum
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const electionContract = new ethers.Contract(contractAddress, abi, signer) as Election

    try {
      console.log('Initialize stop')
      const txNo = await electionContract.stop()
      return txNo
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export const checkRights = async () => {
  const ethereum = (window as any).ethereum
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const electionContract = new ethers.Contract(contractAddress, abi, signer) as Election

    try {
      console.log('Initialize checkRights')
      const hasRights = await electionContract.checkRights()
      return hasRights
    } catch (err) {
      console.log(err)
      throw err
    }
  } else {
    return false
  }
}

export const getTotalVotes = async () => {
  const ethereum = (window as any).ethereum

  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const electionContract = new ethers.Contract(contractAddress, abi, signer) as Election

    try {
      console.log('Initialize getTotalVotes')
      const totalVotes = await electionContract.totalVotes()
      console.log("totalVotes", totalVotes)
      return totalVotes
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}