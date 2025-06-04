import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";


// hook to fetch all data for one podcast from firebase
export const useFetchPodcast = () => {
    const [podcastInfo, setPodcastInfo] = useState(null);

    const fetchPodcast = async () => {

        const podcastDocRef = doc(db, "states", "featured");

        try {
            const podcastDoc = await getDoc(podcastDocRef);
            setPodcastInfo({ ...podcastDoc.data() });
        } catch (error) {
            console.error("Error updating featured section:", error);
        }
    };

    return { podcastInfo, fetchPodcast };
};
