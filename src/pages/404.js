import React from 'react';
import { graphql } from 'gatsby';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';

const NotFoundPage = () => {
  return (
    <Layout title={`Trang này không tồn tại`} description={`Không tìm thấy trang phù hợp`}>
      <Sidebar />
      <Page title="KHÔNG TÌM THẤY">
        <p>Không được vui rồi, trang này tìm không thấy nè.</p>
      </Page>
    </Layout>
  );
};

export default NotFoundPage;
