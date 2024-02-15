import React from 'react';
import { Article as ArticleType } from "../client/ApiClient";
interface ArticleProps {
    article: ArticleType
}

const Article: React.FC = ({article}: ArticleProps) => {
    const formatDate = (dateString: string): string => {
        if (!dateString) {
            return '';
        }

        const date: Date = new Date(dateString);
        const day: number = date.getDate();
        const month: number = date.getMonth() + 1;
        const year: number = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    return (
        <div className="card w-100">

            <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{formatDate(article.original_date)}</h6>
                <div className="card-subtitle mb-2">
                    <span>Authors: </span>
                    {article.authors.map((author, index) => (
                        <span key={index} className="badge bg-primary me-1">{author.name}</span>
                    ))}
                </div>
                <div className="card-subtitle">
                    <span>Categories: </span>
                    {article.categories.map((category, index) => (
                        <span key={index} className="badge bg-secondary me-2">{category.name}</span>
                    ))}
                </div>
                <hr/>
                <p className="card-text mt-2">{article.content}</p>
            </div>
        </div>
    )
}

export default Article;