import React from 'react'

// this imports a css module (!) which helps to keep the css organized
import style from './style.module.css'

// define reusable components like this one
export default function Comp(props: Props): React.ReactElement {
  return (
    <div className={style.container}>
      <p className={style.message}>{props.message}</p>
    </div>
  )
}

// define props to make your components reusable and adjustable
interface Props {
  message: string
}
