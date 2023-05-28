import styles from './CardPresentation.module.scss';


export default function CardPresentation(props) {



  return (

    <div className={styles.cardPresentation}>
      <img key={props.id} src={require(`../../Assets/Images/Us/${props.imagen}.jpeg`)}
        alt={`Foto de ${props.imagen}`} />
      <h3>{props.name}</h3>

    </div>

  )
}
