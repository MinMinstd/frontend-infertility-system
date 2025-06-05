import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export const DoctorLayout = () => {
  return (
    <Layout>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};
