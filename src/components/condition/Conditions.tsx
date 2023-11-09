import { useState } from "react";
import ConditionForm from "./ConditionForm";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { ConditionsList } from "./GetConditions";

export const ProductsCondition = () => {
  const [formOpen, setFormOpen] = useState(false);
  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Conditions</h1>
        <Button label='New condition' onClick={() => setFormOpen(true)} />
      </div>

      <ConditionsList />

      <Modal
        title='New condition'
        onClose={() => setFormOpen(false)}
        isOpen={formOpen}
      >
        <ConditionForm setIsOpen={setFormOpen} />
      </Modal>
    </>
  );
};

export default ProductsCondition;
