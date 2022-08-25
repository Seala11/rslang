import React from 'react';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import styles from './LayoutMain.module.scss';
import { TLayoutMainProps } from './TLayoutMainProps';

const LayoutMain: React.FC<TLayoutMainProps> = ({ children }) => (
  <>
    <Header />
    <main className={styles.main}>{children}</main>
    <Footer />
  </>
);

export default LayoutMain;
