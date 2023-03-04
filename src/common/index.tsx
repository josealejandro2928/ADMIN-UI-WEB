import { toast } from "react-toastify";
import ErrorMessage from "./ErrorMessage";

export function handleAndVisualizeError(error:any) {
  toast(<ErrorMessage title={`Login failed`} message={error.message} code={error.code}></ErrorMessage>, {
    type: 'error',
  });
}
