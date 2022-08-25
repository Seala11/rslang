import React from 'react';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import styles from './LayoutMain.module.scss';

const LayoutMain: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => (
  <>
    <Header />
    <main className={styles.main}>{children}</main>
    <Footer />
  </>
);

export default LayoutMain;
