import React, { useEffect } from "react";
import type { FormProps } from "antd";
import { Alert, Button, Col, Form, Input, Row, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { loginUserThunk } from "../../features/user/thunks";
import { selectLoginStatus } from "../../features/user/selectors";
import { useLocation, useNavigate } from "react-router";
import type { AuthData } from "../../api/user/types";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const loginStatus = useAppSelector(selectLoginStatus);

  const onFinish: FormProps<AuthData>["onFinish"] = (values) => {
    dispatch(loginUserThunk(values));
  };

  const handleNavToReg = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (loginStatus === "fulfilled") {
      navigate(from, { replace: true });
    }
  }, [loginStatus, navigate, from]);

  return (
    <>
      <Row align="middle" style={{ height: "100vh"}}>
        <Col span={13}>
          <img style={{ maxWidth: "100%", height: "auto" }} src="/illustration.png" />
        </Col>
        <Col span={11}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<AuthData>
              label="login"
              name="login"
              rules={[{ required: true, message: "Введите логин!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<AuthData>
              label="Password"
              name="password"
              rules={[{ required: true, message: "Введите пароль!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                style={{ background: "#7F265B" }}
                type="primary"
                htmlType="submit"
              >
                Войти
              </Button>
            </Form.Item>

            {loginStatus === "loading" && <Spin />}

            {loginStatus === "rejected" && (
              <Alert
                title="Неверный логин или пароль"
                type="error"
                showIcon
                style={{ marginBottom: "16px" }}
              />
            )}
            <Form.Item label={null}>
              <Button onClick={handleNavToReg}>Зарегистрироваться</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default LoginPage;
