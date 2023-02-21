import Inventory from "./Inventory/Inventory.tsx";
import Products from "./Products/Products.jsx";
import Supplier from "./Supplier/Supplier.tsx";
import BarCodes from "./BarCodes/BarCodes.tsx";
import Invoice from "./Invoice/Invoice.tsx";

import styles from "../Dashboard.module.css";

export default function Tables({ table }) {
  console.log(table);
  return (
    <div className={styles.table}>
      {
        table === 1
        ?<Inventory/>
        :table === 2
        ?<Products/>
        :table === 3
        ?<Supplier/>
        :table === 4
        ?<BarCodes/>
        :<Invoice/>
      }
    </div>
  );
}
