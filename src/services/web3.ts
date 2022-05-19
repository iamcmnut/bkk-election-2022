/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'

import contract from '../contracts/Election.json'
import { Election } from '../contracts/typechain/Election'

const contractAddress = "0xC115b216a52E034e2CEf64488b94B94071cF3f74"
const abi = contract.abi

// const chainID = 97
// const targetChain = {
//   chainName: 'BSC - Testnet',
//   chainId: `0x${chainID.toString(16)}`,
//   nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
//   rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
//   blockExplorerUrls: ['https://testnet.bscscan.com'],
// }
const chainID = 56
const targetChain = {
  chainName: 'BSC - Mainnet',
  chainId: `0x${chainID.toString(16)}`,
  nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
  rpcUrls: ['https://bsc-dataseed1.binance.org'],
  blockExplorerUrls: ['https://testnet.bscscan.com/'],
}

const web3 = new Web3(Web3.givenProvider || targetChain.rpcUrls[0])

export const checkWalletIsConnected = async () => {
  const ethereum = (window as any).ethereum
  if (!ethereum) {
    console.log('Make sure you have metamask installed and logged in')
    return
  } else {
    console.log('Wallet is connected')
  }

  const accounts = (await ethereum.request({ method: 'eth_accounts' }) ?? [])

  if (accounts.length !== 0) {
    console.log("Found an account address: ", accounts[0])
    return accounts[0]
  } else {
    console.log("No account found")
  }
}

export const connectWalletHandler = async () => {
  const ethereum = (window as any).ethereum
  if (!ethereum) {
    // alert("Please install MetaMask")
    return
  }

  try {
    const account = await ethereum.request({ method: 'eth_requestAccounts' })
    console.log("Found an account address: ", account[0])
  } catch (err) {
    console.log(err)
  }
}

export const getCandidate = async (no: number):Promise<ethers.BigNumber> => {
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

export const getCandidates = async ():Promise<string[]> => {
  const ethereum = web3.eth

  if (ethereum) {
    //const provider = new ethers.providers.Web3Provider(ethereum)
    // ethereum.Contract(abi,contractAddress)

   // (new web3.eth.Contract(abi as any, contractAddress)) as Election

   // const signer = provider.getSigner()
   console.log(ethereum)
    const electionContract =  (new ethereum.Contract(abi as  AbiItem[] , contractAddress))

    try {
      console.log('Initialize getCandidate')
       const points = await electionContract.methods.getCandidates().call()
       console.log("points", points)
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
      console.log('vote error', err)
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

export const switchNetwork = async () => {
  const ethereum = (window as any).ethereum

  if (ethereum && ethereum.networkVersion !== chainID) {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: targetChain.chainId }]
      })
    } catch (err) {

      if ((err as any).code === 4902 || (err as any).code === -32603) {
        ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: 'Polygon Mainnet',
              chainId: targetChain.chainId,
              nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
              rpcUrls: ['https://polygon-rpc.com/']
            }
          ]
        })
      }

      console.log(err)
      throw err
    }
  }
}

export const connectAndSwitchNetwork = async () => {
  const ethereum = (window as any).ethereum
  if (!ethereum) {
    throw new Error('Please connect to MetaMask')
    return
  }

  let error = undefined

  try {
    const account = await ethereum.request({ method: 'eth_requestAccounts' })
    console.log("Found an account address: ", account[0])
    return account[0]
  } catch (err) {
    error = err
  }

  if (error) {
    throw error
  }

  if (ethereum.networkVersion !== chainID) {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: targetChain.chainId }]
      })
    } catch (err) {

      if ((err as any).code === 4902 || (err as any).code === -32603) {
        ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            targetChain
          ]
        })
      }

      console.log(err)
      throw err
    }
  }
}

export const isVoted = async () => {
  const ethereum = (window as any).ethereum

  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const electionContract = new ethers.Contract(contractAddress, abi, signer) as Election

    try {
      console.log('Initialize checkRights')
      const available = await electionContract.checkRights()
      console.log("checkRights", available)
      return !available
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
