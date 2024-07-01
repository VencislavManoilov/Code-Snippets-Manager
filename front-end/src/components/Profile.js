import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./css/main.css";
import Snippet from "./Snippet";

const Profile = (user) => {
    const [snippetIds, setSnippetIds] = useState([]);
    const [snippets, setSnippets] = useState([]);
    const [view, setView] = useState("profile");
    const [currentSnippetId, setCurrentSnippetId] = useState(null);

    useEffect(() => {
        const fetchSnippetIds = async () => {
            try {
                const response = await axios.get("http://192.168.1.11:8080/snippet/ids", { withCredentials: true });
                if(response.data) {
                    setSnippetIds(response.data.snippets);
                    console.log(response.data.snippets);
                    response.data.snippets.forEach(async (id) => {
                        await fetchSnippet(id);
                    });
                }
            } catch (error) {
                console.log("Error getting snippet ids:", error);
            }
        };

        const fetchSnippet = async (id) => {
            try {
                const response = await axios.get(`http://192.168.1.11:8080/snippet/get?id=${id}`, { withCredentials: true });
                setSnippets((prevSnippets) => [...prevSnippets, response.data.snippet]);
            } catch(error) {
                console.log("Error getting the snippet:", error);
            }
        };

        fetchSnippetIds();
    }, []);

    const logout = async () => {
        try {
            const response = await axios.get("http://192.168.1.11:8080/logout", { withCredentials: true });
            window.location.href = "/";
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
                    <h1 className="col mt-5">{user.user.name}</h1>
                    <h3 className="col">email: {user.user.email}</h3>
                    <h3 className="col">age: {user.user.age}</h3>

                    {snippets.length > 0 ? (
                        <div className="row mt-5">
                            <h3>Snippets:</h3>
                            {snippets.map((snippet, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className="btn btn-outline-primary text-left"
                                    style={{ textAlign: "left" }}
                                    onClick={() => handleSnippetClick(snippetIds[index])}
                                >
                                    {snippet.title}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p>No snippets found.</p>
                    )}

                    <div className="row mt-5">
                        <div className="col-auto">
                            <button className="btn btn-secondary btn-block" type="button" onClick={back}>Back</button>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-danger btn-block" type="button" onClick={logout}>Logout</button>
                        </div>
                    </div>
                </>
            ) : (
                <Snippet snippetId={currentSnippetId} backToProfile={backToProfile} />
            )}
        </div>
    );
};

export default Profile;