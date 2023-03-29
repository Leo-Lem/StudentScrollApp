import React from 'react'
import style from './style.module.css'

export default function Comp(props: Props): React.ReactElement {
  return (
    <div className={style.container}>
      <img className={style.image} src={props.url} alt={props.alt} />
    </div>
  )
}

interface Props {
  url: string
  alt: string
}
