import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import Breadcrumb from '../../components/common/main/Breadcrumb'
import EditorComponent from '../../components/common/toast/EditorComponent'
import { useLocation } from 'react-router-dom'
import { articleViewApi } from '../../api/articleApi'

/** 입력한 태그 이전 상태 저장 (태그 개수 제한) */
let prevValue = "";

const ModifyPage = () => {

    // URL에서 파라미터값 추출
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let pno = queryParams.get('pno');

    /** 게시글 useState */
    const [articleView, setArticleView] = useState({});

    /** 태그 관리 */
    const [tagList, setTagList] = useState([]);
    const [inputTag, setInputTag] = useState("");

    /** 수정할 게시글 조회 */
    useEffect(() => {

        if (pno === '') {
            alert("게시글을 찾을 수 없습니다.");
            return;
        }
        const selectArticle = async () => {
            console.log("pno",pno)
            try {
                const response = await articleViewApi(pno); 
                console.log("response : ", response)
                setArticleView(response);
                setInputTag(response.tagName.join(' '));
            } catch (error) {
                console.log(error);
                alert("게시글을 찾을 수 없습니다.");
            }
        }
        selectArticle();

    }, [])

    /** 게시글 내용 수정 */
    const handleModify = (e) => {
        const {name, value} = e.target;
        setArticleView(prevArticle => ({
            ...prevArticle,
            [name]: value,
        }));
    }

    /** 입력한 태그 자동 생성 */
    const createTag = (event) => {
        setInputTag(event.target.value);
        const tagArray = inputTag.replace(/\s+/g, '').split("#").filter(tag => tag !== "");
        if (tagArray.length > 10) {
            alert("태그는 10개까지 생성가능합니다.");
            setInputTag(prevValue);
        }else {
            prevValue = inputTag;
            setTagList(tagArray);
        }
    }

    /** 게시글 저장 */
    const handleSubmit = async () => {

    }

    // changeImages에서 src 추출할때 base64만 추출하게 변경해야함
    // 게시글 내용, 파일은 따로 state 만들어서 관리해야함
    // 파일은 클릭하면 삭제 가능하게 하고 디자인도 변경 (파일몇개.. 이거 안보이게)
    // 게시글 저장할때 state들 모아서 data로 전달해야함

  return (
    <MainLayout>

        <Breadcrumb crumb={"게시판 / 글수정"}/>

        <div className='cntRow articleTitle'>
            <input type="text" placeholder='제목' name='title' value={articleView.title} onChange={(e) => handleModify(e)}/>
            <select name="cateNum" value={articleView.cateNum} onChange={(e) => handleModify(e)}>
                <option value="1">자유게시판</option>
                <option value="2">업계소식</option>
                <option value="3">면접후기</option>
            </select>
        </div>

        <div className='cntRow articleWrite'>
            <EditorComponent/>
        </div>

        <div className='cntRow articleFile'>
            <input type="file" multiple />
            <div className='modifyFile'>
                {articleView.fileName && articleView.fileName.map((file, index) => (
                    <span key={index}>{file}</span>
                ))}
            </div>
        </div>

        <div className='cntColumn articleTag'>
            <input type="text" placeholder='#게시글 #태그 #추가' value={inputTag} onChange={createTag}/>
            <div className='cntWrapRow' style={{marginTop:"0"}}>
                {tagList ? tagList.map((tag, index) => (
                    <span key={index} className='tag'>#{tag}</span>
                )) : (<></>)}
            </div>
        </div>

        <div className='cntRow writeBtn'>
            <button>취소</button>
            <button className='blue' onClick={handleSubmit}>수정</button>
        </div>

    </MainLayout>
  )
}

export default ModifyPage