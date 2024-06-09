import React, { useEffect, useState } from 'react'
import GatherBoxComponent from '../../components/main/GatherBoxComponent'
import MainLayout from '../../layout/MainLayout'
import '../../styles/gathering.scss'
import SkillIcon from '../../SkillIcon'
import { Button } from '@mui/material';

const ListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('모두보기');
  const [techStackVisible, setTechStackVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [languages, setLanguages] = useState([
    { name: 'JavaScript' },
    { name: 'Java' },
    { name: 'React' },
    { name: 'HTMl' },
    { name: 'PHP' },
    { name: 'Spring' },
    { name: 'Flutter' },
    { name: 'JQuery' },
    { name: 'CSS' },
  ]);

  /** 모임 글 목록 + 언어이름 불러옴 */
  useEffect(() => {

  }, []);



  /** 토글 목록 보여줌 ( 기술 스택 클릭 ) */
  const toggleDropdown = () => {
    setTechStackVisible(!techStackVisible);
  };
  /** 카테고리(type1)에 맞는 기술 보여주기 ( 토글 클릭 ) */
  const selectCategory = (category) => {
    console.log("카테고리 : ", category);
    setSelectedCategory(category);
  };

  /** 언어 선택 */
  const selectLanguage = (language) => {
    console.log("언어 선택 : ", language);
    setSelectedLanguage(language);
  };

  return (
    <MainLayout>
      <div className='cntColumn'>

        {/** 검색 Tabs */}
        <div className='searchSkillMenu'>
          <div className='dropdown'>
            <button className='skillTabBtn' onClick={toggleDropdown}>
              기술 스택
              <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path fill="#cccccc" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
              </button>
            <div className={`dropdown-content ${techStackVisible ? 'show' : ''}`} id='dropdown-content'>
              <div className='categoryTab'>
                <ul className='catetgory'>
                  {['인기', '프론트엔드', '백엔드', '모바일', '기타', '모두보기'].map((category) => (
                    <li
                      key={category}
                      className={`catetgory_type1 ${selectedCategory === category ? 'catetgory_selectedType1' : ''}`}
                      onClick={() => selectCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              {/** 기술 아이콘들 */}
              <div className={`tech-stack ${techStackVisible ? 'show' : ''}`} id='tech-stack'>
                <ul className='languages'>
                  {languages.map((language) => (
                    <li
                      key={language.name}
                      className={`languageIcon ${selectedLanguage === language.name ? 'selectedLanguage' : ''}`}
                      onClick={() => selectLanguage(language.name)}
                    >
                      <SkillIcon skill={language.name} />
                      <span className='languageName'>{language.name}</span>
                    </li>
                  ))}
                </ul>
              </div>


            </div>
          </div>
        </div>




        {/** 모임 글 목록 */}
        <div className='cntWrapRow gatherList'>
          <GatherBoxComponent />
          <GatherBoxComponent />
          <GatherBoxComponent />
          <GatherBoxComponent />
          <GatherBoxComponent />
          <GatherBoxComponent />
          <GatherBoxComponent />
          <GatherBoxComponent />
          <GatherBoxComponent />
        </div>
      </div>
    </MainLayout>
  )
}

export default ListPage
