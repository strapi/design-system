import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CalendarIcon from '@strapi/icons/Calendar';
import styled from 'styled-components';
import { Popover } from '../Popover';
import { RawTable, RawThead, RawTbody, RawTr } from '../RawTable';
import { DatePickerTh } from './DatePickerTh';
import { DatePickerTd } from './DatePickerTd';
import { generateWeeks } from './generateWeeks';
import { FocusTrap } from '../FocusTrap';
import { TextInput } from '../TextInput';
import { VisuallyHidden } from '../VisuallyHidden';
import { getDayOfWeek } from './getDayOfWeek';

const DatePickerButton = styled.button`
  border: none;
  background: transparent;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const DatePicker = ({ initialDate, selectedDate, onChange, label, selectedDateLabel, ...props }) => {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);

  const [weeks, activeRow, activeCol] = generateWeeks(initialDate, selectedDate);
  const { sun, mon, tue, wed, thu, fri, sat } = getDayOfWeek();

  const langFormatter = new Intl.DateTimeFormat();
  const formattedDate = selectedDate ? langFormatter.format(selectedDate) : '';
  const placeholder = langFormatter.format(new Date(1970, 0, 1));

  const handleSelectDay = (date) => {
    onChange(date);
    setVisible(false);
  };

  const toggleVisibility = () => setVisible((prevVisible) => !prevVisible);

  return (
    <div>
      <TextInput
        ref={inputRef}
        onClick={toggleVisibility}
        // Prevent input from changing for now
        onChange={() => {}}
        value={formattedDate}
        placeholder={placeholder}
        leftAction={
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
        <Popover
          source={inputRef.current.inputWrapperRef}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          spacingTop={2}
        >
          {visible && (
            <FocusTrap onEscape={() => setVisible(false)}>
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
            </FocusTrap>
          )}
        </Popover>
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
