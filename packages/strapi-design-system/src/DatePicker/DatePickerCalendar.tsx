import { useEffect, useState } from 'react';

import { DatePickerPopover } from './components';
import { DatePickerTd } from './DatePickerTd';
import { DatePickerTh } from './DatePickerTh';
import { getMonths, getDayOfWeek, generateWeeks, getYears, formatDate } from './utils';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { FocusTrap, FocusTrapProps } from '../FocusTrap';
import { getDefaultLocale } from '../helpers/getDefaultLocale';
import { RawTable, RawThead, RawTbody, RawTr } from '../RawTable';
/**
 * TODO: this is a V1 component that uses `react-router-dom` internally, is there a way to make this work without it?
 */
import { SimpleMenu, MenuItem } from '../SimpleMenu';
import { VisuallyHidden } from '../VisuallyHidden';

export interface DatePickerCalendarProps extends Required<Pick<FocusTrapProps, 'onEscape'>> {
  /**
   * @default Now
   */
  initialDate?: Date;
  /*
   * Minimum year, that can be selected through the year select
   */
  minDate?: Date;
  /*
   * Maximum year, that can be selected through the year select
   */
  maxDate?: Date;
  locale?: string;
  /**
   * onChange function, passed from a parent component, it takes the actual date value and it is used inside the different handlers related to the change event for the DatePicker and the TimePicker and also the clear event for the TimePicker
   */
  onChange?: (date: Date) => void;
  popoverSource: React.MutableRefObject<HTMLElement>;
  selectedDate?: Date;
}

export type DatePickerCalendarContentProps = Omit<DatePickerCalendarProps, 'popoverSource' | 'onEscape'>;

export const DatePickerCalendar = ({ onEscape, popoverSource, ...restProps }: DatePickerCalendarProps) => (
  <DatePickerPopover source={popoverSource} role="dialog" aria-modal="true" spacing={4}>
    <FocusTrap onEscape={onEscape}>
      <DatePickerCalendarContent {...restProps} />
    </FocusTrap>
  </DatePickerPopover>
);

export const DatePickerCalendarContent = ({
  selectedDate,
  initialDate = new Date(),
  locale: defaultLocale,
  onChange,
  minDate,
  maxDate,
}: DatePickerCalendarContentProps) => {
  const [date, setDate] = useState(initialDate);
  const [weeks, activeRow, activeCol] = generateWeeks(date, selectedDate);
  const { sun, mon, tue, wed, thu, fri, sat } = getDayOfWeek();
  const months = getMonths();
  const years = getYears(minDate, maxDate);
  const locale = defaultLocale || getDefaultLocale();

  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, [selectedDate]);

  const handleMonthChange = (month: string) => {
    const updatedDate = new Date(date);
    updatedDate.setMonth(months.indexOf(month));
    setDate(updatedDate);
  };

  const handleYearChange = (year: number) => {
    const updatedDate = new Date(date);
    updatedDate.setFullYear(year);
    setDate(updatedDate);
  };

  const handleSelectDay = (date: Date) => () => {
    if (onChange) {
      onChange(date);
    }
  };

  return (
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
                    onSelectDay={handleSelectDay(date)}
                    isSelected={isSelected}
                  >
                    <span aria-hidden>{date.getDate()}</span>
                    <VisuallyHidden>
                      <span>{formatDate(date, locale)}</span>
                    </VisuallyHidden>
                  </DatePickerTd>
                );
              })}
            </RawTr>
          ))}
        </RawTbody>
      </RawTable>
    </Box>
  );
};
