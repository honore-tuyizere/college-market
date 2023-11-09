import { useState } from "react";
import PurposeForm from "./PurposeForm";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { PurposesList } from "./GetPurposes";

export const ProductsPurpose = () => {
  const [formOpen, setFormOpen] = useState(false);
  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Purposes</h1>
        <Button label='New purpose' onClick={() => setFormOpen(true)} />
      </div>

      <PurposesList />

      <Modal
        title='New purpose'
        onClose={() => setFormOpen(false)}
        isOpen={formOpen}
      >
        <PurposeForm setIsOpen={setFormOpen} />
      </Modal>
    </>
  );
};

export default ProductsPurpose;
