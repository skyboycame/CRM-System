import { notification } from "antd"

export const notifyError = (title: string, error: unknown) => {
  const message = error instanceof Error ? error.message : 'Неизвестная ошибка'

  notification.error({
    message: title,
    description: message
  })
}