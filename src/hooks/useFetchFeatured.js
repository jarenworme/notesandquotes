import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";


// hook to fetch featured data from the featured doc in the states collection in firebase
export const useFetchFeatured = () => {
    const [featuredInfo, setFeaturedInfo] = useState(null);

    const fetchFeatured = async () => {

        const featuredDocRef = doc(db, "states", "featured");

        try {
            const featuredDoc = await getDoc(featuredDocRef);
            setFeaturedInfo({ ...featuredDoc.data() });
        } catch (error) {
            console.error("Error updating featured section:", error);
        }
    };

    return { featuredInfo, fetchFeatured };
};
