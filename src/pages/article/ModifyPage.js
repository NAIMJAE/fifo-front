import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import Breadcrumb from '../../components/common/main/Breadcrumb'
import EditorComponent from '../../components/common/toast/EditorComponent'
import { useLocation, useNavigate } from 'react-router-dom'
import { articleModifyApi, articleViewApi } from '../../api/articleApi'
import { changeImages } from '../../components/common/toast/ImageProcessing'
import { RootUrl } from '../../api/RootUrl'
import { useSelector } from 'react-redux'

/** 입력한 태그 이전 상태 저장 (태그 개수 제한) */
let prevValue = "";

const ModifyPage = () => {

    const loginSlice = useSelector((state) => state.authSlice) || {};
    const navigate = useNavigate();

    // URL에서 파라미터값 추출
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let pno = queryParams.get('pno');

    /** 게시글 useState */
    const [articleView, setArticleView] = useState({});

    /** 게시글 내용 저장 */
    const editorRef = useRef();

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
                editorRef.current.getInstance().setMarkdown(response.content);
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
        // 게시글 내용 꺼내오기
        let contents = editorRef.current.getInstance().getHTML();
        console.log("contents : ", contents)

        // 게시글 내용 속 이미지 변환 (changeImages 컴포넌트화 시킴)
        const resultData = await changeImages(contents);
        if (resultData !== null) {
            // null 체크 안하면 에러
            resultData.imageList.forEach((image, i) => {
                const imageURL = `${RootUrl()}/uploads/post/images/${image.name}`;
                contents = contents.replace(resultData.srcPull[i].slice(5, -1), imageURL);
            });
        }
        console.log("resultData : ", resultData);

        // 필요한 데이터 formData에 담기
        const formData = new FormData();
        formData.append("pno", articleView.pno);
        formData.append("title", articleView.title);
        formData.append("content", contents);
        formData.append("cateNo", articleView.cateNo);
        formData.append("userNo", loginSlice.userno);
        formData.append("tag", inputTag);
        /* 삭제할 파일 이름 가지고 가야함
        for (let i = 0; i < fileList.length; i++) {
            formData.append('files', fileList[i]);
        }
        */
        if (resultData !== null) {
            for (let i = 0; i < resultData.imageList.length; i++) {
                formData.append('images', resultData.imageList[i]);
            }
        }

        // 서버 전송
        try {
            const response = await articleModifyApi(formData);
            console.log(response);
            if (response > 0) {
                navigate(`/article/view?pno=${response}`);
            }
        }catch (err) {
            console.log(err);
        }


    }

    // changeImages에서 src 추출할때 base64만 추출하게 변경해야함 ㅇ
    // 게시글 내용, 파일은 따로 state 만들어서 관리해야함
    // 파일은 클릭하면 삭제 가능하게 하고 디자인도 변경 (파일몇개.. 이거 안보이게)
    // 게시글 저장할때 state들 모아서 data로 전달해야함

  return (
    <MainLayout>

        <Breadcrumb crumb={"게시판 / 글수정"}/>

        <div className='cntRow articleTitle'>
            <input type="text" placeholder='제목' name='title' value={articleView.title} onChange={(e) => handleModify(e)}/>
            <select name="cateNo" value={articleView.cateNo} onChange={(e) => handleModify(e)}>
                <option value="1">자유게시판</option>
                <option value="2">업계소식</option>
                <option value="3">면접후기</option>
            </select>
        </div>

        <div className='cntRow articleWrite'>
            <EditorComponent editorRef={editorRef}/>
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