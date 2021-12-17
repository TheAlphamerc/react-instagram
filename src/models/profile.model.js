class Profile {
  constructor(userId, fullname, username, email, following, followers,dateCreated) {
    this.userId = userId;
    this.fullname = fullname;
    this.username = username;
    this.email = email;
    this.following = following;
    this.followers = followers;
    this.dateCreated = dateCreated;
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
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      following: user.following,
      followers: user.followers,
      dateCreated: user.dateCreated,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Profile(
      data.userId,
      data.fullname,
      data.username,
      data.email,
      data.following,
      data.followers,
      data.dateCreated,
    );
  },
};

export {Profile,ProfileConverter}