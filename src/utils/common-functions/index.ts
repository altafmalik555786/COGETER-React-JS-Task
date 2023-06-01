import { notification } from "@utils/notifications";
import { constRoute } from "@utils/route";
import { resetStore } from "@stores/root-store";
import {
  CURRENT_PAGE_ROUTE_URL,
  EMPTY_NULL_DATA,
  JWT_AUTH_ACCESS_TOKEN,
} from "@utils/constants/important";

export const addDebounce = (fn, delay) => {
  let timer;
  return (() => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(), delay);
  })();
};

export const catchError = (
  error,
  at = "Mention Store Action Name To Track Error At:"
) => {
  console.log(`======================= Start =========================`);
  const { status, data } = error.response;
  console.log("At:", at, " | status: ", status, `| error data: `, data);
  if (status === 401 || status === 400 || status === 422) {
    notification.error(data?.message);
  }

  console.log(`======================= End ========================= \n\n\n\n`);
};

export const onLogOutClearAll = (naviagte = null) => {
  localStorage.removeItem(JWT_AUTH_ACCESS_TOKEN);
  localStorage.removeItem(CURRENT_PAGE_ROUTE_URL);
  naviagte(constRoute.login);
  resetStore();
};

export const sortCol = (a, b, dataIndex) => {
  if (a[dataIndex]?.length > 0 && b[dataIndex]?.length > 0) {
    return a[dataIndex].length - b[dataIndex].length;
  } else {
    return null;
  }
};

export const renderItemDataOrEmptyNull = (text) => {
  if (text) {
    if (typeof text === "number") {
      return numberWithCommas(text);
    } else {
      return text;
    }
  } else {
    if (text === 0) {
      return 0;
    } else {
      return EMPTY_NULL_DATA;
    }
  }
};

export function numberWithCommas(value: any) {
  if (
    value === "NaN" ||
    Number.isNaN(value) ||
    value === "" ||
    value === undefined
  ) {
    return "";
  } else {
    return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
}

export const copyToClipboard = (text) => {
  var textField = document.createElement("textarea");
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
  notification.success("copied");
};
