import { useEffect } from "react"

import { LoadingSpinner } from "../../components"
import { useAppSelector } from "../../redux"
import { useAppDispatch, useStudentId } from "../../redux/hooks"

import Map from "./components/Map"
import getLocation from "./redux/actions/getLocation"
import StudentMarker from "./components/StudentMarker"

export default function NearbyPage() {
  const dispatch = useAppDispatch()

  const studentId = useStudentId()
  const location = useAppSelector((state) => state.nearby[studentId])

  useEffect(() => {
    dispatch(getLocation())
  }, [])

  if (location === undefined) return <LoadingSpinner />
  else
    return (
      <Map center={location}>
        <StudentMarker studentId={studentId} location={location} />
      </Map>
    )
}
