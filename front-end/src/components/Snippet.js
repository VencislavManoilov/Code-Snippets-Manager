import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/main.css";

const Snippet = ({ snippetId, backToProfile }) => {
    const [snippet, setSnippet] = useState(null);

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const response = await axios.get(`http://192.168.1.11:8080/snippet/get?id=${snippetId}`, { withCredentials: true });
                setSnippet(response.data.snippet);
            } catch (error) {
                console.log("Error getting the snippet:", error);
            }
        };

        fetchSnippet();
    }, [snippetId]);

    return (
        <div className="container">
            <button className="btn btn-secondary btn-block" type="button" onClick={backToProfile}>Back to Profile</button>
            {snippet ? (
                <div>
                    <h1>{snippet.title}</h1>
                    <p>{snippet.code}</p>
                </div>
            ) : (
                <p>Loading snippet...</p>
            )}
        </div>
    );
};

export default Snippet;