// import { CommentModel, CommentConverter } from ".";
import { ProfileConverter } from ".";
import { identity } from "./identity";
import { PostProfileConverter, Profile } from "./profile";

interface Prop {
  id: string;
  caption?: string;
  attachments?: string[];
  location?: string;
  likes?: string[];
  comments?: PostModel[];
  createdAt: any;
  createdBy: Profile;
  reportedBy?: Profile[];
}
class PostModel {
  id: string;
  caption: string;
  attachments: string[] | undefined;
  location: string | undefined;
  likes: string[] | undefined;
  comments: PostModel[] | undefined;
  createdAt: any;
  createdBy: Profile;
  reportedBy: Profile[] | undefined;
  constructor({
    id,
    caption = "",
    attachments,
    location,
    createdBy,
    createdAt,
    likes,
    comments,
    reportedBy,
  }: Prop) {
    this.id = id;
    this.caption = caption;
    this.attachments = attachments;
    this.location = location;
    this.comments = comments;
    this.likes = likes;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.reportedBy = reportedBy;
  }
}

// Firestore data converter
const PostConverter = {
  toFirestore: (post: any) => {
    return {
      id: identity(post.id),
      caption: identity(post.caption),
      attachments: identity(post.attachments),
      likes: identity(post.likes),
      location: identity(post.location),
      comments: Array.isArray(post.comments)
        ? post.comments.map((com: any) => PostConverter.toFirestore(com))
        : [],
      createdBy: PostProfileConverter.toFirestore(post.createdBy),
      createdAt: post.createdAt,
      reportedBy: Array.isArray(post.reportedBy)
        ? post.reportedBy.map((user: any) => ProfileConverter.toFirestore(user))
        : [],
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new PostModel({
      id: snapshot.id,
      caption: data.caption,
      attachments: data.attachments,
      location: data.location,
      likes: data.likes,
      comments: Array.isArray(data.comments)
        ? data.comments.map((com: any) => CommentConverter.fromFirestore(com))
        : [],
      createdBy: PostProfileConverter.fromFirestore(data.createdBy),
      createdAt: data.createdAt,
      reportedBy: Array.isArray(data.comments)
        ? data.comments.map((com: any) =>
            PostProfileConverter.fromFirestore(com)
          )
        : [],
    });
  },
};

const CommentConverter = {
  toFirestore: (post: any) => {
    return {
      id: identity(post.id),
      caption: identity(post.caption),
      likes: identity(post.likes),
      createdBy: PostProfileConverter.toFirestore(post.createdBy),
      createdAt: post.createdAt,
    };
  },
  fromFirestore: (comment: any) => {
    return new PostModel({
      id: comment.id,
      caption: comment.caption,
      likes: comment.likes,
      createdBy: PostProfileConverter.fromFirestore(comment.createdBy),
      createdAt: comment.createdAt,
    });
  },
};

export { PostModel, PostConverter };
