import React, { useEffect } from 'react'
import MainLayout from '../../layout/MainLayout'
import Breadcrumb from '../../components/common/main/Breadcrumb'
import '../../styles/mooim.scss'
import { Link } from 'react-router-dom'
import SkillIcon from '../../components/gathering/SkillIcon'

const MooimPage = () => {

  /** 임시 데이터 */
  const barData = 40;

  /** 모임 진행도 막대 */
  useEffect(() => {
    const bar = document.getElementById('bar');
    bar.style.width = barData + '%';

  }, [barData])

  return (
    <MainLayout>

        <Breadcrumb crumb={"모임? / 모임인덱스?"}/>

        <div className='mooimIndex'>

          <div className='Info'>
            <div className='mooimInfo'>
              <img src="../../../../images/ppoppi.png" alt="" />

              <div>
                
                <h1>팜스토리 쇼핑몰 만들기<span>[진행중]</span></h1>

                <h2>쇼핑몰과 게시판 기능을 합친 간단한 웹사이트 구축 프로젝트</h2>

                <div>
                  <h2>프로젝트 |</h2>
                  <h2>온라인</h2>
                </div>

                <div>
                  <h3>24.07.22 ~ </h3>
                </div>

              </div>
            </div>
            
            <div className='mooimProgress'>
              <div>
                <div id='bar'>40
                  <img src="../../../../images/mooim/ppoppi_bar.png" alt="" />
                </div>
              </div>
            </div>

          </div>

          
          <div className='function'>
            <Link to={"/"}>정보</Link>
            <Link to={"/"}>채팅</Link>
            <Link to={"/"}>캘린더</Link>
            <Link to={"/"}>칸반</Link>
            <Link to={"/"}>문서</Link>
          </div>

          <div className='memberList'>
            <div className='member'>
              <img src="../../../../images/ppoppi.png" alt="" />
              <div>
                <h1>홍길동</h1>
                <div className='skill'>
                  <div>
                      <SkillIcon skill={"Java"} classType='skillImg'/>
                      <span>Java</span>
                  </div>
                  <div>
                      <SkillIcon skill={"React"} classType='skillImg'/>
                      <span>React</span>
                  </div>
                </div>
              </div>
              <span className='badge'>팀장</span>
            </div>

            <div className='member'>
              <img src="../../../../images/ppoppi.png" alt="" />
              <div>
                <h1>홍길동</h1>
                <div className='skill'>
                  <div>
                      <SkillIcon skill={"Java"} classType='skillImg'/>
                      <span>Java</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='member'>
              <img src="../../../../images/ppoppi.png" alt="" />
              <div>
                <h1>홍길동</h1>
                <div className='skill'>
                  <div>
                      <SkillIcon skill={"Java"} classType='skillImg'/>
                      <span>Java</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='member'>
              <img src="../../../../images/ppoppi.png" alt="" />
              <div>
                <h1>홍길동</h1>
                <div className='skill'>
                  <div>
                      <SkillIcon skill={"Java"} classType='skillImg'/>
                      <span>Java</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='member'>
              <img src="../../../../images/ppoppi.png" alt="" />
              <div>
                <h1>홍길동</h1>
                <div className='skill'>
                  <div>
                      <SkillIcon skill={"Java"} classType='skillImg'/>
                      <span>Java</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

    </MainLayout>
  )
}

export default MooimPage