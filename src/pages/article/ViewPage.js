import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import {Viewer} from '@toast-ui/react-editor';
import Breadcrumb from '../../components/common/main/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faEye, faHeart, faThumbsUp, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import CommentListComponent from '../../components/article/CommentListComponent';
import CommentWriteComponent from '../../components/article/CommentWriteComponent';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const ViewPage = () => {

    const [articleView, setArticleView] = useState({ articleTitle: '', articleCnt: '' });

    useEffect (() => {
        const response = {articleTitle : "우리집 뽀삐 보고 가세요." , articleCnt : "우리집 뽀삐 보고 가세요."}
        setArticleView(response);
    }, []);


  return (
    <MainLayout>

        <Breadcrumb crumb={"게시판 / 글보기"}/>

        <div className='cntColumn viewTitle'>
            <div>
                <span>자유게시판 - 게시글 No.1267534</span>
                <div>
                    <h4>http://localhost:3000/article/view</h4>
                    <button>공유하기</button>
                </div>
            </div>
            <div>
                <h1>우리집 뽀삐 보고 가세요.</h1>
                <p>2024.06.22 12:14</p>
            </div>
            <div>
                <img src="../../images/ppoppi.png" alt="profile" />
                <p>우리집뽀삐</p>
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

        <div className='cntRow viewContents'>
            {articleView.articleCnt ? <Viewer initialValue={articleView.articleCnt} /> : <p>Loading...</p>}
        </div>

        <div className='cntWrapRow viewFile'>
            <p>첨부파일</p>
            <span>뽀삐밥먹는사진.jpg</span>
            <span>뽀삐잠자는사진.jpg</span>
        </div>

        <div className='cntRow viewHeart'>
            <button>
                <FontAwesomeIcon icon={faHeart} color='#FFFFFF' size='lg'/>
                좋아요
            </button>
            <button>
                <FontAwesomeIcon icon={faThumbsUp} color='#FFFFFF' size='lg'/>
                추천
            </button>
        </div>

        <div className='cntRow viewModify'>
            <button>
                <FontAwesomeIcon icon={faPen} color='#1e1e1e' size='lg'/>
                수정
            </button>
            <button>
                <FontAwesomeIcon icon={faTrashCan} color='#1e1e1e' size='lg'/>
                삭제
            </button>
        </div>

        <div className='cntColumn writeComment'>
            <CommentWriteComponent/>
        </div>

        <div className='cntColumn viewComment'>
            <CommentListComponent/>
            <CommentListComponent/>
            <CommentListComponent/>
        </div>

    </MainLayout>
  )
}

export default ViewPage