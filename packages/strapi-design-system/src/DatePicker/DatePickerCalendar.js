import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { VisuallyHidden } from '../VisuallyHidden';
import { DatePickerPopover } from './components';
import { SimpleMenu, MenuItem } from '../SimpleMenu';
import { Flex } from '../Flex';
import { Box } from '../Box';
import { RawTable, RawThead, RawTbody, RawTr } from '../RawTable';
import { DatePickerTh } from './DatePickerTh';
import { DatePickerTd } from './DatePickerTd';
import { FocusTrap } from '../FocusTrap';
import { getMonths, getDayOfWeek, generateWeeks, getYears, formatDate } from './utils';

export const DatePickerCalendar = ({
  selectedDate,
  initialDate,
  popoverSource,
  onChange,
  label,
  minDate,
  maxDate,
  onEscape,
}) => {
  const [date, setDate] = useState(initialDate);
  const [weeks, activeRow, activeCol] = generateWeeks(date, selectedDate);
  const { sun, mon, tue, wed, thu, fri, sat } = getDayOfWeek();
  const months = getMonths();
  const years = getYears(minDate, maxDate);

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
    <DatePickerPopover source={popoverSource} role="dialog" aria-modal="true" aria-label={label} spacing={4}>
      <FocusTrap onEscape={onEscape}>
        <Box padding={4}>
          <Box paddingBottom={4} paddingLeft={2} paddingRight={2}>
            <Flex>
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
            </Flex>
          </Box>
          <RawTable colCount={7} rowCount={weeks.length + 1} initialCol={activeCol} initialRow={activeRow} role="grid">
            <RawThead>
              <RawTr aria-rowindex={1}>
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
                // eslint-disable-next-line react/no-array-index-key
                <RawTr key={index}>
                  {week.map(({ date, outsideMonth, isSelected }) => {
                    return (
                      <DatePickerTd
                        key={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
                        outsideMonth={outsideMonth}
                        onSelectDay={() => onChange(date)}
                        isSelected={isSelected}
                      >
                        <span aria-hidden>{date.getDate()}</span>
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

DatePickerCalendar.defaultProps = {
  selectedDate: undefined,
  initialDate: new Date(),
  minDate: undefined,
  maxDate: undefined,
};

DatePickerCalendar.propTypes = {
  initialDate: PropTypes.instanceOf(Date),
  label: PropTypes.string.isRequired,

  /*
   * Maximum year, that can be selected through the year select
   */

  maxDate: PropTypes.instanceOf(Date),

  /*
   * Minimum year, that can be selected through the year select
   */

  minDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  onEscape: PropTypes.func.isRequired,
  popoverSource: PropTypes.shape({
    current: (typeof Element === 'undefined' ? PropTypes.any : PropTypes.instanceOf(Element)).isRequired,
  }).isRequired,
  selectedDate: PropTypes.instanceOf(Date),
};
