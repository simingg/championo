  //updates the group's dataset with single match information
  //dataset: Map, team1, team2: String, score1,score2: Integer
  export const helper = (dataset, team1, team2, score1, score2) => {
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
  //converts date in string to Date object for comparison
  export const convertDate = (d) => {
    const [day, month] = d.split("/");
    // subtract by one as JS date's months are zero-based
    return new Date(2022, month -1 , day)
  }

  //sorts the array descendingly based on score, goals, alternate score and date
  export function descendComparator(a, b) {
    if (b.score < a.score) {
      return -1;
    } else if (b.score > a.score) {
      return 1;
    } else if (a.score === b.score) {
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


