import React, { useState, useEffect } from 'react'
import bunzz from 'bunzz-sdk';


const Users = () => {
  // const [gropuId, setGroupId] = useState(0);
  const [userAddress, setUserAddress] = useState(null);
  const [whiteListAddress, setWhiteListAddress] = useState("");

  const DAPP_ID = "e58fa82c-46dd-4e60-b973-6247a7210d7c";
  const API_KEY = "b4d581d0-0793-4608-a0ff-1e3b802c38dd";

  const initializeHandler = async () => {
    const handler = await bunzz.initializeHandler({
      dappId: DAPP_ID,
      apiKey: API_KEY,
    });

    return handler;
  }

  const initializeContract = async () => {
    const handler = await initializeHandler();
    const MODULE_NAME = "GroupedNFT";
    const contract = handler.getContract(MODULE_NAME);
    return contract;
  }

  const getUserAddress = async () => {
    const handler = await initializeHandler();
    console.log('handler', handler);
    const address = await handler.getSignerAddress();
    console.log('address', address);
    setUserAddress(address);
  }

  const connectWallet = async () => {
    const handler = await bunzz.initializeHandler({
      dappId: DAPP_ID,
      apiKey: API_KEY,
    });

    await handler.connectWallet();
  }


  const buzzSmartContract = async () => {
    const contract = await initializeContract();
    const tx = await contract.ethersContract.mint('0xAd777f6d057BBECd9E6e1AB346BA5b99F3E92D88', 1)
    console.log('tx', tx);
  }

  const whiteListUsers = async () => {
    const contract = await initializeContract();
    const tx = await contract.whitelistUsers([whiteListAddress], 1);
    const receipt = await tx.wait();
    console.log('receipt', receipt.events);
  }

  const onlyWhiteListUser = async () => {
    const contract = await initializeContract();
    console.log('contract', contract);
    const tx = await contract.setOnlyWhiteListed(true, 1);
    const receipt = await tx.wait();
    console.log('receipt', receipt);
  }

  useEffect(() => {
    // (async () => {
    //   await connectWallet();
    // })();
    connectWallet();
  }, [])

  return (
    <>
      <button onClick={() => buzzSmartContract()}>Mint</button>
      <input onChange={e => setWhiteListAddress(e.target.value)} type="text" />
      {/* <input type="number" onChange={e => setGroupId(e.target.value)} /> */}
      <button onClick={() => whiteListUsers()}>Set White List User</button>
      <button onClick={() => getUserAddress()}>Get Signer Address</button>
      <h3>{userAddress !== null && userAddress}</h3>
      <button onClick={() => onlyWhiteListUser()}>Only WhiteListUser can Mint</button>

    </>
  )
}

export default Users