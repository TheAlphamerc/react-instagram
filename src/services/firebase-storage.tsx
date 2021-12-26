import { db } from "../lib/firebase";

import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";



class FirebaseStorageService {
    /**
* Uplopad file to firebase storage
* @param {File} file
* @param {string} pathname 
* @param {function} onFileupload 
* @param {function} onUploadFail 
* @returns 
*/
    static async uploadFile(file: File, pathname: string, onFileupload = (e: string) => { }, onUploadFail = (e: string) => { },): Promise<string> {
        try {
            const storage = getStorage();
            const reference = ref(storage, `${pathname}/${file.name}`);
            const uploadTask = uploadBytesResumable(reference, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    onUploadFail(error.message);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log('File available at', downloadURL);
                    onFileupload(downloadURL);
                });
            return "";
        } catch (e) {
            console.log(e);
            throw (e);
        }
    }

}

export default FirebaseStorageService;