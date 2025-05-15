import { useState } from 'react';

interface BatchSelectorProps {
  onSelect: (batch: string) => void;
}

const BatchSelector = ({ onSelect }: BatchSelectorProps) => {
  const [selectedBatch, setSelectedBatch] = useState('');
  
  const batches = [
    '2021-2025',
    '2022-2026',
    '2023-2027',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const batch = e.target.value;
    setSelectedBatch(batch);
    onSelect(batch);
  };

  return (
    <div className="flex items-center">
      <label htmlFor="batch" className="mr-2 font-medium text-gray-700">
        Select Batch:
      </label>
      <select
        id="batch"
        value={selectedBatch}
        onChange={handleChange}
        className="input max-w-xs"
      >
        <option value="">All Batches</option>
        {batches.map((batch) => (
          <option key={batch} value={batch}>
            {batch}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BatchSelector;