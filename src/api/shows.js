import { serverBaseUrl } from "./config"

export const getLiveShows = async () => {
  try {
      const response = await fetch(`${serverBaseUrl}/api/shows`)
      const { requestedShows: liveShows } = await response.json()
      return liveShows
  } catch (error) {
      console.log(error)
  }
}