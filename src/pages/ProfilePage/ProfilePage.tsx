import { Alert, Button, Card, Descriptions, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getProfileDataThunk } from "../../features/profile/thunk";
import { useEffect } from "react";
import {
  selectGetProfileData,
  selectGetProfileError,
  selectGetProfileStatus,
} from "../../features/profile/selectors";
import { logoutUserThunk } from "../../features/user/thunks";
import { DeleteRowOutlined } from "@ant-design/icons";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const profileData = useAppSelector(selectGetProfileData);
  const profileError = useAppSelector(selectGetProfileError);
  const profileStatus = useAppSelector(selectGetProfileStatus);

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  useEffect(() => {
    if (profileStatus !== "idle") return;
    if (!profileData) {
      dispatch(getProfileDataThunk());
    }
  }, [dispatch, profileStatus, profileData]);
  if (profileError) {
    return (
      <Alert
        title={profileError}
        type="error"
        showIcon
        style={{ marginBottom: "16px" }}
      />
    );
  }

  return profileStatus === "loading" ? (
    <Spin />
  ) : (
    <>
      <Card title="Профиль">
        <Descriptions column={1} style={{ marginTop: 16 }}>
          <Descriptions.Item label="Имя">
            {profileData?.username}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {profileData?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Номер телефона">
            {profileData?.phoneNumber || "Не указан"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Button
        type="primary"
        icon={<DeleteRowOutlined />}
        onClick={handleLogout}
        style={{ marginTop: "1rem" }}
      >
        Выйти
      </Button>
    </>
  );
};

export default ProfilePage;
