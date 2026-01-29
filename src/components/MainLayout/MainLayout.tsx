import { Layout } from "antd";
import Sidebar from "../Sidebar/Sidebar";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Content style={{ padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
