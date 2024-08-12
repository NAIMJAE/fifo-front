import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import Breadcrumb from '../../components/common/main/Breadcrumb'
import { BarChart } from '@toast-ui/react-chart';
import '@toast-ui/chart/dist/toastui-chart.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { RootUrl } from '../../api/RootUrl';
import axios from 'axios';
import Moment from 'moment';
import { useSelector } from 'react-redux';



const GradePage = () => {

    const navigate = useNavigate();
    const rootURL = RootUrl();
    const loginSlice = useSelector((state) => state.authSlice) || {};

    const [solvedQuestions, setSolvedQuestions] = useState([]);
    const [userSkills, setUserSkills] = useState([]);



    /** 차트 데이터 */
    const [data, setData] = useState({
        categories: [],
        series: [
            {
                name: 'exp',
                data: [],
                colorByCategories: true
            },
        ]
    });

    /** 차트 옵션 */
    const options = {
        chart: { width: 800, height: 400, backgroundColor: 'transparent' },
        legend: {
            visible: false // 범례를 숨김
        },
        exportMenu: {
            visible: false // 설정 버튼을 숨김
        },
        xAxis: {
            label: {
                formatter: (value) => {
                    const labelValue = [1000, 3000, 6000, 10000, 15000];
                    let result = '';
                    labelValue.map((label, index) => {
                        if (label == value) {
                            result = (index + 1) + 'Lv';
                        }
                    })
                    return result;
                }
            },
            scale: {
                max: 15000,
                stepSize: 1000,
            }
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

    useEffect(() => {

        const selectUserGradeInfo = async () => {
            await axios.get(`${rootURL}/grade/${loginSlice.userno}`)
                .then((res) => {
                    console.log(res.data)
                    setSolvedQuestions(res.data.solvedQuestions)
                    setUserSkills(res.data.userSkills)
                }).catch((e) => {
                    console.log(e);
                })
        }

        selectUserGradeInfo();
    }, [])

    useEffect(() => {
        let categories = []
        let datas = []

        userSkills.map((skill) => {
            categories.push(skill.languagename)
            datas.push(skill.experience)
        })

        setData({
            categories: categories,
            series: [
                {
                    name: 'exp',
                    data: datas,
                    colorByCategories: true
                },
            ]
        })

    }, [userSkills])

    const languageListNavHandler = () => {
        navigate('/grade/language')
    }


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

                        <button onClick={languageListNavHandler}>문제 풀기</button>
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
                                {solvedQuestions.map((question) => (
                                    <tr>
                                        <td>{Moment(question.solveddate).format('YYYY.MM.DD') }</td>
                                        <td>{question.languagename}</td>
                                        <td><Link to={'/grade/question/view?no='+question.questionno}>{question.title}</Link></td>
                                        <td>Lv.{question.level}</td>
                                        <td>+{question.level * 100}xp</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>

                </section>

            </div>

        </MainLayout>
    )
}

export default GradePage