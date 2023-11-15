import { useState } from "react";
import Button from "../common/Button";
import Modal from "../common/Modal";
import DashboardTopBar from "../layouts/navigation/TopBar";
import MySliderList from "./MySlider";
import SliderForm from "./SliderForm";

export const SliderDashboard = () => {
  const [formOpen, setFormOpen] = useState(false);
  return (
    <>
      <DashboardTopBar title='Sliders'>
        <Button label='New Sliders' onClick={() => setFormOpen(true)} />
      </DashboardTopBar>

      <MySliderList />

      <Modal
        title='New Sliders'
        onClose={() => setFormOpen(false)}
        isOpen={formOpen}
      >
        <SliderForm setIsOpen={setFormOpen} />
      </Modal>
    </>
  );
};

export default SliderDashboard;
