import Layout from '@/componets/Layout';
import { withAuth } from '@/componets/withAuth/withAuth';
import React from 'react';

const AboutPage: React.FC = () => {
  return (
   <div>Usuario No Autorizado</div>
  );
};

export default withAuth(AboutPage) ;