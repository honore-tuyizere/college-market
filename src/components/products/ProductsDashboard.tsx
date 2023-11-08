import DashboardTopBar from "../layouts/navigation/TopBar";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { useState } from "react";
import ProductForm from "./ProductForm";
import ProductsTable from "./ProductsTable";

export const ProductsDashboard = () => {
  const [formOpen, setFormOpen] = useState(false);
  return (
    <>
      <DashboardTopBar title='Products'>
        <Button label='New product' onClick={() => setFormOpen(true)} />
      </DashboardTopBar>

      <ProductsTable />

      <Modal
        title='New product'
        onClose={() => setFormOpen(false)}
        isOpen={formOpen}
      >
        <ProductForm setIsOpen={setFormOpen} />
      </Modal>
    </>
  );
};

export default ProductsDashboard;
