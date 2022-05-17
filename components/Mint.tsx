import Image from 'next/image';
import React from 'react';
import { useContractWrite } from 'wagmi';
import contractInterface from '../contract-abi.json';

export function Mint({ ready }: any) {
  const [minted, setMinted] = React.useState(false);

  // 📄 Contract Config
  const contractConfig = {
    addressOrName: '0xf175a8bb93c63dfd6416964882dfef9f27db4a9a',
    contractInterface: contractInterface,
  };

  const { write } = useContractWrite(contractConfig, 'mint');

  const mint = () => {
    write();
    setMinted(true);
  };

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
        {ready ? (
          <button disabled={minted} className="button" onClick={() => mint()}>
            {minted ? 'Minted' : 'Mint'}
          </button>
        ) : (
          <p>Connect your wallet to mint.</p>
        )}
      </div>
    </div>
  );
}
