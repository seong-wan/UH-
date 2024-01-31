import { useNavigation } from "react-router-dom";
import { useRef, useState } from "react";
import useScrollAnimation from "./useScrollAnimation";

const useLobby = () => {
  const navigate = useNavigation();

  // 여기서는 방 리스트와 접속자 리스트를 예시로 들었습니다.
  // 실제로는 서버에서 데이터를 받아오거나 다른 로직에 따라 설정할 수 있습니다.
  const [rooms, setRooms] = useState([]);

  const roomRefs = useRef([]);

  // 스크롤 애니메이션 훅 사용
  useScrollAnimation(roomRefs);
  return {
    navigate,
    rooms,
    setRooms,
    roomRefs,
  };
};

export default useLobby;
