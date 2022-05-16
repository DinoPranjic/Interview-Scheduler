import React from 'react';
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const listItems = props.days.map((item) => {
    return (
    <DayListItem
      key={item.id}
      name={item.name}
      spots={item.spots}
      selected={item.name === props.value}
      setDay={props.onChange}
    />
    )
  })

  return(
    <ul>
      {listItems}
    </ul>
  )
}