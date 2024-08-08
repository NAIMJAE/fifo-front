import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Host, RootUrl } from '../../api/RootUrl';
import { getCurrentDateTime } from '../common/helper/ChangeDate';
import { DownloadFileApi, selectChatApi, sendFileApi, sendMsgApi } from '../../api/chatApi';
import ImageModal from './modal/ImageModal';
import Moment from 'moment';
import EmojiModal from './modal/EmojiModal';
import { faCirclePlay, faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import GifModal from './modal/GifModal';

const Chatting = ({ mooim }) => {
    const loginSlice = useSelector((state) => state.authSlice) || {};
    const userno = loginSlice.userno;

    /** 채팅방 번호 */
    const roomId = "chatRoom"+mooim.mooimno;

    /** 불러온 메세지 */
    const [messages, setMessages] = useState([]);

    /** 같은 소켓에 접속 중인 멤버 목록 */
    const [connUsers, setConnUsers] = useState([]);

    /** 입력한 메세지 */
    const [inputMsg, setInputMsg] = useState("");

    /** 새로운 메세지 수신시 화면 이동 */
    const messagesEndRef = useRef(null);
 
    /** 소켓 연결 상태 */ 
    const webSocket = useRef(null);

    /** 웹 소켓 연결 */
    useEffect(() => {
        // WebSocket 서버에 연결
        webSocket.current = new WebSocket(`ws://${Host}:8080/fifo-back/chat/${userno}/${roomId}`);

        // 연결이 성립되었을 때 실행
        webSocket.current.onopen = () => {
            console.log('WebSocket connection established');
        };

        // 메시지를 받았을 때 실행
        webSocket.current.onmessage = (message) => {
            const data = JSON.parse(message.data);

            console.log("소켓으로 전달 받은 내용 : ", data);

            if (data.type === 'userList') {
                // 사용자 목록 업데이트
                setConnUsers(data.payload);
            } else if (data.type === 'message') {
                const parsedMessage = JSON.parse(data.payload);
                console.log("소켓으로 전달 받은 내용2 : ", parsedMessage);

                // 채팅 메시지 업데이트
                setMessages(prevMessages => [...prevMessages, parsedMessage]);
            }
        };

        // 연결이 종료되었을 때 실행
        webSocket.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // 오류가 발생했을 때 실행
        webSocket.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // 컴포넌트 언마운트 시 WebSocket 닫기
        return () => {
            if (webSocket.current) {
                webSocket.current.close();
            }
        };
    }, []);

    /** 랜더링시 채팅 내역 불러오기 */
    useEffect(() => {
        const selectChat = async () => {
            try {
                const response = await selectChatApi(mooim.mooimno);
                console.log("불러온채팅 : ",response);
                setMessages(response);

            } catch (error) {
                console.log(error);
            }
        }
        selectChat();
    },[]);

    /* 새로운 메시지가 추가될 때마다 스크롤을 최신 메시지 위치로 이동 */
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    /** 엔터 키 감지 핸들러 */
    const keyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // 기본 Enter 키 동작(줄바꿈) 방지
            makeMsg();
        }
    };

    const makeMsg = () => {
        if (inputMsg) {
            const msgData = {
                type: "msg",
                data: inputMsg,
            }
            sendMessage(msgData);
        }
    }

    /** 메세지 전송 함수 */
    const sendMessage = async (msgData) => {
        if (webSocket.current.readyState === WebSocket.OPEN) {

            const socketMsg = {
                mooimno: mooim.mooimno,
                nick: loginSlice.nick,
                msgData: msgData,
                chatdate: getCurrentDateTime(),
                thumb: loginSlice.thumb,
                userno: userno,
            }

            const saveMsg = {
                mooimno: mooim.mooimno,
                userno: loginSlice.userno,
                message: JSON.stringify(msgData),
                chatdate: getCurrentDateTime(),
                thumb: loginSlice.thumb,
            }

            // DB로 메세지 전송
            try {
                const response = await sendMsgApi(saveMsg);
                console.log("확인 : ", response)
                if (response > 0) {
                    // 소켓으로 메세지 전송
                    webSocket.current.send(JSON.stringify(socketMsg));
                    setInputMsg('');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    /** 첨부파일 선택하는 창 띄우는 함수 */
    const selectFile = () => {
        document.getElementById('fileInput').click();
    };

    /** 첨부파일 전송 함수 */
    const saveFile = async (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("file : ", file);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('mooimno', mooim.mooimno);
            formData.append('userno', loginSlice.userno);
            formData.append('chatdate', getCurrentDateTime());

            try {
                const response = await sendFileApi(formData);
                if (response.status === 200) {
                    const msgData = {
                        type: response.data.type,
                        data: response.data.data,
                        name: response.data.name,
                        mooimno: response.data.mooimno,
                    }
        
                    const socketMsg = {
                        mooimno: mooim.mooimno,
                        nick: loginSlice.nick,
                        msgData: msgData,
                        chatdate: getCurrentDateTime(),
                        thumb: loginSlice.thumb,
                        userno: userno,
                    }
                    webSocket.current.send(JSON.stringify(socketMsg));
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    /** 첨부파일 다운로드 */
    const downloadFile = async (msgData) => {
        console.log("여기",msgData);
        try {
            const response = await DownloadFileApi(msgData);

            // filename 부분을 추출하여 파일 이름으로 사용
            const contentDisposition = response.headers["content-disposition"];
            let fileName = 'downloaded-file';
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename\*?=['"]?([^;]+)['"]?/);
                if (fileNameMatch != null && fileNameMatch.length > 1) {
                    fileName = decodeURIComponent(fileNameMatch[1].replace(/['"]/g, ''));
                }
            }

            const blob = new Blob([response.data], {
                type: response.headers["content-type"],
            });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
        } catch (error) {
            console.log(error);
        }
    }

    /** 이미지 크게 보기 */
    const [zoomImgUrl, setZoomImgUrl] = useState("");
    const [zoomImgModal, setZoomImgModal] = useState(false);

    const zoomImg = (msg) => {
        const url = RootUrl()+"/uploads/chat/files/"+msg.mooimno+"/"+msg.msgData.data;
        setZoomImgUrl(url);
        zoomModal();
    }

    const zoomModal = () => {
        setZoomImgModal(!zoomImgModal);
    }

    /** 이모지 박스 */
    const [emojiBox, setEmojiBox] = useState(false);

    const openEmoji = () => {
        setEmojiBox(!emojiBox);
        setGifBox(false);
    }

    const inputEmoji = (Emoji) => {
        setInputMsg(prevMsg => prevMsg + Emoji);
    }
    
    /** 이모지 박스 */
    const [gifBox, setGifBox] = useState(false);

    const openGif = () => {
        setGifBox(!gifBox);
        setEmojiBox(false);
    }

    const inputGif = (gif) => {
        setGifBox(!gifBox);
        const msgData = {
            type: "gif",
            data: gif,
        }
        sendMessage(msgData);
    }

    // 남은거 : 디자인, 이미지 전송 스크롤, 스크롤 디테일, 이모지, 채팅 삭제, 채팅 접근 제한

  return (
    <div className='chatting'>
        <div className='chatRoom'>
            <div className='chatSide'>
                {mooim.memberList && mooim.memberList.map((member, index) => (
                    <div key={index} className='chatMember'>
                        <img src={`${RootUrl()}/uploads/user/${member.usersDTO.thumb}`} alt="profile" />
                        <h1>{member.usersDTO.nick}</h1>
                        {connUsers.includes(String(member.usersDTO.userno)) ? (
                            <span style={{border:"4px solid #16FF00"}}></span>
                        ) : (
                            <span style={{border:"4px solid #FF0000"}}></span>
                        )}
                    </div>
                ))}
            </div>

            <div className='chatCnt'>
                <div className='chatMsg'>
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.userno === userno ? 'myMsg' : 'msg'}>
                            <img src={`${RootUrl()}/uploads/user/${msg.thumb}`} alt="profile" />
                            <div>
                                <h1>{msg.nick} <span>{Moment(msg.chatdate).format('MM.DD HH:mm')}</span></h1>
                                {msg.msgData.type === "msg" && <h2>{msg.msgData.data}</h2>}
                                {msg.msgData.type === "image" &&
                                    <img className='normalImg'
                                        src={`${RootUrl()}/uploads/chat/files/${msg.mooimno}/${msg.msgData.data}`} alt="file" 
                                        onClick={() => zoomImg(msg)}/>
                                }
                                {msg.msgData.type !== "image" && msg.msgData.type !== "msg" && msg.msgData.type !== "gif" &&
                                    <div className='file' onClick={() => downloadFile(msg.msgData)}>
                                        <span>{msg.msgData.name.split(".")[1]}</span>
                                        <h1>{msg.msgData.name}</h1>
                                    </div>
                                }
                                {msg.msgData.type === "gif" &&
                                    <img src={`../../../../images/mooim/chat/${msg.msgData.data}`} alt="gif"/>
                                }
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className='chatInput'>
                    {emojiBox && <EmojiModal inputEmoji={inputEmoji}/>}
                    {gifBox && <GifModal inputGif={inputGif}/>}
                    <div className='inputBox'>
                        <div className='chatTool'>
                            <FontAwesomeIcon icon={faPlus} size="lg" color="#606060" onClick={selectFile}/>
                            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={saveFile} />
                            <FontAwesomeIcon icon={faFaceSmile} size="lg" color="#606060" onClick={openEmoji} />
                            <FontAwesomeIcon icon={faCirclePlay} size="lg" color="#606060" onClick={openGif} />
                        </div>
                        
                        <textarea value={inputMsg} 
                            onChange={(e) => {setInputMsg(e.target.value)}}
                            onKeyDown={keyDown}
                        />

                    </div>
                </div>
            </div>
        </div>
        {zoomImgModal && <ImageModal zoomImgUrl={zoomImgUrl} zoomModal={zoomModal}/>}
    </div>
  )
}

export default Chatting