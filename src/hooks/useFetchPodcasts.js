import { useState } from "react";
import { query, collection, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";

const LOAD_SIZE = 5;

export const useFetchPodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [morePodcastsAvailable, setMorePodcastsAvailable] = useState(true);

  const episodesCollectionRef = collection(db, "episodes");

  const fetchPodcasts = async (isNewSearch = false, currentLastDoc = null) => {
    if (isNewSearch) {
      setPodcasts([]);
      setMorePodcastsAvailable(true);
      setLastDoc(null);
    }

    setLoadingFetch(true);

    try {
      let podcastQuery = query(
        episodesCollectionRef,
        orderBy("episodeDate", "asc"),
        ...(currentLastDoc ? [startAfter(currentLastDoc)] : []),
        limit(LOAD_SIZE + 1) // Fetch one extra to check if more exist
      );

      const snapshot = await getDocs(podcastQuery);
      const allDocs = snapshot.docs;

      const newDocs = allDocs.slice(0, LOAD_SIZE); // Only take up to LOAD_SIZE
      const newPodcasts = newDocs.map(doc => ({ ...doc.data(), id: doc.id }));

      setPodcasts(prev => [...prev, ...newPodcasts]);

      if (allDocs.length <= LOAD_SIZE) {
        setMorePodcastsAvailable(false);
        setLastDoc(null);
      } else {
        setMorePodcastsAvailable(true);
        setLastDoc(allDocs[LOAD_SIZE - 1]); // Set the true last loaded doc
      }

    } catch (err) {
      console.error("Error fetching podcasts:", err);
    } finally {
      setLoadingFetch(false);
    }
  };

  const updatePodcastsOnDelete = () => {
    fetchPodcasts(true);
  };

  const loadMorePodcasts = () => {
    if (morePodcastsAvailable && !loadingFetch) {
      fetchPodcasts(false, lastDoc);
    }
  };

  return {
    podcasts,
    loadingFetch,
    morePodcastsAvailable,
    fetchPodcasts,
    updatePodcastsOnDelete,
    loadMorePodcasts
  };
};
