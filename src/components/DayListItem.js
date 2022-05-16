import React from "react";
import "components/DayListItem.scss";
import classNames from 'classnames';

export default function DayListItem(props) {
  let isFull = null;
  if (props.spots === 0) {
    isFull = true;
  }

  const dayClass = classNames("day-list__item",
  {
    "day-list__item--selected": props.selected,
    "day-list__item--full": isFull
  })

  const formatSpots = function () {
    let spots = "";

    if (props.spots === 0) {
      spots = "no spots remaining";
      return spots;
    }

    if (props.spots === 1) {
      spots = "1 spot remaining";
      return spots;
    }

    if (props.spots > 1) {
      spots = `${props.spots} spots remaining`;
      return spots;
    }
  }

  const formattedSpots = formatSpots();

  return (
    <li
      onClick={() => {props.setDay(props.name)}}
      className={dayClass}
    >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formattedSpots}</h3>
    </li>
  );
}