import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { globalPath } from '../../globalPaths'
import SkillIcon from '../gathering/SkillIcon'
import { RootUrl } from '../../api/RootUrl'

const rootURL = RootUrl();

const LanguageButtonComponent = () => {

  //const [languages, setLanguages] = useState([]);
  const languages = useRef(null);
  const [type2, setType2] = useState([]);

  useEffect(() => {
    axios.get(`${rootURL}/language/list`)
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
    <div id='selectLanguage'>
      <ul className='languages'>
        {type2.map((language) => {
          return (
            <>
              <h3>{language}</h3>
              <div className='selectLanguage cntWrapRow'>
                {languages.current[language].map((languageName) => {
                  return (
                    <Link
                      to={"/grade/question?language=" + languageName.languagename}
                      key={languageName.languagename}
                      className={'languageIcon'}
                    >
                      <SkillIcon skill={languageName.languagename} />
                      <span className='languageName'>{languageName.languagename}</span>
                    </Link>
                  )
                })}
              </div>
            </>
          )
        })}
      </ul>
    </div>
  )
}

export default LanguageButtonComponent