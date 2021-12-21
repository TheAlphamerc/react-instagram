import { ProfileConverter } from ".";
import { PostProfileConverter, Profile } from "./profile";

class PostModel {
  id: string;
  caption: string;
  attachments: string[];
  likes: string[];
  createdAt: any;
  createdBy: Profile;
  constructor(id: string, caption: string, attachments: string[], likes: string[], createdBy: Profile, createdAt: any) {
    this.id = id;
    this.caption = caption;
    this.attachments = attachments;
    this.likes = likes;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }
}

// Firestore data converter
const PostConverter = {
  toFirestore: (post: any) => {
    return {
      id: post.id,
      caption: post.caption,
      attachments: post.attachments,
      likes: post.likes,
      createdBy: PostProfileConverter.toFirestore(post.createdBy),
      createdAt: post.createdAt,
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new PostModel(
      snapshot.id,
      data.caption,
      data.attachments,
      data.likes,
      PostProfileConverter.fromFirestore(data.createdBy,),
      data.createdAt
    );
  },
};

export { PostModel, PostConverter };
