import React from 'react';
import { Header } from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";

import Layout from '../../layout/Layout';

const DynamicPage = () => {
  let location = useLocation();
  
  return (
    <Layout>
      <Header as="h2">Dynamic Page</Header>
      <p>This page was loaded asynchronously!!!</p>
    </Layout>
  );
};

export default DynamicPage;
