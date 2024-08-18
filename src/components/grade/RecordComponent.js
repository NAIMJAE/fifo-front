import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../../styles/grade.scss'
import { RootUrl } from '../../api/RootUrl';
import moment from 'moment';

const rootURL = RootUrl();

const RecordComponent = (props) => {

    const [solveState, setSolveState] = useState(0);
    const [stateComment, setStateComment] = useState("준비중");
    const [solveList, setSolveList] = useState([]);
    const [isSolved, setIsSolved] = useState(false);
    const [saveInfo, setSaveInfo] = useState(null);

    if (props.socketObj.current !== null) {

        props.socketObj.current.onmessage = async function (e) {

            if (e !== null && e !== undefined) {
                if (!isNaN(e.data)) {
                    setSolveState(parseFloat(e.data))
                    setStateComment((parseFloat(e.data) * 100) + "%")
                } else {
                    console.log(e.data)
                    setSaveInfo(JSON.parse(e.data))
                }

            }

        }
    }

    useEffect(() => {
        console.log(props.questionInfo)
        console.log(props.socketObj.current)
        if (props.socketObj.current !== null) {
            console.log(props.socketObj.current)
            setIsSolved(true)
        }

        axios.get(`${rootURL}/solve/${props.questionInfo.questionno}/${props.loginSlice.userno}`)
            .then((res) => {
                console.log(res.data)
                setSolveList(res.data)
            })
    }, [])

    useEffect(() => {
        console.log(solveState);

        if (solveState > 1) {
            const state = solveState / 100
            if (state === 2) {
                console.log("틀린거")
                props.socketObj.current.close();
                props.socketObj.current = null;
                setStateComment("틀렸습니다.")
            } else if (state === 3) {
                console.log("문제에 이상")
            }
        }

        if (solveState === 1) {
            props.socketObj.current.close();
            props.socketObj.current = null;
            setStateComment("정답입니다.")
        }
    }, [solveState])

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
            code:e.target.children[0].value
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
                            <td>{props.loginSlice.nick}</td>
                            <td>{solve.questionno}</td>
                            <td>{solveResult(solve.solved)}</td>
                            <td>{solvedDate.format('YYYY-MM-DD')}</td>
                            <td><p onClick={rewriteCodeHandler}>수정하기<input type='hidden' value={solve.code}/></p></td>
                        </tr>
                    )
                })}
                {isSolved && saveInfo &&<tr>
                    <td>{saveInfo.solveid}</td>
                    <td>{props.loginSlice.nick}</td>
                    <td>{saveInfo.questionno}</td>
                    <td>{0 < solveState && solveState < 1 ? <><progress max={100} value={solveState * 100} /><span>{Math.round(solveState * 100)}%</span></> : <p>{stateComment}</p>}</td>
                    <td>{saveInfo.solveddate ? (moment(saveInfo.solveddate).format('YYYY-MM-DD')) : 'No Date'}</td>
                    <td><p onClick={rewriteCodeHandler}>수정하기<input type='hidden' value={saveInfo.code}/></p></td>
                </tr>}
            </table>

        </div>
    )
}

export default RecordComponent