import { Stack } from "@mui/material"
import { useTranslation } from "react-i18next"

import ProfilesList from "../../profiles/components/ProfilesList"

export default function NearbyStudentsList({ nearbyStudentsIds }: Props) {
  const [t] = useTranslation()

  return (
    <ProfilesList studentIds={nearbyStudentsIds} label={t("LABEL_NEARBY")} showCount={false} display="wrap" />
  )
}

interface Props {
  nearbyStudentsIds: number[]
}
