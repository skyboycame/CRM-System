import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import {
  selectIsAuthChecked,
  selectIsAuthenticated,
} from "../../features/user/selectors";
import { Spin } from "antd";

interface props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: props) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  
  if (!isAuthChecked) {
    return <Spin />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }


  return children;
};

export default ProtectedRoute;
