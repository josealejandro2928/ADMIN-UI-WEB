import { Text } from "@mantine/core";

const ErrorMessage = ({ title, message, code = 500, children }:
    { title: string, message: string, code: number, children?: React.ReactNode }) => {
    return (<>
        <Text fz="md">{code}: {title}</Text>
        <Text fz="sm">{message}</Text>
        <Text fz="xs"></Text>
        {children}
    </>)

}

export default ErrorMessage;