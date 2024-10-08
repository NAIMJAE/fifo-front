import { TZDate } from "@toast-ui/calendar";

export function getCurrentDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    // 자바의 LocalDateTime 형식과 호환되는 문자열 형식 생성
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
/** 한국 표준 시간대로 변환하는 함수 */
export function convertToKoreanTime(utcDateString) {
    // 문자열을 객체로부터 추출
    const utcString = utcDateString.d ? utcDateString.d : utcDateString;

    console.log("utcString : ", utcString);

    // UTC 시간을 Date 객체로 변환
    const utcDate = new Date(utcString.d);
    console.log("utcDate : ", utcDate);


    // 한국 시간대 오프셋 (UTC+9 시간대)
    const koreaTimeOffset = 9 * 60; // 9시간을 분으로 변환
    const koreaTime = new Date(utcDate.getTime());

    console.log("koreaTime : ", koreaTime);

    return new TZDate(koreaTime);
}