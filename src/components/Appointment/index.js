import React from 'react';
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Status from './Status';
import Form from './Form';
import Confirm from './Confirm';
import Error from './Error';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE= "DELETE";
const CONFIRM ="CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    let edit = false;

    if (mode === EDIT) {
      edit = true; // if editing appointment, spots remaining will stay the same
    }

    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };


    props.bookInterview(props.id, interview, edit).then(() => transition(SHOW))
    .catch(err => transition(ERROR_SAVE, true));

  }

  function remove (id) {
    transition(DELETE, true);


    props.deleteInterview(props.id).then(() => transition(EMPTY))
    .catch(err => transition(ERROR_DELETE, true));

  }

  return (
    <article className="appointment" data-testid="appointment">
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
    {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}/>}
    {mode === SAVING && <Status message="Saving..."/>}
    {mode === DELETE && <Status message="Deleting..."/>}
    {mode === CONFIRM && <Confirm message="Delete this interview?" onConfirm={remove} onCancel={() => transition(SHOW)}/>}
    {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
    {mode === ERROR_SAVE && <Error onClose={() => back()} message="Could not save appointment :("/>}
    {mode === ERROR_DELETE && <Error onClose={() => back()} message="Could not delete appointment :("/>}
      
    </article>
  )
}