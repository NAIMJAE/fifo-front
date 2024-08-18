import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../../styles/grade.scss'
import { RootUrl } from '../../api/RootUrl';
import moment from 'moment';

const rootURL = RootUrl();

const OtherRecordComponent = (props) => {

    const [solveList, setSolveList] = useState([]);

    useEffect(() => {

        axios.get(`${rootURL}/solve/other/${props.questionInfo.questionno}`)
            .then((res) => {
                console.log(res.data)
                setSolveList(res.data)
            })
    }, [])

    const solveResult = (code) => {
        const temp = parseInt(code)
        if (temp === 100) {
            return "정답입니다."
        } else if (temp === 200) {
            return "틀렸습니다."
        }
    }


    const rewriteCodeHandler = (e) => {
        console.log(e.target.children[0].value)
        props.setQuestionInfo({
            ...props.questionInfo,
            code: e.target.children[0].value,
            writer: e.target.children[1].value
        })
        props.navigator("code")
    }

    return (
        <div id='record'>
            <table>
                <tr>
                    <th>풀이 번호</th>
                    <th>닉네임</th>
                    <th>문제</th>
                    <th>결과</th>
                    <th>풀이날짜</th>
                    <th>재작성</th>
                </tr>
                {solveList.map((solve, index) => {
                    const solvedDate = moment(solve.solveddate)
                    return (
                        <tr key={index}>
                            <td>{solve.solveid}</td>
                            <td>{solve.nick}</td>
                            <td>{solve.questionno}</td>
                            <td>{solveResult(solve.solved)}</td>
                            <td>{solvedDate.format('YYYY-MM-DD')}</td>
                            <td>
                                <p onClick={rewriteCodeHandler}>코드보기
                                    <input type='hidden' value={solve.code} />
                                    <input type='hidden' value={solve.userno} />
                                </p>
                            </td>
                        </tr>
                    )
                })}
            </table>

        </div>
    )
}

export default OtherRecordComponent