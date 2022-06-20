import { useState, useEffect } from "react";

import axios from "axios";

export function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}

  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, [])

  const setDay = day => setState({ ...state, day });

  // finds index of days array to update spots remaining
  function dayIndex (day) {
    let index = {
      "Monday": 0,
      "Tuesday": 1,
      "Wednesday": 2,
      "Thursday": 3,
      "Friday": 4
    }

    return index[day]; //returns 0 through 4

  }

  function bookInterview(id, interview, edit = false) {
    const day = dayIndex(state.day); // index of particular day in days array

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [...state.days]; //copy of current state days array
    
    if (!edit) {
    days[day].spots -= 1;
    }

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() =>   
      setState({
      ...state,
      appointments,
      days
    }));

    
  }

  function deleteInterview (id) {
    const day = dayIndex(state.day);

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [...state.days]

    days[day].spots += 1;

    return axios.delete(`/api/appointments/${id}`)
    .then(() =>
      setState({
      ...state,
      appointments,
      days
    }));
  }

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  };



}