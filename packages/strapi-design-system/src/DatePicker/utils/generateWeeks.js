import { isDateEqual } from '../compareDates';

const CELL_COUNT = 7 * 6;

/**
 * This function output a matrix of 7x6 representing weeks and days in which each cell represents one day
 * It starts by positioning the first day of the "date" month argument in the first row, at the good "day" position (monday, tuesday etc...)
 * It then resolves the offset days and return the position of the "selectedDate" (if there's one)
 * The output is: [weeks, activeRow, activeCol] where "weeks" is the matrix and "activeRow" and "activeCol" the coordinate of the select cell
 */
export const generateWeeks = (date, selectedDate) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const daysInCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const daysInPreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  const preOffset = firstDayOfMonth.getDay();
  const daysInMonthWithOffset = daysInCurrentMonth + preOffset;

  const weeks = [];
  let activeRow = 0;
  let activeCol = 0;
  let currentWeekIndex = 0;
  let currentDate;

  for (let i = 0; i < CELL_COUNT; i++) {
    if (i > 6 && i % 7 === 0) {
      currentWeekIndex++;
    }

    if (!weeks[currentWeekIndex]) {
      weeks[currentWeekIndex] = [];
    }

    if (i < preOffset) {
      currentDate = {
        date: new Date(date.getFullYear(), date.getMonth() - 1, daysInPreviousMonth - preOffset + i + 1),
        outsideMonth: true,
      };
    } else if (i < daysInMonthWithOffset) {
      currentDate = { date: new Date(date.getFullYear(), date.getMonth(), i - preOffset + 1) };
    } else {
      currentDate = {
        date: new Date(date.getFullYear(), date.getMonth() + 1, i - preOffset - daysInCurrentMonth + 1),
        outsideMonth: true,
      };
    }

    if (isDateEqual(selectedDate, currentDate.date)) {
      activeRow = currentWeekIndex + 1;
      activeCol = weeks[currentWeekIndex].length;
      currentDate.isSelected = true;
    }

    weeks[currentWeekIndex].push(currentDate);
  }

  return [weeks, activeRow, activeCol];
};
