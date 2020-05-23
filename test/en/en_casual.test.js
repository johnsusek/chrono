import * as chrono from '../../src/';
import {testSingleCase, testUnexpectedResult} from '../test_util';

test("Test - Single Expression", function() {


    testSingleCase(chrono.casual, 'The Deadline is now', new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe('now');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(8);
        expect(result.start.get('minute')).toBe(9);
        expect(result.start.get('second')).toBe(10);
        expect(result.start.get('millisecond')).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 9, 10, 11));
    });

    testSingleCase(chrono.casual, 'The Deadline is today', new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe('today');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });


    testSingleCase(chrono.casual, 'The Deadline is Tomorrow', new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe('Tomorrow');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 12));
    });

    // Say.."Tomorrow" in the late night (1 AM)
    testSingleCase(chrono.casual, 'The Deadline is Tomorrow', new Date(2012, 7, 10, 1), (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });


    testSingleCase(chrono.casual, 'The Deadline was yesterday', new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe('yesterday');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 12));
    });


    testSingleCase(chrono.casual, 'The Deadline was last night ', new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe('last night');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(9);
        expect(result.start.get('hour')).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 0));
    });


    testSingleCase(chrono.casual, 'The Deadline was this morning ', new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe('this morning');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(6);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6));
    });


    testSingleCase(chrono.casual, 'The Deadline was this afternoon ', new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe('this afternoon');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 15));
    });


    testSingleCase(chrono.casual, 'The Deadline was this evening ', new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe('this evening');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(20);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 20));
    });
});


test("Test - Combined Expression", function() {


    testSingleCase(chrono.casual, 'The Deadline is today 5PM', new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe('today 5PM');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(17);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 17));
    });
});


test("Test - Casual date range", function() {

    testSingleCase(chrono.casual, 'The event is today - next friday', new Date(2012, 7, 4, 12), (result) => {
        expect(result.index).toBe(13);
        expect(result.text).toBe('today - next friday');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(4);
        expect(result.start.get('hour')).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7, 4, 12));


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(10);
        expect(result.end.get('hour')).toBe(12);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 12));
    });



    testSingleCase(chrono.casual, 'The event is today - next friday', new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(13);
        expect(result.text).toBe('today - next friday');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(17);
        expect(result.end.get('hour')).toBe(12);

        expect(result.end).toBeDate(new Date(2012, 7, 17, 12));
    });
});


test("Test - Casual time implication", function() {

    testSingleCase(chrono.casual, 'annual leave from today morning to tomorrow', new Date(2012, 8-1, 4, 12), (result) => {
        expect(result.text).toBe('today morning to tomorrow');

        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(4)
        expect(result.start.get('hour')).toBe(6)
        expect(result.start.isCertain('hour')).toBe(false)

        expect(result.end.get('month')).toBe(8)
        expect(result.end.get('day')).toBe(5)
        expect(result.end.get('hour')).toBe(12)
        expect(result.end.isCertain('hour')).toBe(false)
    });

    testSingleCase(chrono.casual, 'annual leave from today to tomorrow afternoon', new Date(2012, 8-1, 4, 12), (result) => {
        expect(result.text).toBe('today to tomorrow afternoon');

        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(4)
        expect(result.start.get('hour')).toBe(12)
        expect(result.start.isCertain('hour')).toBe(false)

        expect(result.end.get('month')).toBe(8)
        expect(result.end.get('day')).toBe(5)
        expect(result.end.get('hour')).toBe(15)
        expect(result.end.isCertain('hour')).toBe(false)
    });
})


test('Test - Random text', function() {

    testSingleCase(chrono, 'tonight', new Date(2012, 1-1, 1, 12), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')).toBe(1);
        expect(result.start.get('hour')).toBe(22);
        expect(result.start.get('meridiem') ).toBe(1);
    });

    testSingleCase(chrono, 'tonight 8pm', new Date(2012, 1-1, 1, 12), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('hour') ).toBe(20);
        expect(result.start.get('year') ).toBe(2012);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')  ).toBe(1);
        expect(result.start.get('meridiem') ).toBe(1);
    });


    testSingleCase(chrono, 'tonight at 8', new Date(2012, 1-1, 1, 12), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('hour') ).toBe(20);
        expect(result.start.get('year') ).toBe(2012);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')  ).toBe(1);
        expect(result.start.get('meridiem') ).toBe(1);
    });


    testSingleCase(chrono, 'tomorrow before 4pm', new Date(2012, 1-1, 1, 12), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('hour') ).toBe(16);
        expect(result.start.get('year') ).toBe(2012);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')  ).toBe(2);
        expect(result.start.get('meridiem') ).toBe(1);
    });


    testSingleCase(chrono, 'tomorrow after 4pm', new Date(2012, 1-1, 1, 12), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('hour') ).toBe(16);
        expect(result.start.get('year') ).toBe(2012);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')  ).toBe(2);
        expect(result.start.get('meridiem') ).toBe(1);
    });


    testSingleCase(chrono, 'thurs', (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('weekday')).toBe(4);
    });


    testSingleCase(chrono, 'thurs', (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('weekday')).toBe(4);
    });

    testSingleCase(chrono, 'this evening', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('day')).toBe(1);
        expect(result.start.get('hour')).toBe(20);
    });

    testSingleCase(chrono, 'yesterday afternoon', new Date(2016, 10-1, 1), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(30);
        expect(result.start.get('hour')).toBe(15);
    });

    testSingleCase(chrono, 'tomorrow morning', new Date(2016, 10-1, 1, 8), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('day')).toBe(2);
        expect(result.start.get('hour')).toBe(6);
    });

    testSingleCase(chrono, 'this afternoon at 3', new Date(2016, 10-1, 1, 8), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('day')).toBe(1);
        expect(result.start.get('hour')).toBe(15);
    });

    testSingleCase(chrono, '11 at night', new Date(2016, 10-1, 1, 8), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('day')).toBe(1);
        expect(result.start.get('hour')).toBe(23);
    });

    testSingleCase(chrono, '11 tonight', new Date(2016, 10-1, 1, 8), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('day')).toBe(1);
        expect(result.start.get('hour')).toBe(23);
    });
});


test('Test - Random negative text', function() {

    testUnexpectedResult(chrono, 'notoday');

    testUnexpectedResult(chrono, 'tdtmr');

    testUnexpectedResult(chrono, 'xyesterday');

    testUnexpectedResult(chrono, 'nowhere');

    testUnexpectedResult(chrono, 'noway');

    testUnexpectedResult(chrono, 'knowledge');

    testUnexpectedResult(chrono, 'mar');

    testUnexpectedResult(chrono, 'jan');
});
