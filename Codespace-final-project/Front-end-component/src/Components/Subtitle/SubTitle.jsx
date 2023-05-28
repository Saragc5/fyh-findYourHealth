import styles from './SubTitle.module.scss';

export default function SubTitle({ subTitle, color, fontSize }) {
  return (
    <div className={styles.containerSubtitle}>
      <h1 style={{ color, fontSize: `${fontSize}rem`  }}>
        {subTitle}
      </h1>
    </div>
  )
}


