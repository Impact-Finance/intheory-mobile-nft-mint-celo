import Link from 'next/link';
import Image from 'next/image';

function GenFailed(props) {
  return (
    <>
      <div style={{ marginBottom: '20%' }}>
        <Image
          src="/images/robot-confused.png"
          alt="confused robot"
          width={200}
          height={200}
        />
        <h3>Uh oh! {props.actionString} failed!</h3>
      </div>
      <Link href="/select-topics">
        <button>Try again</button>
      </Link>
    </>
  );
}

export default GenFailed;
