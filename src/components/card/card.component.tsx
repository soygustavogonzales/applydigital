import React from "react";
import './card.component.css';
import heartIcon from './iconmonstr-favorite-2.png';
import heartCheckedIcon from './iconmonstr-favorite-3.svg';
import clock from './iconmonstr-time-2.svg';
import { iPost } from "../../dto/post.interface";

function Card( props: {post: iPost, key: number}) {

    const { post: {author, created, url}} = props;
    
    return (
        <>
            <div className="card">
                <div className="body-box">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                    <div className="timeline"> <img src={clock}/> <span className="timeago">  {created}</span></div>
                    <div className="detail-box">{author }</div>
                    </a>
                </div>
                <div className="icon-box">
                    <button className="hearButn">
                        <img src={heartIcon} alt="icon" />
                    </button>
                </div>
            </div>
        </>
    )
}


export default Card;