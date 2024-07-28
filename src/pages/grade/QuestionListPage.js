import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/grade.scss'
import '../../components/grade/LanguageButtonComponent'
import QuestionContentsComponent from '../../components/grade/QuestionContentsComponent'
import axios from 'axios'
import PageingComponent from '../../components/common/paging/PageingComponent'

const QuestionListPage = () => {

    const language = useRef(new URLSearchParams(window.location.search).get("language"));
    const [questionList, setQuestionList] = useState([]);

    /** 선택 언어 문제 리스트 조회 */
    useEffect(() => {
        axios.get(`http://localhost:8080/fifo-back/question/list/${language.current}`)
            .then((res) => {
                console.log(res.data)
                setQuestionList(res.data)
            })
    }, [])

    /** 게시글 검색을 위한 useState */
    const [pageable , setPageable] = useState({
        cateNo : 1,
        sort : "",
        type : "",
        keyword : "",
        pg : 1,
    })

    /** 검색 type, keyword */
    const [searchType, setSearchType] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    /** 검색 버튼 클릭 */
    const searchHandler = () => {
        setPageable(prev => ({
            ...prev,
            type: searchType,
            keyword: searchKeyword
        }));
    }

    // pg변경 함수 (페이징 버튼 클릭시)
    const changePage = (newPg) => {
        setPageable(prev => ({...prev, pg: newPg}));
    }


    return (
        <MainLayout>
            <div id='questionList'>

                <div id='searchBar'>
                    <p id='languageTitle'>{language.current}</p>

                    <label htmlFor="search">
                        <select name="" id="search" onChange={(e) => setSearchType(e.target.value)}>
                            <option value="">검색옵션</option>
                            <option value="number">번호</option>
                            <option value="title">제목</option>
                            <option value="level">레벨</option>
                        </select>

                        <input type="text" placeholder='검색어를 입력하세요'
                            onChange={(e) => setSearchKeyword(e.target.value)}/>
                        <button onClick={searchHandler}>검색</button>
                    </label>
                </div>
                
                <div id='question'>
                    <div className='header'>
                        <div>번호</div>
                        <div>제목</div>
                        <div>레벨</div>
                        <div>비고</div>
                    </div>
                    {questionList.map((question, index) => {
                        return (
                            <QuestionContentsComponent key={index} question={question} />
                        )
                    })}
                </div>

                <div id='pageable'>
                    {/** 나중에 숫자 지우고 props 전달하면 됨 */}
                    <PageingComponent changePage={changePage}/>
                    1 2 3 4
                </div>

            </div>
        </MainLayout>
    )
}

export default QuestionListPage