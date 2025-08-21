import moment from "moment/moment";

export const FORMAT = {
  DATE: "YYYY-MM-DD",
  TIME: "HH:mm:ss",
  DATE_TIME: "YYYY-MM-DD HH:mm:ss",
};

export function formatDate(value: any, format: string | null = null) {
  if (!value) {
    return null;
  }
  if (format) {
    return moment(String(value)).format(format);
  }
  return moment(String(value)).format(FORMAT.DATE);
}

export function formatDateTime(value: any, format: string | null = null, utc = true) {
  if (!value) {
    return null;
  }
  
  const momentValue = utc ? moment.utc(value) : moment(value);
  
  if (format) {
    return momentValue.format(format);
  }
  
  return momentValue.format('YYYY-MM-DD HH:mm:ss'); // Default format if no format is provided
}

export function getCurrentDateTime(format: string | null = null, utc = true) {
  const currentMoment = utc ? moment.utc() : moment();
  
  if (format) {
    return currentMoment.format(format);
  }
  
  return currentMoment.format('YYYY-MM-DD HH:mm:ss'); // Default format if no format is provided
}

export function countSessionDays(start, end, workSessions = []) {
  const day = start.getDay();
  const year = start.getFullYear();
  const month = start.getMonth();
  const date =  start.getDate();
  let hours = 0;
  const todaySessions = workSessions.filter((o) => (o.work_day +1)%6 === day);
  todaySessions.forEach ((s) => {
    const sessionStart = moment(s.start_time, FORMAT.TIME).toDate();
    sessionStart.setFullYear(year);
    sessionStart.setMonth(month);
    sessionStart.setDate(date);
    const sessionEnd =moment(s.end_time, FORMAT.TIME).toDate();
    sessionEnd.setFullYear(year);
    sessionEnd.setMonth(month);
    sessionEnd.setDate(date);
    // console.log("start", start, "end", end, "sessionStart", sessionStart, "sessionEnd", sessionEnd);
    if ((sessionStart >= start && sessionStart <= end) || (sessionEnd >= start && sessionEnd <= end)) {
      hours += 0.5;
    }
  });
  console.log(hours)
  return hours;
 };

 export function countWorkDays(start, end, workSessions = []) {
  // console.log(workSessions);
  const startDate = start.getDate();
  const startHouse = start.getHours();
  const startMinute = start.getMinutes();
  const endDate = end.getDate();
  const endHouse = end.getHours();
  const endMinute = end.getMinutes();
  let loop = new Date(start);
  let hours = 0;
  do {
    const startH = loop.getDate() == startDate ? startHouse : 0;
    const startM = loop.getDate() == startDate ? startMinute : 0;
    const endH = loop.getDate() == endDate ? endHouse : 23;
    const endM = loop.getDate() == endDate ? endMinute : 59;
    // For each date
    const loopStart = new Date(loop);
    loopStart.setHours(startH);
    loopStart.setMinutes(startM);
    const loopEnd = new Date(loop);
    loopEnd.setHours(endH);
    loopEnd.setMinutes(endM);
    hours += countSessionDays(loopStart, loopEnd, workSessions);
    loop = new Date(loop.getTime() + 86400000);
  } while (loop <= end);
  return hours;
 };