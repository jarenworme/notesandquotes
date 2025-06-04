import { setDoc, doc, collection } from "firebase/firestore";
import { db } from "../config/firebase-config";

// this hook adds a podcast to firebase with a custom ID
export const useAddGuest = () => {
    const guestsCollectionRef = collection(db, "guests");

    const addGuest = async ({
        firebaseid,
        guestName,
        description,
        personalLink,
        podcastEpisode,
        podcastEpisodeID,
        headshotLink
    }) => {
        const docRef = doc(guestsCollectionRef, firebaseid); // use custom ID
        await setDoc(docRef, {
            guestName,
            description,
            personalLink,
            podcastEpisode,
            podcastEpisodeID,
            headshotLink
        });
    };

    return { addGuest };
};
