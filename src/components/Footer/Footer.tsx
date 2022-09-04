import React from 'react';
import styles from 'src/components/Footer/Footer.module.scss';
import DEVELOPERS_LIST from 'src/data/developers';
import Image from '../Image';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__wrapper}>
      <ul className={styles.gitList}>
        {DEVELOPERS_LIST.map((item) => (
          <li key={item.id}>
            <a className={styles.gitLink} href={`${item.githubLink}`}>
              {item.githubName}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.schoolLink}>
        <span>2022</span>
        <a target='_blank' className={styles.rsLink} href='https://rs.school/js/' rel='noreferrer'>
          <Image
            {...{
              altImg: 'RsLogo',
              srcImg: '/assets/icons/rs_school_js.svg',
              className: styles.rslogo,
            }}
          />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
