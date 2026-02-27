import { Layout, Menu, type MenuProps } from "antd";
import { NavLink, useLocation } from "react-router";
import { UserOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { useAppSelector } from "../../store/store";
import { selectIsAuthenticated } from "../../features/user/selectors";

const { Sider } = Layout;


const Sidebar = () => {
  const location = useLocation();
  const isAuth = useAppSelector(selectIsAuthenticated)

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
    },
  ]
  return (
    !location.pathname.includes('/login') && isAuth ?
    <Sider>
        <Menu
        selectedKeys={[selectedKeys]}
        items={menuItems}
       />
    </Sider> : null
  );
};

export default Sidebar;
