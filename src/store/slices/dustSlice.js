import { createSelector } from "@reduxjs/toolkit";

export const selectDustByStation = createSelector(
  [(res) => res.data, (res, stationName) => stationName],
  (dusts, stationName) =>
    dusts?.find((dust) => dust.stationName === stationName)
);

export const selectDustByStations = createSelector(
  [(res) => res.data, (res, stationList) => stationList],
  (dusts, stationList) =>
    dusts?.filter((dust) =>
      stationList.some(
        (station) =>
          station.sidoName === dust.sidoName &&
          station.stationName === dust.stationName
      )
    )
);
