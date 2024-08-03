import React from 'react'
import MainLayout from '../../layout/MainLayout'
import Breadcrumb from '../../components/common/main/Breadcrumb'
import { BarChart } from '@toast-ui/react-chart';
import '@toast-ui/chart/dist/toastui-chart.min.css';
import { Link } from 'react-router-dom';



const GradePage = () => {

    /** 차트 데이터 */
    const data = {
        categories: ['Java', 'React', 'C+', 'Python', 'Spring'],
        series: [
            {
                name: 'exp',
                data: [100, 400, 300, 500, 600],
                colorByCategories: true
            },
        ]
    };

    /** 차트 옵션 */
    const options = {
        chart: { width: 800, height: 400, backgroundColor: 'transparent' },
        legend: {
            visible: false // 범례를 숨김
        },
        exportMenu: {
            visible: false // 설정 버튼을 숨김
        },
        // 막대 색상
        series: {
            bar: {
                dataLabels: {
                    visible: true
                }
            }
        },
        theme: {
            series: {
                colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }
        }
    };


    // 차트는 레벨 상위 5개 언어 정도??
    // 내가 푼 문제는 최근에 푼 문제 10개 정도?? 불러오면 좋을듯


    return (
        <MainLayout>
            <Breadcrumb crumb={"등급평가 / 메인"} />

            <div id='gradeIndex'>

                <div className='gradeAd'></div>

                <section>

                    <div className='aside'>
                        <img src="../../images/ppoppi.png" alt="" />

                        <h3>홍길동</h3>

                        <button>문제 풀기</button>
                    </div>

                    <div className='gradeCnt'>
                        <div className='gradeChart gradeBack'>
                            <p>내 등급 차트</p>
                            <BarChart data={data} options={options} type="bar" />
                        </div>


                        <div className='gradeTable gradeBack'>
                            <p>내가 해결한 문제</p>
                            <table>
                                <tr>
                                    <td>날짜</td>
                                    <td>언어</td>
                                    <td>제목</td>
                                    <td>난이도</td>
                                    <td>경험치</td>
                                </tr>
                                <tr>
                                    <td>24.07.01</td>
                                    <td>Java</td>
                                    <td><Link>A+B=?</Link></td>
                                    <td>Lv.1</td>
                                    <td>+10xp</td>
                                </tr>
                                <tr>
                                    <td>24.07.02</td>
                                    <td>Java</td>
                                    <td><Link>포켓몬마스터 이다솜</Link></td>
                                    <td>Lv.2</td>
                                    <td>+20xp</td>
                                </tr>
                                <tr>
                                    <td>24.07.04</td>
                                    <td>Java</td>
                                    <td><Link>터렛</Link></td>
                                    <td>Lv.3</td>
                                    <td>+30xp</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                </section>

            </div>

        </MainLayout>
    )
}

export default GradePage