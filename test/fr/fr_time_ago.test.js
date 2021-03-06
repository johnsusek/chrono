import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test("Test - Single Expression", function() {

    testSingleCase(chrono.fr, "il y a 5 jours, on a fait quelque chose", new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe('il y a 5 jours');

        expect(result.start).toBeDate(new Date(2012, 8-1, 5, 12));
    });

    testSingleCase(chrono.fr, "il y a 10 jours, on a fait quelque chose", new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe('il y a 10 jours');

        expect(result.start).toBeDate(new Date(2012, 7-1, 31, 12));
    });


    testSingleCase(chrono.fr, "il y a 15 minutes", new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('il y a 15 minutes');
        expect(result.start.get('hour')).toBe(11);
        expect(result.start.get('minute')).toBe(59);

        expect(result.start).toBeDate(new Date(2012,7,10,11,59));
    });


    testSingleCase(chrono.fr, "   il y a    12 heures", new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe('il y a    12 heures');
        expect(result.start.get('hour')).toBe(0);
        expect(result.start.get('minute')).toBe(14);

        expect(result.start).toBeDate(new Date(2012,7,10,0,14));
    });

    testSingleCase(chrono.fr, "   half an hour ago", new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe('half an hour ago');
        expect(result.start.get('hour')).toBe(11);
        expect(result.start.get('minute')).toBe(44);

        expect(result.start).toBeDate(new Date(2012,7,10,11,44));
    });


    testSingleCase(chrono.fr, "il y a 12 heures il s'est passé quelque chose", new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('il y a 12 heures');
        expect(result.start.get('hour')).toBe(0);
        expect(result.start.get('minute')).toBe(14);

        expect(result.start).toBeDate(new Date(2012,7,10,0,14));
    });




    testSingleCase(chrono.fr, "5 Days ago, we did something", new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe('5 Days ago');

        expect(result.start).toBeDate(new Date(2012, 8-1, 5, 12));
    });
});


test("Test - Single Expression (Casual)", function() {

    testSingleCase(chrono.fr, "il y a 5 mois, on a fait quelque chose", new Date(2012, 8-1,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(3);
        expect(result.start.get('day')).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe('il y a 5 mois');

        expect(result.start).toBeDate(new Date(2012, 3-1, 10, 12));
    });

    testSingleCase(chrono.fr, "il y a 5 ans, on a fait quelque chose", new Date(2012, 8-1,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2007);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe('il y a 5 ans');

        expect(result.start).toBeDate(new Date(2007, 8-1, 10, 12));
    });


    testSingleCase(chrono.fr, "il y a une semaine, on a fait quelque chose", new Date(2012, 8-1, 3), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(27);

        expect(result.index).toBe(0);
        expect(result.text).toBe('il y a une semaine');

        expect(result.start).toBeDate(new Date(2012, 7-1, 27, 12));
    });
});

