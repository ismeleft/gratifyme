import React from "react";
import { Calendar, momentLocalizer, Toolbar } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./Calendar.module.css";

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const MyCalendar = () => (
  <div className={styles.myCalendarWrapper}>
    <Calendar
      className={styles.rbcCalendar}
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      views={["month"]}
      style={{ height: 300, width: 500 }}
    />
  </div>
);

export default MyCalendar;
