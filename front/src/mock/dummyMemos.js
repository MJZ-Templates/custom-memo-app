import { MEMO_COLORS } from "../constants/memoColors";

export const dummyMemos = [
  {
    id: 1,
    title: "프론트엔드 일정 정리",
    content: "리팩토링 및 코드 리뷰 일정 정리하기",
    createdAt: "2025-03-26T10:30:00",
    color: MEMO_COLORS.YELLOW,
    favorite: true,
  },
  {
    id: 2,
    title: "백엔드 연동 계획",
    content: "API 명세 확인하고 axios 연동 준비하기",
    createdAt: "2025-03-25T16:45:00",
    color: MEMO_COLORS.BLUE,
    favorite: false,
  },
  {
    id: 3,
    title: "디자인 회의 정리",
    content: "Figma에서 전달된 내용 요약 정리",
    createdAt: "2025-03-24T09:10:00",
    color: MEMO_COLORS.PURPLE,
    favorite: true,
  },
  {
    id: 4,
    title: "할 일 목록",
    content: "1. 포스트 작성\n2. git push\n3. 코드 리뷰 확인",
    createdAt: "2025-03-23T13:20:00",
    color: MEMO_COLORS.GREEN,
    favorite: false,
  },
];
