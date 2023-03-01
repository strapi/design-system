import { generateWeeks } from '../generateWeeks';

describe('generate weeks', () => {
  it('verifies the matrix for january 2021', () => {
    const jan = 0;

    const [weeks] = generateWeeks(new Date(2021, jan, 26));

    expect(weeks).toMatchInlineSnapshot(`
      [
        [
          {
            "date": 2020-12-27T00:00:00.000Z,
            "outsideMonth": true,
          },
          {
            "date": 2020-12-28T00:00:00.000Z,
            "outsideMonth": true,
          },
          {
            "date": 2020-12-29T00:00:00.000Z,
            "outsideMonth": true,
          },
          {
            "date": 2020-12-30T00:00:00.000Z,
            "outsideMonth": true,
          },
          {
            "date": 2020-12-31T00:00:00.000Z,
            "outsideMonth": true,
          },
          {
            "date": 2021-01-01T00:00:00.000Z,
          },
          {
            "date": 2021-01-02T00:00:00.000Z,
          },
        ],
        [
          {
            "date": 2021-01-03T00:00:00.000Z,
          },
          {
            "date": 2021-01-04T00:00:00.000Z,
          },
          {
            "date": 2021-01-05T00:00:00.000Z,
          },
          {
            "date": 2021-01-06T00:00:00.000Z,
          },
          {
            "date": 2021-01-07T00:00:00.000Z,
          },
          {
            "date": 2021-01-08T00:00:00.000Z,
          },
          {
            "date": 2021-01-09T00:00:00.000Z,
          },
        ],
        [
          {
            "date": 2021-01-10T00:00:00.000Z,
          },
          {
            "date": 2021-01-11T00:00:00.000Z,
          },
          {
            "date": 2021-01-12T00:00:00.000Z,
          },
          {
            "date": 2021-01-13T00:00:00.000Z,
          },
          {
            "date": 2021-01-14T00:00:00.000Z,
          },
          {
            "date": 2021-01-15T00:00:00.000Z,
          },
          {
            "date": 2021-01-16T00:00:00.000Z,
          },
        ],
        [
          {
            "date": 2021-01-17T00:00:00.000Z,
          },
          {
            "date": 2021-01-18T00:00:00.000Z,
          },
          {
            "date": 2021-01-19T00:00:00.000Z,
          },
          {
            "date": 2021-01-20T00:00:00.000Z,
          },
          {
            "date": 2021-01-21T00:00:00.000Z,
          },
          {
            "date": 2021-01-22T00:00:00.000Z,
          },
          {
            "date": 2021-01-23T00:00:00.000Z,
          },
        ],
        [
          {
            "date": 2021-01-24T00:00:00.000Z,
          },
          {
            "date": 2021-01-25T00:00:00.000Z,
          },
          {
            "date": 2021-01-26T00:00:00.000Z,
          },
          {
            "date": 2021-01-27T00:00:00.000Z,
          },
          {
            "date": 2021-01-28T00:00:00.000Z,
          },
          {
            "date": 2021-01-29T00:00:00.000Z,
          },
          {
            "date": 2021-01-30T00:00:00.000Z,
          },
        ],
        [
          {
            "date": 2021-01-31T00:00:00.000Z,
          },
          {
            "date": 2021-02-01T00:00:00.000Z,
            "outsideMonth": true,
          },
          {
            "date": 2021-02-02T00:00:00.000Z,
            "outsideMonth": true,
          },
          {
            "date": 2021-02-03T00:00:00.000Z,
            "outsideMonth": true,
          },
          {
            "date": 2021-02-04T00:00:00.000Z,
            "outsideMonth": true,
          },
          {
            "date": 2021-02-05T00:00:00.000Z,
            "outsideMonth": true,
          },
          {
            "date": 2021-02-06T00:00:00.000Z,
            "outsideMonth": true,
          },
        ],
      ]
    `);
  });

  it('verifies the matrix for february 2021', () => {
    const [weeks] = generateWeeks(new Date(2021, 1, 26));

    expect(weeks[0]).toMatchInlineSnapshot(`
      [
        {
          "date": 2021-01-31T00:00:00.000Z,
          "outsideMonth": true,
        },
        {
          "date": 2021-02-01T00:00:00.000Z,
        },
        {
          "date": 2021-02-02T00:00:00.000Z,
        },
        {
          "date": 2021-02-03T00:00:00.000Z,
        },
        {
          "date": 2021-02-04T00:00:00.000Z,
        },
        {
          "date": 2021-02-05T00:00:00.000Z,
        },
        {
          "date": 2021-02-06T00:00:00.000Z,
        },
      ]
    `);
  });
});
