import React from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/article.scss'
import ArticleBoxComponent from '../../components/article/ArticleBoxComponent'
import PageingComponent from '../../components/common/paging/PageingComponent'

const List = () => {
  return (
    <MainLayout>

        <div className='cntRow articleCate'>
            <p className='cateOn'>전체</p>
            <p>자유게시판</p>
            <p>업계소식</p>
            <p>면접후기</p>
        </div>

        <div className='cntRow articleSearch'>
            <p className='tabOn'>최신순</p>
            <p>조회순</p>
            <p>추천순</p>

            <label htmlFor="search">
                <select name="" id="search">
                    <option value="">검색옵션</option>
                    <option value="">제목</option>
                    <option value="">내용</option>
                    <option value="">작성자</option>
                    <option value="">태그</option>
                </select>
                <input type="text" placeholder='검색어를 입력하세요'/>
                <button>검색</button>
            </label>
        </div>

        <div className='cntColumn articleList'>
            <ArticleBoxComponent/>
            <ArticleBoxComponent/>
            <ArticleBoxComponent/>
            <ArticleBoxComponent/>
            <ArticleBoxComponent/>
            <ArticleBoxComponent/>
            <ArticleBoxComponent/>
            <ArticleBoxComponent/>
        </div>

        <PageingComponent/>

    </MainLayout>
  )
}

export default List