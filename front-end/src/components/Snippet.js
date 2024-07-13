import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/main.css";
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import QRCode from 'qrcode.react';

const URL = process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_CUSTOM_BACKEND_URL || "http://localhost:8080";

const Snippet = ({ snippetId, hasBackButton, backToProfileFunction, theSnippet }) => {
    const [snippet, setSnippet] = useState(null);
    const [showQRCode, setShowQRCode] = useState(false);

    useEffect(() => {
        if(!theSnippet) {
            const fetchSnippet = async () => {
                try {
                    const response = await axios.get(URL+"/snippet/get", { params: { id: snippetId } });
                    setSnippet(response.data.snippet);
                } catch (error) {
                    window.location.href = "/not_found";
                }
            };
            fetchSnippet();
        } else {
            setSnippet(theSnippet);
        }
    }, [snippetId]);

    useEffect(() => {
        hljs.highlightAll();
    }, [snippet]);

    const CopyURL = () => {
        // navigator.clipboard.writeText(URL+"/snippet?id=" + snippetId);
    }

    const handleShowQRCode = () => {
        setShowQRCode(true);
    };

    return (
        <div className="container mt-5">
            {hasBackButton ? (
                <button className="btn btn-secondary btn-block" type="button" onClick={backToProfileFunction}>Go to Profile</button>
            ) : (<></>)}
            {snippet ? (
                <div className="mt-3">
                    <h1>{snippet.title}</h1>
                    <pre><code className={"language-"+snippet.type}>{snippet.code}</code></pre>
                    <span className="h4">Type: <span className="badge text-bg-secondary">{snippet.type}</span></span>

                    <div className="row col-12 mt-3">
                        <button type="button" className="btn btn-secondary col-auto me-3" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={handleShowQRCode}>Show QR code</button>

                        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel2">QR Code</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body text-center" style={{margin: "none"}}>
                                        {showQRCode && <QRCode value={"https://localhost:3000/snippet?id=" + snippetId} size={256} />}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" data-bs-dismiss="modal" className="btn btn-primary">OK</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="button" className="btn btn-primary col-auto" onClick={CopyURL()} data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Copy URL
                        </button>

                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Copied to Clipboard!</h1>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" data-bs-dismiss="modal" className="btn btn-primary">OK</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading snippet...</p>
            )}
        </div>
    );
};

export default Snippet;