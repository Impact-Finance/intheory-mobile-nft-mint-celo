import styles from '../styles/GenerateImage.module.css';

function Loading(props) {
  return (
    <div className={styles.sectionLoading}>
      <ul className={styles.listBars}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div>
        <h2>{props.action}</h2>
        <p>{props.message}</p>
      </div>
    </div>
  );
}

export default Loading;
