import React from 'react';
import { Link } from 'react-router-dom';

const CompanyCard = ({ name, description, logoUrl, handle, numEmployees }) => {
    return (
        <Link className="CompanyCard" to={`/companies/${handle}`}>
            <div className="card-body">
                <h4 className="card-title">
                    {name}
                    {logoUrl && <img src={logoUrl}
                        alt={name} />}
                </h4>
                <p>{description}</p>
                <p>{numEmployees}</p>
            </div>
        </Link>
    )
}

export default CompanyCard;