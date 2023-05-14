import { Fragment, ReactElement } from "react";


export default function LocaleLabel({ code }: Props): ReactElement {
  switch (code) {
    case "en": return <Fragment>English</Fragment>
    case "de": return <Fragment>German</Fragment>
    case "es": return <Fragment>Spanish</Fragment>
    default: throw new Error(`Unknown locale code: ${code}`)
  }
}

interface Props {
  code: string
}