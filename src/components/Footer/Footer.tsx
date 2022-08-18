import React from 'react';
import styles from 'src/components/Footer/Footer.module.scss';
import developers from 'src/data/developers';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__wrapper}>
      <ul className={styles.footer__gitList}>
        <li className={styles.footer__gitItem}>
          <a className={styles.footer__gitLink} href={`${developers[0].githubLink}`}>
            {developers[0].githubName}
          </a>
        </li>
        <li className={styles.footer__gitItem}>
          <a className={styles.footer__gitLink} href={`${developers[1].githubLink}`}>
          {developers[1].githubName}
          </a>
        </li>
        <li className={styles.footer__gitItem}>
          <a className={styles.footer__gitLink} href={`${developers[2].githubLink}`}>
          {developers[2].githubName}
          </a>
        </li>
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
