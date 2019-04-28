import React from 'react';

import Layout from './layout';
import Header from './header';
import Content from './content';
import Footer from './footer';
import Aside from './aside';

export default function layout() {
  return (
    <div>
      <div>第1个例子</div>
      <Layout style={{ height: 300 }}>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>

      <div>第2个例子</div>
      <Layout style={{ height: 300 }}>
        <Header>Header</Header>
        <Layout>
          <Aside>Aside</Aside>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>

      <div>第3个例子</div>
      <Layout style={{ height: 300 }}>
        <Header>Header</Header>
        <Layout>
          <Content>Content</Content>
          <Aside>Aside</Aside>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>

      <div>第4个例子</div>
      <Layout style={{ height: 300 }}>
        <Aside>Aside</Aside>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </div>

  );
}