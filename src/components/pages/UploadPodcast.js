import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddPodcast } from "../../hooks/useAddPodcast";
import "../styles/upload-edit.css"


export default function UploadPodcast() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // state variables
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [episodeLength, setEpisodeLength] = useState("");
    const [episodeNum, setEpisodeNum] = useState("");
    const [episodeDateString, setEpisodeDateString] = useState("");
    const [episodeDateStringError, setEpisodeDateStringError] = useState("");
    const [isFav, setIsFav] = useState(false);
    const [linkApple, setLinkApple] = useState("");
    const [linkSpotify, setLinkSpotify] = useState("");
    const [linkYT, setLinkYT] = useState("");
    const [linkAmazon, setLinkAmazon] = useState("");

    const { addPodcast } = useAddPodcast();

    const validateEpisodeDateString = () => {
        // gives an error for an incorrectly formatted date
        var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if(!episodeDateString.match(dateRegex)){
            setEpisodeDateStringError('Please Format date as YYYY-MM-DD');
        } else {
            setEpisodeDateStringError('');
        }
    }

    const handleSubmit = async (e) => {
        // prevent default form submission
        e.preventDefault();

        // calculate the correct id in firebase based on the episode number
        let idnum = "";

        if (episodeNum < 10) {
            idnum = "ep-00" + episodeNum.toString();
        } else if (episodeNum > 9 && episodeNum < 100) {
            idnum = "ep-0" + episodeNum.toString();
        } else {
            idnum = "ep-" + episodeNum.toString();
        }

        try {
            await addPodcast({ 
                idnum, 
                title,
                description,
                episodeLength,
                episodeNum: parseInt(episodeNum),
                episodeDateString,
                isFav,
                linkApple,
                linkSpotify,
                linkYT,
                linkAmazon
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
                    <label className="upload-label">Podcast Title</label>
                    <input 
                        className="upload-input" 
                        type="string" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
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
                    <label className="upload-label">Length</label>
                    <input 
                        className="upload-input" 
                        type="string" 
                        placeholder="use format 00:00" 
                        value={episodeLength} 
                        onChange={(e) => setEpisodeLength(e.target.value)} 
                        required 
                    />
                </div>
                <div className="upload-input-wrapper">
                    <label className="upload-label">Episode Number</label>
                    <input 
                        className="upload-input" 
                        type="number" 
                        value={episodeNum} 
                        onChange={(e) => setEpisodeNum(e.target.value)} 
                        required 
                    />
                </div>
                <div className="upload-input-wrapper">
                    <label className="upload-label">Episode Date</label>
                    <input 
                        className="upload-input" 
                        type="string" 
                        placeholder="use format YYYY-MM-DD" 
                        value={episodeDateString} 
                        onChange={(e) => setEpisodeDateString(e.target.value)} 
                        onBlur={validateEpisodeDateString}
                        required 
                    />
                </div>
                <p className="upload-error">{ episodeDateStringError }</p>
                <div className="upload-input-wrapper">
                    <label className="upload-label">Link to Apple</label>
                    <input 
                        className="upload-input" 
                        type="string" 
                        value={linkApple} 
                        onChange={(e) => setLinkApple(e.target.value)} 
                    />
                </div>
                <div className="upload-input-wrapper">
                    <label className="upload-label">Link to Spotify</label>
                    <input 
                        className="upload-input" 
                        type="string" 
                        value={linkSpotify} 
                        onChange={(e) => setLinkSpotify(e.target.value)} 
                    />
                </div>
                <div className="upload-input-wrapper">
                    <label className="upload-label">Link to YouTube</label>
                    <input 
                        className="upload-input" 
                        type="string" 
                        value={linkYT} 
                        onChange={(e) => setLinkYT(e.target.value)} 
                    />
                </div>
                <div className="upload-input-wrapper">
                    <label className="upload-label">Link to Amazon</label>
                    <input 
                        className="upload-input" 
                        type="string" 
                        value={linkAmazon} 
                        onChange={(e) => setLinkAmazon(e.target.value)} 
                    />
                </div>
                <div className="upload-checkbox-wrapper">
                    <label className="upload-label">Add to Naomi's Favorites</label>
                    <input 
                        className="upload-checkbox" 
                        type="checkbox" 
                        value={isFav} 
                        onChange={() => setIsFav(!isFav)} 
                    />
                </div>
                <div className="upload-checkbox-wrapper">
                    <label className="upload-label">Add to Mental Health</label>
                    <input 
                        className="upload-checkbox" 
                        type="checkbox" 
                        value={isFav} 
                        onChange={() => setIsFav(!isFav)} 
                    />
                </div>
                <div className="upload-checkbox-wrapper">
                    <label className="upload-label">Add to Personal Growth</label>
                    <input 
                        className="upload-checkbox" 
                        type="checkbox" 
                        value={isFav} 
                        onChange={() => setIsFav(!isFav)} 
                    />
                </div>
                <div className="upload-checkbox-wrapper">
                    <label className="upload-label">Add to Climate Justice</label>
                    <input 
                        className="upload-checkbox" 
                        type="checkbox" 
                        value={isFav} 
                        onChange={() => setIsFav(!isFav)} 
                    />
                </div>
                <div className="upload-checkbox-wrapper">
                    <label className="upload-label">Add to Social Justice</label>
                    <input 
                        className="upload-checkbox" 
                        type="checkbox" 
                        value={isFav} 
                        onChange={() => setIsFav(!isFav)} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="upload-submit-btn"
                    disabled={
                        title.length === 0 || 
                        description.length === 0 || 
                        episodeLength.length === 0 ||
                        episodeNum.length === 0 ||
                        episodeDateString.length === 0 || 
                        episodeDateStringError.length > 0
                    }
                >
                    Upload Podcast
                </button>
            </form>  
            <button type="button" onClick={handleCancel} className="upload-cancel-btn">Cancel</button>     
        </div>
    );
}
