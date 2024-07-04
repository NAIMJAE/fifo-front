import React from 'react'
import SkillIcon from '../gathering/SkillIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPen } from '@fortawesome/free-solid-svg-icons'

const MyIndex = () => {

    /** 내 정보 수정 */
    const modifyProfile = () => {
        alert("ㅎ2");
        // 여기서 헤더에 버튼 누르는거 처럼 페이지 이동되게 해주세요.
    }


  return (
    <main>
        <div id='contentArea' style={{marginTop:"20px"}}>
            <div className='cntRow myIndex'>
                <section className="aside">
                    <div className='cntColumn'>
                        <img src="../../images/article/deleteUserIcon.svg" alt="" />
                        <label htmlFor="" onClick={modifyProfile}>
                            <p>홍길동</p>
                            <FontAwesomeIcon icon={faUserPen} size="lg" color="#4169e1"/>
                        </label>
                        <h3>매너온도 36</h3>
                    </div>
                </section>


                <section className="myMain">
                    <h1>나의 프로젝트</h1>

                    <div className='cntColumn'>
                    <div className='cntRow myProject'>
                        <div>
                            <p>진행중</p>
                            <h2>4</h2>
                            <h3>자세히</h3>
                        </div>

                        <div>
                            <p>완료</p>
                            <h2>4</h2>
                            <h3>자세히</h3>
                        </div>

                        <div>
                            <p>대기</p>
                            <h2>4</h2>
                            <h3>자세히</h3>
                        </div>
                    </div>
                </div>

                <h1>나의 등급</h1>

                <div className='cntWrapRow'>
                    <div className="myRank skill1">
                        <SkillIcon skill={"Java"} classType={"bigSkillImg"}/>
                        <p>JAVA</p>
                        <h4>Lv.1</h4>
                    </div>

                    <div className="myRank skill2">
                        <SkillIcon skill={"React"} classType={"bigSkillImg"}/>
                        <p>REAET</p>
                        <h4>Lv.2</h4>
                    </div>

                    <div className="myRank skill3">
                        <SkillIcon skill={"JavaScript"} classType={"bigSkillImg"}/>
                        <p>JAVASCRIPT</p>
                        <h4>Lv.3</h4>
                    </div>

                    <div className="myRank skill4">
                        <SkillIcon skill={"Html"} classType={"bigSkillImg"}/>
                        <p>HTML</p>
                        <h4>Lv.4</h4>
                    </div>

                    <div className="myRank skill5">
                        <SkillIcon skill={"Spring"} classType={"bigSkillImg"}/>
                        <p>SPRING</p>
                        <h4>Lv.5</h4>
                    </div>
                </div>

                <h1>나의 활동</h1>

                <div>
                    내가 작성한 게시글
                </div>

                </section>
            </div>
        </div>
    </main>
  )
}

export default MyIndex