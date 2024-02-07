import { useEffect, useRef, useState } from "react";
import useStore from "../../store/UserAuthStore";

const Chat = ({ session, myConnectionId, gamePlayer }) => {
  const [chat, setChat] = useState("");

  const [messageList, setMessageList] = useState([]);
  const ulRef = useRef(null);
  // 닉네임 가져오기
  const nickname = useStore((state) => state.user.userNickname);
  const [receiveMsg, setReceiveMsg] = useState(`${nickname}님 환영합니다`);
  const sendMsg = (e) => {
    e.preventDefault();
    // console.log(session);
    session
      .signal({
        data: `${nickname}: ${chat}`, // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "room-chat", // The type of message (optional)
      })
      .then(() => {
        console.log("보냄 :", chat);
        setChat("");
        setMessageList([...messageList, receiveMsg]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  session.on("signal:room-chat", (event) => {
    // console.log('받음')
    if (receiveMsg !== event.data) {
      console.log("받음d :", event.data); // Message
    }
    setReceiveMsg(event.data);
    setMessageList([...messageList, receiveMsg]);
    // console.log(messageList)
    // console.log('폼',event.from); // Connection object of the sender
    // console.log('타입',event.type); // The type of message ("my-chat")
  });

  useEffect(() => {
    // 컴포넌트가 업데이트 될 때마다 스크롤을 맨 아래로 이동
    if (ulRef.current) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    <section className="w-full flex flex-col absolute bottom-[40px] opacity-70">
      {/* <h2 className="bg-neutral-400 px-8 h-6">채팅</h2> */}

      <ul ref={ulRef} className="mb-2 px-2 h-40 overflow-auto flex flex-col justify-end">
        {messageList.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
        <li className="">{receiveMsg}</li>
      </ul>
      {myConnectionId !== gamePlayer ? (
        <form
          className="px-3
          rounded-3xl bg-white
          flex flex-row overflow-hidden"
          onSubmit={sendMsg}
        >
          <input
            type="text"
            placeholder="채팅을 입력해 주세요!"
            className="grow focus:outline-none"
            maxLength="50"
            value={chat}
            required
            onChange={(e) => setChat(e.target.value)}
          />
          <button className="w-12 m-1 pl-3 border-l-2 border-solid" type="submit">
            채팅
          </button>
        </form>
      ) : null}
    </section>
  );
};

export default Chat;