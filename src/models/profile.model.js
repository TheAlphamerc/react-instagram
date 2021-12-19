class Profile {
  constructor(userId, fullname, username, email,avatar, following, followers,CreatedAt) {
    this.userId = userId;
    this.fullname = fullname;
    this.username = username;
    this.email = email;
    this.following = following;
    this.followers = followers;
    this.CreatedAt = CreatedAt;
    this.avatar = avatar;
  }
  toString() {
    return this.fullname + ", " + this.username + ", " + this.email;
  }
}

// Firestore data converter
const ProfileConverter = {
  toFirestore: (user) => {
    return {
      userId: user.userId,
      avatar: user.avatar,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      following: user.following,
      followers: user.followers,
      CreatedAt: user.CreatedAt,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Profile(
      data.userId,
      data.fullname,
      data.username,
      data.email,
      data.avatar,
      data.following,
      data.followers,
      data.CreatedAt,
    );
  },
};

export {Profile,ProfileConverter}