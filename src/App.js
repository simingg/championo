//This is the home page displayed at the '/' route
import React, { useEffect, useState } from "react"
import "./App.css";
import GroupTable from "./components/GroupTable";
import AddDialog from "./components/AddDialog";
import { Grid, Typography, Button } from "@mui/material";
import ScoreTable from "./components/ScoreTable";
import Box from '@material-ui/core/Box';

export default function App() {
  const [datasetA, setDatasetA] = useState(new Map());
  const [datasetB, setDatasetB] = useState(new Map());
  //used to classify the scores for groups A/B
  const [teamNameA, setTeamNameA] = useState([]);
  const [teamNameB, setTeamNameB] = useState([]);

  //[1: teamA, 2: teamB, 3: teamC, 4: teamD, ...]
  const [scoreTableA, setScoreTableA] = useState([]);
  const [scoreTableB, setScoreTableB] = useState([]);

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
        newDatasetA.set(teamName, { name: teamName, date: teamDate, wins: 0, draws: 0, loss: 0, goals: 0, score: 0 });
      } else if (groupNumber === '2') {
        newTeamNameB = [...newTeamNameB, teamName];
        newDatasetB.set(teamName, { name: teamName, date: teamDate, wins: 0, draws: 0, loss: 0, goals: 0, score: 0 });
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
        scoreDatasetA = helper(scoreDatasetA, team1, team2, score1, score2);
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
      team2Data.score += 3;
    } else if (score1 > score2) {
      team2Data.loss += 1;
      team1Data.wins += 1;
      team1Data.score += 3;
    } else {
      team1Data.draws += 1;
      team2Data.draws += 1;
      team1Data.score += 1;
      team2Data.score += 1;
    }
    return dataset;
  }

  const convertDate = (d) => {
    const [day, month] = d.split("/");
    // subtract by one as JS date's months are zero-based
    return new Date(2022, month -1 , day)
  }

  function descendComparator(a, b) {
    if (b.score < a.score) {
      return -1;
    } else if (b.score > a.score) {
      return 1;
    } else if (a.score == b.score) {
      if (a.goals > b.goals) {
        return -1;
      } else if (a.goals < b.goals) {
        return 1;
      } else {
        let scoreA = (a.wins * 5) + (a.loss) + (a.draws * 3);
        let scoreB = (b.wins * 5) + (b.loss) + (b.draws * 3);
        if (scoreA > scoreB) {
          return -1;
        } else if (scoreA < scoreB) {
          return 1;
        } else {
          if (convertDate(a.date) > convertDate(b.date)) {
            return 1;
          } else {
            return -1;
          }
        }
      }
    }
  }

  const evaluate = () => {
    let scoreA = Array.from(datasetA.values());
    let scoreB = Array.from(datasetB.values())
    scoreA.sort(descendComparator);
    scoreB.sort(descendComparator);
    setScoreTableA(scoreA);
    setScoreTableB(scoreB);
  }

  return (
    <div className="front-page">
      <Typography variant="h3"> Score Board</Typography>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <GroupTable rows={datasetA} />
            <Typography variant="h6"> Evaluation </Typography>
            <ScoreTable rows={scoreTableA} />
        </Grid>
        <Grid item sm={6}>
          <GroupTable rows={datasetB} />
            <Typography variant="h6"> Evaluation </Typography>
            <ScoreTable rows={scoreTableB} />
        </Grid>
      </Grid>
      <Box m={2} pt={3}>
      <AddDialog action={setTeam} title={"Add Team"} />
      </Box>
      <AddDialog action={setScore} title={"Add Matches"} />
      <Box m={2} pt={3}>
      <Button variant="outlined" onClick={evaluate}> Evaluate</Button>
      </Box>
    </div>
  )
}

