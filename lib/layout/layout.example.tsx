import React from 'react';

import Layout from './layout';
import Header from "./header";
import Content from "./content";
import Footer from "./footer";
import Aside from "./aside";

export default function layout() {
  return (
    <div>
      <div>第1个例子</div>
      <Layout style={{ height: 300 }} >
        <Header className='test-class test  test1 test2'>Header</Header>
        <Content className='test-class test  test1 test2'>Content</Content>
        <Footer className='test-class test  test1 test2'>Content</Footer>
      </Layout>

      <div>第2个例子</div>
      <Layout style={{ height: 300 }} className='test-class test  test1 test2'>
        <Header className='test-class test  test1 test2'>Header</Header>
        <Layout>
          <Aside className='test-class test  test1 test2'>Aside</Aside>
          <Content className='test-class test  test1 test2'>Content</Content>
        </Layout>
        <Footer className='test-class test  test1 test2'>Footer</Footer>
      </Layout>


      <div>第3个例子</div>
      <Layout style={{ height: 300 }} className='test-class test  test1 test2'>
        <Header className='test-class test  test1 test2'>Header</Header>
        <Layout>
          <Content className='test-class test  test1 test2'>Content</Content>
          <Aside className='test-class test  test1 test2'>Aside</Aside>
        </Layout>
        <Footer className='test-class test  test1 test2'>Footer</Footer>
      </Layout>

      <div>第4个例子</div>
      <Layout style={{ height: 300 }} className='test-class test  test1 test2'>
        <Aside className='test-class test  test1 test2'>Aside</Aside>
        <Layout>
          <Header className='test-class test  test1 test2'>Header</Header>
          <Content className='test-class test  test1 test2'>Content</Content>
          <Footer className='test-class test  test1 test2'>Footer</Footer>
        </Layout>
      </Layout>
    </div>

  );
}