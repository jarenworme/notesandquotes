import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchFeatured } from "../../../hooks/useFetchFeatured";
import { useEditFeatured } from "../../../hooks/useEditFeatured";
import "../../styles/upload-edit.css"

export default function EditFeatured() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // state variables
    const [epnum, setEpnum] = useState(0);
    const [quote, setQuote] = useState("");
    const [quoteauthor, setQuoteauthor] = useState("");

    const { featuredInfo, fetchFeatured } = useFetchFeatured();

    const { editFeatured } = useEditFeatured();

    // fetch featured data
    useEffect(() => {
        fetchFeatured();
    });

    // populate fields with existing data
    useEffect(() => {
        if(featuredInfo) {
            setEpnum(featuredInfo.epnum);
            setQuote(featuredInfo.quote);
            setQuoteauthor(featuredInfo.quoteauthor);
        }
    }, [featuredInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await editFeatured({ epnum, quote, quoteauthor })
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
                    <label className="upload-label">Quote</label>
                    <textarea
                        className="upload-input"
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        required
                        rows={4}
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
                <button type="submit" className="upload-submit-btn">Update Featured Section</button>
            </form>  
            <button type="button" onClick={handleCancel} className="upload-cancel-btn">Cancel</button>     
        </div>
    );
}
