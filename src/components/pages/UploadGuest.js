import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase-config";
import { useAddGuest } from "../../hooks/useAddGuest";
import "../styles/upload-edit.css"


export default function UploadGuest() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // state variables
    const [guestName, setGuestName] = useState("");
    const [description, setDescription] = useState("");
    const [personalLink, setPersonalLink] = useState("");
    const [podcastEpisode, setPodcastEpisode] = useState("");
    const [headshotFile, setHeadshotFile] = useState("");
    const [preview, setPreview] = useState("");

    const { addGuest } = useAddGuest();

    // function to handle the user inputted photo file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setHeadshotFile(file);
        setPreview(URL.createObjectURL(file)); // Show image preview
    };

    const handleSubmit = async (e) => {
        // prevent default form submission
        e.preventDefault();

        let episodeid = "";

        if (podcastEpisode < 10) {
            episodeid = "ep-00" + podcastEpisode.toString();
        } else if (podcastEpisode > 9 && podcastEpisode < 100) {
            episodeid = "ep-0" + podcastEpisode.toString();
        } else {
            episodeid = "ep-" + podcastEpisode.toString();
        }

        // calculate the correct id in firebase based on the episode number
        let firebaseid = episodeid + "-" + guestName.replace(/\s+/g, '');
        let headshotLink = "";

        // Upload new profile picture to Firebase Storage
        if (headshotFile) {
            const storageRef = ref(storage, `guest_headshots/${firebaseid}`);
            await uploadBytes(storageRef, headshotFile);
            headshotLink = await getDownloadURL(storageRef);
        }

        try {
            await addGuest({ 
                firebaseid,
                guestName,
                description,
                personalLink,
                podcastEpisode,
                podcastEpisodeID: episodeid,
                headshotLink
            });
            navigate('/', { replace: false });
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleCancel = () => navigate('/', { replace: false });

    return (
        <div className="upload-wrapper">
            <form className="upload-form" onSubmit={handleSubmit}>
                <div className="upload-input-wrapper">
                    <label className="upload-label">Guest Name</label>
                    <input 
                        className="upload-input" 
                        type="string" 
                        value={guestName} 
                        onChange={(e) => setGuestName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="upload-input-wrapper">
                    <label className="upload-label">Description</label>
                    <input 
                        className="upload-input" 
                        type="string" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>
                <div className="upload-input-wrapper">
                    <label className="upload-label">Guest Personal Link</label>
                    <input 
                        className="upload-input" 
                        type="string" 
                        value={personalLink} 
                        onChange={(e) => setPersonalLink(e.target.value)} 
                    />
                </div>
                <div className="upload-input-wrapper">
                    <label className="upload-label">Podcast Appearance Episode</label>
                    <input 
                        className="upload-input" 
                        type="number" 
                        value={podcastEpisode} 
                        onChange={(e) => setPodcastEpisode(e.target.value)} 
                        required
                    />
                </div>
                <div className="upload-img-content-wrapper">
                        { preview !== "" && 
                            <div className="upload-img-wrapper">
                                <img src={preview} alt="Guest Headshot" className="upload-img" />
                            </div>
                        }
                        <input className="upload-file-input" type="file" onChange={handleFileChange} accept="image/*" required />
                    </div>
                <button 
                    type="submit" 
                    className="upload-submit-btn"
                    disabled={
                        guestName.length === 0 || 
                        description.length === 0
                    }
                >
                    Upload Guest
                </button>
            </form>  
            <button type="button" onClick={handleCancel} className="upload-cancel-btn">Cancel</button>     
        </div>
    );
}
