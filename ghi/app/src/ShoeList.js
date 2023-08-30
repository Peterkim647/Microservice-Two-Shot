import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ShoeList() {
    const [shoe, setShoe] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/shoes/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setShoe(data.shoe);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const deleteShoe = async (id) => {
        const url = `http://localhost:8080/api/shoes/${id}/`;
        const response = await fetch(url, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchData();
        }
    }

    return (
        <div>
            <div className="mb-3">
                <Link to="/shoes/new" className="btn btn-primary">Add Shoe</Link>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Manufacturer</th>
                        <th>Model Name</th>
                        <th>Color</th>
                        <th>Bin</th>
                        <th>Picture URL</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {shoe.map(shoe => (
                        <tr key={shoe.id}>
                            <td>{shoe.manufacturer}</td>
                            <td>{shoe.model_name}</td>
                            <td>{shoe.color}</td>
                            <td>{shoe.bin}</td>
                            <td>
                                {shoe.picture_url && (
                                    <img src={shoe.picture_url} alt="Shoe" style={{ maxWidth: '100px' }} />
                                )}
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteShoe(shoe.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShoeList;
