import styles from '../styles/SingleTopic.module.css';
import useToggle from '../hooks/useToggle';
import React, { useEffect } from 'react';

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

  useEffect(() => {
    const prev = props.previousTopics;
    if (prev.includes(props.name)) {
      toggleIsSelected();
      props.addTopic(props.name);
    }
  }, []);

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
