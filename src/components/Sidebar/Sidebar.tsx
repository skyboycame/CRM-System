import { Layout, Menu, type MenuProps } from "antd";
import { NavLink, useLocation } from "react-router";
import { UserOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { useMemo } from "react";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();

  const selectedKeys = useMemo(() => {
    if (location.pathname.startsWith('/profile')) return '/profile';
    return '/'
  }, [location.pathname])

  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <CheckSquareOutlined />,
      label: <NavLink to="/">Todos</NavLink>
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label:  <NavLink to="/profile">Профиль</NavLink>
    }
  ]

  return (
    <Sider>
        <Menu
        selectedKeys={[selectedKeys]}
        items={menuItems}/>
    </Sider>
  );
};

export default Sidebar;
