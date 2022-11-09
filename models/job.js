const { query } = require("express");
const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs */

class Job {
    /** Create a job (from data), update db, return new job data
     * 
     *  data should be { title, salary, equity, companyHandle }
     * 
     *  should return { id, title, salary, equity, companyHandle }
     * 
     *  Throws BadRequestError if company is already in database
     */

    static async create({ title, salary, equity, companyHandle }) {
        const result = await db.query(`
            INSERT INTO jobs (title, salary, equity, company_handle)
            VALUES ($1, $2, $3, $4)
            RETURNING id, title, salary, equity, company_handle AS "companyHandle`,
            [title, salary, equity, companyHandle]);

        const job = result.rows[0];
        return job;

    };

    /** Find all jobs or specific jobs based on search queries
     * 
     *  Filter by job title, case-inesnsitive, matches any part of the string
     * 
     *  Filter jobs with a minSalary (shows jobs that have atleast that salary)
     * 
     *  Filter jobs with Equit (true/false)
     */

    static async findAll(filters = {}) {
        let query = `SELECT id, title, salary, equity, company_handle AS "companyHandle"
                     FROM jobs`;
        const { title, minSalary, hasEquity } = filters;

        let values = [];
        let wheres = [];

        if (title !== undefined) {
            values.push(`%${title}%`);
            wheres.push(`title ILIKE $${values.length}`);
        }

        if (minSalary !== undefined) {
            values.push(minSalary);
            wheres.push(`salary >= $${values.length}`);
        }

        if (hasEquity === true) {
            wheres.push(`equity > 0`);
        }

        if (wheres.length > 0) {
            query += ` WHERE ${wheres.join(" AND ")}`;
        }

        query += ` ORDER BY title`;

        const jobsRes = await db.query(query, values);

        return jobsRes.rows;
    };

    /** Get job by id
     * 
     *  Should return Object 
     *  {job:
     *      { 
     *      id, title, salary, equity, companyHandle
     *      }
     *   }
     * 
     *  Throws NotFoundError if company not found.
     */

    static async get(id) {
        const result = await db.query(`
            SELECT id,
                   title,
                   salary,
                   equity,
                   company_handle AS "companyHandle,
                   FROM jobs
                   WHERE id = $1`,
            [id]);

        const job = result.rows[0];

        if (!job) throw new NotFoundError(`No matches for job id: ${id}`);

        return job;
    };

    /** Update job by id and data given for update
     *  
     *  Should return
     * 
     *  {job: 
     *      {
     *      id, title, salary, equity, companyHandle
     *      }
     *   }
     * 
     *  Throws NotFoundError if company not found.
     */

    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                title: "title",
                salary: "salary",
                equity: "equity",
                companyHandle: "company_handle"
            }
        );

        const handleVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE jobs
                          SET ${setCols}
                          WHERE id = ${handleVarIdx}
                          RETURNING id,
                                    title,
                                    salary,
                                    equity,
                                    company_handle AS "companyHandle`;
        const result = await db.query(querySql, [...values, id]);
        const job = result.rows[0];

        if (!job) throw new NotFoundError(`No matches for job id: ${id}`);

        return job;
    };

    /** Delete job from db
     * 
     *  Throws NotFoundError if company not found.
     */

    static async remove(id) {
        const result = await db.query(
            `DELETE
                FROM jobs
                WHERE id=$1
                RETURNING id`,
            [id]
        );

        const job = result.rows[0];

        if (!job) throw new NotFoundError(`No matches for job id: ${id}`)
    };
}

module.exports = Job;