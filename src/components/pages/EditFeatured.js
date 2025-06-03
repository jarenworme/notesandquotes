import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase-config";
import { useFetchFeatured } from "../../hooks/useFetchFeatured";
import { useEditFeatured } from "../../hooks/useEditFeatured";
import "../styles/upload-edit.css"

export default function EditFeatured() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // state variables
    const [epnum, setEpnum] = useState(0);
    const [title, setTitle] = useState("");
    const [imgfile, setImgfile] = useState("");
    const [preview, setPreview] = useState("");
    const [quote, setQuote] = useState("");
    const [quoteauthor, setQuoteauthor] = useState("");
    const [ytlink, setYtlink] = useState("");

    const { featuredInfo, fetchFeatured } = useFetchFeatured();

    const { editFeatured } = useEditFeatured();

    // fetch featured data
    useEffect(() => {
        fetchFeatured();
    }, []);

    // populate fields with existing data
    useEffect(() => {
        if(featuredInfo) {
            setEpnum(featuredInfo.epnum);
            setTitle(featuredInfo.title);
            setPreview(featuredInfo.imgurl);
            setQuote(featuredInfo.quote);
            setQuoteauthor(featuredInfo.quoteauthor);
            setYtlink(featuredInfo.ytlink);
        }
    }, [featuredInfo]);

    // function to handle the user inputted photo file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImgfile(file);
        setPreview(URL.createObjectURL(file)); // Show image preview
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imgurl = featuredInfo.imgurl;
            
            // Upload new set picture to Firebase Storage
            console.log("image file - get to if statement")
            const storageRef = ref(storage, "featured/featuredimg");
            await uploadBytes(storageRef, imgfile);
            imgurl = await getDownloadURL(storageRef);

            await editFeatured({ epnum, title, imgurl, quote, quoteauthor, ytlink })
            // await editSet(setID, { img_url, name, num_parts: parseInt(num_parts) });
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
                    <label className="upload-label">Podcast Episode Number</label>
                    <input 
                        className="upload-input" 
                        type="number" 
                        value={epnum} 
                        onChange={(e) => setEpnum(e.target.value)} 
                        required
                    />
                </div>
                <div className="upload-input-wrapper">
                    <label className="upload-label">Featured Section Title</label>
                    <input 
                        className="upload-input" 
                        type="string" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
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
                <div className="upload-input-wrapper">
                    <label className="upload-label">Quote</label>
                    <input 
                        className="upload-input" 
                        type="string" 
                        value={quote} 
                        onChange={(e) => setQuote(e.target.value)} 
                        required 
                    />
                </div>
                <div className="upload-input-wrapper">
                    <label className="upload-label">Quote Author</label>
                    <input 
                        className="upload-input" 
                        type="string" 
                        value={quoteauthor} 
                        onChange={(e) => setQuoteauthor(e.target.value)} 
                        required 
                    />
                </div>
                <div className="upload-input-wrapper">
                    <label className="upload-label">YouTube Link</label>
                    <input 
                        className="upload-input" 
                        type="string" 
                        value={ytlink} 
                        onChange={(e) => setYtlink(e.target.value)} 
                    />
                </div>
                <button type="submit" className="upload-submit-btn">Update Featured Section</button>
            </form>  
            <button type="button" onClick={handleCancel} className="upload-cancel-btn">Cancel</button>     
        </div>
    );
}
