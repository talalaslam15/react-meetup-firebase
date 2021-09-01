import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FaSistrix } from "react-icons/fa";
import classes from "./All.module.css";

function Search() {
  const [value, setValue] = useState("");
  let history = useHistory();

  useEffect(() => {
    if (value) {
      history.push("/?query=" + value);
    } else {
      history.push("");
    }
  }, [history, value]);

  return (
    <div className={classes.search}>
      <FaSistrix className={classes.icon} />
      <input
        placeholder="Search Anything"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default Search;
