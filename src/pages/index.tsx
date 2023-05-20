import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/componets/Layout'
import { withAuth } from '@/componets/withAuth/withAuth'

const inter = Inter({ subsets: ['latin'] })

const Home = () => (
  <Layout title="Home">
    
  </Layout>
);
export default withAuth(Home);
