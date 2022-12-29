import SingleTopic from './SingleTopic';
import styles from '../styles/TopicsBlock.module.css';
import topics from '/utils/topics.js';

export default function TopicsBlock(props) {
  return (
    <div className={styles.TopicGroup}>
      {topics.map(topic => (
        <SingleTopic
          name={topic}
          key={topic}
          addTopic={props.addTopic}
          removeTopic={props.removeTopic}
          previousTopics={props.previousTopics}
        />
      ))}
    </div>
  );
}
