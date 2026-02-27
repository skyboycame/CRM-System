import { Col, Layout, Row } from "antd";
import { Outlet } from "react-router";
import { memo } from "react";

const NotAuthLayout = memo(() => {
  const { Content } = Layout;

  return (
    <Layout>
      <Content>
        <Row align="middle" style={{ height: "100vh" }}>
          <Col span={13}>
            <img
              style={{ maxWidth: "100%", height: "auto" }}
              src="/illustration.png"
            />
          </Col>
          <Col span={11}>
            <Outlet />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
});

export default NotAuthLayout;
