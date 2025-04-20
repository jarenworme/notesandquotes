import { setDoc, doc, collection } from "firebase/firestore";
import { db } from "../config/firebase-config";

// this hook adds a podcast to firebase with a custom ID
export const useAddPodcast = () => {
    const episodesCollectionRef = collection(db, "episodes");

    const addPodcast = async ({
        idnum,
        title,
        description,
        episodeLength,
        episodeNum,
        episodeDateString,
        isFav,
        linkApple,
        linkSpotify,
        linkYT,
        linkAmazon
    }) => {
        const docRef = doc(episodesCollectionRef, idnum); // use custom ID
        await setDoc(docRef, {
            title,
            description,
            episodeLength,
            episodeNum,
            episodeDate: new Date(episodeDateString),
            isFav,
            linkApple,
            linkSpotify,
            linkYT,
            linkAmazon
        });
    };

    return { addPodcast };
};
