import React from "react";

const Start = () => {
    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState("");
    const [parking, setParking] = React.useState([]);

    const getCoordinate = async (e) => {
        e.preventDefault();
        try{
            let response = await fetch(`/api/parkinginfo/${address}`, {
                method: 'GET',
            });

            const data = await response.json();
            setCoordinates(data.coordinate);

        }catch(err){
            console.log(err.message);
        }
    }

    const getParkingLots = async () => {
        try{
            let response = await fetch(`/api/parkinginfo/${address}`, {
                method: 'GET',
            });

            const data = await response.json();
            setCoordinates(data.coordinate);

        }catch(err){
            console.log(err.message);
        }
    }

    return (
        <>
            <form>
                <input type="text" id="destination" placeholder="Enter Destination Address" onChange={(e) => setAddress(e.target.value)}></input>
                <button type="button" onClick={getParkingLots}>
                    Search
                </button>
            </form>
        </>
    )
}
export default Start