import React from 'react'
import { Link } from 'react-router-dom'

const GatherBoxComponent = () => {
  return (
    <Link to="/">
        <div>
        <span>프로젝트</span>
        </div>

        <div className='imgBox'>
        <img src="../../images/sample/sample2.jpg" alt="" />
        </div>

        <div className='cntColumn'>
        <h3>홍길동</h3>
        <h4>사이드 프로젝트 팀원 모집</h4>
        <h5>모집기간 : 24.06.02 ~ 24.06.16</h5>
        <div>
            <span>JAVA</span>
            <span>SPRING</span>
            <span>REACT</span>
        </div>
        </div>
    </Link>
  )
}

export default GatherBoxComponent