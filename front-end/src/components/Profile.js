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

                    <div className="row mt-5 justify-content-center">
                        <div className="col-12 col-md-8 text-center">
                            <div className="card p-4 shadow">
                                <h1 className="card-title display-4 mb-3">{user.user.name}</h1>
                                <p className="card-text lead"><strong>Email:</strong> {user.user.email}</p>
                                <p className="card-text lead"><strong>Age:</strong> {user.user.age}</p>
                                <button 
                                className="btn btn-danger position-absolute" 
                                style={{ top: "10px", right: "10px" }} 
                                type="button" 
                                onClick={logout}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {snippets.length > 0 ? (
                        <div className="row mt-5 justify-content-center">
                            <h3 className="text-center">Snippets:</h3>
                            <div className="col-12 col-lg-4 mt-2">
                                <ul className="list-group shadow">
                                    {snippets.map((snippet, index) => (
                                        <li 
                                        key={index} 
                                        className="list-group-item d-flex justify-content-between align-items-center" 
                                        style={{ cursor: "pointer" }} 
                                        onClick={() => handleSnippetClick(snippetIds[index])}
                                        >
                                        <span style={{ fontSize: "20px" }}>{snippet.title}</span>
                                        <span className="badge bg-primary">{snippet.type}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <p className="mt-4 text-center">No snippets found.</p>
                    )}
                </>
            ) : (
                <Snippet snippetId={currentSnippetId} hasBackButton={true} backToProfileFunction={backToProfile} theSnippet={snippets.find(({ id }) => id === currentSnippetId)} />
            )}
        </div>
    );
};

export default Profile;