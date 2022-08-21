import React from 'react';
import styles from './GroupList.module.scss';
import { IGroupListProps } from './IGroupListProps';

const groups = [
  { id: 1, level: 'Level 1', description: 'Easy' },
  { id: 2, level: 'Level 2', description: 'Easy' },
  { id: 3, level: 'Level 3', description: 'Medium' },
  { id: 4, level: 'Level 4', description: 'Medium' },
  { id: 5, level: 'Level 5', description: 'Hard' },
  { id: 6, level: 'Level 6', description: 'Hard' },
];

const GroupList: React.FC<IGroupListProps> = ({ onGroupClick, group }) => (
  <div className={styles.groups}>
    {groups.map((value, i) => (
      <button
        className={`${i + 1 === group ? styles.active : ''} ${styles.btn}`}
        type='button'
        onClick={() => onGroupClick(i + 1)}
        key={value.id}
      >
        <span className={styles.level}>{value.level}</span>
        <h3 className={styles.title}>{value.description}</h3>
      </button>
    ))}
  </div>
);

export default GroupList;
