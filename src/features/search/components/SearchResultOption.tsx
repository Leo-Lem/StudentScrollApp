import { LinkMenuItem } from "../../../components"
import SearchResult from "../types/SearchResult"

export default function SearchResultOption({ result, onDismiss }: Props) {
  switch (result.id) {
    case "profile":
      return (
        <LinkMenuItem
          href={`/profile/${result.value.studentId}`}
          dismiss={() => onDismiss(result)}
          key={result.id + result.value.studentId.toString()}
        >
          {result.value.name}
        </LinkMenuItem>
      )
    case "post":
      return (
        <LinkMenuItem
          href={`/posts/${result.value.id}`}
          dismiss={() => onDismiss(result)}
          key={result.id + result.value.title.toString()}
        >
          {result.value.title}
        </LinkMenuItem>
      )
  }
}

interface Props {
  result: SearchResult
  onDismiss: (result: SearchResult) => void
}
