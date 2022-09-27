import React from 'react';
import {useAlert} from 'react-alert';
import Form from "react-jsonschema-form";
import axios from 'axios';
import './App.css';

const languages = [
    "GoLang", "Java", "Python", "Kotlin", "Swift", "Objective C", "C#", "JavaScript", "Ruby", "Shell Script", "TypeScript", "CSS", "C++", "Rust", "Other"
].sort();

const isFirstPrValues = ["Yes","No"].sort();

const schema = {
    title: "Hacktoberfest 2022 : Thoughtworks Hyderabad : Hybrid event",
    type: "object",
    required: ["pr_link", "language","isFirstPR"],
    properties: {
        name: {type:"string", title:"Name(Optional)"},
        pr_link: {type: "string", title: "Pull Request Link"},
        language: {type: "string", title: "Language", "enum": languages},
        isFirstPR: {type: "string", title: " Is this your first PR", "enum": isFirstPrValues, default: "No"}
    }
};

const log = (type) => console.log.bind(console, type);

function App() {
    const alert = useAlert();
    return (
        <div>
        <Form schema={schema}
              onSubmit={async (data) => {
                  console.log(data.formData);
                  try {
                      await axios.post('https://hacktoberfest-monitor-api.herokuapp.com/api/pr', data.formData);
                      alert.show("Thanks for your contribution");
                  } catch (err) {
                      const {message} = err.response.data || {message: ''};
                      if (message) {
                          alert.show(message);
                      } else alert.show("Unable to save your contribution, please contact the volunteer");
                  }
              }}
              onError={log("errors")}/>
              <p>
                <br></br>
                Note: <br></br>
                Thank you so much for your time. A lot of volunteering work went into this.
                We hope you will understand not to raise spam PRs / contributions through this platform as that will cost a lot of time to the maintainers and to you too ! 
              </p>
              </div>
    );
}

export default App;
