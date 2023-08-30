import React, { useState, useEffect } from 'react';

function ShoeForm() {
    const [bins, setBins] = useState([]);
    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [bin, setBin] = useState('');

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handleModelChange = (event) => {
        const value = event.target.value;
        setModel(value);
    }

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const handleBinChange = (event) => {
        const value = event.target.value;
        setBin(value);
    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/bins/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setBins(data.bins);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.manufacturer = manufacturer;
        data.model_name=  model;
        data.color = color;
        data.picture_url = pictureUrl;
        data.bin = bin;


        const shoeUrl = 'http://localhost:8080/api/shoes/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json();
            console.log(newShoe);
            setManufacturer('');
            setModel('');
            setColor('');
            setPictureUrl('');
            setBin('');
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new shoe</h1>
                    <form onSubmit={handleSubmit} id="create-shoe-form">
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleManufacturerChange}
                                value={manufacturer}
                                placeholder="Manufacturer"
                                required
                                type="text"
                                id="manufacturer"
                                name="manufacturer"
                                className="form-control"
                            />
                            <label htmlFor="manufacturer">Manufacturer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleModelChange}
                                value={model}
                                placeholder="Model Name"
                                required
                                type="text"
                                id="model"
                                name="model"
                                className="form-control"
                            />
                            <label htmlFor="model">Model Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleColorChange}
                                value={color}
                                placeholder="Color"
                                required
                                type="text"
                                id="color"
                                name="color"
                                className="form-control"
                            />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handlePictureUrlChange}
                                value={pictureUrl}
                                placeholder="Picture Url"
                                required
                                type="text"
                                id="picture_url"
                                name="picture_url"
                                className="form-control"
                            />
                            <label htmlFor="picture_url">Picture Url</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bin" className="form-label">
                                Bin
                            </label>
                            <select
                                onChange={handleBinChange}
                                value={bin}
                                required
                                id="bin"
                                name="bin"
                                className="form-select"
                            >
                                <option value="">Choose a Bin</option>
                                {bins.map(bin => (
                                    <option key={bin.href} value={bin.href}>
                                        {bin.closet_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ShoeForm;
