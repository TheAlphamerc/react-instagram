import { CommentModel, CommentConverter } from ".";
import { PostProfileConverter, Profile } from "./profile";

class PostModel {
  id: string;
  caption: string;
  attachments: string[];
  likes: string[];
  comments:CommentModel[];
  createdAt: any;
  createdBy: Profile;
  
  constructor(id: string, caption: string, attachments: string[], likes: string[],comments: CommentModel[], createdBy: Profile, createdAt: any) {
    this.id = id;
    this.caption = caption;
    this.attachments = attachments;
    this.comments = comments;
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
      comments: Array.isArray(post.comments) ?  post.comments.map((com:any)=> CommentConverter.toFirestore(com)) : [],
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
      Array.isArray(data.comments) ? data.comments.map((com:any)=> CommentConverter.fromFirestore(com)) : [],
      PostProfileConverter.fromFirestore(data.createdBy,),
      data.createdAt
    );
  },
};

export { PostModel, PostConverter };
