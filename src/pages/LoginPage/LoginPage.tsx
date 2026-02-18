import React, { useEffect } from "react";
import type { FormProps } from "antd";
import { Alert, Button, Col, Form, Input, Row, Spin, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { loginUserThunk } from "../../features/user/thunks";
import type { AuthData } from "../../api/types";
import {
  selectLoginStatus,
} from "../../features/user/selectors";
import { useLocation, useNavigate } from "react-router";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const loginStatus = useAppSelector(selectLoginStatus);

  const onFinish: FormProps<AuthData>["onFinish"] = (values) => {
    console.log("Success:", values);
    dispatch(loginUserThunk(values));
  };

  const onFinishFailed: FormProps<AuthData>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleNavToReg = () => {
    navigate('/register')
  }

  useEffect(() => {
    if (loginStatus === "fulfilled") {
      navigate(from, { replace: true });
    }
  }, [loginStatus, navigate, from]);


  return (
    <>
      <Row  align='middle' style={{minHeight: '100vh'}}>
        <Col span={12}>
          <Typography.Title level={2} style={{textAlign: 'center'}}>Авторизация</Typography.Title>
        </Col>
        <Col span={12}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<AuthData>
            label="login"
            name="login"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<AuthData>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
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
            <Button  onClick={handleNavToReg}>Зарегистрироваться</Button> 
          </Form.Item>
        </Form>

        </Col>
      </Row>
    </>
  )
}
export default LoginPage
