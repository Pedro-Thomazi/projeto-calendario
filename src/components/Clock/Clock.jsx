import styles from './Clock.module.css'

// Hooks
import { useState, useEffect } from 'react'

const Clock = () => {
  const [time, setTime] = useState('')

  const formatTimer = (val) => {
    if(val < 10) {
      return '0'
    }
    else {
      return ''
    }
  }

  useEffect(() => {
    // Interval
    const timerId = setInterval(() => tick(), 1000)

    // Cleanup
    return function cleanup() {
      clearInterval(timerId)
    }
  })

  const tick = () => {
    // Datas
    const date_ = new Date()
    const hours = date_.getHours()
    const minutes = date_.getMinutes()
    const seconds = date_.getSeconds()

    setTime(formatTimer(hours) + hours + ':' + formatTimer(minutes) + minutes + ':' + formatTimer(seconds) + seconds)
  }


  return (
    <div className={styles.clock}>
      <h1>Horário</h1>
      <div className={styles.screen}>
        <h2 className={styles.time}>{time}</h2>
      </div>
    </div>
  )
}

export default Clock