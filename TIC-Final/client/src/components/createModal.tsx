import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CreateProduct from './forms/createProduct';
import CreateSupplier from './forms/createSupplier';
import CreateUser from './forms/createUser';
import CreateTypeOfProduct from './forms/createTypeOfProduct';
import CreateMeasure from './forms/createMeasure';
import AssociationSupplierProduct from './forms/associationSupplierProduct';
import CreateTypeOfMovement from './forms/createTypeMovement';
import CreateProductMovement from './forms/createProductMovement';
import CreateCostCenter from './forms/createCostCenter';
import CreateRevenueSource from './forms/createRevenueSource';
import CreateChartOfAccounts from './forms/createChartOfAccounts';
import CreateFinantialMovement from './forms/createFinantialMovement';
import EditProduct from './editForms/editProduct';
import EditSupplierProduct from './editForms/editSupplierProduct';
import EditTypeOfProduct from './editForms/editTypeOfProduct';
import EditSupplier from './editForms/editSupplier';
import EditMeasure from './editForms/editMeasure';
import EditRevenueSource from './editForms/editRevenueSource';
import EditUser from './editForms/editUser';
import EditProductMovement from './editForms/editProductMovement';
import EditFinantialMovement from './editForms/editFinantialMovement';
import EditCostCenter from './editForms/editCostCenter';
import EditChartOfAccounts from './editForms/editChartOfAccount';
import EditTypeOfMovement from './editForms/editTypeOfMovement';


interface CreateModalProps {
    isOpen: boolean;
    closeModal: () => void;
    type: string;
}

export default function CreateModal({ isOpen, closeModal, type }: CreateModalProps) {

    const setOpen = () => {
        closeModal();
    }

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={closeModal}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            {type === 'product' ? (
                                <CreateProduct closeModal={setOpen} />
                            ) : (type === 'supplier' ? (
                                <CreateSupplier closeModal={setOpen} />
                            ) : (type === 'user' ? (
                                <CreateUser closeModal={setOpen} />
                            ) : (type === 'typeProduct' ? (
                                <CreateTypeOfProduct closeModal={setOpen} />
                            ) : (type === 'measure' ? (
                                <CreateMeasure closeModal={setOpen} />
                            ) : (type === 'associationSupplier' ? (
                                <AssociationSupplierProduct closeModal={setOpen} />
                            ) : (type === 'typeMovement' ? (
                                <CreateTypeOfMovement closeModal={setOpen} />
                            ) : (type === 'productMovement' ? (
                                <CreateProductMovement closeModal={setOpen} />
                            ) : (type === 'costCenter' ? (
                                <CreateCostCenter closeModal={setOpen} />
                            ) : (type === 'revenueSource' ? (
                                <CreateRevenueSource closeModal={setOpen} />
                            ) : (type === 'chartOfAccounts' ? (
                                <CreateChartOfAccounts closeModal={setOpen} />
                            ) : (type === 'finantialMovement' ? (
                                <CreateFinantialMovement closeModal={setOpen} />
                            ) : (type === 'editProduct' ? (
                                <EditProduct closeModal={setOpen} />
                            ) : (type === 'editSupplierProduct' ? (
                                <EditSupplierProduct closeModal={setOpen} />
                            ) : (type === 'editTypeProduct' ? (
                                <EditTypeOfProduct closeModal={setOpen} />
                            ) : (type === 'editSupplier' ? (
                                <EditSupplier closeModal={setOpen} />
                            ) : (type === 'editMeasure' ? (
                                <EditMeasure closeModal={setOpen} />
                            ) : (type === 'editRevenueSource' ? (
                                <EditRevenueSource closeModal={setOpen} />
                            ) : (type === 'editUser' ? (
                                <EditUser closeModal={setOpen} />
                            ) : (type === 'editProductMovement' ? (
                                <EditProductMovement closeModal={setOpen} />
                            ) : (type === 'editFinantialMovement' ? (
                                <EditFinantialMovement closeModal={setOpen} />
                            ) : (type === 'editCostCenter' ? (
                                <EditCostCenter closeModal={setOpen} />
                            ) : (type === 'editChartOfAccounts' ? (
                                <EditChartOfAccounts closeModal={setOpen} />
                            ) : (type === 'editTypeOfMovemento' ? (
                                <EditTypeOfMovement closeModal={setOpen} />
                            ) : (
                                <div>Erro ao carregar o formulário</div>
                            ))))))))))))))))))))))))}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}