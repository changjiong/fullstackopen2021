const express = require("express");
const cors = require("cors");
const Person = require("./models/person");
const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("build"));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person"
  )
);

morgan.token("person", function (req, res, person) {
  return JSON.stringify(req.body);
});

// app.get("/", (request, response) => {
//   response.send(
//     `<p>Phonebook has info for ${
//       Person.find({}).length
//     } people</p> <p>${new Date()}</p>`
//   );
// });

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end() 
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

// app.delete("/api/persons/:id",(request, response)=> {
//   const id = Number(req.params.id);
//   persons = persons.filter((person) => person.id !== id);
//   res.status(204).end();
// });

// app.post("/api/persons", (request, response) => {
//   const body = req.body;

//   const existingPerson = persons.find((person) => person.name === body.name);
//   if (existingPerson) {
//     return res.status(400).json({
//       error: "name must be unique",
//     });
//   }
//   if (!body.name || !body.number) {
//     return res.status(400).json({
//       error: "name or number missing",
//     });
//   }

//   const person = {
//     name: body.name,
//     number: body.number,
//     id: Math.floor(Math.random() * 100000),
//   };
//   persons = persons.concat(person);
//   res.json(person);
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
