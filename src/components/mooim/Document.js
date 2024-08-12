import React, { useEffect, useRef, useState } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { uploadFile, getDocumentSection } from "../../api/documentApi";
import "@blocknote/mantine/style.css";
import { RootUrl } from "../../api/RootUrl";
import "../../styles/document.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Document = ({ mooimno }) => {
  /** 페이지 정보 보관하는 useRef */
  const pageRef = useRef({
    mooimno: mooimno,
    title: "",
    content: "",
  });

  const doc = new Y.Doc();
  const provider = useRef(null);

  /** 에디터 생성 설정 */
  const editor = useCreateBlockNote({
    defaultStyles: true,
    collaboration: {
      provider: provider.current,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: "My Username",
        color: "#ff0000",
      },
    },
    uploadFile,
  });

  /**소켓 연결, db의 에디터 정보 가져오기 */
  const [docno, setDocno] = useState(""); // 보여줄 에디터의 PK값
  useEffect(() => {
    /**소켓 연결*/
    provider.current = new WebrtcProvider(mooimno, doc, {
      signaling: [`${RootUrl()}/document/${mooimno}`],
    });

    /**현재 존재하는 문서들 가져오기 */
    selectDocument();

    /**선택한 문서의 내용 가져오기 */
    console.log(docno);
    try {
      const response = axios.get(`${RootUrl()}/document/getDocument?docno=9`);
      const data = response.data.content;
      console.log(data);
      const docView = JSON.parse(data.content);

      // 에디터에 노트 데이터 적용
      editor.replaceBlocks(data.content, docView);
    } catch (err) {
      console.error(err);
    }

    // 컴포넌트가 언마운트될 때 provider를 정리.
    return () => {
      provider.current.destroy();
    };
  }, [mooimno, docno]);

  /**현재 존재하는 문서들 가져오기 */
  const selectDocument = async () => {
    try {
      const documentList = await getDocumentSection(mooimno);
      console.log(documentList);
      setSections(
        documentList.map((list) => ({
          id: list.docno,
          title: list.title,
        }))
      );
      // 맨 위 문서를 보이게
      setDocno(documentList[0].docno);
    } catch (err) {
      console.log(err);
    }
  };

  /**추가 된 방 관리 */
  const [sections, setSections] = useState([]);

  /**페이지(문서) 추가하기 */
  const handlerAddDocument = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${RootUrl()}/document/create?mooimno=${mooimno}`
      );

      // 서버 응답에서 새로 생성된 문서의 ID를 가져옴
      const newSectionId = response.data;

      // 새로운 섹션을 상태에 추가
      setSections((prevSections) => [
        ...prevSections,
        {
          id: newSectionId, // 서버에서 받은 ID를 사용
          title: "제목 없음", // 기본 텍스트
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSectionClick = (id) => {
    setDocno(id);
  };

  useEffect(() => {}, [docno]);

  return (
    <div className="Document">
      <div className="side">
        <span className="title" onClick={handlerAddDocument}>
          페이지 추가
          <FontAwesomeIcon icon={faPlusCircle} size="lg" color="#7b7b7b" />
        </span>
        {sections.map((section) => (
          <section
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
          >
            {section.title}
          </section>
        ))}
      </div>
      <BlockNoteView
        editor={editor}
        style={{ width: "100%", minHeight: "1200px" }}
      />
    </div>
  );
};

export default Document;
