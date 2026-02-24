import React from "react";
import type { FormProps } from "antd";
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Result,
  Row,
  Spin,
} from "antd";
import {
  EMAIL_REGEX,
  MAX_LOGIN_LENGTH,
  MAX_PASSWORD_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  PHONE_REGEX,
  usernameRegex,
} from "../../utils/validation/constantRegister";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { registerUserThunk } from "../../features/user/thunks";
import {
  selectIsAuthenticated,
  selectRegisterError,
  selectRegisterStatus,
} from "../../features/user/selectors";
import { Link, Navigate, useNavigate } from "react-router";
import type { UserRegistration } from "../../api/user/types";

type FieldType = UserRegistration & {
  repeatPassword: string;
};

const RegistrationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const registerError = useAppSelector(selectRegisterError);
  const registerStatus = useAppSelector(selectRegisterStatus);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { repeatPassword, ...registerData } = values;
    dispatch(registerUserThunk(registerData));
  };

  const handleNavToLogin = () => {
    navigate("/login");
  };


  if (isAuthenticated) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      {registerStatus === "fulfilled" ? (
        <Result
          title="Регистрация прошла успешно"
          status="success"
          subTitle="Теперь вы можете войти в систему"
          extra={[
            <Link to="/login" key="login">
              <Button type="primary">Перейти к авторизации</Button>
            </Link>,
          ]}
        />
      ) : (
        <>
          <Col span={13}>
           <img style={{ maxWidth: "100%", height: "auto" }} src="/illustration.png" />
          </Col>
          <Col span={11}>
            <Form
              name="basic"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Имя Пользователя"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите имя пользователя",
                  },
                  {
                    min: MIN_USERNAME_LENGTH,
                    message: `Имя Пользователья должно быть длиннее ${MIN_USERNAME_LENGTH} символов`,
                  },
                  {
                    max: MAX_USERNAME_LENGTH,
                    message: `Имя Пользователья должно быть короче ${MAX_USERNAME_LENGTH} символов`,
                  },
                  {
                    pattern: usernameRegex,
                    message: `Имя пользователья должно состоять из букв Русского/Латинского алфавита`,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                label="Логин"
                name="login"
                rules={[
                  { required: true, message: "Пожалуйста, введите логин" },
                  {
                    min: MIN_LOGIN_LENGTH,
                    message: `Логин должен быть длиннее ${MIN_LOGIN_LENGTH} символов`,
                  },
                  {
                    max: MAX_LOGIN_LENGTH,
                    message: `Логин должен быть короче ${MAX_LOGIN_LENGTH} символов`,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Пароль"
                name="password"
                rules={[
                  { required: true, message: "Пожалуйста, введите пароль" },
                  {
                    min: MIN_PASSWORD_LENGTH,
                    message: `Пароль должен быть длиннее ${MIN_PASSWORD_LENGTH} символов`,
                  },
                  {
                    max: MAX_PASSWORD_LENGTH,
                    message: `Пароль должен быть короче ${MAX_PASSWORD_LENGTH} символов`,
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<FieldType>
                label="Повторите Пароль"
                name="repeatPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Пожалуйста, повторите пароль" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Пароли не совпадают"));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Пожалуйста, введите email" },
                  {
                    pattern: EMAIL_REGEX,
                    message: "Email должен быть вида: xxx@xxx.xx",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Телефон"
                name="phoneNumber"
                rules={[
                  {
                    pattern: PHONE_REGEX,
                    message: "Номер Телефона должен быть вида: +79999999999",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Зарегистрироваться
                </Button>
              </Form.Item>

              <Form.Item label={null}>
                <Button onClick={handleNavToLogin}>Авторизация</Button>
              </Form.Item>

              {registerStatus === "loading" && <Spin />}

              {registerStatus === "rejected" && (
                <Alert
                  title={registerError}
                  type="error"
                  showIcon
                  style={{ marginBottom: "16px" }}
                />
              )}
            </Form>
          </Col>
        </>
      )}
    </Row>
  );
};

export default RegistrationPage;
