const { sqlForPartialUpdate } = require('./sql');


describe('sqlForPartialupdate', () => {
    test('works', () => {
        const dataToUpdate = {
            numEmployees: 42,
            logoUrl: 'https://www.blizzard.com/en-us/',
        };

        const jsToSql = {
            numEmployees: 'num_employees',
            logoUrl: 'logo_url',
        };

        const { setCols, values } = sqlForPartialUpdate(dataToUpdate, jsToSql);
        console.log(setCols);
        expect(setCols).toEqual('"numEmployees=$1, logo_url=$2');
        expect(values).toEqual([42, 'https://www.blizzard.com/en-us/']);
    });
})