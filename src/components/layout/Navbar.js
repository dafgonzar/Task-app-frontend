import React from 'react';
import Task from '../task/Task'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;
const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [{ key: "1", label: "Tareas"}]
  return (
    <Layout className="layout">
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectable
          items={items}
        />
      </Header>
      <Content style={{
          padding: '0 30px',
        }}>
          <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Tareas</Breadcrumb.Item>
        </Breadcrumb>
          <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <br></br>
          <Task/> 
          </div>        
          
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Test Development by: David F Gonzalez A.
      </Footer>
    </Layout>
  );
};
export default App;