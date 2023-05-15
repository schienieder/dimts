import { useState } from 'react'

const useCrudModals = () => {
    const [viewModal, setViewModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showWarningModal, setShowWarningModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return {
        viewModal,
        setViewModal,
        showAddModal,
        setShowAddModal,
        showEditModal,
        setShowEditModal,
        showSuccessModal,
        setShowSuccessModal,
        showWarningModal,
        setShowWarningModal,
        showDeleteModal,
        setShowDeleteModal
    }
}

export default useCrudModals