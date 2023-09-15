import React, { useCallback, useMemo, useState } from "react";
import locData from "../../constants/locData.json";
import {
  setMyLocation,
  setAllLocation,
} from "../../store/slices/locationSlice";
import "../../styles/Menu.scss";
import { useGetDustsQuery } from "../../store/apis/dustApi";

function Menu({ location, isMine, dispatch }) {
  const [tempLocation, setTempLocation] = useState(location);

  const onLocationChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTempLocation((prevState) => ({ ...prevState, [name]: value }));
      if (!isMine && name === "sidoName")
        dispatch(setAllLocation({ ...tempLocation, [name]: value }));
      if (isMine && name === "stationName")
        dispatch(setMyLocation({ ...tempLocation, [name]: value }));
    },
    [isMine, tempLocation]
  );

  const { data: dusts } = useGetDustsQuery(tempLocation.sidoName);

  return (
    <div id="menu-wrapper">
      <select
        className="menu-item"
        name="sidoName"
        onChange={onLocationChange}
        value={tempLocation.sidoName}
      >
        {locData.locations.map((location) => (
          <option key={location.key}>{location.sidoName}</option>
        ))}
      </select>
      {isMine ? (
        <select
          className="menu-item"
          name="stationName"
          onChange={onLocationChange}
          value={tempLocation.stationName}
        >
          {dusts.map((station) => (
            <option key={station.stationName}>{station.stationName}</option>
          ))}
        </select>
      ) : null}
    </div>
  );
}

export default React.memo(Menu);
