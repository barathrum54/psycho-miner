import WalletConnectProvider from "@walletconnect/web3-provider";

import { ethers } from "ethers";

let _abi = `[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "ColdTransfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "ColdTransferAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "FlipSwitch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "InvestManualRecompoundVM",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "InvestManualVM",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "CA",
				"type": "address"
			}
		],
		"name": "LoadStorageFromContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "referral",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "webref",
				"type": "address"
			}
		],
		"name": "MinerReferral",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "referral",
				"type": "address"
			}
		],
		"name": "MinerReferralRecompound",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "setting",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "SetWebReferral",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "_owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "AllTimeStats",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalout",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "CheckIfHolder",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "setting",
				"type": "string"
			}
		],
		"name": "CheckWebReferralUsingString",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "CheckWebReferralUsingWallet",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "FindUserIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "GetHolder",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GetHolderLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GetLogLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "ILog",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "PLog",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GetPayoutCycleTimePunishmentCooldown",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "paytime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Puntime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "GetPunishmentCycles",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "GetTimeDifference",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "GetTimeLeftToReinvest",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "GetTimeTilNextPayout",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "GetTotalPayoutWaiting",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "GetTotalPunishmentPaidInEffect",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "GetTotalPunishmentPercentageWaiting",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "GetUserPlayed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "played",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "GetWebReferralIncome",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "holders",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "il",
		"outputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "reinvested",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "source",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "TGLINK",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "LastInvestTimestamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "LastPayoutTimestamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pl",
		"outputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "TGLINK",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "Played",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "ReadStructInvestLog",
		"outputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "reinvested",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "source",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "TGLINK",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "ReadStructPayoutLog",
		"outputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "TGLINK",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "ReadTotalPaid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "TotalIn",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "TotalOut",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "ReadUserTimes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "LastInvestTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "LastPayoutTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "TotalPaidIn",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "TotalPaidOut",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "UniquePlayers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "WebReferral",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "WebReferralIncome",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]`;
let abi = JSON.parse(_abi);
let _contract = "0x86681B0DF0EE6890809A95b79dFAAc52F2D8F66a";
export default class AuthService {
  constructor() {
    this.provider = null;
    this.contract = null;
    this.init();
  }
  async init() {
    // await this.signer.getAddress()
    //   .then((res) => {
    //     console.log(res);
    //     this.setUser(res);
    //   })
    //   .catch((err) => {
    //     this.login();
    //     console.error(err);
    //   });

    this.login();
    this.setListeners();
    this.createContract();
  }
  setListeners() {
    window.ethereum.on("accountsChanged", async (res) => {
      console.log("accountsChanged Event", res);
      let chainId = window.ethereum.networkVersion;
      console.log(chainId);
      if (res.length > 0) {
        window.userStore.setUser({ wallet: res, chainId: chainId });
      } else {
        window.userStore.reset();
      }
    });
    window.ethereum.on("chainChanged", async (res) => {
      console.log("chainChanged Event", res);
      window.userStore.setUser({ chainId: window.ethereum.networkVersion });
    });
    window.ethereum.on("connect", async (res) => {
      console.log("connect Event", res);
      window.userStore.setUser({ chainId: window.ethereum.networkVersion });
    });
    window.ethereum.on("disconnect", async (res) => {
      console.log("disconnect Event", res);
    });
    window.ethereum.on("message", async (res) => {
      console.log("message Event", res);
    });
  }
  async login() {
    if (window.ethereum) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
    } else {
      try {
        this.provider = new WalletConnectProvider({
          infuraId: "c8c279b9f4f6469bb1e684e02672661d",
        });
        await this.provider.enable();
      } catch (error) {
        console.error(error);
      }
    }
    if (this.provider) {
      this.signer = this.provider.getSigner();
      await this.provider
        .send("eth_requestAccounts", [])
        .then(async (res) => {
          console.log(res);
          res.length > 0
            ? window.userStore.setUser({ wallet: res[0] })
            : this.logout();
        })
        .catch((err) => {
          console.error(err);
          this.logout();
        });
    }
  }
  createContract() {
    this.contract = new ethers.Contract(_contract, abi, this.provider);
  }
  async getHolders(){
	let res = await this.contract.GetHolderLength();
	return res.toString();
  }
  async allTimeStats(){
	let res = await this.contract.AllTimeStats();
	return res.toString();
  }
  async getHolder(id){
	let res = await this.contract.GetHolder(id);
	return res.toString();
  }
  async getLogLength(){
	let res = await this.contract.GetLogLength();
	return res.toString();
  }
  async readStructInvestLog(id){
	let res = await this.contract.ReadStructInvestLog(id);
	return res.toString();
  }
  async findUserIndex(address){
	let res = await this.contract.FindUserIndex(address);
	return res.toString();
  }
  async readStructPayoutLog(id){
	let res = await this.contract.ReadStructPayoutLog(id);
	return res.toString();
  }
  async readUserTimes(id){
	let res = await this.contract.ReadUserTimes(id);
	return res.toString();
  }
  async readTotalPaid(id){
	let res = await this.contract.ReadTotalPaid(id);
	return res.toString();
  }
  setUser(wallet) {
    console.log(this.$appState);
    this.$appState.isAuth = true;
    window.wallet = wallet;
  }
  reset() {}
  logout() {
    window.userStore.reset();
  }
}
