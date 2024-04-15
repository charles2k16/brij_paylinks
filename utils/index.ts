import { useDateFormat } from "@vueuse/core";
import type { AcceptedCurrencies } from "~/types";

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

export function extractAbbr(array: AcceptedCurrencies[]): string[] {
  if(array == undefined){
    return []
  }
  return array.map((currency) => currency.abbreviation);
}
