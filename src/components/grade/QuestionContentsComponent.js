import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { globalPath } from '../../globalPaths'
import SkillIcon from '../gathering/SkillIcon'
import Chip from '@mui/material/Chip';
import { getSkillColor } from '../../utils/skillUtils';

const QuestionContentsComponent = (props) => {

    const navigate = useNavigate();

    const questionViewHandler = (e) => {
        navigate('/grade/question/view?no=' + e.target.value)
    }

    return (
        <button className='questionContent cntWrapRow' onClick={questionViewHandler} value={props.question.questionno}>
            {/** 문제별 테그 출력 */}
            <p className='questionTag'>
                <Chip
                    label={props.question.languagename + " Lv" + props.question.level}
                    sx={{ backgroundColor: getSkillColor(props.question.languagename), color: 'white', marginRight: '5px', marginBottom: '5px' }}
                />
                {/** 컴파일러가 필요한 문제 테그 */}
                {props.question.compiler ?
                    <Chip
                        label={"compiler"}
                        sx={{ backgroundColor: '#4B0082', color: 'white', marginRight: '5px', marginBottom: '5px' }}
                    /> : null
                }
            </p>
            <p className='questionNo'>
                {props.question.questionno}
            </p>
            <p className='questionTitle'>
                {props.question.title}
            </p>
        </button>
    )
}

export default QuestionContentsComponent