import React from 'react';
import styles from 'src/components/Footer/Footer.module.scss';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__wrapper}>
      <ul className={styles.footer__gitList}>
        <li className={styles.footer__gitItem}>
          <a className={styles.footer__gitLink} href='https://github.com/Seala11'>
            Seala11
          </a>
        </li>
        <li className={styles.footer__gitItem}>
          <a className={styles.footer__gitLink} href='https://github.com/Verbena336'>
            Verbena336
          </a>
        </li>
        <li className={styles.footer__gitItem}>
          <a className={styles.footer__gitLink} href='https://github.com/iamrealmarsel'>
            iamrealmarsel
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
