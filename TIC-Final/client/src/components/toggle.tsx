import { useState } from 'react';

interface ToggleProps {
    labelChecked: string;
    labelUnchecked: string;
}

export default function ToggleComponent({ labelChecked, labelUnchecked }: ToggleProps) {

    const [isChecked, setIsChecked] = useState(false);
    const variavelDeVerificacao = isChecked ? '1' : '0';

    const handleToggleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleToggleChange}
                className="sr-only peer"
            />
            <div
                className={`w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
            ></div>
            <span className="ml-3 text-sm font-medium text-gray-900">
                {isChecked ? labelChecked : labelUnchecked}
            </span>
        </label>
    );
}


