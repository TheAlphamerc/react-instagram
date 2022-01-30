import { db } from "../lib/firebase";
import { Profile, ProfileConverter } from "../models/index";
import {
    collection, getDocs, limit, updateDoc, arrayUnion, arrayRemove, query, doc, where, deleteDoc,setDoc, orderBy, startAfter
} from "firebase/firestore";


import { CommentConverter, CommentModel } from "../models/index";
import { PostConverter, PostModel } from "../models/post";
import { PostProfileConverter } from "../models/profile";

class FeedService {
    // Get user following posts
    static async getTimeLineFeed(following: string[],after:String, postLimit:number): Promise<PostModel[]> {
        try {
            var fol = following.slice(0, 9);
            const querySnapshot = query(
                collection(db, "posts").withConverter(PostConverter),
                where("createdBy.userId", "in", fol),
                orderBy("createdAt", "desc"),
                startAfter(after),
                limit(postLimit)
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
                comments: arrayUnion(map)
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

    // Create post
    static async createPost(post: PostModel): Promise<void> {
        try {
            console.log("Post saving start");
            const ref = doc(collection(db, "posts").withConverter(PostConverter));
            await setDoc(ref, post);
        } catch (e) {
            console.log(e);
            throw (e);
        }
    }

    // Report a post
    static async reportPost(post: PostModel, Profile: Profile): Promise<void> {
        try {
            const map = PostProfileConverter.toFirestore(Profile);
            await updateDoc(doc(collection(db, "posts"), post.id).withConverter(PostConverter), {
                reportedBy: arrayUnion(map)
            });
        } catch (e) {
            console.log(e);
            throw (e);
        }
    }
}

export default FeedService;