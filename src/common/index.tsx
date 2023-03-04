import { toast } from "react-toastify";
import ErrorMessage from "./ErrorMessage";

export function handleAndVisualizeError(title: string, error: any) {
  toast(<ErrorMessage title={title} message={error.message} code={error.code}></ErrorMessage>, {
    type: 'error',
  });
}
