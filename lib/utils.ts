import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import DOMPurify from "dompurify";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createHtml(html: string) {
  const modifiedHtml = html?.replace(/<h1>/g, '<h1 class="text-[3rem!important]">');
  return {
    __html: DOMPurify?.sanitize(modifiedHtml),
  };
}

export function convertToDate() {
  const date = new Date("2018-04-04T16:00:00.000Z");

  console.log(date);
}
