import React, { useContext, useState, useEffect } from 'react';

const JobCard = ({ id, title, salary, equity, companyName }) => {

    return (
        <div className="JobCard card">
            <div className="card-body">
                <h6 className="card-title">{title}</h6>
                <p>{companyName}</p>
                {salary && <div><small>Salary: {renderSalary(salary)}</small></div>}
                {equity !== undefined && <div><small>Equity: {equity}</small></div>}
            </div>
        </div>
    )
}

function renderSalary(salary) {
    const digitsRev = [];
    const salaryStr = salary.toString();

    for (let i = salaryStr.length - 1; i >= 0; i--) {
        digitsRev.push(salaryStr[i]);
        if (i > 0 && i % 3 === 0) digitsRev.push(",");
    }

    return digitsRev.reverse().join("");
}

export default JobCard;