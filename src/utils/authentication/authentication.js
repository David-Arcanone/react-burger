import { configStandartRequest, requestServer } from "../2api/2api";

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
export function refreshToken() {
  requestServer("/auth/token", configStandartRequest({ token: window.localStorage.getItem("refreshTokenBurger") }, "POST"))
    .then(data => {
      console.log("token обновлен")
      setCookie("accessTokenBurger", data.accessToken, { expires: 1200 });
    })
    .catch(() => {
      console.log('Ошибка обновления token');
    })
} 