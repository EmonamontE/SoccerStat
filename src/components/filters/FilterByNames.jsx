import React from "react";

export default function FilterByNames(props) {
  const filterText = props.filterText;

  const handleFilterTextChange = (e) => {
    props.onFilterTextChange(e.target.value);
  }

  return(
    <form className="col-md-3 mb-4">
      <label className="form-label fs-3">Поиск по названию</label>
      <input
        className="form-control form-control-lg"
        type="text"
        placeholder="Введите название лиги"
        onChange={handleFilterTextChange}
        value={filterText}
      />
    </form>
  );
}
