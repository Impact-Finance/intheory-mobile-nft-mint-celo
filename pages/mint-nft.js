import { useCelo } from '@celo/react-celo';
import ConnectWallet from '../components/ConnectWallet';
import ConnectedAccount from '../components/ConnectedAccount';

function MintNFT() {
  const { connect, address } = useCelo();

  return (
    <>
      {!address ? (
        <ConnectWallet connect={connect} />
      ) : (
        <ConnectedAccount address={address} />
      )}
    </>
  );
}

export default MintNFT;
