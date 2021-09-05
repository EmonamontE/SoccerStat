import React from "react";

export default function CalendarFilter(props) {
  const startDateChangeHandler = (e) => {
    props.onFilterStartDateChange(e.target.value);
  }

  const endDateChangeHandler = (e) => {
    props.onFilterEndDateChange(e.target.value);
  }

  return(
    <form
      className="col-md-5 mb-4"
    >
      <label className="form-label fs-3">Фильтр по календарю</label>
      <div className="input-group">
        <span className="input-group-text">С</span>
        <input
          type="text"
          name="startDate"
          value={props.filterStartDate}
          className="form-control"
          placeholder="этой даты"
          onInput={startDateChangeHandler}
        />
        <span className="input-group-text">по</span>
        <input
          type="text"
          name="endDate"
          value={props.filterEndDate}
          className="form-control"
          placeholder="эту дату"
          onInput={endDateChangeHandler}
        />
      </div>
    </form>
  );
}
