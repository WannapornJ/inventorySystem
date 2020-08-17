import React, { useState, useEffect } from 'react';
import './App.css';
import LocalStorageService from './services/LocalStorage';
import PrivateRoutes from './containers/private-routes/PrivateRoute';
import {
  Layout,
  Menu,
  Col,
  Row,
  Button
} from 'antd';
import {
  PoweroffOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  TeamOutlined,
  GithubOutlined,
  HomeOutlined
} from '@ant-design/icons';
import jwtDecode from 'jwt-decode';
import './containers/pages/css/navigator.css'
import { Link } from 'react-router-dom';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

function App() {
  const [role, setRole] = useState(LocalStorageService.getRole());
  const [name, setName] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed)
  }
  const logout = () => {
    LocalStorageService.removeToken();
    setRole("guest")
  };
  const webLink = 'https://github.com/WannapornJ/inventorySystem';
  
  useEffect(() => {
    const token = LocalStorageService.getToken();
    if (token) {
      const user = jwtDecode(token);
      setName(user.name);
    }
  }, []);

  return (
    (role === 'guest' ?
      <div style={{ height: "100vh" }}>
        <PrivateRoutes role={role} setRole={setRole} />
      </div>
      :
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo" style={{height: '60px'}}></div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
            <Menu.Item key="0" icon={<HomeOutlined />}>
              <Link to='/dashboard'>Dashboard</Link>
            </Menu.Item>
            <SubMenu key='sub1' icon={<ShopOutlined />} title="Product">
              <Menu.Item key="1" >
                <Link to='/product/list'>Lists</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key='sub2' icon={<TeamOutlined />} title="employee">
              <Menu.Item key="2" >
                <Link to='/employee/list'>Lists</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row justify='space-between'>
              <Col style={{ marginLeft: '25px' }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: toggle,
                })}
              </Col>
              <Col>
                <Row justify="end" style={{ marginRight: '15px' }}>
                  <Col style={{ marginRight: '10px' }}>
                    <h3>hello, {name}</h3>
                  </Col>
                  <Col>
                    <Button type="primary" onClick={logout}>
                      <PoweroffOutlined />Log out
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <div style={{ height: "100vh" }}>
              <PrivateRoutes role={role} setRole={setRole} />
            </div>
          </Content>
          <Footer>
            <Row justify='end' align='middle'>
              <Col>
                <a href={webLink}>
                  <GithubOutlined /> GitHub
                </a>
              </Col>
            </Row>
          </Footer>
        </Layout>
      </Layout>
    )
  );
}

export default App;
