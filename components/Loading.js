import styles from '../styles/GenerateImage.module.css';

function Loading() {
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
        <h2>Generating image...</h2>
        <p>This should take less than 30 seconds</p>
        {/* <div className="partner-ref">
            <a
              href="https://www.wombo.art/"
              target="_blank"
              rel="noopener noreferrer">
              Generated with
              <span className="logo">
                <Image
                  src="/images/wombo.png"
                  alt="WOMBO.ai Logo"
                  width={70}
                  height={18}
                />
              </span>
            </a>
          </div> */}
      </div>
    </div>
  );
}

export default Loading;
