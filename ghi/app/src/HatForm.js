import React, {useState, useEffect } from 'react';

function CreateHatForm () {
    // defining hooks
    const [locations, setLocations] = useState([]);
    const [style, setStyle] = useState('');
    const [color, setColor] = useState('');
    const [fabric, setFabric] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [location, setLocation] = useState('');

    // handle event changes
    const handleStyleChange = (event) => {
        const value = event.target.value;
        setStyle(value);
    }

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handleFabricChange = (event) => {
        const value = event.target.value;
        setFabric(value);
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }


    // Get the locations list data
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/locations';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);
        }
    }

    // Calls fetchData function to get data
    useEffect(() => {
        fetchData();
    }, []);

    // handle submit form
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.style = style;
        data.color = color;
        data.fabric = fabric;
        data.picture_url = pictureUrl;
        data.location = location;

        const hatUrl = 'http://localhost:8090/api/hats/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(hatUrl, fetchConfig);
        if (response.ok) {
            const newHat = await response.json();
            console.log(newHat);
            setStyle('');
            setColor('');
            setFabric('');
            setPictureUrl('');
            setLocation('');
        };

    }


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new hat</h1>
                    <form onSubmit={handleSubmit} id="create-hat-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleStyleChange} value={style} placeholder="Style" required type="text" id="style" name="style" className="form-control"/>
                            <label htmlFor="style">Style</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" id="color" name="color" className="form-control"/>
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFabricChange} value={fabric} placeholder="Fabric" required type="text" id="fabric" name="fabric" className="form-control"/>
                            <label htmlFor="fabric">Fabric</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePictureUrlChange} value={pictureUrl} placeholder="Picture Url" required type="text" id="picture_url" name="picture_url" className="form-control"/>
                            <label htmlFor="picture_url">Picture Url</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Location</label>
                            <select onChange={handleLocationChange} value={location} required id="location" name="location" className="form-select">
                                <option value="">Choose a Closet</option>
                                    {locations.map(location => {
                                        return (
                                            <option key={location.href} value={location.href}>
                                                {location.closet_name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default CreateHatForm;
