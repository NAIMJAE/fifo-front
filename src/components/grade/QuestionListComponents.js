import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SkillIcon from '../gathering/SkillIcon'

const QuestionListPage = () => {

  //const [languages, setLanguages] = useState([]);
  const languages = useRef(null);
  const [type2, setType2] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/fifo-back' + '/language/list')
      .then((res) => {
        console.log(res.data);
        const keys = Object.keys(res.data);
        languages.current = res.data;
        console.log(keys)
        setType2(keys);
      }).catch((e) => {
        console.log(e);
      })
  }, [])

  return (
    <div id='selectQuestion'>

    </div>
  )
}

export default QuestionListPage