import React from 'react';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useAccount, useContractWrite } from 'wagmi';
import contractInterface from '../contract-abi.json';
import FlipCard, { BackCard, FrontCard } from '../components/FlipCard';

const contractConfig = {
  addressOrName: '0xf175a8bb93c63dfd6416964882dfef9f27db4a9a',
  contractInterface: contractInterface,
};

const Home: NextPage = () => {
  const [accountReady, setAccountReady] = React.useState(false);
  const [isCardFlipped, setIsCardFlipped] = React.useState(true);
  const { data: account } = useAccount();

  const {
    data: mintData,
    write: mint,
    isLoading,
    isSuccess,
  } = useContractWrite(contractConfig, 'mint');

  React.useEffect(() => {
    setAccountReady(Boolean(account?.address));
  }, [account]);

  React.useEffect(() => {
    setIsCardFlipped(isSuccess);
  }, [isSuccess]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        maxWidth: 700,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%',
          padding: '0 30px',
        }}
      >
        <div style={{ flex: '1 1 auto' }}>
          <div style={{ padding: '24px 24px 24px 0' }}>
            <h1>Minting is now live</h1>
            <ConnectButton />
            {accountReady && (
              <button
                style={{ marginTop: 30 }}
                disabled={isLoading || isSuccess}
                className="button"
                data-minting={isLoading}
                data-minted={isSuccess}
                onClick={() => mint()}
              >
                {isSuccess
                  ? 'Minted'
                  : isLoading
                  ? 'Waiting for approval'
                  : 'Mint'}
              </button>
            )}
          </div>
        </div>

        <div style={{ flex: '0 0 auto' }}>
          <FlipCard>
            <FrontCard isCardFlipped={isCardFlipped}>
              <Image
                layout="responsive"
                src="/nft.png"
                width="500"
                height="500"
                alt="RainbowKit Demo NFT"
              />
              <h1 style={{ marginTop: 24 }}>Rainbow NFT</h1>
              <ConnectButton />
            </FrontCard>
            <BackCard isCardFlipped={isCardFlipped}>
              <div style={{ padding: 24 }}>
                <h2>NFT Minted!</h2>
                <p>
                  Your NFT will show up in your wallet in the next few minutes.
                </p>
                <p>
                  View on{' '}
                  <a href={`https://rinkeby.etherscan.io/tx/${mintData?.hash}`}>
                    Etherscan
                  </a>
                </p>
              </div>
            </BackCard>
          </FlipCard>
        </div>
      </div>
    </div>
  );
};

export default Home;
