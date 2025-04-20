import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";


// this hook handles deleting a set from the user sets collection by its setId, as well as all associated pieces and image in storage
// if the set is a moc
export const useDeletePodcast = () => {
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [error, setError] = useState(null);

    const deletePodcast = async (pid) => {
        setLoadingDelete(true);
        setError(null);

        try {
            if (!pid) {
                throw new Error("Invalid podcast id");
            }

            // lastly delete the set
            const podcastDocRef = doc(db, "episodes", pid);
            await deleteDoc(podcastDocRef);

        } catch (err) {
            console.error("Error deleting podcast:", err);
            setError(err.message);
        } finally {
            setLoadingDelete(false);
        }
    };

    return { deletePodcast, loadingDelete, error };
};
