import { faCommentDots, faEye, faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { RootUrl } from '../../api/RootUrl';
import Moment from 'moment';

const ArticleBoxComponent = ({ postList, searchByTag }) => {

  return (
    <>
        {postList.dtoList && postList.dtoList.length > 0 ? (postList.dtoList.map((post, index) => (
            <div className='articleBox' key={index}>
                <div>
                    <img src={`${RootUrl()}/uploads/user/${post.thumb}`} alt="profile" />
                    <p>{post.nick}</p>
                    <p>{Moment(post.createDate).format('YY.MM.DD HH:mm')}</p>
                </div>
                <div>
                    <Link to={`/article/view?pno=${post.pno}`}>{post.title}</Link>
                </div>
                <div>
                    <div className='tagBox'>    
                    {post.tagName && post.tagName.map((tag, index) => (
                        <Link key={index} onClick={() => searchByTag(tag)}>{tag}</Link>
                    ))}
                    </div>
                    <div className='hitBox'>
                        <FontAwesomeIcon icon={faHeart} color='#FF0000' size='lg'/>
                        <h3>{post.heartNum}</h3>
                        <FontAwesomeIcon icon={faEye} color='#1e1e1e' size='lg'/>
                        <h2>{post.hit}</h2>
                        <FontAwesomeIcon icon={faCommentDots} color='#1e1e1e' size='lg'/>
                        <h2>{post.comNum}</h2>
                    </div>
                </div>
            </div>
        ))
        ) : (
            <>
            <p>게시글 없음</p>
            </>
        )}
    </>
  )
}

export default ArticleBoxComponent