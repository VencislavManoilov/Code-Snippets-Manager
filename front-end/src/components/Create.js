import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Snippet from "./Snippet";

const Create = () => {
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");
    const [type, setType] = useState("js");
    const [view, setView] = useState("page");
    const [snippetId, setId] = useState();
    const textareaRef = useRef(null);

    const updateTextarea = () => {
        const textarea = textareaRef.current;
        textarea.style.overflow = 'hidden';
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + "px";
    };

    useEffect(() => {
        updateTextarea();
    }, [code]);

    const CheckType = (type) => {
        switch (type) {
            case 'js':
                return true;
            case 'cpp':
                return true;
            case 'cs':
                return true;
            default:
            return false;
        }
    }

    const Send = async () => {
        if(title == "" || code == "" || !CheckType(type)) {
            document.getElementById("error").style.display = "block";
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8080/snippet/create", {
                title: title,
                code: code,
                type: type
            }, { withCredentials: true });

            console.log(response);

            setId(response.data.id);
            setView("snippet");
        } catch(error) {
            document.getElementById("error").textContent = "Something went wrong ";
        }

        return (<></>);
    }

    return (
        <>
        {view === "page" ? (
            <div className="container mt-5">
                <div id="error" style={{display: 'none', position: 'sticky'}} className="alert alert-danger alert-dismissible fade show" role="danger">
                    The fields are not filled!
                    <button type="button" className="btn-close" onClick={() => {document.getElementById("error").style.display = "none"}}></button>
                </div>
                <div className="col-lg-6">
                    <label htmlFor="title" style={{fontSize: 30, fontWeight: "bold"}}>Title</label>
                    <input
                        id="title"
                        className="form-control form-control-lg"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
    
                <div className="col-12 mt-4">
                    <label htmlFor="textarea" className="form-label" style={{fontSize: 25, fontWeight: "bold"}}>Code</label>
                    <textarea
                        id="textarea"
                        className="form-control"
                        ref={textareaRef}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyUp={updateTextarea}
                    />
                </div>
    
                <div className="col-8 col-lg-3 mt-3 row text-center">
                    <label htmlFor="select" className="form-label col-auto" style={{fontSize: 22, fontWeight: "bold"}}>Type</label>
                    <select
                        id="select"
                        className="form-control selectpicker col"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option data-tokens="js">Javascript</option>
                        <option data-tokens="cpp">C++</option>
                        <option data-tokens="cs">C#</option>
                    </select>
                </div>
    
                <div className="col-12 text-end" style={{marginBottom: '50px'}}>
                    <button className="btn btn-success" onClick={Send}>Send</button>
                </div>
            </div>
        ) : (
            <Snippet snippetId={snippetId} backToProfile={() => {setView("profile")}} />
        )
        }
        </>
    );
}

export default Create;