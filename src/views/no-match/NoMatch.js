import React from 'react';
import { Icon } from 'semantic-ui-react';
import Layout from '../../layout/Layout';

const NoMatch = () => {
  return (
    <Layout>
      <div style={{
        width: '100%',
        justifyContent: 'center',
        display: 'flex',
        marginTop: '25px',
      }}>
        <Icon name="minus circle" size="big" />
        <h2>Page not found!</h2>
      </div>
    </Layout>
  );
};

export default NoMatch;
