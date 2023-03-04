import { toast } from "react-toastify";
import { Text } from "@mantine/core";


export function handleAndVisualizeError(title: string, error: any) {
  toast(<ErrorMessage title={title} message={error.message} code={error.code}></ErrorMessage>, {
    type: 'error',
  });
}

export const ErrorMessage = ({ title, message, code = 500, children }:
  { title: string, message: string, code: number, children?: React.ReactNode }) => {
  return (<>
    <Text fz="md">{code}: {title}</Text>
    <Text fz="sm">{message}</Text>
    <Text fz="xs"></Text>
    {children}
  </>)

}
