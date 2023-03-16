import React, { useState } from "react";
import './card.component.css';
import heartIcon from './iconmonstr-favorite-2.png';
import heartCheckedIcon from './iconmonstr-favorite-3.svg';
import clock from './iconmonstr-time-2.svg';
import { iPost } from "../../dto/post.interface";

function Card( props: {post: iPost, key: number, onClickFav: any}) {

    const { post: {author, created, url, isFav}} = props;
    const [iconSelected, setIconSelected] = useState(isFav || false);
    //let iconSelected : Boolean = false;

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
                    <button className="hearButn" onClick={ (e) => { setIconSelected(!iconSelected); props.onClickFav(e,!iconSelected) }}>
                        <img src={ iconSelected ? heartCheckedIcon : heartIcon} alt="icon" data-post={JSON.stringify(props.post)}  data-isfav={iconSelected}/>
                    </button>
                </div>
            </div>
        </>
    )
}


export default Card;