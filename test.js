const teams = [
  { id: 1, name: "Front End" },
  { id: 2, name: "Back End" },
  { id: 3, name: "Design" },
  { id: 4, name: "Testing" },
];

const members = [
  { id: 1, name: "Sankeerth Reddy", teamId: 1 },
  { id: 2, name: "John Doe", teamId: 1 },
  { id: 3, name: "Sansa Stark", teamId: 1 },
  { id: 4, name: "Vince Carter", teamId: 2 },
  { id: 5, name: "Jon Snow", teamId: 2 },
  { id: 6, name: "Kahl Drogo", teamId: 2 },
  { id: 7, name: "Aiden Jackson", teamId: 2 },
  { id: 8, name: "Casper Ackerman", teamId: 3 },
  { id: 9, name: "Devon Buttler", teamId: 3 },
  { id: 10, name: "Joe Root", teamId: 3 },
  { id: 11, name: "Moeen Ali", teamId: 4 },
  { id: 12, name: "Karl Malone", teamId: 4 },
];

function getTeams() {
  return new Promise((resolve, reject) => {
    resolve(teams);
  });
}

function getMembers() {
  return new Promise((resolve, reject) => {
    resolve(members);
  });
}

// function getMembersByTeamId(teamId) {

// }

// const teamMmeberArr = {
//     "front end": ["Sankeerth Reddy", "John Doe"]
// }
let teamsClient;
let membersClient;
getTeams().then((data) => (teamsClient = data));

//const teamMemberArr = {}

// teamsClient
// membersClient

//Get teams names
// getTeams()
//   .then((data) => (teamsClient = data.map((team) => team.name)))
//   .then((data) => {
//     getMembers()
//       .then((data) => (membersClient = data.map((member) => member.name)))
//       .then((data) => console.log(data));
//   });

Promise.all([getTeams(), getMembers()]).then(([teams, members]) => {
  let teamMemberArr = {};
  teams.forEach((team) => {
    teamMemberArr[team.name] = members
      .filter((member) => member.teamId === team.id)
      .map((member) => member.name);
  });

  console.log(teamMemberArr);
});
