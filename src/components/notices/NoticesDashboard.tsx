import DashboardTopBar from "../layouts/navigation/TopBar";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { useState } from "react";
import NoticeForm from "./NoticeForm";
import MyNoticeList from "./MyNotification";

export const NoticesDashboard = () => {
  const [formOpen, setFormOpen] = useState(false);
  return (
    <>
      <DashboardTopBar title='Notice'>
        <Button label='New Notice' onClick={() => setFormOpen(true)} />
      </DashboardTopBar>

      <MyNoticeList />

      <Modal
        title='New Notices'
        onClose={() => setFormOpen(false)}
        isOpen={formOpen}
      >
        <NoticeForm setIsOpen={setFormOpen} />
      </Modal>
    </>
  );
};

export default NoticesDashboard;
