import React from 'react';
import styles from 'src/components/Footer/Footer.module.scss';
import DEVELOPERS_LIST from 'src/data/DEVELOPERS_LIST';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__wrapper}>
      <ul className={styles.footer__gitList}>
        {DEVELOPERS_LIST.map(item => <li className={styles.footer__gitItem}>
          <a className={styles.footer__gitLink} href={`${item.githubLink}`}>
            {item.githubName}
          </a>
        </li>)}
      </ul>
      <div className={styles.footer__schoolLink}>
        <span className={styles.footer__year}>2022</span>
        <a className={styles.footer__rsLink} href='https://rs.school/js/'>
          RS School
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
