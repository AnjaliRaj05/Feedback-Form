import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Layout from '@/components/Layout';
import FeedbackData from '@/components/FeedbackData';

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Layout>
        <main className={styles.main}>   
        <FeedbackData />
        </main>
      </Layout>
    </>
  );
}
