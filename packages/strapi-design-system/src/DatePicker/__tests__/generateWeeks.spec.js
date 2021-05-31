import { generateWeeks } from '../generateWeeks';

const makeDate = (day, month, year = 2021, outsideMonth = undefined) => {
  if (outsideMonth) {
    return { date: new Date(year, month, day), outsideMonth };
  }

  return { date: new Date(year, month, day) };
};

describe('generate weeks', () => {
  it('verifies the matrix for january 2021', () => {
    const jan = 0;
    const dec = 11;
    const feb = 1;

    const weeksMatrix = [
      [
        makeDate(27, dec, 2020, true),
        makeDate(28, dec, 2020, true),
        makeDate(29, dec, 2020, true),
        makeDate(30, dec, 2020, true),
        makeDate(31, dec, 2020, true),
        makeDate(1, jan),
        makeDate(2, jan),
      ],
      [
        makeDate(3, jan),
        makeDate(4, jan),
        makeDate(5, jan),
        makeDate(6, jan),
        makeDate(7, jan),
        makeDate(8, jan),
        makeDate(9, jan),
      ],
      [
        makeDate(10, jan),
        makeDate(11, jan),
        makeDate(12, jan),
        makeDate(13, jan),
        makeDate(14, jan),
        makeDate(15, jan),
        makeDate(16, jan),
      ],
      [
        makeDate(17, jan),
        makeDate(18, jan),
        makeDate(19, jan),
        makeDate(20, jan),
        makeDate(21, jan),
        makeDate(22, jan),
        makeDate(23, jan),
      ],
      [
        makeDate(24, jan),
        makeDate(25, jan),
        makeDate(26, jan),
        makeDate(27, jan),
        makeDate(28, jan),
        makeDate(29, jan),
        makeDate(30, jan),
      ],
      [
        makeDate(31, jan),
        makeDate(1, feb, 2021, true),
        makeDate(2, feb, 2021, true),
        makeDate(3, feb, 2021, true),
        makeDate(4, feb, 2021, true),
        makeDate(5, feb, 2021, true),
        makeDate(6, feb, 2021, true),
      ],
    ];

    const [weeks] = generateWeeks(new Date(2021, jan, 26));

    expect(weeks).toEqual(weeksMatrix);
  });

  it('verifies the matrix for february 2021', () => {
    const feb = 1;
    const jan = 0;
    const mar = 2;

    const weeksMatrix = [
      [
        makeDate(31, jan, 2021, true),
        makeDate(1, feb),
        makeDate(2, feb),
        makeDate(3, feb),
        makeDate(4, feb),
        makeDate(5, feb),
        makeDate(6, feb),
      ],
      [
        makeDate(7, feb),
        makeDate(8, feb),
        makeDate(9, feb),
        makeDate(10, feb),
        makeDate(11, feb),
        makeDate(12, feb),
        makeDate(13, feb),
      ],
      [
        makeDate(14, feb),
        makeDate(15, feb),
        makeDate(16, feb),
        makeDate(17, feb),
        makeDate(18, feb),
        makeDate(19, feb),
        makeDate(20, feb),
      ],
      [
        makeDate(21, feb),
        makeDate(22, feb),
        makeDate(23, feb),
        makeDate(24, feb),
        makeDate(25, feb),
        makeDate(26, feb),
        makeDate(27, feb),
      ],
      [
        makeDate(28, feb),
        makeDate(1, mar, 2021, true),
        makeDate(2, mar, 2021, true),
        makeDate(3, mar, 2021, true),
        makeDate(4, mar, 2021, true),
        makeDate(5, mar, 2021, true),
        makeDate(6, mar, 2021, true),
      ],
    ];

    const [weeks] = generateWeeks(new Date(2021, 1, 26));

    expect(weeks[0]).toEqual(weeksMatrix[0]);
  });
});
