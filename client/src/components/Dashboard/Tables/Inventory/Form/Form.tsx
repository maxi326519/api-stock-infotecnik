import style from "./Form.module.css";

export default function Form(props: any) {
  return (
    <div className={style.container}>
      <form className={style.form}>
        <div>
          <span onClick={props.handleForm}>X</span>
        </div>
        <div className={style.inputs}>
          <h4>Agregar inventario</h4>
          <label htmlFor="code">Codigo</label>
          <select id="code" className="" value="">

          </select>
          <label htmlFor="code2">.</label>
          <input id="code2" className="" value=""/>

          <label htmlFor="product">Producto</label>
          <select id="product" className="" value="">
          

          </select>
          <button>Crear producto</button>

          <label htmlFor="supplier">Proveedor</label>
          <select id="supplier" className="" value="">

{/*           <label htmlFor="Refsupplier">Ref Proveedor</label>
          <input id="Refsupplier" className="" value=""> */}
{/* Agregar tipo inpositivo */}
{/* Agregar nro de serie por producto */}
          </select>

          <label htmlFor="cantidad">Cantidad</label>
          <input id="cantidad" className="" type="text" value="" />

          <button>Agregar</button>
        </div>
      </form>
    </div>
  );
}