import { Layout, Menu } from "antd";
import { NavLink } from "react-router";
import { UserOutlined, CheckSquareOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider>
      <Menu>
        <Menu.Item key="todos" icon={<CheckSquareOutlined />}>
          <NavLink to="/">Todos</NavLink>
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <NavLink to="/profile">Профиль</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
