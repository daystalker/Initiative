import React, { useState } from "react";
import "./newTask.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Task = props => {
  const [state, setState] = useState({
    data: [],
    name: " ",
    id: 0,
    group: " ",
    owner: " ",
    isComplete: false,
    startDate: " ",
    endDate: " ",
    description: " ",
    objective: " "
  });
  const putDataToDB = (
    id,
    name,
    description,
    objective,
    owner,
    startDate,
    endDate
  ) => {
    let currentIds = state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios
      .post("/api/putTask", {
        id: idToBeAdded,
        name: name,
        description: description,
        objective: objective,
        owner: owner,
        startDate: startDate,
        endDate: endDate
      })
      .then(newTask => {
        setState({
          data: [...state.data, newTask.data]
        });
      });
  };

  const handleChange = (property, value) => {
    setState({ ...state, [property]: value });
  };

  const handleSubmit = e => {
    console.log(state);

    putDataToDB(
      state.id,
      state.name,
      state.description,
      state.objective,
      state.owner,
      state.startDate,
      state.endDate
    );
  };

  const handleClose = e => {
    setState({
      name: " ",
      id: 0,
      group: " ",
      owner: " ",
      isComplete: false,
      startDate: " ",
      endDate: " ",
      description: " ",
      objective: " "
    });
  };
  return (
    <form className="form">
      <header className="head">
        <h1>
          Task-Name:
          <input
            type="text"
            value={state.name}
            onChange={e => handleChange("name", e.target.value)}
          />
        </h1>
      </header>
      <div className="whole">
        <div className="start-date">
          Start-Date:
          <input
            type="text"
            value={state.startDate}
            onChange={e => handleChange("startDate", e.target.value)}
          />
        </div>
        <div className="end-date">
          End-Date:
          <input
            type="text"
            value={state.endDate}
            onChange={e => handleChange("endDate", e.target.value)}
          />
        </div>
        <div className="desc">
          Description:
          <input
            type="text"
            value={state.description}
            onChange={e => handleChange("description", e.target.value)}
          />
        </div>
        <div className="owner">
          Owner:
          <input
            type="text"
            value={state.owner}
            onChange={e => handleChange("owner", e.target.value)}
          />
        </div>
        {/* <div className="team">
        Team working:
        <input
          type="text"
          value={state.users}
          onChange={onChanged}
        />
      </div> */}
        <div className="obj">
          Objectives:
          <input
            type="text"
            value={state.objective}
            onChange={e => handleChange("objective", e.target.value)}
          />
        </div>
        <footer>
          <button>
            {" "}
            <Link to="/" onClick={e => handleSubmit(e)}>
              {" "}
              Save{" "}
            </Link>
          </button>
          <button onClick={e => handleClose(e)}> Cancel </button>
        </footer>
      </div>
    </form>
  );
};

export default Task;
