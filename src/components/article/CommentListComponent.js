import { faHeart, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const CommentListComponent = () => {
  return (
    <div>
        <div>
            <img src="../../images/ppoppi.png" alt="profile" />
            <p>우리집뽀삐</p>
            <p>24.06.22</p>
            <div>
                <button className='heart'>
                    <FontAwesomeIcon icon={faHeart} color='#FF0000' size='lg'/>
                    <span>123</span>
                </button>
                <button>
                    <FontAwesomeIcon icon={faPen} color='#1e1e1e' size='lg'/>
                </button>
                <button>
                    <FontAwesomeIcon icon={faTrashCan} color='#1e1e1e' size='lg'/>
                </button>
            </div>
        </div>
        <textarea name="" id="">뽀삐 너무 귀여워요</textarea>
    </div>
  )
}

export default CommentListComponent