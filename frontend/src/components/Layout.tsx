import React from 'react';
import Link from 'next/link';
import { Layout as AntLayout, Menu } from 'antd';
import { UserOutlined, FormOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';  

const { Header, Content, Footer, Sider } = AntLayout;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();  

  const selectedKey = router.pathname === '/feedback' ? '2' : '1';

  // Define menu items in an array format
  const menuItems = [
    { label: <Link href="/">Dashboard</Link>, key: '1', icon: <UserOutlined /> },
    { label: <Link href="/feedback">Write Feedback</Link>, key: '2', icon: <FormOutlined /> },
  ];

  return (
    <AntLayout>
      <Sider>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} items={menuItems} /> {/* Using items prop here */}
      </Sider>
      <AntLayout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360 }}>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Feedback Form ©{new Date().getFullYear()} Created by Anjali
        </Footer>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
