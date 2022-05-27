export function getAppointmentsForDay(state, day) {
  const appointments = [];

  const filteredDays = state.days.filter(days => days.name === day);
  //console.log(filteredDays);

  if (filteredDays.length === 0) {
    return appointments; //if days array is empty, return empty array
  } else {
        for (const appointment of filteredDays[0].appointments) {
          if (state.appointments[`${appointment}`]) {
            appointments.push(state.appointments[`${appointment}`])
            //loops through filtered days to find appointments that match
          }
        }
}
  return appointments; //returns final array of appointments
}

export function getInterview(state, interview) {
  let interviewObj = {};

  if (interview === null) {
    return null;
  }

  interviewObj["student"] = interview.student;

  const id = interview.interviewer;

  interviewObj["interviewer"] = state.interviewers[`${id}`]

  console.log(interviewObj);
  return interviewObj;

}