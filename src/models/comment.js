import { PostProfileConverter, Profile } from "./profile";

class CommentModel {
    id ;
    caption ;
    likes ;
    createdAt ;
    createdBy;

    constructor(id , caption , likes , createdBy, createdAt ) {
        this.id = id;
        this.caption = caption;
        this.likes = likes;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
    }
}

// // Firestore data converter
const CommentConverter = {
    toFirestore: (post) => {
        return {
            id: post.id,
            caption: post.caption,
            likes: post.likes,
            createdBy: PostProfileConverter.toFirestore(post.createdBy),
            createdAt: post.createdAt,
        };
    },
    fromFirestore: (comment) => {
        
        return new CommentModel(
            comment.id,
            comment.caption,
            comment.likes,
            PostProfileConverter.fromFirestore(comment.createdBy),
            comment.createdAt
        );
    },
};

export { CommentModel, CommentConverter };
