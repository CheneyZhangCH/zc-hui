import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import IconExample from './lib/icon/icon.example';
import ButtonExample from './lib/button/button.example';
import DialogExample from './lib/dialog/dialog.example';
import LayoutExample from './lib/layout/layout.example';

import { ThemeProvider } from 'styled-components';
import { myTheme } from './lib/my-theme';
import { Layout, Header, Content, Aside, Footer } from './lib/layout/layout';

ReactDom.render(
  <Router>
    <ThemeProvider theme={myTheme}>
      <Layout>
        <Header>
          <div className="logo">
            HUI
          </div>
        </Header>
        <Layout>
          <Aside>
            <h2>组件</h2>
            <ul>
              <li>
                <Link to="/icon"> Icon </ Link>
              </li>
              <li>
                <Link to="/button"> Button </ Link>
              </li>
              <li>
                <Link to="/dialog"> Dialog </ Link>
              </li>
              <li>
                <Link to="/layout"> Layout </ Link>
              </li>
            </ul>
          </Aside>
          <Content>
            <Route path="/icon" component={IconExample}/>
            <Route path="/button" component={ButtonExample}/>
            <Route path="/dialog" component={DialogExample}/>
            <Route path="/layout" component={LayoutExample}/>
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