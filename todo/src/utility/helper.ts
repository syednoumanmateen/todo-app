const helper = {
  getCookiesData: () => {
    return document.cookie.split(';').reduce((acc: any, cookie: any) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {})
  },
  isObj: (obj: any) => {
    if (obj) {
      if (Object.keys(obj).length) return true
      return false
    }
  }
}

export default helper