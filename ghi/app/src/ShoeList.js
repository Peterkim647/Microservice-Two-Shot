import React, { useEffect, useState } from 'react';

function ShoeList() {
    const [shoe, setShoe] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/shoes/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log("aa", data)
            setShoe(data.shoe);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const deleteShoe = async (shoeId) => {
        const url = `http://localhost:8080/api/shoes/${shoeId}/`;
        const response = await fetch(url, {
            method: "DELETE"
        });
        if (response.ok) {
            fetchData();
        }
    }

    return (
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
                {shoe.map(shoe => {
                    return (
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
                            <button onClick={() => deleteShoe(shoe.id)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default ShoeList;
