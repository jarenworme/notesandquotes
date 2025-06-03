import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase-config";
import { useAddPodcast } from "../../hooks/useAddPodcast";
import "../styles/upload-edit.css";
import "../styles/loading.css";


export default function UploadPodcast() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // state variables
    const [uploadLoading, setUploadLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imgfile, setImgfile] = useState("");
    const [preview, setPreview] = useState("");
    const [episodeLength, setEpisodeLength] = useState("");
    const [episodeNum, setEpisodeNum] = useState("");
    const [episodeDateString, setEpisodeDateString] = useState("");
    const [episodeDateStringError, setEpisodeDateStringError] = useState("");
    const [linkApple, setLinkApple] = useState("");
    const [linkSpotify, setLinkSpotify] = useState("");
    const [linkYT, setLinkYT] = useState("");
    const [linkAmazon, setLinkAmazon] = useState("");
    const [isFav, setIsFav] = useState(false);
    const [isMentalHealth, setIsMentalHealth] = useState(false);
    const [isPersonalGrowth, setIsPersonalGrowth] = useState(false);
    const [isClimateJustice, setIsClimateJustice] = useState(false);
    const [isSocialJustice, setIsSocialJustice] = useState(false);

    const { addPodcast } = useAddPodcast();

    // function to handle the user inputted photo file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImgfile(file);
        setPreview(URL.createObjectURL(file)); // Show image preview
    };

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

        setUploadLoading(true);

        // calculate the correct id in firebase based on the episode number
        let idnum = "";

        if (episodeNum < 10) {
            idnum = "ep-00" + episodeNum.toString();
        } else if (episodeNum > 9 && episodeNum < 100) {
            idnum = "ep-0" + episodeNum.toString();
        } else {
            idnum = "ep-" + episodeNum.toString();
        }

        let imgurl = "";
            
        // Upload new image to Firebase Storage
        const storageRef = ref(storage, `podcasts/${idnum}`);
        await uploadBytes(storageRef, imgfile);
        imgurl = await getDownloadURL(storageRef);

        try {
            await addPodcast({ 
                idnum, 
                title,
                imgurl,
                description,
                episodeLength,
                episodeNum: parseInt(episodeNum),
                episodeDateString,
                linkApple,
                linkSpotify,
                linkYT,
                linkAmazon,
                isFav,
                isMentalHealth,
                isPersonalGrowth,
                isClimateJustice,
                isSocialJustice
            });
            setUploadLoading(false);
            navigate('/', { replace: false });
        } catch (err) {
            setUploadLoading(false);
            console.error(err.message);
        }
    };

    const handleCancel = () => navigate('/', { replace: false });

    if (uploadLoading) return (
        <div className="loading-wrapper">
            <div className="loading-screen">
                <div className="loading-img-wrapper">
                    <div className="loading-img l1" />
                </div>
                <div className="loading-img-wrapper">
                    <div className="loading-img l2" />
                </div>
                <div className="loading-img-wrapper">
                    <div className="loading-img l3" />
                </div>
                <div className="loading-img-wrapper">
                    <div className="loading-img l4" />
                </div>
            </div>
        </div>
    );

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
                    <textarea
                        className="upload-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={4}
                    />
                    </div>
                <div className="upload-img-content-wrapper">
                    <label className="upload-label">Podcast Thumbnail</label>
                    { preview !== "" && 
                        <div className="upload-img-wrapper">
                            <img src={preview} alt="Guest Headshot" className="upload-img" />
                        </div>
                    }
                    <input className="upload-file-input" type="file" onChange={handleFileChange} accept="image/*" required />
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
                        value={isMentalHealth} 
                        onChange={() => setIsMentalHealth(!isMentalHealth)} 
                    />
                </div>
                <div className="upload-checkbox-wrapper">
                    <label className="upload-label">Add to Personal Growth</label>
                    <input 
                        className="upload-checkbox" 
                        type="checkbox" 
                        value={isPersonalGrowth} 
                        onChange={() => setIsPersonalGrowth(!isPersonalGrowth)} 
                    />
                </div>
                <div className="upload-checkbox-wrapper">
                    <label className="upload-label">Add to Climate Justice</label>
                    <input 
                        className="upload-checkbox" 
                        type="checkbox" 
                        value={isClimateJustice} 
                        onChange={() => setIsClimateJustice(!isClimateJustice)} 
                    />
                </div>
                <div className="upload-checkbox-wrapper">
                    <label className="upload-label">Add to Social Justice</label>
                    <input 
                        className="upload-checkbox" 
                        type="checkbox" 
                        value={isSocialJustice} 
                        onChange={() => setIsSocialJustice(!isSocialJustice)} 
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
