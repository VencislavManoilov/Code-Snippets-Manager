import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/main.css";
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

const URL = process.env.REACT_APP_API_URL;

const Snippet = ({ snippetId, hasBackButton, backToProfileFunction }) => {
    const [snippet, setSnippet] = useState(null);

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const response = await axios.get(`${URL}/snippet/get?id=${snippetId}`);
                setSnippet(response.data.snippet);
            } catch (error) {
                console.log("Error getting the snippet:", error);
            }
        };

        fetchSnippet();
    }, [snippetId]);

    useEffect(() => {
        hljs.highlightAll();
    }, [snippet]);

    return (
        <div className="container">
            {hasBackButton ? (
                <button className="btn btn-secondary btn-block" type="button" onClick={backToProfileFunction}>Go to Profile</button>
            ) : (<></>)}
            {snippet ? (
                <div>
                    <h1>{snippet.title}</h1>
                    <pre><code className={"language-"+snippet.type}>{snippet.code}</code></pre>
                </div>
            ) : (
                <p>Loading snippet...</p>
            )}
        </div>
    );
};

export default Snippet;