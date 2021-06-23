import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CalendarIcon from '@strapi/icons/Calendar';
import styled from 'styled-components';
import { Popover } from '../Popover';
import { RawTable, RawThead, RawTbody, RawTr } from '../RawTable';
import { DatePickerTh } from './DatePickerTh';
import { DatePickerTd } from './DatePickerTd';
import { FocusTrap } from '../FocusTrap';
import { TextInput } from '../TextInput';
import { VisuallyHidden } from '../VisuallyHidden';
import { getMonths, getDayOfWeek, generateWeeks, getYears } from './utils';
import { SimpleMenu, MenuItem } from '../SimpleMenu';
import { Row } from '../Row';
import { Box } from '../Box';

const DatePickerPopover = styled(Popover)`
  max-height: ${3 * 6}rem;
  overflow: hidden;
`;

const DatePickerButton = styled.button`
  border: none;
  background: transparent;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const DatePicker = ({ initialDate, selectedDate, onChange, label, selectedDateLabel, ...props }) => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(initialDate);
  const inputRef = useRef(null);

  const [weeks, activeRow, activeCol] = generateWeeks(date, selectedDate);
  const { sun, mon, tue, wed, thu, fri, sat } = getDayOfWeek();
  const months = getMonths();
  const years = getYears();

  const langFormatter = new Intl.DateTimeFormat();
  const formattedDate = selectedDate ? langFormatter.format(selectedDate) : '';
  const placeholder = langFormatter.format(new Date(1970, 0, 1));

  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, [selectedDate]);

  const handleSelectDay = (date) => {
    onChange(date);
    setVisible(false);
  };

  const toggleVisibility = () => setVisible((prevVisible) => !prevVisible);

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
    <div>
      <TextInput
        ref={inputRef}
        onClick={toggleVisibility}
        // Prevent input from changing for now
        onChange={() => {}}
        value={formattedDate}
        placeholder={placeholder}
        startAction={
          <DatePickerButton
            onClick={toggleVisibility}
            aria-label={selectedDate ? selectedDateLabel(langFormatter.format(selectedDate)) : label}
          >
            <CalendarIcon aria-hidden={true} />
          </DatePickerButton>
        }
        aria-autocomplete="none"
        label={label}
        {...props}
      />

      {inputRef.current && inputRef.current.inputWrapperRef && visible && (
        <DatePickerPopover
          source={inputRef.current.inputWrapperRef}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          spacingTop={2}
        >
          {visible && (
            <FocusTrap onEscape={() => setVisible(false)}>
              <Box padding={4}>
                <Box paddingBottom={4}>
                  <Row>
                    <SimpleMenu id="year" label={months[date.getMonth()]}>
                      {months.map((month) => (
                        <MenuItem key={month} onClick={() => handleMonthChange(month)}>
                          {month}
                        </MenuItem>
                      ))}
                    </SimpleMenu>
                    <SimpleMenu id="months" label={date.getFullYear()}>
                      {years.map((year) => (
                        <MenuItem key={year} onClick={() => handleYearChange(year)}>
                          {year}
                        </MenuItem>
                      ))}
                    </SimpleMenu>
                  </Row>
                </Box>
                <RawTable
                  colCount={7}
                  rowCount={weeks.length + 1}
                  initialCol={activeCol}
                  initialRow={activeRow}
                  role="grid"
                >
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
                              onSelectDay={() => handleSelectDay(date)}
                              isSelected={isSelected}
                            >
                              <span aria-hidden={true}>{date.getDate()}</span>
                              <VisuallyHidden>
                                <span>{langFormatter.format(date)}</span>
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
          )}
        </DatePickerPopover>
      )}
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

DatePicker.defaultProps = {
  initialDate: new Date(),
  selectedDate: undefined,
};

DatePicker.propTypes = {
  initialDate: PropTypes.instanceOf(Date),
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  selectedDateLabel: PropTypes.func.isRequired,
};
