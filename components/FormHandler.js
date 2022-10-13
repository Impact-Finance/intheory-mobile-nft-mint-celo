import Link from 'next/link';

function FormHandler(props) {
  return (
    <Link href="/generate-image">
      <button
        onClick={props.handleSubmit}
        disabled={props.topics.length === 0 || props.topics.length > 3}>
        Submit
      </button>
    </Link>
  );
}

export default FormHandler;
