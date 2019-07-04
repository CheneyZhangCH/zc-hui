import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';

import IconExample from './lib/icon/icon.example';
import ButtonExample from './lib/button/button.example';
import DialogExample from './lib/dialog/dialog.example';
import LayoutExample from './lib/layout/layout.example';
import FormExample from './lib/form/form.example';
import ScrollExample from './lib/scroll/scroll.example';

import { ThemeProvider } from 'styled-components';
import { myTheme } from './lib/my-theme';
import { Layout, Header, Content, Aside, Footer } from './lib/layout/layout';

ReactDom.render(
  <Router>
    <ThemeProvider theme={myTheme}>
      <Layout className="page">
        <Header>
          <div className="logo">
            HUI
          </div>
        </Header>
        <Layout>
          <Aside>
            <ul>
              <li>
                <NavLink to="/icon">Icon 图标</NavLink>
              </li>
              <li>
                <NavLink to="/button">Button 按钮</NavLink>
              </li>
              <li>
                <NavLink to="/dialog">Modal 对话框</NavLink>
              </li>
              <li>
                <NavLink to="/layout">Layout 布局</NavLink>
              </li>
              <li>
                <NavLink to="/form">Form 表单</NavLink>
              </li>
              <li>
                <NavLink to="/scroll">Scroll 滚动条</NavLink>
              </li>
            </ul>
          </Aside>
          <Content>
            <Route path="/icon" component={IconExample}/>
            <Route path="/button" component={ButtonExample}/>
            <Route path="/dialog" component={DialogExample}/>
            <Route path="/layout" component={LayoutExample}/>
            <Route path="/form" component={FormExample}/>
            <Route path="/scroll" component={ScrollExample}/>
          </Content>
        </Layout>
        <Footer>
          @Copyright:
        </Footer>
      </Layout>
    </ThemeProvider>
  </Router>,
  document.querySelector('#root')
);
