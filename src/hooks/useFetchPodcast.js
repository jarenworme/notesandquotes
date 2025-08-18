import { useState, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";


// hook to fetch all data for one podcast from firebase
export const useFetchPodcast = () => {
    const [podcastInfo, setPodcastInfo] = useState(null);

    const fetchPodcast = useCallback(async (pid) => {

        let adjustedpid = "";

        if (pid < 10) {
            adjustedpid = `ep-00${pid}`;
        }
        else if (pid < 100) {
            adjustedpid = `ep-0${pid}`;
        }
        else {
            adjustedpid = `ep-${pid}`;
        }

        const podcastDocRef = doc(db, "episodes", adjustedpid);

        try {
            const podcastDoc = await getDoc(podcastDocRef);
            setPodcastInfo({ ...podcastDoc.data() });
        } catch (error) {
            console.error("Error updating featured section:", error);
        }
    }, []);

    return { podcastInfo, fetchPodcast };
};
