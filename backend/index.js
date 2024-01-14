import express from 'express';
import { Low } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

const defaultData = {
    "100000 10000000": {
        "name": "default",
        "reviews": [{ "id": 0, "overallRating": 1, "safetyRating": 1, "costRating": 1, "accessRating": 1, "comment": "", "timeLength": 0 }],
        "availability": "",
        "hours": [],
        "cost": 0,
    },
    "addresses": [{ "address": "default", "coordinate": "0 0" }]
};
const app = express();
const database = new Low(new JSONFileSync('db.json'), defaultData);
const port = 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
app.get("/api", (req, res) => {
    res.json({ message: "Hello from the server!" });
});

app.get("/api/coordinate/:address", async (req, res) => {
    await database.read();
    const info = database.data
    let coordinate;
    info.addresses.forEach(addressName => {
        if (addressName.address == req.params.address) {
            coordinate = addressName.coordinate;
            res.send({ "coordinate": coordinate });
        }

    });
});

app.get("/api/parking/:coordinate", async (req, res) => {
    await database.read();
    const info = database.data
    if (info[req.params.coordinate]) {
        res.send(info[req.params.coordinate]);
    }
    res.status(409).send("Coordinate not found");
});

//calculate and get parking rating based on coordinates
app.get("/api/parkingrating/:coordinate", async (req, res) => {
    console.log(req.params.coordinate);
    await database.read();
    const info = database.data
    let sum = 0;
    let count = 0;
    info[req.params.coordinate]["reviews"].forEach(review => {
        sum += review.overallRating;
        count++;
    });
    res.send({ "rating": sum / count });
});

//get nearby parking lots
app.get("/api/parkinglots/:coordinate", async (req, res) => {
    await database.read();
    const info = database.data
    let separate = req.params.coordinate.split(" ");
    const currentX = separate[0];
    const currentY = separate[1];
    let destinationX;
    let destinationY;
    let calcRadius;
    const radius = 5;
    let parkinglots = [];
    Object.keys(info).forEach(parkinglot => {
        if (parkinglot != "addresses") {
            separate = parkinglot.split(" ");
            destinationX = separate[0];
            destinationY = separate[1];
            calcRadius = Math.sqrt((destinationX - currentX) ** 2 + (destinationY - currentY) ** 2);
            if (calcRadius <= radius && parkinglot != "addresses") {
                parkinglots.push(parkinglot);
            }
        }
    });
    res.send({ "parking": parkinglots });
});

app.post("/api/review/:name/:overallrating", async (req, res) => {
    await database.read();
    const info = database.data
    let coordinate;
    info.addresses.forEach(addressName => {
        if (addressName.address == req.params.name) {
            coordinate = addressName.coordinate;
        }
    });

    if (!coordinate) {
        res.status(409).send("address not found");
    }
    else {
        info[coordinate].reviews.push({ "id": info[coordinate].reviews.length, "overallRating": req.params.overallrating });
        database.write();
        database.read();
        res.send(database.data[coordinate]);
    }
});


