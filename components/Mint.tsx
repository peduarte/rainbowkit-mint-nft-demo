import Image from 'next/image';
import React from 'react';
import { useContractWrite } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import contractInterface from '../contract-abi.json';
import FlipCard, { BackCard, FrontCard } from './FlipCard';

export function Mint({ ready }: any) {
  const [isCardFlipped, setIsCardFlipped] = React.useState(ready);
  // 📄 Contract Config
  const contractConfig = {
    addressOrName: '0xf175a8bb93c63dfd6416964882dfef9f27db4a9a',
    contractInterface: contractInterface,
  };

  // React.useEffect(() => setIsCardFlipped(ready), [ready]);

  const {
    write: mint,
    isLoading,
    isSuccess,
  } = useContractWrite(contractConfig, 'mint');

  return (
    <div>
      {/* <button onClick={() => setIsCardFlipped(!isCardFlipped)}>flip</button> */}

      <FlipCard>
        <FrontCard isCardFlipped={isCardFlipped}>
          <Image
            layout="responsive"
            src="/nft.png"
            width="500"
            height="500"
            alt="RainbowKit Demo NFT"
            style={{ borderRadius: 8 }}
          />
          <h1 style={{ marginTop: 24 }}>Rainbow NFT</h1>
          <ConnectButton />
        </FrontCard>
        <BackCard isCardFlipped={isCardFlipped}>
          <Image
            layout="responsive"
            src="/nft.png"
            width="500"
            height="500"
            alt="RainbowKit Demo NFT"
            style={{ borderRadius: 8 }}
          />
          {/* <h1 style={{ marginTop: 24 }}>Rainbow NFT</h1> */}
          {/* <ConnectButton /> */}
        </BackCard>

        {/* <div>
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
          <button
            disabled={isLoading || isSuccess}
            className="button"
            data-minting={isLoading}
            data-minted={isSuccess}
            onClick={() => mint()}
          >
            {isSuccess ? 'Minted' : isLoading ? 'Minting...' : 'Mint'}
          </button>
        ) : (
          <p>Connect your wallet to mint.</p>
        )}
      </div> */}
      </FlipCard>
    </div>
  );
}
