import style from "./Form.module.css";

export default function Form(props: any) {
  return (
    <div className={style.container}>
      <form className={style.form}>
        <div>
          <span onClick={props.handleForm}>X</span>
        </div>
        <h4>Agregar productos</h4>
        <div className={style.inputs}>
          <label htmlFor="Marca">Marca</label>
          <input id="Marca" className="" type="text" value="" />

          <label htmlFor="Modelo">Modelo</label>
          <input id="Modelo" className="" type="text" value="" />

          <label htmlFor="Color">Color</label>
          <input id="Color" className="" type="text" value="" />

          <label htmlFor="Capacidad">Capacidad</label>
          <input id="Capacidad" className="" type="text" value="" />

          <label htmlFor="Larga">Desc Larga</label>
          <textarea id="Larga" className="" value="" />

          <label htmlFor="Corta">Desc Corta</label>
          <input id="Corta" className="" type="text" value="" />

          <label htmlFor="Imagen">Imagen</label>
          <input id="Imagen" className="" type="file" value="" />
        </div>
        <button>Agregar</button>
      </form>
    </div>
  );
}
