import State from "../state"

export default function getLocation(state: State) {
  if (!("geolocation" in navigator)) return

  navigator.geolocation.getCurrentPosition((position) => {
    state.location = {
      name: "Current Location",
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
  })
}
