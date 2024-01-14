import React from "react";


const Parkinglot = ({ coordinate }) => {
    const [parkinglot, setParkinglot] = React.useState({});
    const [rating, setRating] = React.useState(0);

    React.useEffect(() => {
        const getParkingLot = async () => {
            try {
                let response = await fetch(`/api/parking/${coordinate}`, {
                    method: 'GET',
                });

                const data = await response.json();
                setParkinglot(data);

            } catch (err) {
                console.log(err.message);
            }
        }
        const getParkingRating = async () => {
            try {
                let response = await fetch(`/api/parkingrating/${coordinate}`, {
                    method: 'GET',
                });

                const data1 = await response.json();
                setRating(data1.rating);

            } catch (err) {
                console.log(err.message);
            }
        }
        getParkingLot();
        getParkingRating();
    }, []);

    return (
        <div>
            <h1>Parkinglot Name: {parkinglot.name}</h1>
            <h1>Overall Rating: {rating}</h1>
        </div>
    )
}
export default Parkinglot