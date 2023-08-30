import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HatList() {
    const [hats, setHats] = useState([]);

    const fetchData = async () => {
        const url = "http://localhost:8090/api/hats/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setHats(data.hats);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteHat = async (id) => {

        const delHatUrl = `http://localhost:8090/api/hats/${id}/`;
        const fetchConfig = {
            method: "delete"
        }

        const response = await fetch(delHatUrl, fetchConfig);

        if (response.ok) {
            fetchData();
        };

    }

    return (
        <div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Style</th>
                    <th>Color</th>
                    <th>Fabric</th>
                    <th>Picture</th>
                    <th>Location</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {hats.map(hat => {
                    return (
                        <tr key={hat.id}>
                            <td>{hat.style}</td>
                            <td>{hat.color}</td>
                            <td>{hat.fabric}</td>
                            <td>
                                <img width={200} src={hat.picture_url} alt=""/>
                            </td>
                            <td>{hat.location}</td>
                            <td><button className="btn btn-danger" onClick={() => deleteHat(hat.id)}>Delete</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <Link to="/hats/new">
            <button className="btn btn-primary">Add a Hat</button>
        </Link>
        </div>
    );
}
