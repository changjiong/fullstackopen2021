import react from "react";
import axios from "axios";

const App = () => {
  axios.get("http://debian:3001/notes").then((response) => {
    const notes = response.data;
    console.log(notes);
  });

  return <div>Hello World</div>;
};

export default App;
