import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/article.scss'
import ArticleBoxComponent from '../../components/article/ArticleBoxComponent'
import PageingComponent from '../../components/common/paging/PageingComponent'
import Breadcrumb from '../../components/common/main/Breadcrumb'
import { Link } from 'react-router-dom'
import { articleListApi } from '../../api/articleApi'

const List = () => {

    /** 게시글 검색을 위한 useState */
    const [pageable , setPageable] = useState({
        cateNo : 1,
        sort : "new",
        type : "",
        keyword : "",
        pg : 1,
    })

    /** 게시글 목록 useState */
    const [postList, setPostList] = useState([]);

    /** 서버에서 게시글 목록 받아오는 useEffect */
    useEffect(() => {
        const selectArticleList = async () => {
            try {
                const response = await articleListApi(pageable);
                setPostList(response);
            }catch (err) {
                console.log(err);
            }
        }
        selectArticleList();
    }, [pageable])

    /** 검색 type, keyword */
    const [searchType, setSearchType] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    /** 검색 버튼 클릭 */
    const searchHandler = () => {
        setPageable(prev => ({...prev, type: searchType}));
        setPageable(prev => ({...prev, keyword: searchKeyword}));
    }

    // pg변경 함수 (페이징 버튼 클릭시)
    const changePage = (newPg) => {
        setPageable(prev => ({...prev, pg: newPg}));
    }

    /** 태그 클릭시 검색 */
    const searchByTag = (tag) => {
        setSearchType("tag");
        setSearchKeyword(tag);
        searchHandler();
    }

  return (
    <MainLayout>

        <Breadcrumb crumb={"게시판 / 글목록"}/>

        <div className='cntRow articleCate'>
            <p className={`${pageable.cateNo === 1 ? 'cateOn' : ''}`}
                onClick={(e) => {setPageable(prev => ({...prev, cateNo: 1 }))}}>자유게시판</p>

            <p className={`${pageable.cateNo === 2 ? 'cateOn' : ''}`}
                onClick={(e) => {setPageable(prev => ({...prev, cateNo: 2 }))}}>업계소식</p>

            <p className={`${pageable.cateNo === 3 ? 'cateOn' : ''}`}
                onClick={(e) => {setPageable(prev => ({...prev, cateNo: 3 }))}}>면접후기</p>
        </div>

        <div className='cntRow articleSearch'>
            <p className={`${pageable.sort === "new" ? 'tabOn' : ''}`}
                onClick={(e) => {setPageable(prev => ({...prev, sort:"new"}))}}>최신순</p>

            <p className={`${pageable.sort === "hit" ? 'tabOn' : ''}`}
                onClick={(e) => {setPageable(prev => ({...prev, sort:"hit"}))}}>조회순</p>

            <p className={`${pageable.sort === "heart" ? 'tabOn' : ''}`}
                onClick={() => setPageable({...pageable, sort:"heart"})}>추천순</p>

            <label htmlFor="search">
                <select name="" id="search" onChange={(e) => setSearchType(e.target.value)}>
                    <option value="">검색옵션</option>
                    <option value="title">제목</option>
                    <option value="content">내용</option>
                    <option value="writer">작성자</option>
                    <option value="tag">태그</option>
                </select>
                <input type="text" placeholder='검색어를 입력하세요'
                    onChange={(e) => setSearchKeyword(e.target.value)}/>
                <button onClick={searchHandler}>검색</button>
            </label>
        </div>

        <div className='cntColumn articleList'>
            <ArticleBoxComponent postList={postList} searchByTag={searchByTag}/>
        </div>

        <div className='pageAndBtn'>
            <PageingComponent cntList={postList} changePage={changePage}/>
            <Link to="/article/write" className='hvMdBtn'>글쓰기</Link>
        </div>

    </MainLayout>
  )
}

export default List