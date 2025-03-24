import {useState} from "react";

const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        console.log("open")
        setIsModalOpen(true)
    };
    const closeModal = () => setIsModalOpen(false);

    return { isModalOpen, openModal, closeModal };
}

export default useModal;