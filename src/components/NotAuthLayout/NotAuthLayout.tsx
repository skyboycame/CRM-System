import { Layout } from "antd";
import { Outlet } from "react-router";
import { memo } from "react";

const NotAuthLayout = memo(() => {
  const { Content } = Layout;

  return (
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
  );
});

export default NotAuthLayout;
