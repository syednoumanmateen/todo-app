const helper = {
  getCookiesData: () => {
    return document.cookie.split(';').reduce((acc: any, cookie: any) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {})
  }
}

export default helper