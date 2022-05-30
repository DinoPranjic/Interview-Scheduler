import React from 'react';
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Status from './Status';
import Form from './Form';
import Confirm from './Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE= "DELETE";
const CONFIRM ="CONFIRM";
const EDIT = "EDIT";

export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };


    props.bookInterview(props.id, interview).then(transition(SHOW));

  }

  function remove (id) {
    transition(DELETE);


    props.deleteInterview(props.id).then(transition(EMPTY));

  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit= {() => transition(EDIT)}
        onDelete={() => transition(CONFIRM)}
      />
    )}
    {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={save}/>}
    {mode === SAVING && <Status message="Saving..."/>}
    {mode === DELETE && <Status message="Deleting..."/>}
    {mode === CONFIRM && <Confirm message="Delete this interview?" onConfirm={remove} onCancel={() => transition(SHOW)}/>}
    {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={() => back(SHOW)} onSave={save} />}
      
    </article>
  )
}