//This is the home page displayed at the '/' route
import React, { useEffect, useState } from "react"
import "./App.css";
import GroupTable from "./components/GroupTable";
import AddDialog from "./components/AddDialog";
import { Grid, Typography, Button } from "@mui/material";
import ScoreTable from "./components/ScoreTable";
import { helper, descendComparator } from './utils';
import ErrorModal from "./components/ErrorModal";

export default function App() {
  //{teamName: {name: teamName, date: regDate, wins: 0, loss: 0, draws: 0, goals: 0}}
  const [datasetA, setDatasetA] = useState(new Map());
  const [datasetB, setDatasetB] = useState(new Map());
  //[{team: teamName, date: regDate, ...}]
  //data is in sorted in order of score
  const [scoreTableA, setScoreTableA] = useState([]);
  const [scoreTableB, setScoreTableB] = useState([]);


  //persists data on refresh or leaving site
  useEffect(() => {
    let dataA = new Map(JSON.parse(window.localStorage.getItem('datasetA')));
    let dataB = new Map(JSON.parse(window.localStorage.getItem('datasetB')));
    setDatasetA(dataA);
    setDatasetB(dataB);
    let scoreA = JSON.parse(window.localStorage.getItem('scoreTableA') || "[]");
    let scoreB = JSON.parse(window.localStorage.getItem('scoreTableB') || "[]");
    setScoreTableA(scoreA);
    setScoreTableB(scoreB);
  }, [])


  //saves the teams into 2 sets of data based on groups
  const setTeam = (stringField) => {
    let newDatasetA = datasetA;
    let newDatasetB = datasetB;
    stringField.split("\n").map((value, index) => {
      let teamSet = value.split(" ");
      let teamName = teamSet[0];
      let teamDate = teamSet[1];
      let groupNumber = teamSet[2];
      if (groupNumber === '1') {
        newDatasetA.set(teamName, { name: teamName, date: teamDate, wins: 0, draws: 0, loss: 0, goals: 0, score: 0 });
      } else if (groupNumber === '2') {
        newDatasetB.set(teamName, { name: teamName, date: teamDate, wins: 0, draws: 0, loss: 0, goals: 0, score: 0 });
      }
    })
    window.localStorage.setItem('datasetA', JSON.stringify([...newDatasetA]));
    window.localStorage.setItem('datasetB', JSON.stringify([...newDatasetB]));
    setDatasetA(newDatasetA);
    setDatasetB(newDatasetB);
    window.location.reload(false);
  }

  const setScore = (scoresField) => {
    let scoreDatasetA = datasetA;
    let scoreDatasetB = datasetB;
    scoresField.split("\n").map((value, index) => {
      let teamScore = value.split(" ");
      let team1 = teamScore[0];
      let team2 = teamScore[1];
      let score1 = parseInt(teamScore[2]);
      let score2 = parseInt(teamScore[3]);
      if (scoreDatasetA.has(team1) && scoreDatasetA.has(team2)) {
        scoreDatasetA = helper(scoreDatasetA, team1, team2, score1, score2);
      } else if (scoreDatasetB.has(team1) && scoreDatasetB.has(team2)) {
        scoreDatasetB = helper(scoreDatasetB, team1, team2, score1, score2);
      }
    })
    window.localStorage.setItem('datasetA', JSON.stringify([...scoreDatasetA]));
    window.localStorage.setItem('datasetB', JSON.stringify([...scoreDatasetB]));
    setDatasetA(scoreDatasetA);
    setDatasetB(scoreDatasetB);
    window.location.reload(false);
  }

  const evaluate = () => {
    let scoreA = Array.from(datasetA.values());
    let scoreB = Array.from(datasetB.values())
    scoreA.sort(descendComparator);
    scoreB.sort(descendComparator);
    window.localStorage.setItem('scoreTableA', JSON.stringify(scoreA));
    window.localStorage.setItem('scoreTableB', JSON.stringify(scoreB));
    setScoreTableA(scoreA);
    setScoreTableB(scoreB);
  }

  const clearData = () => {
    window.localStorage.clear();
    setDatasetA(new Map());
    setDatasetB(new Map());
    setScoreTableA([]);
    setScoreTableB([]);
  }

  return (
    <div className="front-page">
      <Typography variant="h3"> Score Board</Typography>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <GroupTable rows={datasetA} />
          <Typography variant="h6"> Rank A </Typography>
          <ScoreTable rows={scoreTableA} />
        </Grid>
        <Grid item sm={6}>
          <GroupTable rows={datasetB} />
          <Typography variant="h6"> Rank B </Typography>
          <ScoreTable rows={scoreTableB} />
        </Grid>
      </Grid>
      <AddDialog action={setTeam} title={"Add Team"} />
      <AddDialog action={setScore} title={"Add Matches"} />
      <Grid justify="flex-end" alignItems="center" container>
        <Grid item>
          <Button variant="outlined" onClick={evaluate} style={{ marginLeft: "10px" }}> Evaluate</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={clearData} style={{ marginLeft: "10px" }}> Clear </Button>
        </Grid>
      </Grid>
    </div>
  )
}
