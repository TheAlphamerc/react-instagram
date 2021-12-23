import { db } from "../lib/firebase";
import {
    collection, getDocs, limit, updateDoc, arrayUnion, arrayRemove, query, doc, where, deleteDoc
} from "firebase/firestore";


import { CommentConverter, CommentModel } from "../models/index";
import { PostConverter, PostModel } from "../models/post";



async function updateMyFollowingUser(loggedInUserId: string, secondUserId: string, isFollow: boolean) {
    try {
        if (isFollow) {

            await updateDoc(doc(collection(db, "users"), loggedInUserId), {
                following: arrayRemove(secondUserId)
            });
            await updateDoc(doc(collection(db, "users"), secondUserId), {
                followers: arrayRemove(loggedInUserId)
            });
        } else {

            await updateDoc(doc(collection(db, "users"), loggedInUserId), {
                following: arrayUnion(secondUserId)
            });
            await updateDoc(doc(collection(db, "users"), secondUserId), {
                followers: arrayUnion(loggedInUserId)
            });
        }
    } catch (e) {
        console.log(e);
        throw (e);
    }
}


async function getTimeLineFeed(following: string[]): Promise<PostModel[]> {
    try {

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
async function togglePostLike(post: PostModel, userId: string): Promise<void> {
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
async function addComment(comment: CommentModel, postId: string): Promise<void> {
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
async function deletePost(post: PostModel, userId: string): Promise<void> {
    try {
        if (post.createdBy.userId === userId) {
            await deleteDoc(doc(collection(db, "posts"), post.id));
        }
    } catch (e) {
        console.log(e);
        throw (e);
    }
}


export { updateMyFollowingUser, getTimeLineFeed, deletePost, togglePostLike, addComment };