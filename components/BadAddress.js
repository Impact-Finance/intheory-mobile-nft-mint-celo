import Image from 'next/image';
import Link from 'next/link';

function BadAddress() {
  return (
    <>
      <div style={{ marginBottom: '20%' }}>
        <Image
          src="/images/robot-confused.png"
          alt="confused robot"
          width={200}
          height={200}
        />
        <h3>No eligible wallet address detected</h3>
        <p>
          This could mean that you have already minted an inTheory Pre-Launch
          NFT with this wallet address!
        </p>
      </div>
      <Link href="/mint-nft">
        <button className="main-button">Go back</button>
      </Link>
    </>
  );
}

export default BadAddress;
