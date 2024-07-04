import React, { useState, useEffect, useRef } from "react";

const Create = () => {
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");
    const [type, setType] = useState("");
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

    return (
        <div className="container mt-5">
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

            <div className="col-12 text-end">
                <button className="btn btn-success">Send</button>
            </div>
        </div>
    );
}

export default Create;