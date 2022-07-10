//This is the home page displayed at the '/' route
import React, { useEffect, useState } from "react"
import "./App.css";
import GroupTable from "./components/Table";
import AddTableDialog from "./components/AddTableDialog";
import { Grid, Typography , Button} from "@mui/material";
import AddScoreDialog from "./components/AddScoreDialog";

export default function App() {
  const [datasetA, setDatasetA] = useState(new Map());
  const [datasetB, setDatasetB] = useState(new Map());
  //used to classify the scores for groups A/B
  const [teamNameA, setTeamNameA] = useState([]);
  const [teamNameB, setTeamNameB] = useState([]);

  useEffect(() => {
    let testA = datasetA;
    let testB = datasetB;
    setDatasetA(testA);
    setDatasetB(testB);
  },[datasetA, datasetB])

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
      if (groupNumber === '1') {
        newTeamNameA = [...newTeamNameA, teamName];
        //data will be accessed by the team name in O(1) time
        newDatasetA.set(teamName, { date: teamDate, wins: 0, draws: 0, loss: 0, goals: 0 });
      } else if (groupNumber === '2') {
        newTeamNameB = [...newTeamNameB, teamName];
        newDatasetB.set(teamName, { date: teamDate, wins: 0, draws: 0, loss: 0, goals: 0 });
      }
    })
    setDatasetA(newDatasetA);
    setDatasetB(newDatasetB);
    setTeamNameA(newTeamNameA);
    setTeamNameB(newTeamNameB);
  }

  const setScore = (scoresField) => {
    let scoreDatasetA = datasetA;
    let scoreDatasetB = datasetB;
    scoresField.split("\n").map((value, index) => {
      //teamA teamB 0 1
      let teamScore = value.split(" ");
      let team1 = teamScore[0];
      let team2 = teamScore[1];
      let score1 = parseInt(teamScore[2]);
      let score2 = parseInt(teamScore[3]);
      if (teamNameA.includes(team1)) {
        scoreDatasetA  = helper(scoreDatasetA, team1, team2, score1, score2);
      } else if (teamNameB.includes(team1)) {
        scoreDatasetB = helper(scoreDatasetB, team1, team2, score1, score2);
      } //throw error if name does not exist
    })
    setDatasetA(scoreDatasetA);
    setDatasetB(scoreDatasetB);
  }

  //takes in the dataset of the group and adds scores respectively to the same map object
  const helper = (dataset, team1, team2, score1, score2) => {
    const team1Data = dataset.get(team1);
    const team2Data = dataset.get(team2);
    team1Data.goals += score1;
    team2Data.goals += score2;
    if (score2 > score1) {
      team1Data.loss += 1;
      team2Data.wins += 1;
    } else if (score1 > score2) {
      team2Data.loss += 1;
      team1Data.wins += 1;
    } else {
      team1Data.draws += 1;
      team2Data.draws += 1;
    }
    return dataset;
  }

  const evaluateScoreA = () => {

  }

  const evaluateScoreB = () => {

  }

  return (
    <div className="front-page">
      <Typography variant="h3"> Score Board</Typography>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <GroupTable rows={datasetA} />
          <Button variant="outlined" onClick={evaluateScoreA}> Evaluate A </Button>
        </Grid>
        <Grid item sm={6}>
          <GroupTable rows={datasetB} />
          <Button variant="outlined" onClick={evaluateScoreB}> Evaluate B </Button>
        </Grid>
      </Grid>
      <AddTableDialog action={setTeam} />
      <AddScoreDialog action={setScore} />
    </div>
  )
}

