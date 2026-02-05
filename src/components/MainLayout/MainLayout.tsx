import { Layout } from "antd";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router";
import { memo } from "react";

const MainLayout = memo(() => {
  const { Content } = Layout;

  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Content style={{ padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
});

export default MainLayout;
