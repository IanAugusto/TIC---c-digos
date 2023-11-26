import { useState } from 'react';
import { Disclosure } from '@headlessui/react'
import { FilterIcon } from '@heroicons/react/solid'

const filters = {
    price: [
        { value: '0', label: '$0 - $25', checked: false },
        { value: '25', label: '$25 - $50', checked: false },
        { value: '50', label: '$50 - $75', checked: false },
        { value: '75', label: '$75+', checked: false },
    ],
    color: [
        { value: 'white', label: 'White', checked: false },
        { value: 'beige', label: 'Beige', checked: false },
        { value: 'blue', label: 'Blue', checked: false },
        { value: 'brown', label: 'Brown', checked: false },
        { value: 'green', label: 'Green', checked: false },
        { value: 'purple', label: 'Purple', checked: false },
    ],
    size: [
        { value: 'xs', label: 'XS', checked: false },
        { value: 's', label: 'S', checked: false },
        { value: 'm', label: 'M', checked: false },
        { value: 'l', label: 'L', checked: false },
        { value: 'xl', label: 'XL', checked: false },
        { value: '2xl', label: '2XL', checked: false },
    ],
    category: [
        { value: 'all-new-arrivals', label: 'All New Arrivals', checked: false },
        { value: 'tees', label: 'Tees', checked: false },
        { value: 'objects', label: 'Objects', checked: false },
        { value: 'sweatshirts', label: 'Sweatshirts', checked: false },
        { value: 'pants-and-shorts', label: 'Pants & Shorts', checked: false },
    ],
}

export default function FilterCategories() {
    const [selectedFilters, setSelectedFilters] = useState(0);

    const handleFilterChange = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const selectedCheckboxes = Array.from(checkboxes).filter(
            (checkbox) => (checkbox as HTMLInputElement).checked
        );
        setSelectedFilters(selectedCheckboxes.length);
    };

    const handleClearAll = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            (checkbox as HTMLInputElement).checked = false;
        });
        setSelectedFilters(0);
    };

    const handleConfirmFilters = () => {
        // Handle the confirmed filters here
        console.log('Confirmed filters:', selectedFilters);

    };

    return (
        <Disclosure
            as="section"
            aria-labelledby="filter-heading"
            className="relative z-10 border-t border-b border-gray-200 grid items-center"
        >
            <h2 id="filter-heading" className="sr-only">
                Filters
            </h2>
            <div className="relative col-start-1 row-start-1 py-4">
                <div className="max-w-7xl mx-auto flex space-x-6 divide-x divide-gray-200 text-sm px-4 sm:px-6 lg:px-8">
                    <div>
                        <Disclosure.Button className="group text-gray-700 font-medium flex items-center">
                            <FilterIcon
                                className="flex-none w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                            />
                            {selectedFilters} Filtros
                        </Disclosure.Button>
                    </div>
                    <div className="pl-6">
                        <button type="button" onClick={handleClearAll} className="text-gray-500">
                            Limpar tudo
                        </button>
                    </div>
                </div>
            </div>
            <Disclosure.Panel className="border-t border-gray-200 py-10">
                <div className="max-w-7xl mx-auto grid grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6">
                        <fieldset>
                            <legend className="block font-medium">Price</legend>
                            <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                {filters.price.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center text-base sm:text-sm">
                                        <input
                                            id={`price-${optionIdx}`}
                                            name="price[]"
                                            onChange={handleFilterChange}
                                            defaultValue={option.value}
                                            type="checkbox"
                                            className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                            defaultChecked={option.checked}
                                        />
                                        <label htmlFor={`price-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend className="block font-medium">Color</legend>
                            <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                {filters.color.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center text-base sm:text-sm">
                                        <input
                                            id={`color-${optionIdx}`}
                                            name="color[]"
                                            onChange={handleFilterChange}
                                            defaultValue={option.value}
                                            type="checkbox"
                                            className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                            defaultChecked={option.checked}
                                        />
                                        <label htmlFor={`color-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                    </div>
                    <div className="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6">
                        <fieldset>
                            <legend className="block font-medium">Size</legend>
                            <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                {filters.size.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center text-base sm:text-sm">
                                        <input
                                            id={`size-${optionIdx}`}
                                            name="size[]"
                                            onChange={handleFilterChange}
                                            defaultValue={option.value}
                                            type="checkbox"
                                            className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                            defaultChecked={option.checked}
                                        />
                                        <label htmlFor={`size-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend className="block font-medium">Category</legend>
                            <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                                {filters.category.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center text-base sm:text-sm">
                                        <input
                                            id={`category-${optionIdx}`}
                                            name="category[]"
                                            onChange={handleFilterChange}
                                            defaultValue={option.value}
                                            type="checkbox"
                                            className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                            defaultChecked={option.checked}
                                        />
                                        <label htmlFor={`category-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto flex space-x-6 divide-x divide-gray-200 text-sm px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex-1">
                        <Disclosure.Button className="group text-gray-700 font-medium flex items-center">
                            <button type="button" onClick={handleConfirmFilters} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                OK
                            </button>
                        </Disclosure.Button>
                    </div>
                </div>
            </Disclosure.Panel>
        </Disclosure>
    )
}
