import style from "./Form.module.css"

export default function Form (props:any) {
  return(
    <div className={style.container}>
      <form className={style.form}>
        <div>
          <span onClick={props.handleForm}>X</span>
        </div>
        <label htmlFor="name">asdas</label>
        <input id="name" className="" type="text"  value="" />
      </form>
    </div>
  )
}