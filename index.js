import express from "express";
import data from "./data/mock.json" assert {type: "json"};

process.env['DEBUG'] = "app:server"

const app = express();

const PORT = 4000;

app.use(express.static("public"));

app.use("/images", express.static("images"));

//app.use(express.json());

app.use(express.urlencoded({ extended: true}))


app.get("/", (request, response) => {
    response.json(data);
})

app.post("/item", (request, response) => {
    console.log(request.body);
    response.send(request.body);
})

app
    .route("/class")
    .get((request, response) => {
        response.send("THIS IS CLASS GET");
    })
    .post((request, response) => {
        response.send("THIS IS CLASS POST");
    })
    .put((request, response) => {
        response.send("THIS IS CLASS PUT");
    })
    .delete((request, response) => {
        response.send("THIS IS CLASS DELETE");
    })

app.get("/download", (request, response) => {
    response.download("images/mountains_2.jpeg")
});

app.get("/redirect", (request, response) => {
    response.redirect("https://www.linkedin.com");
})

app.get("/next", (request, response, next) => {
    console.log("Response will be sent by the next function");
    next();
}, (request, response) => {
    response.send("I just set up a second callback")
})


app.get("/class/:id", (request, response) => {
    const studentId = Number(request.params.id);

    const student = data.filter((student) => student.id === studentId);
    response.send(student);
})

app.post("/create", (request, response) => {
    response.send("This is a POST request on create RECEIVED BROO")
})

app.put("/edit", (request, response) => {
    response.send("This is a PUT request at edit")
})

app.delete("/delete", (request, response) => {
    response.send("This is a Delete request at delete RECEIVED BROO")
})

app.listen(PORT, () => {
    console.log(`This is running at ${PORT}`);
})