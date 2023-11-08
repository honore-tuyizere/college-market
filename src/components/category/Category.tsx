import DashboardTopBar from "../layouts/navigation/TopBar";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { useState } from "react";
import CategoryForm from "./CategoryForm";
import { CategoriesList } from "./GetCategories";

export const ProductsCategory = () => {
  const [formOpen, setFormOpen] = useState(false);
  return (
    <>
      <DashboardTopBar title='Categories'>
        <Button  label='New category' onClick={() => setFormOpen(true)} />
      </DashboardTopBar>

      <CategoriesList />

      <Modal
        title='New category'
        onClose={() => setFormOpen(false)}
        isOpen={formOpen}
      >
        <CategoryForm setIsOpen={setFormOpen} />
      </Modal>
    </>
  );
};

export default ProductsCategory;
