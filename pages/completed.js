import GlobalContext from '../utils/global-context';
import { useContext, useEffect, useState } from 'react';
import GenFailed from '../components/GenFailed';
import VidLoading from '../components/VidLoading';
import Done from '../components/Done';
import BadAddress from '../components/BadAddress';
import { useCelo } from '@celo/react-celo';

export default function Completed() {
  const global = useContext(GlobalContext);
  const { connect, address } = useCelo();

  const [isReturned, setIsReturned] = useState({
    isLoaded: false,
    isFailed: false,
  });

  const [badAddress, setBadAddress] = useState();
  const [tokenId, setTokenId] = useState('');

  useEffect(() => {
    try {
      const checkWallet = async () => {
        const netlifyCheckUrl = `/.netlify/functions/check-wallet?wallet=${address}`;
        try {
          const netlifyCheckResponse = await fetch(netlifyCheckUrl).then(res =>
            res.json()
          );
          setBadAddress(netlifyCheckResponse.badAddress);
          if (netlifyCheckResponse.badAddress === false) {
            console.log('ADDRESS GOOD, MINTING NFT');
            return true;
          } else {
            console.log('ADDRESS ALREADY HAS NFT, MINTING ABORTED');
            return false;
          }
        } catch {
          setIsReturned({ ...isReturned, isFailed: true });
        }
      };
      const mintNFT = async metadataCID => {
        const netlifyMintUrl = `/.netlify/functions/tatum-mint?metadataCID=${metadataCID}&wallet=${address}`;
        try {
          const netlifyMintResponse = await fetch(netlifyMintUrl).then(res =>
            res.json()
          );
          const txnID = netlifyMintResponse.txnID;
          setTokenId(netlifyMintResponse.tokenId);
          global.update({
            ...global,
            txnID: txnID,
          });
          !txnID
            ? setIsReturned({ ...isReturned, isFailed: true })
            : setIsReturned({ ...isReturned, isLoaded: true });
        } catch {
          setIsReturned({ ...isReturned, isFailed: true });
        }
      };
      const fullFunction = async () => {
        await checkWallet().then(res => {
          if (!res) {
            console.log('MINTING ABORTED');
          } else {
            console.log('MINTING...');
            setTimeout(() => {
              console.log('MINTING ALMOST COMPLETE');
              mintNFT(global.metadataCID);
            }, 180000); // this timeout is to ensure that metadata is fetchable on IPFS after upload
          }
        });
      };
      fullFunction();
    } catch {
      setIsReturned({ ...isReturned, isFailed: true });
    }
  }, []);

  return (
    <>
      {!address || badAddress ? (
        <BadAddress wallet={address} />
      ) : isReturned.isFailed ? (
        <div>
          <GenFailed actionString="NFT minting" />
        </div>
      ) : isReturned.isLoaded && !isReturned.isFailed ? (
        <Done
          txnID={global.txnID}
          address={address}
          tokenId={tokenId}
        />
      ) : (
        <VidLoading />
      )}
    </>
  );
}
