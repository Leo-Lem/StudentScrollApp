import React from 'react'
import style from './style.module.css'

import Message from '../components/Message'
import Image from '../components/Image'

export default function App(): React.ReactElement {
  return (
    <div className={style.container}>
      <div className={style.title}>
        <Message message='Welcome to StudentScroll!' />
        <Image
          url='https://static.vecteezy.com/system/resources/previews/000/511/962/large_2x/vector-student-glyph-black-icon.jpg'
          alt='Student Icon'
        />
      </div>
    </div>
  )
}
