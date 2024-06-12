import { faCommentDots, faEye, faHeart, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const ArticleBoxComponent = ({ post }) => {
  return (
    <div className='articleBox'>
        <div>
            <img src="../../images/ppoppi.png" alt="profile" />
            <p>우리집뽀삐</p>
            <p>24.06.22</p>
        </div>
        <div>
            <Link>귀여운우리집뽀삐보고가세요</Link>
        </div>
        <div>
            <div className='tagBox'>
                <Link>#뽀삐</Link>
                <Link>#우리집</Link>
                <Link>#강아지</Link>
            </div>
            <div className='hitBox'>
                <FontAwesomeIcon icon={faHeart} color='#FF0000' size='lg'/>
                <h3>123</h3>
                <FontAwesomeIcon icon={faEye} color='#1e1e1e' size='lg'/>
                <h2>243</h2>
                <FontAwesomeIcon icon={faCommentDots} color='#1e1e1e' size='lg'/>
                <h2>243</h2>
                <FontAwesomeIcon icon={faThumbsUp} color='#1e1e1e' size='lg'/>
                <h2>243</h2>
            </div>
        </div>
    </div>
  )
}

export default ArticleBoxComponent