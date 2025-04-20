import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";


// hook to update a set doc with new used entered data
export const useEditFeatured = () => {

    const editFeatured = async (updatedData) => {

        const featuredDocRef = doc(db, "states", "featured");

        try {
            await updateDoc(featuredDocRef, {
                ...updatedData,
            });
        } catch (error) {
            console.error("Error updating featured section:", error);
        }
    };

    return { editFeatured };
};
