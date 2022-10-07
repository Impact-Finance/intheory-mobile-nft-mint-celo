import styles from '../styles/SingleTopic.module.css';
import useToggle from '../hooks/useToggle';

export default function SingleTopic(props) {
  const [isSelected, toggleIsSelected] = useToggle(false);
  const handleClick = () => {
    if (isSelected) {
      props.removeTopic(props.name);
    } else {
      props.addTopic(props.name);
    }
    toggleIsSelected();
  };

  return (
    <span
      className={
        isSelected
          ? `${styles.singleTopic} ${styles.selected}`
          : styles.singleTopic
      }
      onClick={handleClick}>
      {props.name}
    </span>
  );
}
