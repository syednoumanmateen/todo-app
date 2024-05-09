
module.exports = {
  generateTime: async (setTime) => {
    return new Promise((resolve, reject) => {
      try {
        const currentTime = new Date();
        const expiryTime = new Date(currentTime.getTime() + setTime);

        resolve(expiryTime)
      } catch (e) {
        reject(e)
      }
    })
  },
  validateTime: async (time) => {
    return new Promise((resolve, reject) => {
      try {
        const currentTime = new Date();
        const expiryTime = new Date(currentTime.getTime());

        if (time >= expiryTime) {
          resolve(true)
        }
        reject(false)
      } catch (e) {
        reject(e);
      }
    })
  },
}