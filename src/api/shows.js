import { serverBaseUrl } from "./config";

export const getShows = async () => {
  try {
    const response = await fetch(`${serverBaseUrl}/api/shows`);
    const { requestedShows: liveShows } = await response.json();
    return liveShows;
  } catch (error) {
    console.log(error);
  }
};

export const postShow = async (show) => {
  try {
    const response = await fetch(`${serverBaseUrl}/api/show`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(show),
    });
    const { returnedShow } = await response.json();
    console.log("Show created")
    return returnedShow;
  } catch (error) {
    console.log('There was an error creating the show: ', error);
  }
};
