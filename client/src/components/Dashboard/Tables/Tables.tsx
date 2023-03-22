import Inventory from "./InventoryTable/InventoryTable";
import Products from "./ProductsTable/ProductsTable";
import Supplier from "./SupplierTable/SupplierTable";
import Invoice from "./InvoiceTable/InvoiceTable";
import Transactions from "./TransactionsTable/TransactionsTable";

import styles from "../Dashboard.module.css";

interface Props{
  table: number
}

export default function Tables({ table }: Props) {
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
        ?<Invoice/>
        :<Transactions/>
      }
    </div>
  );
}
