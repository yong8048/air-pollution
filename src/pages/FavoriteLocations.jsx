import React from "react";
import { Card, Loading } from "../components";
import { useGetMultipleDustsQuery } from "../store/apis/dustApi";
import { selectDustByStations } from "../store/slices/dustSlice";
import { useFavoriteSlice } from "../store/slices/favoriteSlice";

function FavoriteLocations() {
  const { favorite, dispatch, favoriteSidos } = useFavoriteSlice();
  const {
    data: dusts,
    isLoading,
    isError,
  } = useGetMultipleDustsQuery(favoriteSidos, {
    selectFromResult: (result) => ({
      ...result,
      data: selectDustByStations(result, favorite),
    }),
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError || !dusts) {
    return <div>오류 발생</div>;
  }
  return (
    <>
      {dusts.map((dust) => (
        <Card
          key={dust.stationName}
          dust={dust}
          favorite={favorite}
          dispatch={dispatch}
        />
      ))}
    </>
  );
}

export default FavoriteLocations;
