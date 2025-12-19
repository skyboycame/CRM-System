import { notification } from "antd";

export const validateTitleMin = (title: string): boolean => {
  return title.length >= 2;
};

export const validateTitleMax = (title: string): boolean => {
  return title.length <= 64;
};

export const validateTitleEmpty = (title: string): boolean => {
  return title.trim() !== "";
};

export const addNotification = (description: string) => {
  notification.error({
    title: "Ошибка валидации",
    description,
    placement: "topRight",
    duration: 4.5,
  });
};

export const validateTitle = (title: string): boolean => {
  const errors: string[] = [];
  
  if (!validateTitleEmpty(title)) {
    errors.push("Название не должно быть пустым");
  }
  
  if (!validateTitleMin(title)) {
    errors.push("Название должно быть не менее 2 символов");
  }
  
  if (!validateTitleMax(title)) {
    errors.push("Название должно быть не более 64 символов");
  }
  
  if (errors.length > 0) {
    errors.forEach((error) => addNotification(error));
    return false;
  }

  return true;
};