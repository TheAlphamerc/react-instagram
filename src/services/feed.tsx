import { db } from "../lib/firebase";
import {
    collection, getDocs, limit, updateDoc, arrayUnion, arrayRemove, query, doc, where, deleteDoc
} from "firebase/firestore";


import { CommentConverter, CommentModel } from "../models/index";
import { PostConverter, PostModel } from "../models/post";

class FeedService {
    // Get user following posts
    static async getTimeLineFeed(following: string[]): Promise<PostModel[]> {
        try {
            console.log("Get Feed for", following);
            const querySnapshot = query(
                collection(db, "posts").withConverter(PostConverter),
                where("createdBy.userId", "in", following),
                limit(10)
            );
            const docs = await getDocs(querySnapshot)
            if (docs.docs.length === 0) {
                return [];
            }
            const list = docs.docs.map((doc) => doc.data())
            return list;

        } catch (e) {
            console.log(e);
            throw (e);
        }
    }

    // Increase/Decrease the number of likes of a post
    static async togglePostLike(post: PostModel, userId: string): Promise<void> {
        try {
            const likes = post.likes ?? [];
            const isLiked = likes.includes(userId);
            if (isLiked) {
                await updateDoc(doc(collection(db, "posts"), post.id), {
                    likes: arrayRemove(userId)
                });

                console.log(`Post unliked ${post.id}`);
            } else {
                await updateDoc(doc(collection(db, "posts"), post.id), {
                    likes: arrayUnion(userId)
                });
                console.log(`Post liked ${post.id}`);
            }
        } catch (e) {
            console.log(e);
            throw (e);
        }
    }

    // Add new comment in a post
    static async addComment(comment: CommentModel, postId: string): Promise<void> {
        try {
            const map = CommentConverter.toFirestore(comment);
            await updateDoc(doc(collection(db, "posts").withConverter(PostConverter), postId), {
                comments: arrayUnion()
            });
        } catch (e) {
            console.log(e);
            throw (e);
        }
    }

    // Delete a post if created by the logged in user
    static async deletePost(post: PostModel, userId: string): Promise<void> {
        try {
            if (post.createdBy.userId === userId) {
                await deleteDoc(doc(collection(db, "posts"), post.id));
            }
        } catch (e) {
            console.log(e);
            throw (e);
        }
    }

    // Get user's post
    static async getUserPostsByUsername(username: string): Promise<PostModel[]> {
        try {
            const querySnapshot = query(
                collection(db, "posts").withConverter(PostConverter),
                where("createdBy.username", "==", username),
                limit(10)
            );
            const docs = await getDocs(querySnapshot)
            const list = docs.docs.map((doc) => doc.data())
            return list;
        } catch (e) {
            console.log(e);
            throw (e);
        }
    }
}

export default FeedService;