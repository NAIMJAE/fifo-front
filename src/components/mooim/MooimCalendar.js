import React, { useEffect, useRef, useState } from "react";
import Calendar from "@toast-ui/calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import { FaCalendarAlt, FaCalendarWeek } from "react-icons/fa";

import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { useSelector } from "react-redux";

import Moment from "moment";
import "moment/locale/ko";
import { createCalendarEventApi, deleteCalendarEventApi, modifyCalendarEventApi, selectCalendarApi } from "../../api/gatheringApi";

const MooimCalendar = ({ mooimno }) => {
  const calendarRef = useRef(null);
  const calendarInstance = useRef(null);
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [error, setError] = useState("");
  const authSlice = useSelector((state) => state.authSlice);

  useEffect(() => {
    const container = calendarRef.current;
    const options = {
      defaultView: "month",
      isReadOnly: false,
      // 시간대 설정
      timezone: {
        zones: [
          {
            timezoneName: "Asia/Seoul",
            displayLabel: "Seoul",
          },
        ],
      },
      calendars: [
        { id: "1", name: "업무", backgroundColor: "#ff4040" },
        { id: "2", name: "미팅", backgroundColor: "#4040ff" },
        { id: "3", name: "회의", backgroundColor: "#40ff40" },
        { id: "4", name: "미정", backgroundColor: "#FF9900" },
      ],
      useDetailPopup: true,
      useFormPopup: true,
    };

    const calendar = new Calendar(container, options);

    calendarInstance.current = calendar;
    console.log(calendarRef);
    calendar.setOptions({
      month: {
        isAlways6Weeks: false,
      },
    });

    /** 일정에 랜덤 아이디 부여*/
    const randomDate = Moment(new Date()).format("YYMMDDHHmmSS");
    const eventId = randomDate + mooimno;
    console.log(eventId);

    /** 일정 불러오기 */
    const fetchEvents = async () => {
      try {
        const events = await selectCalendarApi(mooimno);
        events.forEach((event) => {
          const isReadOnly = event.isReadOnly
          const isAllDay = event.isAllDay;
          const selectedCalendar = options.calendars.find(
            (cal) => cal.id === event.calendarId
          );

          const newEvent = {
            id: event.id,
            calendarId: event.calendarid,
            title: event.title,
            start: Moment(event.start).subtract("months").format("YYYY-MM-DD[T]HH:mm:ss"),
            end: Moment(event.eventend).subtract("months").format("YYYY-MM-DD[T]HH:mm:ss"),
            location: event.location,
            state: event.state,
            isReadOnly: isReadOnly,
            isAllDay: isAllDay,
            backgroundColor: event.bgcolor,
            color: event.color,
          };

          calendar.createEvents([newEvent]);
        });
      } catch (err) {
        console.log(err);
        setError("일정을 불러오지 못했습니다.");
      }
    };

    fetchEvents();

    /** 일정을 생성 */
    calendar.on("beforeCreateEvent", (event) => {
      const selectedCalendar = options.calendars.find(
        (cal) => cal.id === event.calendarId
      );

      // 서버 시간 형식으로 변환
      const startFormatted = Moment(event.start.toDate()).format("YYYY-MM-DDTHH:mm:ss.SSS"); 
      const endFormatted = Moment(event.end.toDate()).format("YYYY-MM-DDTHH:mm:ss.SSS");

      const backgroundColor = selectedCalendar ? selectedCalendar.backgroundColor : "#000000";
      console.log(event.calendarId);

      const newEvent = {
        mooimno: mooimno,
        id: eventId,
        uid: authSlice.uid,
        calendarId: event.calendarId, // Toast calendar용
        calendarid: event.calendarId, // PostgreSQL DB용 (대문자 안됨)
        title: event.title,
        start: startFormatted,
        end: endFormatted,
        eventend: endFormatted,
        location: event.location,
        state: event.state,
        isReadOnly: false,
        isAllDay: event.isAllday,
        backgroundColor: backgroundColor,
        bgcolor: backgroundColor,
        color: "#FFFFFF",
      };
      calendar.createEvents([newEvent]);
      calendar.setOptions({});

      createCalendarEventApi(newEvent);
    });

    /** 일정을 수정 */
    calendar.on("beforeUpdateEvent", ({ event, changes }) => {
      calendar.updateEvent(event.id, event.calendarId, changes);
      console.log("HERE");
      console.log(changes);
      console.log(event);
      const start =
        changes.start === undefined
          ? null
          : Moment(changes.start.toDate()).format("YYYY-MM-DDTHH:mm:ss.SSS");
      const end =
        changes.end === undefined
          ? null
          : Moment(changes.end.toDate()).format("YYYY-MM-DDTHH:mm:ss.SSS");

      const updateData = {
        id : event.id,
        calendarid: changes.calendarId,
        title: changes.title,
        location: changes.location,
        start: start,
        eventend: end,
        state: changes.state,
        isAllDay: changes.isAllday,
        isReadOnly: changes.isReadOnly,
      };
      console.log(updateData);

      try {
        modifyCalendarEventApi(updateData);
      } catch (err) {
        console.log(err);
      }
    });

    /** 일정을 삭제 */
    calendar.on("beforeDeleteEvent", (event) => {
      console.log(event);
      calendar.deleteEvent(event.id, event.calendarId);
      console.log(event.id);
      try {
        deleteCalendarEventApi(event.id);
      } catch (err) {
        console.log(err);
      }
    });

    /**  테마 변경 */
    calendar.setTheme({
      month: {
        startDayOfWeek: 0,
        format: "YYYY-MM",
      },
      week: {
        startDayOfWeek: 0,
        showTimezoneCollapseButton: true,
        timezonesCollapsed: true,
      },
      common: {
        // 쉬는날 빨간색
        holiday: {
          color: "rgba(255, 64, 64, 1)",
        },
        // 오늘 날짜 표시 커스텀
        today: {
          color: "#fff",
          backgroundColor: "orange",
        },
        // 토요일 파란색
        saturday: {
          color: "rgba(64, 64, 255, 1)",
        },
      },
    });

    setCurrentMonth(calendar.getDate().getMonth() + 1);
    setCurrentYear(calendar.getDate().getFullYear());

    console.log("ggggg")
    console.log(calendar)
    return () => {
      console.log("언마운트!!")
      // unmount
      if (calendar) {
        calendar.destroy();
      }
    };
  }, []);

  /**  다음 달로 이동하는 버튼 */
  const handleClickNextButton = () => {
    calendarInstance.current.next();
    setCurrentMonth(calendarInstance.current.getDate().getMonth() + 1);
    setCurrentYear(calendarInstance.current.getDate().getFullYear());
  };
  /** 이전 달로 이동하는 버튼 */
  const handleClickPrevButton = () => {
    calendarInstance.current.prev();
    setCurrentMonth(calendarInstance.current.getDate().getMonth() + 1);
    setCurrentYear(calendarInstance.current.getDate().getFullYear());
  };

  /** 한 주 스케줄로 보기 */
  const weekChangeButton = (view) => {
    calendarInstance.current.changeView("week");
  };
  /** 월간 스케줄로 보기 */
  const monthChangeButton = (view) => {
    calendarInstance.current.changeView("month");
  };
  /** 오늘 날짜로 돌아가기 */
  const goToday = () => {
    calendarInstance.current.today();
    setCurrentMonth(calendarInstance.current.getDate().getMonth() + 1);
    setCurrentYear(calendarInstance.current.getDate().getFullYear());
  };
  return (
    <div className="calendarContent">
      <span className="dateSpan">
        {currentYear}.{currentMonth < 10 ? '0' + currentMonth : currentMonth}
      </span>
      <div className="cntRow controllBtn" style={{ marginBottom: "10px" }}>
        <button className="smBtn maR10" onClick={monthChangeButton}>
          <FaCalendarAlt style={{ marginRight: "5px" }} /> 월간 형식
        </button>
        <button className="smBtn maR10" onClick={weekChangeButton}>
          <FaCalendarWeek style={{ marginRight: "5px" }} /> 주간 형식
        </button>
        <button className="smBtn maR10" onClick={handleClickPrevButton}>
          <GrFormPrevious />
        </button>
        <button className="smBtn maR10" onClick={goToday}>
          today
        </button>
        <button className="smBtn maR10" onClick={handleClickNextButton}>
          <MdNavigateNext />
        </button>
      </div>
      <div ref={calendarRef} style={{ width: "100%", height: "600px" }} />
    </div>
  );
}

export default MooimCalendar;
