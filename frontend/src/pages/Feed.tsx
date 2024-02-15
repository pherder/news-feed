import React, { useState, useEffect } from 'react';
import Article from "../components/Article";
import ApiClient from "../client/ApiClient";
import {User} from "../model/User";
import AuthService from "../services/AuthService";
import {useAuth} from "../context/AuthContext";

const Feed = () => {
    const [articles, setArticles] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const {authenticatedUser} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const filters = { keyword, publishedDate };
            const newArticles = await ApiClient.getArticles(filters);
            setArticles(newArticles);
        };
        fetchData();
    }, [keyword, publishedDate, authenticatedUser]);

    return (
        <div className="container mt-3">
            <div className="row g-3 mb-4">
                <div className="col-md">
                    <input
                        type="text"
                        className="form-control"
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        placeholder="Search by keyword..."
                    />
                </div>
                <div className="col-md">
                    <input
                        type="date"
                        className="form-control"
                        value={publishedDate}
                        onChange={e => setPublishedDate(e.target.value)}
                        placeholder="Filter by published date..."
                    />
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                {articles.map((article, index) => (
                    <div className="col d-flex align-items-stretch" key={index}>
                        <Article article={article} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feed;
