import Link from 'next/link';

function FormHandler(props) {
  return (
    <form
      name="selected-topics"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field">
      <div hidden>
        <input
          type="text"
          name="topics"
          value={props.topics}
        />
        <input name="bot-field" />
      </div>
      <Link href="/generate-image">
        <button
          type="submit"
          onClick={props.handleSubmit}
          disabled={props.topics.length === 0 || props.topics.length > 3}>
          Submit
        </button>
      </Link>
    </form>
  );
}

export default FormHandler;
