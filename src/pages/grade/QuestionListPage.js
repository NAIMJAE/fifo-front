import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/grade.scss'
import '../../components/grade/LanguageButtonComponent'
import QuestionContentsComponent from '../../components/grade/QuestionContentsComponent'
import axios from 'axios'
import PageingComponent from '../../components/common/paging/PageingComponent'
import { RootUrl } from '../../api/RootUrl'
const rootURL = RootUrl();

const QuestionListPage = () => {

    const language = useRef(new URLSearchParams(window.location.search).get("language"));
    const [questionList, setQuestionList] = useState();

    /** 선택 언어 문제 리스트 조회 */
    useEffect(() => {
        axios.get(`${rootURL}/question/list/${language.current}`)
            .then((res) => {
                setQuestionList(res.data)
            })
    }, [])

    /** 게시글 검색을 위한 useState */
    const [pageable, setPageable] = useState({
        sort: "",
        type: "",
        keyword: "",
        pg: 1,
    })

    /** 검색 type, keyword */
    const [searchType, setSearchType] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isSearchLevel, setIsSearchLevel] = useState(false);
    const [searchResult, setSearchResult] = useState();

    /** 검색 버튼 클릭 */
    const searchHandler = () => {

        if(searchType == ""){
            alert("검색 옵션을 선택하세요")
        }else if(searchKeyword == ""){
            alert("검색어를 입력하세요")
        }else{
            setPageable(prev => ({
            ...prev,
            type: searchType,
            keyword: searchKeyword
        }));
        }
    }

    // pg변경 함수 (페이징 버튼 클릭시)
    const changePage = (newPg) => {
        setPageable(prev => ({ ...prev, pg: newPg }));
    }

    useEffect(() => {
        if(searchKeyword !== ""){
            axios.post(`${rootURL}/question/list/search`,pageable)
        .then((res)=>{
            setQuestionList(res.data);
        })
        }
    }, [pageable])

    useEffect(() => {
        if (searchType === "level") {
            setIsSearchLevel(true);
            setSearchKeyword("1");
        } else {
            setIsSearchLevel(false);
            setSearchKeyword("");
        }
    }, [searchType])

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
                        {!isSearchLevel ? <input className='searchKey' type="text" placeholder='검색어를 입력하세요'
                            onChange={(e) => setSearchKeyword(e.target.value)} /> :
                            <select className='searchKey' onChange={(e) => setSearchKeyword(e.target.value)}>
                                <option value={"1"}>Lv1</option>
                                <option value={"2"}>Lv2</option>
                                <option value={"3"}>Lv3</option>
                                <option value={"4"}>Lv4</option>
                                <option value={"5"}>Lv5</option>
                            </select>
                        }

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
                    {questionList != null ? questionList.dtoList.map((question, index) => {
                        return (
                            <QuestionContentsComponent key={index} question={question} />
                        )
                    }) : null}
                </div>

                <div id='pageable'>
                    <PageingComponent cntList={questionList} changePage={changePage} />
                </div>

            </div>
        </MainLayout>
    )
}

export default QuestionListPage