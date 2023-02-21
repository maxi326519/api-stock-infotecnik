
import style from "./ProductCard.module.css";

export default function ProductCard(props: any){
  return(
    <div className={style.card}>
        <span>{ props.Marca }</span>
        <span>{ props.Modelo }</span>
        <span>{ props.Color }</span>
        <span>{ props.Capacidad }</span>
        <span>{ props.DescripcionLarga }</span>
        <span>{ props.DescripcionCorta }</span>
        <span></span>
    </div>
  )
}