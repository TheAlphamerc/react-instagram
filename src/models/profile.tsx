import { identity } from "./identity";

interface Prop {
  userId: string;
  fullname: string;
  username: string;
  email?: string | null | undefined;
  avatar?: string | null;
  following?: String[] | null;
  followers?: String[] | null;
  createdAt?: any | null;
}
class Profile {
  userId: string;
  fullname: string;
  username: string;
  email: String | null | undefined;
  following: String[] | null | undefined;
  followers: String[] | null | undefined;
  createdAt: any | null | undefined;
  avatar: string | null | undefined;

  constructor({
    userId,
    fullname,
    username,
    email,
    avatar,
    following,
    followers,
    createdAt,
  }: Prop) {
    this.userId = userId;
    this.fullname = fullname;
    this.username = username;
    this.email = email;
    this.following = following;
    this.followers = followers;
    this.createdAt = createdAt;
    this.avatar = avatar;
  }

  toString() {
    return this.fullname + ", " + this.username + ", " + this.email;
  }

  static postUser(
    userId: string,
    fullname: string,
    username: string,
    avatar: string
  ): Profile {
    return new Profile({
      userId: userId,
      fullname: fullname,
      username: username,
      avatar: avatar,
    });
  }
}

// Firestore data converter
const ProfileConverter = {
  toFirestore: (user: any) => {
    return {
      userId: user.userId,
      avatar: identity(user.avatar),
      fullname: identity(user.fullname),
      username: identity(user.username),
      email: identity(user.email),
      following: identity(user.following),
      followers: identity(user.followers),
      createdAt: identity(user.createdAt),
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Profile({
      userId: snapshot.id,
      avatar: data.avatar,
      fullname: data.fullname,
      username: data.username,
      email: data.email,
      following: data.following,
      followers: data.followers,
      createdAt: data.createdAt,
    });
  },
};

const PostProfileConverter = {
  toFirestore: (user: any) => {
    return {
      userId: user.userId,
      avatar: identity(user.avatar),
      fullname: identity(user.fullname),
      username: identity(user.username),
    };
  },
  fromFirestore: (data: any) => {
    return new Profile({
      userId: data.userId,
      fullname: data.fullname,
      username: data.username,
      avatar: data.avatar,
    });
  },
};



export { Profile, ProfileConverter, PostProfileConverter };
