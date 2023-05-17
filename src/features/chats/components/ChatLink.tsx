import { Button } from "@mui/base"
import { Box } from "@mui/system"
import { useEffect } from "react"
import { useNavigate } from "react-router"

import { useAppDispatch, useAppSelector } from "../../../redux"
import ProfileBadge from "../../profiles/components/ProfileBadge"
import { readProfile } from "../../profiles/redux"

export default function ChatLink({ studentId }: Props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const profile = useAppSelector((state) => state.profiles[studentId])

  useEffect(() => {
    if (profile === undefined) dispatch(readProfile(studentId))
  }, [studentId])

  return (
    <Box>
      <ProfileBadge profile={profile} />

      <Button onClick={() => navigate(`chats/${studentId}`)}>
        {profile.name}
      </Button>
    </Box>
  )
}

interface Props {
  studentId: number
}