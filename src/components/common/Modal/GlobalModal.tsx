"use client";

import useModal from "@/hooks/useModal";
import { Modal } from "antd";

const GlobalModal = () => {
    const { modalData, closeModal } = useModal();

    return (
        <Modal
            title={modalData.title}
            open={modalData.isOpen}
            onOk={modalData.callBack}
            onCancel={closeModal}
            footer={modalData.footer}
        >
            {modalData.content}
        </Modal>
    );
};

export default GlobalModal;
