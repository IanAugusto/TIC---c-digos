import { useState } from 'react';

interface ToggleProps {
    label1: string;
    label2: string;
}

export default function CheckboxComponent({ label1, label2 }: ToggleProps) {

    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);

    const handleCheckbox1Change = () => {
        setIsChecked1(!isChecked1);
        if (!isChecked1) {
            setIsChecked2(false);
        }
    };

    const handleCheckbox2Change = () => {
        setIsChecked2(!isChecked2);
        if (!isChecked2) {
            setIsChecked1(false);
        }
    };


    return (
        <div>
            <div className="mt-1">
                <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="peps"
                            name="peps"
                            type="checkbox"
                            checked={isChecked1}
                            onChange={handleCheckbox1Change}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="peps" className="font-medium text-gray-700">
                            {label1}
                        </label>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="peps"
                            name="peps"
                            type="checkbox"
                            checked={isChecked2}
                            onChange={handleCheckbox2Change}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="peps" className="font-medium text-gray-700">
                            {label2}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

