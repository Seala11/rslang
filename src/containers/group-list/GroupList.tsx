import React from 'react';
import GROUPS from 'src/data/groups';
import styles from './GroupList.module.scss';
import { IGroupListProps } from './IGroupListProps';

const GroupList: React.FC<IGroupListProps> = ({ onGroupClick, group }) => (
  <div className={styles.groups}>
    {GROUPS.map((value, i) => (
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
