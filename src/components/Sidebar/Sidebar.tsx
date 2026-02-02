import { Layout, Menu, type MenuProps } from "antd";
import { NavLink } from "react-router";
import { UserOutlined, CheckSquareOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {

  const menuItems: MenuProps['items'] = [
    {
      key: 'todos',
      icon: <CheckSquareOutlined />,
      label: <NavLink to="/">Todos</NavLink>
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label:  <NavLink to="/profile">Профиль</NavLink>
    }
  ]

  return (
    <Sider>
      <Menu>
        <Menu items={menuItems}/>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
