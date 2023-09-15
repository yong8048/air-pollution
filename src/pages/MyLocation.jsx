import React from "react";
import { Card, Loading, Menu } from "../components";
import { useGetDustsQuery } from "../store/apis/dustApi";
import { selectDustByStation } from "../store/slices/dustSlice";
import { useLocationSlice } from "../store/slices/locationSlice";

function MyLocation() {
  const { myLocation, dispatch } = useLocationSlice();
  const {
    data: dust,
    isLoading,
    isError,
    isFetching,
  } = useGetDustsQuery(myLocation.sidoName, {
    selectFromResult: (result) => ({
      ...result,
      data: selectDustByStation(result, myLocation.stationName),
    }),
  });

  if (isLoading || isFetching) {
    return <Loading />;
  }
  if (isError || !dust) {
    return <div>오류 발생</div>;
  }
  return (
    <>
      <Menu location={myLocation} isMine={true} dispatch={dispatch} />
      <Card dust={dust} dispatch={dispatch} isMine={true} />
    </>
  );
}

export default MyLocation;
