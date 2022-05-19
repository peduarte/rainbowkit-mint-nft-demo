import React from 'react';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import contractInterface from '../contract-abi.json';
import FlipCard, { BackCard, FrontCard } from '../components/FlipCard';
import { ethers } from 'ethers';

const contractConfig = {
  addressOrName: '0x86fbbb1254c39602a7b067d5ae7e5c2bdfd61a30',
  contractInterface: contractInterface,
};

const Home: NextPage = () => {
  const [accountReady, setAccountReady] = React.useState(false);
  const [isMinted, setIsMinted] = React.useState(false);
  const [totalMinted, setTotalMinted] = React.useState(0);
  const { data: account } = useAccount();

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
  } = useContractWrite(contractConfig, 'mint');

  const { data: totalSupplyData } = useContractRead(
    contractConfig,
    'totalSupply',
    { watch: true }
  );

  const { data: txData, isLoading: txLoading } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  React.useEffect(() => setAccountReady(Boolean(account?.address)), [account]);

  React.useEffect(() => {
    setIsMinted(!txLoading && Boolean(txData));
  }, [txLoading, txData]);

  React.useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData.toNumber());
    }
  }, [totalSupplyData]);

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
            <h1>NFT Demo Mint</h1>
            <ConnectButton />
            <p style={{ margin: '24px 0 0' }}>{totalMinted} minted so far!</p>
            {accountReady && (
              <button
                style={{ marginTop: 12 }}
                disabled={isMintLoading || isMintStarted}
                className="button"
                data-mint-loading={isMintLoading}
                data-mint-started={isMintStarted}
                data-mint-done={isMinted}
                onClick={() => mint()}
              >
                {isMinted && 'Minted'}
                {isMintLoading && 'Waiting for approval'}
                {isMintStarted && 'Minting...'}
                {!isMinted && !isMintLoading && !isMintStarted && 'Mint'}
              </button>
            )}
          </div>
        </div>

        <div style={{ flex: '0 0 auto' }}>
          <FlipCard>
            <FrontCard isCardFlipped={isMinted}>
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
            <BackCard isCardFlipped={isMinted}>
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
                <p>
                  View on{' '}
                  <a
                    href={`https://testnets.opensea.io/assets/rinkeby/${mintData?.to}/1`}
                  >
                    Opensea
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
