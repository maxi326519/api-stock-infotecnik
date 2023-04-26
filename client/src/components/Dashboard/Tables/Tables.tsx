import Users from "./UsersTable/UsersTable";
import Inventory from "./InventoryTable/InventoryTable";
import Products from "./ProductsTable/ProductsTable";
import Supplier from "./SupplierTable/SupplierTable";
import Clients from "./ClientsTable/ClientsTable";
import Invoice from "./InvoiceTable/InvoiceTable";
import Transactions from "./TransactionsTable/TransactionsTable";

import styles from "../Dashboard.module.css";

const tables = [
  Users,
  Inventory,
  Products,
  Supplier,
  Clients,
  Invoice,
  Transactions,
]

interface Props {
  table: number;
}

export default function Tables({ table }: Props) {
  const TableComponent = tables[table];

  return (
    <div className={styles.table}>
      <TableComponent />
    </div>
  );
}