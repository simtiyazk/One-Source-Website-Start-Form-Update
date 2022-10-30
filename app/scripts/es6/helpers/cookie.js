export const createCookie = (name, value) => (document.cookie = `${name}=${value}; path=/`);
export const eraseCookie = (name) => createCookie(name, '', -1);

export const readCookie = (name) => {
    let nameEQ = `${name}=`;
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
};
