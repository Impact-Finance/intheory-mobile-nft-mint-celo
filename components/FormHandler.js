import Link from 'next/link';

function FormHandler(props) {
  return (
    <Link href="/generate-image">
      <form
        name="selected-topics"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field">
        <div>
          <input
            type="text"
            name="topics"
            readOnly
            value={props.topics}
          />
          <input
            name="form-name"
            readOnly
            value="selected-topics"
          />
          <input name="bot-field" />
        </div>
        <button
          type="submit"
          onClick={props.handleSubmit}
          disabled={props.topics.length === 0 || props.topics.length > 3}>
          Submit
        </button>
      </form>
    </Link>
  );
}

export default FormHandler;
