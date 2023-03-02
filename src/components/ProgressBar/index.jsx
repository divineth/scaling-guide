import style from './progress-bar.module.css'

const ProgressBar = ({ width, percent, className }) => {

  return (
    <div className={className}>
      <div className={style.progressDiv} style={{ width: `${width}%`, opacity: 1 }}>
        <div
          className={style.progress}
          style={{
            width: `${percent * 100}%`,
            background: "#e9e9e9",
          }}
        ></div>
      </div>
    </div>
  )
}

export default ProgressBar
