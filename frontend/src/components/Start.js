import React from "react";
import Parkinglot from './Parkinglot';

const Start = () => {
    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState("");
    const [parking, setParking] = React.useState([]);
    const [search, setSearch] = React.useState(false);

    const getCoordinates = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(`/api/coordinate/${address}`, {
                method: 'GET',
            });

            const data = await response.json();
            
            setCoordinates(data.coordinate);
            try {
                let response = await fetch(`/api/parkinglots/${coordinates}`, {
                    method: 'GET',
                });

                const data1 = await response.json();
                setParking(data1.parking);
                alert(parking);

            } catch (err) {
                console.log(err.message);
            }
            //getParkingLots();

        } catch (err) {
            console.log(err.message);
        }
    }

    // React.useEffect(() => {
    //     const getParkingLot = async () => {
    //         try {
    //             let response = await fetch(`/api/parkinglots/${coordinates}`, {
    //                 method: 'GET',
    //             });

    //             const data1 = await response.json();
    //             setParking(data1.parking);

    //         } catch (err) {
    //             console.log(err.message);
    //         }
    //     }
    //     if(search){
    //         getParkingLot();
    //     }
    // }, []);
    // const getParkingLots = async () => {
    //     try{
    //         let response = await fetch(`/api/parkinglots/${coordinates}`, {
    //             method: 'GET',
    //         });

    //         const data = await response.json();
    //         setParking(data.parking);

    //     }catch(err){
    //         console.log(err.message);
    //     }
    // }

    return (
        <>
            <form>
                <input type="text" id="destination" placeholder="Enter Destination Address" onChange={(e) => setAddress(e.target.value)}></input>
                <button type="button" onClick={(e) => {
                    setSearch(true);
                    getCoordinates(e);
                }}>
                    Search
                </button>
            </form>
            <div>
                {(search) ? (
                    parking.map(lot => {
                        return <Parkinglot coordinate={lot}></Parkinglot>
                    }
                    )) : (<h1>No Parking Lots</h1>)}
            </div>
        </>
    )
}
export default Start