import Layout from '@/componets/Layout';
import { withAuth } from '@/componets/withAuth/withAuth';
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <Layout title='Soy About'>
      <h1>About Us</h1>
      <p>Welcome to our website!</p>
    </Layout>
  );
};

export default withAuth(AboutPage) ;