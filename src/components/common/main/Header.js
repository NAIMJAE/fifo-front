import React from 'react'
import '../../../styles/header.scss'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
        <div>
            <div></div>
            <div id='headerInfo'>
                <Link to="/">로그인</Link>
                <Link to="/">마이페이지</Link>
                <Link to="/">로그아웃</Link>
            </div>
        </div>

        <div>
            <Link id='headerLogo'>
                <img src="../../../../images/sample/sample8.png" alt="" />
            </Link>
            
            <div id='navInfo'>
                <Link to="/">내모임</Link>
                <Link to="/">모임찾기</Link>
                <Link to="/">게시판</Link>
                <Link to="/">등급평가</Link>
            </div>
        </div>
    </header>
  )
}

export default Header