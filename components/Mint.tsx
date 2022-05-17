import Image from 'next/image';
import React from 'react';
import { useContractWrite } from 'wagmi';
import contractInterface from '../contract-abi.json';

export function Mint() {
  // 📄 Contract Config
  const contractConfig = {
    addressOrName: '0xf175a8bb93c63dfd6416964882dfef9f27db4a9a',
    contractInterface: contractInterface,
  };

  const { write } = useContractWrite(contractConfig, 'mint');

  return (
    <div className="card">
      <div>
        <Image
          src="/nft.png"
          width="250"
          height="250"
          alt="RainbowKit Demo NFT"
        />
      </div>
      <div className="content">
        <h1>RainbowKit NFT</h1>
        <button className="button" onClick={() => write()}>
          Mint
        </button>
      </div>
    </div>
  );
}
