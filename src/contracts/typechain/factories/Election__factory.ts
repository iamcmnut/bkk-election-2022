/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Election, ElectionInterface } from "../Election";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "candidates",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "checkRights",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOpen",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "start",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "candidate",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052604051806103e00160405280600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff16815250600290601f61015492919061026a565b506000600360006101000a81548160ff02191690831515021790555034801561017c57600080fd5b5061019961018e61019e60201b60201c565b6101a660201b60201c565b6102d9565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b8280548282559060005260206000209081019282156102ab579160200282015b828111156102aa578251829060ff1690559160200191906001019061028a565b5b5090506102b891906102bc565b5090565b5b808211156102d55760008160009055506001016102bd565b5090565b610c25806102e86000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063715018a611610066578063715018a61461010c5780638da5cb5b1461011657806399c9639914610134578063be9a655514610152578063f2fde38b1461015c57610093565b80630121b93f1461009857806307da68f5146100b45780633477ee2e146100be57806347535d7b146100ee575b600080fd5b6100b260048036038101906100ad91906107c6565b610178565b005b6100bc61034c565b005b6100d860048036038101906100d391906107c6565b6103e5565b6040516100e591906109a1565b60405180910390f35b6100f6610409565b60405161010391906108e6565b60405180910390f35b61011461041c565b005b61011e6104a4565b60405161012b91906108cb565b60405180910390f35b61013c6104cd565b60405161014991906108e6565b60405180910390f35b61015a610516565b005b6101766004803603810190610171919061079d565b6105af565b005b600360009054906101000a900460ff166101c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101be90610981565b60405180910390fd5b6000811180156101dc57506002805490508111155b61021b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161021290610921565b60405180910390fd5b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541461029d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161029490610901565b60405180910390fd5b600160026001836102ae9190610a23565b815481106102e5577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160008282546102fe91906109cd565b9250508190555060018060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050565b6103546106a7565b73ffffffffffffffffffffffffffffffffffffffff166103726104a4565b73ffffffffffffffffffffffffffffffffffffffff16146103c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103bf90610961565b60405180910390fd5b6000600360006101000a81548160ff021916908315150217905550565b600281815481106103f557600080fd5b906000526020600020016000915090505481565b600360009054906101000a900460ff1681565b6104246106a7565b73ffffffffffffffffffffffffffffffffffffffff166104426104a4565b73ffffffffffffffffffffffffffffffffffffffff1614610498576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161048f90610961565b60405180910390fd5b6104a260006106af565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600080600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414905090565b61051e6106a7565b73ffffffffffffffffffffffffffffffffffffffff1661053c6104a4565b73ffffffffffffffffffffffffffffffffffffffff1614610592576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161058990610961565b60405180910390fd5b6001600360006101000a81548160ff021916908315150217905550565b6105b76106a7565b73ffffffffffffffffffffffffffffffffffffffff166105d56104a4565b73ffffffffffffffffffffffffffffffffffffffff161461062b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161062290610961565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561069b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161069290610941565b60405180910390fd5b6106a4816106af565b50565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60008135905061078281610bc1565b92915050565b60008135905061079781610bd8565b92915050565b6000602082840312156107af57600080fd5b60006107bd84828501610773565b91505092915050565b6000602082840312156107d857600080fd5b60006107e684828501610788565b91505092915050565b6107f881610a57565b82525050565b61080781610a69565b82525050565b600061081a6016836109bc565b915061082582610ace565b602082019050919050565b600061083d601b836109bc565b915061084882610af7565b602082019050919050565b60006108606026836109bc565b915061086b82610b20565b604082019050919050565b60006108836020836109bc565b915061088e82610b6f565b602082019050919050565b60006108a66010836109bc565b91506108b182610b98565b602082019050919050565b6108c581610a95565b82525050565b60006020820190506108e060008301846107ef565b92915050565b60006020820190506108fb60008301846107fe565b92915050565b6000602082019050818103600083015261091a8161080d565b9050919050565b6000602082019050818103600083015261093a81610830565b9050919050565b6000602082019050818103600083015261095a81610853565b9050919050565b6000602082019050818103600083015261097a81610876565b9050919050565b6000602082019050818103600083015261099a81610899565b9050919050565b60006020820190506109b660008301846108bc565b92915050565b600082825260208201905092915050565b60006109d882610a95565b91506109e383610a95565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610a1857610a17610a9f565b5b828201905092915050565b6000610a2e82610a95565b9150610a3983610a95565b925082821015610a4c57610a4b610a9f565b5b828203905092915050565b6000610a6282610a75565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f596f752063616e206f6e6c7920766f7465206f6e636500000000000000000000600082015250565b7f43616e646964617465206e756d62657220697320696e76616c69640000000000600082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f566f74696e6720697320636c6f73656400000000000000000000000000000000600082015250565b610bca81610a57565b8114610bd557600080fd5b50565b610be181610a95565b8114610bec57600080fd5b5056fea264697066735822122098bd48f27aa51dc85df9d1ae4c1eaba7a4a902b68f1d58078a06039818f1dd3b64736f6c63430008040033";

export class Election__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Election> {
    return super.deploy(overrides || {}) as Promise<Election>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Election {
    return super.attach(address) as Election;
  }
  connect(signer: Signer): Election__factory {
    return super.connect(signer) as Election__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ElectionInterface {
    return new utils.Interface(_abi) as ElectionInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Election {
    return new Contract(address, _abi, signerOrProvider) as Election;
  }
}
