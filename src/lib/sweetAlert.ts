/** SweetAlertHandling **/
import Swal from "sweetalert2";
import { Messages } from "./config";

export const sweetErrorHandling = async (err: any) => {
  const responseData = err?.response?.data;
  const responseMessage =
    typeof responseData === "string"
      ? responseData
      : responseData?.message ?? responseData?.error;
  const message = Array.isArray(responseMessage)
    ? responseMessage.join(", ")
    : responseMessage ??
    ([401, 403].includes(err?.response?.status) ? Messages.error6 : err?.message) ??
    Messages.error1;

  await Swal.fire({
    icon: "error",
    text: message,
    showConfirmButton: false,
    didOpen: () => {
      const container = Swal.getContainer();
      if (container) container.style.zIndex = "2000";
    },
  });
};

export const sweetTopSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  await Swal.fire({
    position: "top-end",
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: duration,
  });
};

export const sweetTopSmallSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
  });

  Toast.fire({
    icon: "success",
    title: msg,
  }).then();
};

export const sweetFailureProvider = (
  msg: string,
  show_button: boolean = false,
  forward_url: string = ""
) => {
  Swal.fire({
    icon: "error",
    title: msg,
    showConfirmButton: show_button,
    confirmButtonText: "OK",
  }).then(() => {
    if (forward_url !== "") {
      window.location.replace(forward_url);
    }
  });
};
