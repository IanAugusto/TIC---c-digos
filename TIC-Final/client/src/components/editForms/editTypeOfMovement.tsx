import CheckboxComponent from "../checkbox";
interface CreateModalProps {
    closeModal: () => void;
}

export default function EditTypeOfMovement({ closeModal }: CreateModalProps) {

    const setOpen = () => {
        closeModal();
    }

    return (
        <form className="space-y-8 divide-y divide-gray-200">

            <div className="space-y-8 divide-y divide-gray-200">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Edite um Tipo de Movimentação</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Apenas o Admin. possui essa permissão.
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                        <div className="sm:col-span-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Descrição
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    autoComplete="description"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="observation" className="block text-sm font-medium text-gray-700">
                                Observação
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="observation"
                                    id="observation"
                                    autoComplete="observation"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <CheckboxComponent label1="Ativo" label2="Inativo" />
                        </div>

                    </div>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={setOpen}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}