module.exports = {
  userResultFormater: (user) => {
    return new Promise((resolve, reject) => {
      try {
        let result = {}
        if (user) {
          result = {
            _id: user._id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            gender: user.gender,
            profile: (user.role === 'admin' || user.isPublicProfile) ? user.profile : null,
            role: user.role
          }
        }

        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  }
}