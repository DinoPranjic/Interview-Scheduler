import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import "components/InterviewerList.scss"
import PropTypes from 'prop-types';

function InterviewerList(props) {
  const listItems = props.interviewers.map((interviewer) => {
    return(
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name} 
        avatar={interviewer.avatar}
        setInterviewer={() => {props.onChange(interviewer.id)}}
        selected={interviewer.id === props.value}
        />
    )
  })
  return(
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {listItems}
    </ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;