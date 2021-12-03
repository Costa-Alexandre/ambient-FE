import React, { useEffect, useContext } from "react";
import { MainContext } from "store/MainProvider";

import { ShowInfo, ShowModalize } from "./components";

export default function Show({ route: { params: activeShow } }) {
  
  const { setActiveShow } = useContext(MainContext);

  useEffect(() => {
    setActiveShow(activeShow);
  }, []);

  return (
    <>
      <ShowInfo {...dummyShowInfo} />
      <ShowModalize />
    </>
  );
}

// Dummy variables - DELETE

const dummyBGImage = { uri: "https://f4.bcbits.com/img/a1024330960_10.jpg" };

const dummyShowInfo = {
  showId: "1",
  showTitle: "SHOW NAME",
  showName: "Some show",
  showDescription: "this is a description",
  amountSpeakers: "10",
  amountListeners: "20",
  imageUri: dummyBGImage.uri,
  users: [],
  listenCallback: null,
};
