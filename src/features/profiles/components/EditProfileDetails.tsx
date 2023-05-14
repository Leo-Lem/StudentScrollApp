import { Fragment, ReactElement, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../redux"
import useBinding from "../../../hooks/useBinding"

import { BindingTextField } from "../../../components"
import IconSelect from "../../../components/pickers/IconSelect"

import { readProfile, updateProfile } from "../profileReducer"
import LoadingSpinner from "../../../components/LoadingSpinner"

// TODO: fix update not working

export default function EditProfileDetails(): ReactElement {
  const studentId = useAppSelector((state) => state.authentication.studentId)
  if (studentId === undefined) return <LoadingSpinner />

  const profile = useAppSelector((state) => state.profiles[studentId])
  if (profile === undefined) return <LoadingSpinner />

  const dispatch = useAppDispatch()

  const $newName = useBinding("")
  const $newBio = useBinding(profile.bio)
  const $newIcon = useBinding(profile.icon)

  useEffect(() => {
    dispatch(readProfile(studentId)).then(() => {
      if (profile !== null) {
        $newBio.set(profile.bio)
        $newIcon.set(profile.icon)
      }
    })

    return () => {
      const name = $newName.get !== "" ? $newName.get : undefined
      const bio = $newBio.get !== "" && $newBio.get !== profile?.bio ? $newBio.get : undefined
      const icon = $newIcon.get !== profile?.icon ? $newIcon.get : undefined

      if (name !== undefined || bio !== undefined || icon !== undefined)
        void dispatch(updateProfile({ newName: name, newBio: bio, newIcon: icon }))
    }
  }, [])

  if (profile === undefined) return <LoadingSpinner />
  else
    return (
      <Fragment>
        <IconSelect $icon={$newIcon} />
        <BindingTextField $value={$newName} placeholder={profile.name} fullWidth />
        <BindingTextField $value={$newBio} multiline minRows={4} fullWidth />
      </Fragment>
    )
}
