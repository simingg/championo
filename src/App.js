//This is the home page displayed at the '/' route
import React, { useState } from "react"
import "./App.css";
import GroupTable from "./components/Table";
import AddTableDialog from "./components/AddTableDialog";
import Button from "@mui/material/Button"
import { Grid, Typography } from "@mui/material";
import AddScoreDialog from "./components/AddScoreDialog";
export default function App() {
  const [datasetA, setDatasetA] = useState([]);
  const [datasetB, setDatasetB] = useState([]);
  //used to classify the scores for groups A/B
  const [teamNameA, setTeamNameA] = useState([]);
  const [teamNameB, setTeamNameB] = useState([]);

  //saves the teams into 2 sets of data based on groups
  const setTeam = (stringField) => {
    let newDatasetA = datasetA;
    let newTeamNameA = teamNameA;
    let newTeamNameB = teamNameB;
    let newDatasetB = datasetB;
    stringField.split("\n").map((value, index) => {
      let teamSet = value.split(" ");
      let teamName = teamSet[0];
      let teamDate = teamSet[1];
      let groupNumber = teamSet[2];
      if (groupNumber == '1') {
        newTeamNameA = [...newTeamNameA, teamName];
        newDatasetA = [...newDatasetA, { name: teamName, date: teamDate, wins: 0, draws: 0, loss: 0, goals: 0 }]
      } else if (groupNumber == '2') {
        newTeamNameB = [...newTeamNameB, teamName];
        newDatasetB = [...newDatasetB, { name: teamName, date: teamDate, wins: 0, draws: 0, loss: 0, goals: 0 }]
      }
    })
    setDatasetA(newDatasetA);
    setDatasetB(newDatasetB);
    setTeamNameA(newTeamNameA);
    setTeamNameB(newTeamNameB);
  }

  const setScore = (scoresField) => {
    let dataset;
    scoresField.split("/n").map((value, index) => {
      //teamA teamB 0 1
      let teamScore = value.split(" ");
      let team1 = teamScore[0];
      let team2 = teamScore[1];
      let score1 = parseInt(teamScore[2]);
      let score2 = parseInt(teamScore[3]);
      if (teamNameA.includes(team1)) {
        let dataset = datasetA;
        //team B wins
        if (score2 > score1) {
        }
      }
    })
    //
  }

  return (
    <div className="front-page">
      <Typography variant="h3"> Score Board</Typography>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <GroupTable rows={datasetA} />
        </Grid>
        <Grid item sm={6}>
          <GroupTable rows={datasetB} />
        </Grid>
      </Grid>

      <AddTableDialog action={setTeam} />
      <AddScoreDialog action={setScore} />
    </div>
  )
}

