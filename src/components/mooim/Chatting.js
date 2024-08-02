import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootUrl } from '../../api/RootUrl';
import { getCurrentDateTime } from '../common/helper/ChangeDate';
import { selectChatApi, sendMsgApi } from '../../api/chatApi';

const Chatting = ({ mooim }) => {

    const loginSlice = useSelector((state) => state.authSlice) || {};

    /** 채팅방 번호 */
    const roomId = "chatRoom"+mooim.mooimno;

    /** 불러온 메세지 */
    const [messages, setMessages] = useState([]);

    /** 입력한 메세지 */
    const [inputMsg, setInputMsg] = useState("");

    /** 소켓 연결 상태 */
    const webSocket = useRef(null);

    /** 웹 소켓 연결 */
    useEffect(() => {
        // WebSocket 서버에 연결
        webSocket.current = new WebSocket(`ws://localhost:8080/fifo-back/chat/${roomId}`);

        // 연결이 성립되었을 때 실행
        webSocket.current.onopen = () => {
            console.log('WebSocket connection established');
        };

        // 메시지를 받았을 때 실행
        webSocket.current.onmessage = (message) => {
            const receivedMessage = JSON.parse(message.data);
            setMessages(prevMessages => [...prevMessages, receivedMessage]);
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
                
            }
        }
        selectChat();
    },[]);

    /** 메세지 전송 함수 */
    const sendMessage = async () => {
        if (inputMsg && webSocket.current.readyState === WebSocket.OPEN) {

            const socketMsg = {
                mooimno: mooim.mooimno,
                nick: loginSlice.nick,
                message: inputMsg,
                chatdate: getCurrentDateTime(),
                thumb: loginSlice.thumb,
            }

            const saveMsg = {
                mooimno: mooim.mooimno,
                userno: loginSlice.userno,
                message: inputMsg,
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

    /** 엔터 키 감지 핸들러 */
    const keyDown = (e) => {
        if (e.key === "Enter") {
        sendMessage();
        }
    };

  return (
    <div className='chatting'>
        <div className='chatRoom'>
            <div className='chatSide'>

            </div>

            <div className='chatCnt'>
                <div className='chatMsg'>
                    {messages.map((msg, index) => (
                        <div key={index} className='msg'>
                            <img src={`${RootUrl()}/uploads/user/${msg.thumb}`} alt="profile" />
                            <div>
                                <h1>{msg.nick} <span>{msg.chatdate}</span></h1>
                                <h2>{msg.message}</h2>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='chatInput'>
                    <div>
                        <FontAwesomeIcon icon={faPlus} size="lg" color="#7b7b7b"/>
                        <input type="text" value={inputMsg} 
                            onChange={(e) => {setInputMsg(e.target.value)}}
                            onKeyDown={keyDown}
                            />

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Chatting