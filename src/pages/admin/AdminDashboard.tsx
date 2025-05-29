import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, TeamOutlined, CalendarOutlined, BarChartOutlined, FileOutlined } from '@ant-design/icons';
import Profile from './Profile';
import CustomerList from './CustomerList';
import DoctorWorkList from './DoctorWorkList';
import AppointmentList from './AppointmentList';
import Dashboard from './Dashboard';

const { Header, Content, Sider } = Layout;

const AdminDashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = React.useState('1');

  const renderContent = () => {
    switch (selectedMenu) {
      case '1':
        return <Profile />;
      case '2':
        return <CustomerList />;
      case '3':
        return <DoctorWorkList />;
      case '4':
        return <AppointmentList />;
      case '5':
        return <Dashboard />;
      default:
        return <Profile />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo" style={{ height: 32, margin: '16px', background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" mode="inline" selectedKeys={[selectedMenu]} onClick={({ key }) => setSelectedMenu(key)}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Hồ sơ cá nhân
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>
            Danh sách khách hàng
          </Menu.Item>
          <Menu.Item key="3" icon={<CalendarOutlined />}>
            Danh sách lịch làm việc
          </Menu.Item>
          <Menu.Item key="4" icon={<CalendarOutlined />}>
            Danh sách lịch hẹn
          </Menu.Item>
          <Menu.Item key="5" icon={<BarChartOutlined />}>
            Bảng điều khiển
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedMenu === '1' ? 'Hồ sơ cá nhân' : selectedMenu === '2' ? 'Danh sách khách hàng' : selectedMenu === '3' ? 'Danh sách lịch làm việc' : selectedMenu === '4' ? 'Danh sách lịch hẹn' : 'Bảng điều khiển'}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;