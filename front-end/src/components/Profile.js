import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./css/main.css";
import Snippet from "./Snippet";

const URL = process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_CUSTOM_BACKEND_URL || "http://localhost:8080";

const Profile = (user) => {
    const [snippetIds, setSnippetIds] = useState([]);
    const [snippets, setSnippets] = useState([]);
    const [view, setView] = useState("profile");
    const [currentSnippetId, setCurrentSnippetId] = useState(null);

    useEffect(() => {
        const fetchSnippetIds = async () => {
            try {
                const response = await axios.get(URL+"/snippet/ids", { withCredentials: true });
                if(response.data) {
                    setSnippetIds([]);
                    setSnippetIds(response.data.snippets);
                    const snippets = await fetchAllSnippets(response.data.snippets)
                    setSnippets(snippets);
                }
            } catch (error) {
                console.log("Error getting snippet ids:", error);
            }
        };

        const fetchAllSnippets = async (ids) => {
            const snippetPromises = ids.map((id) => fetchSnippet(id));
            const snippets = await Promise.all(snippetPromises);
            return snippets.filter(snippet => snippet !== null); // Filter out any null values in case of fetch errors
        };

        const fetchSnippet = async (id) => {
            try {
                const response = await axios.get(URL + "/snippet/get?id=" + id, { withCredentials: true });
                return response.data.snippet;
            } catch (error) {
                console.log("Error getting the snippet:", error);
                return null;
            }
        };

        fetchSnippetIds();
    }, []);

    const logout = async () => {
        try {
            const response = await axios.get(URL+"/logout", { withCredentials: true });
            if(response) {
                window.location.href = "/";
            }
        } catch (error) {
            console.log("Error logging out:", error);
        }
    };

    const handleSnippetClick = (snippetId) => {
        setCurrentSnippetId(snippetId);
        setView("snippet");
    };

    const back = () => {
        window.location.href = "/";
    };

    const backToProfile = () => {
        setView("profile");
    };

    return (
        <div className="container">
            {view === "profile" ? (
                <>
                    <div className="row mt-4">
                        <div className="col-auto">
                            <button className="btn btn-secondary btn-block" type="button" onClick={back}>Back</button>
                        </div>
                    </div>

                    <div className="row mt-3 justify-content-between">
                        <h1 className="col-auto">{user.user.name}</h1>
                        <button className="col-auto btn btn-danger btn-block" type="button" style={{height: "40px", marginTop: "10px"}} onClick={logout}>Logout</button>
                    </div>
                    <h3 className="col">email: {user.user.email}</h3>
                    <h3 className="col">age: {user.user.age}</h3>

                    {snippets.length > 0 ? (
                        <div className="row mt-5">
                            <h3>Snippets:</h3>
                            {snippets.map((snippet, index) => (
                                <a
                                    key={index}
                                    className="text-left"
                                    style={{ textAlign: "left", fontSize: "22px", cursor: "pointer", marginLeft: "15px" }}
                                    onClick={() => handleSnippetClick(snippetIds[index])}
                                >
                                    {snippet.title}
                                    <span className="badge fw-normal text-bg-dark">{snippet.type}</span>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <p>No snippets found.</p>
                    )}
                </>
            ) : (
                <Snippet snippetId={currentSnippetId} hasBackButton={true} backToProfileFunction={backToProfile} />
            )}
        </div>
    );
};

export default Profile;