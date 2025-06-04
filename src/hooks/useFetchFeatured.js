import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";


// hook to fetch featured data from the featured doc in the states collection in firebase along with its podcast info via epnum
export const useFetchFeatured = () => {
    const [featuredInfo, setFeaturedInfo] = useState(null);
    const [podcastInfo, setPodcastInfo] = useState(null);

    const fetchFeatured = async () => {

        const featuredDocRef = doc(db, "states", "featured");

        try {
            const featuredDoc = await getDoc(featuredDocRef);
            setFeaturedInfo({ ...featuredDoc.data() });

            let epnum = featuredDoc.data().epnum;
            let epnumString = "";
            if (epnum < 10) {
                epnumString = "00" + epnum.toString();
            } else if (epnum < 100) {
                epnumString = "0" + epnum.toString();
            } else {
                epnumString = epnum.toString();
            }
            
            const podcastDocId = "ep-" + epnumString;
            const podcastDocRef = doc(db, "episodes", podcastDocId);
            const podcastDoc = await getDoc(podcastDocRef);
            setPodcastInfo({...podcastDoc.data() });
        } catch (error) {
            console.error("Error updating featured section:", error);
        }
    };

    return { featuredInfo, podcastInfo, fetchFeatured };
};
