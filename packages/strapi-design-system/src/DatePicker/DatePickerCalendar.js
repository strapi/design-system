import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { VisuallyHidden } from '../VisuallyHidden';
import { DatePickerPopover } from './components';
import { SimpleMenu, MenuItem } from '../SimpleMenu';
import { Row } from '../Row';
import { Box } from '../Box';
import { RawTable, RawThead, RawTbody, RawTr } from '../RawTable';
import { DatePickerTh } from './DatePickerTh';
import { DatePickerTd } from './DatePickerTd';
import { FocusTrap } from '../FocusTrap';
import { getMonths, getDayOfWeek, generateWeeks, getYears, formatDate } from './utils';

export const DatePickerCalendar = ({ selectedDate, initialDate, popoverSource, onChange, label }) => {
  const [date, setDate] = useState(initialDate);
  const [weeks, activeRow, activeCol] = generateWeeks(date, selectedDate);
  const { sun, mon, tue, wed, thu, fri, sat } = getDayOfWeek();
  const months = getMonths();
  const years = getYears();

  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, [selectedDate]);

  const handleMonthChange = (month) => {
    const updatedDate = new Date(date);
    updatedDate.setMonth(months.indexOf(month));
    setDate(updatedDate);
  };

  const handleYearChange = (year) => {
    const updatedDate = new Date(date);
    updatedDate.setFullYear(year);
    setDate(updatedDate);
  };

  return (
    <DatePickerPopover source={popoverSource} role="dialog" aria-modal="true" aria-label={label} spacingTop={1}>
      <FocusTrap onEscape={() => setVisible(false)}>
        <Box padding={4}>
          <Box paddingBottom={4} paddingLeft={2} paddingRight={2}>
            <Row>
              <SimpleMenu label={months[date.getMonth()]}>
                {months.map((month) => (
                  <MenuItem key={month} onClick={() => handleMonthChange(month)}>
                    {month}
                  </MenuItem>
                ))}
              </SimpleMenu>
              <Box paddingLeft={2}>
                <SimpleMenu label={date.getFullYear()}>
                  {years.map((year) => (
                    <MenuItem key={year} onClick={() => handleYearChange(year)}>
                      {year}
                    </MenuItem>
                  ))}
                </SimpleMenu>
              </Box>
            </Row>
          </Box>
          <RawTable colCount={7} rowCount={weeks.length + 1} initialCol={activeCol} initialRow={activeRow} role="grid">
            <RawThead>
              <RawTr>
                <DatePickerTh>{sun}</DatePickerTh>
                <DatePickerTh>{mon}</DatePickerTh>
                <DatePickerTh>{tue}</DatePickerTh>
                <DatePickerTh>{wed}</DatePickerTh>
                <DatePickerTh>{thu}</DatePickerTh>
                <DatePickerTh>{fri}</DatePickerTh>
                <DatePickerTh>{sat}</DatePickerTh>
              </RawTr>
            </RawThead>
            <RawTbody>
              {weeks.map((week, index) => (
                <RawTr key={`week-${index}`}>
                  {week.map(({ date, outsideMonth, isSelected }) => {
                    return (
                      <DatePickerTd
                        key={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
                        outsideMonth={outsideMonth}
                        onSelectDay={() => onChange(date)}
                        isSelected={isSelected}
                      >
                        <span aria-hidden={true}>{date.getDate()}</span>
                        <VisuallyHidden>
                          <span>{formatDate(date)}</span>
                        </VisuallyHidden>
                      </DatePickerTd>
                    );
                  })}
                </RawTr>
              ))}
            </RawTbody>
          </RawTable>
        </Box>
      </FocusTrap>
    </DatePickerPopover>
  );
};

DatePickerCalendar.defaultProps = { selectedDate: undefined, initialDate: new Date() };
DatePickerCalendar.propTypes = {
  initialDate: PropTypes.instanceOf(Date),
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  popoverSource: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  selectedDate: PropTypes.instanceOf(Date),
};
