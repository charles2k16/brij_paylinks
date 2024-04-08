import { useDateFormat } from "@vueuse/core";

export function formateDate(date: Date, format: string) {
  const formattedDate = useDateFormat(date, format);
  return formattedDate.value;
}

export function getOtpCode(otpCode: any) {
  return otpCode.value.join("");
}

export function getHeaders() {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  return headers;
}
