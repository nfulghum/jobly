"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const { findAll } = require("./company");
const Job = require("./job.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon");

const testJobIds = [];

beforeAll(async () => {
    testJobIds.push(...BadRequestError(await commonBeforeAll()))
});
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


/** Create */

describe("create job", function () {
    test("create works", async function () {
        let newJob = {
            title: "Test Job",
            salary: 85000,
            equity: "0",
            companyHandle: "Toyota"
        };
        let job = await Job.create(newJob);

        expect(job).toEqual({
            id: expect.any(Number),
            title: "Test Job",
            salary: 85000,
            equity: "0",
            companyHandle: "Toyota"
        })
    })

})

/** findAll */

describe("findAll", function () {
    test("works: no filtering", async function () {
        let jobs = await Job.findAll();
        expect(jobs).toEqual([
            {
                id: expect.any(Number),
                title: "Job 1",
                salary: 95000,
                equity: "0.02",
                companyHandle: "Toyota"
            },
            {
                id: expect.any(Number),
                title: "Job 2",
                salary: null,
                equity: null,
                companyHandle: "Ford"
            },
            {
                id: expect.any(Number),
                title: "Job 3",
                salary: 120000,
                equity: "0.85",
                companyHandle: "Tesla"
            }
        ]);
    });

    test("works with title filter", async function () {
        let jobs = await Job.findAll({ title: "1" });
        expect(jobs).toEqual([
            {
                id: expect.any(Number),
                title: "Job 1",
                salary: 95000,
                equity: "0.02",
                companyHandle: "Toyota"
            }
        ])
    });

    test("works with minSalary filter", async function () {
        let jobs = await Job.findAll({ minSalary: 50000 });
        expect(jobs).toEqual([
            {
                id: expect.any(Number),
                title: "Job 1",
                salary: 95000,
                equity: "0.02",
                companyHandle: "Toyota"
            },
            {
                id: expect.any(Number),
                title: "Job 3",
                salary: 120000,
                equity: "0.85",
                companyHandle: "Tesla"
            }
        ])
    });

    test("works with equity filter: True", async function () {
        let jobs = await Job.findAll({ hasEquity: true });
        expect(jobs).toEqual([
            {
                id: expect.any(Number),
                title: "Job 1",
                salary: 95000,
                equity: "0.02",
                companyHandle: "Toyota"
            },
            {
                id: expect.any(Number),
                title: "Job 3",
                salary: 120000,
                equity: "0.85",
                companyHandle: "Tesla"
            }
        ])
    });

    test("works with min salary and equity", async function () {
        let jobs = Job.findAll({ minSalary: 100000, hasEquity: true });
        expect(jobs).toEqual([
            {
                id: expect.any(Number),
                title: "Job 3",
                salary: 120000,
                equity: "0.85",
                companyHandle: "Tesla"
            }
        ])
    });
});

/** Get job */

describe("get job by id", function () {
    test("works", async function () {
        let job = await Job.get(testJobIds[0]);
        expect(job).toEqual(
            {
                id: testJobIds[0],
                title: "Job 1",
                salary: 95000,
                equity: "0.02",
                companyHandle: "Toyota"
            }
        )
    });

    test("error", async function () {
        try {
            await Job.get(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    })
});

/** update job */

describe("update job", function () {
    let updateData = {
        title: "Test Driver",
        salary: 20000,
        equity: "0.59"
    }

    test("works", async function () {
        let job = await Job.update(testJobIds[0], updateData);
        expect(job).toEqual({
            id: testJobIds[0],
            title: "Test Driver",
            salary: 20000,
            equity: "0.59",
            companyHandle: "Ford"
        })
    })

    test("not found if no job with that id", async function () {
        try {
            await Job.update(0, updateData);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });

    test("bad request with no data", async function () {
        try {
            await Job.update(testJobIds[0], {});
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

/** Delete a job */

describe("remove", function () {
    test("works", async function () {
        await Job.remove(testJobIds[0]);
        const res = await db.query(
            "SELECT title FROM jobs WHERE id=$1", [testJobIds[0]]);
        expect(res.rows.length).toEqual(0);
    });

    test("not found if no such company", async function () {
        try {
            await Job.remove(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});