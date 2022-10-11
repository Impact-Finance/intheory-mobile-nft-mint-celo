import React, { useState } from 'react';
import styles from '../styles/Select.module.css';
import TopicsBlock from '../components/TopicsBlock';
import { useContext } from 'react';
import GlobalContext from '../utils/global-context';
import FormHandler from '../components/FormHandler';

export default function SelectTopics() {
  const global = useContext(GlobalContext);

  const [topics, setTopics] = useState([]);

  const addTopic = topicName => {
    setTopics([...topics, topicName]);
  };

  const removeTopic = topicName => {
    const newTopics = topics.filter(t => t !== topicName);
    setTopics(newTopics);
  };

  const handleSubmit = () => {
    global.update({
      submittedTopics: topics,
    });
  };

  return (
    <>
      <div className={styles.stepHeader}>
        <span className={styles.numberIcon}>1</span>
        <div>
          <h3 className={styles.stepText}>
            Select topics of interest:
            <br />
            <span style={{ filter: 'opacity(0.6)', fontSize: '1em' }}>
              (max 3)
            </span>{' '}
            {topics.length > 3 && (
              <span className={styles.warning}>MAXIMUM EXCEEDED</span>
            )}
            {topics.length === 0 && (
              <span className={styles.warning}>SELECT AT LEAST ONE</span>
            )}
          </h3>
        </div>
      </div>
      <TopicsBlock
        addTopic={addTopic}
        removeTopic={removeTopic}
      />
      <FormHandler
        topics={topics}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
