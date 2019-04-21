import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import IconExample from './lib/icon/icon.example';
import ButtonExample from './lib/button/button.example';
import DialogExample from './lib/dialog/dialog.example';
import LayoutExample from './lib/layout/layout.example';

import styled, { ThemeProvider } from 'styled-components';
import { myTheme } from './lib/my-theme';

const RootWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 50px;
  width: 100%;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;  
  border-bottom: 1px solid;
`;

const Main = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
`;

const Sider = styled.div`
  width: 180px;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid;
`;

const Content = styled.div`
  flex: 1;
  height: 100%;
  padding: 20px;
  overflow: auto;
`;

ReactDom.render(
  <Router>
    <ThemeProvider theme={myTheme}>
      <RootWrap>
        <Header>
          <div className="logo">
            HUI
          </div>
        </Header>
        <Main>
          <Sider>
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
          </Sider>
          <Content>
            <Route path="/icon" component={IconExample}/>
            <Route path="/button" component={ButtonExample}/>
            <Route path="/dialog" component={DialogExample}/>
            <Route path="/layout" component={LayoutExample}/>
          </Content>
        </Main>
      </RootWrap>
    </ThemeProvider>
  </Router>,
  document.querySelector('#root')
);