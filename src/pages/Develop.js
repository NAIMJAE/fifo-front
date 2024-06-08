import React from 'react'
import MainLayout from '../layout/MainLayout'
import '../styles/develop.scss'
import PageingComponent from '../components/common/paging/PageingComponent'
import SkillIcon from '../SkillIcon'

const Develop = () => {
  return (
    <MainLayout>
        <div className='develop'>
            <div>
                main.scss의 /*** 공통 스타일 ***/ 부분 참조
            </div>
                
            <div>
                기본 폰트 사이즈 : 14px <br/>
                기본 폰트 : Noto Sans KR <br/>
            </div>

            <div className='cntWrapRow'>
                <span className='mainColor'>메인 색상 : #4169e1</span>
                <span className='gray1'>연한 회색 : #9f9f9f</span>
                <span className='gray2'>중간 회색 : #7b7b7b</span>
                <span className='gray3'>진한 회색 : #1e1e1e</span>
                <span className='red'>빨강 : #FF0000</span>
            </div>

            <div className='cntRow'>
                <p>className='cntRow' <br/>컨텐츠 가로 배치</p>
                <p>className='cntRow' <br/>컨텐츠 가로 배치</p>
                <p>className='cntRow' <br/>컨텐츠 가로 배치</p>
                <p>className='cntRow' <br/>컨텐츠 가로 배치</p>
            </div>

            <div className='cntColumn'>
                <p>className='cntColumn' <br/>컨텐츠 세로 배치</p>
                <p>className='cntColumn' <br/>컨텐츠 세로 배치</p>
                <p>className='cntColumn' <br/>컨텐츠 세로 배치</p>
            </div>

            <div className='cntWrapRow'>
                <p>className='cntRow' <br/>컨텐츠 가로 배치 자동줄바꿈</p>
                <p>className='cntRow' <br/>컨텐츠 가로 배치 자동줄바꿈</p>
                <p>className='cntRow' <br/>컨텐츠 가로 배치 자동줄바꿈</p>
                <p>className='cntRow' <br/>컨텐츠 가로 배치 자동줄바꿈</p>
                <p>className='cntRow' <br/>컨텐츠 가로 배치 자동줄바꿈</p>
            </div>

            <div className='cntWrapRow'>
                <div>
                    <h2>flex 기본</h2>
                    <h2>display : flex;</h2>
                </div>
                <div style={{justifyContent: "center"}}>
                    <h2>flex 가운데 정렬 </h2>
                    <h2>justify-content: center;</h2>
                </div>
                <div style={{alignItems: "center"}}>
                    <h2>flex 세로(높낮이) 정렬 </h2>
                    <h3>align-items: center;</h3>
                </div>
                <div style={{alignItems: "center"}}>
                    <h5>flex 속성태그에 높이를 안주면</h5>
                    <h4>자동으로 태그 속 글자 높낮이 가운데 위치 <br/> padding으로 크기 조절하면 편함</h4>
                </div>
                <div style={{justifyContent: "space-between"}}>
                    <h3>flex 사이드 정렬 </h3>
                    <h3>justify-content: space-between;</h3>
                </div>
                <div style={{flexDirection:"column"}}>
                    <h3>flex 세로 배치 </h3>
                    <h2>flex-direction: column;</h2>
                    <h3>세로 배치하면 위 속성들 반전됨 (축회전)</h3>
                </div>
                <div style={{flexDirection:"column", alignItems:"center"}}>
                    <h3>flex 세로 배치 <br/> + 가운데 정렬</h3>
                    <h3>flex-direction: column;<br/>align-items: center;</h3>
                </div>
                <div style={{flexDirection:"column", justifyContent:"center"}}>
                    <h3>flex 세로 배치 <br/> + 세로(높낮이) 정렬</h3>
                    <h3>flex-direction: column;<br/>justify-content: center;</h3>
                </div>
            </div>

            <div>
                페이징 컴포넌트 : PageingComponent
            </div>
            <PageingComponent/>
            <hr/>
            <div>
                <h3>언어 아이콘들</h3>
                <SkillIcon skill={"CPP"} />
                <SkillIcon skill={"Java"} />
                <SkillIcon skill={"JavaScript"} />
            </div>
        </div>
    </MainLayout>
  )
}

export default Develop