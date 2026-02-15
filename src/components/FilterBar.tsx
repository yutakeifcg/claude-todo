import type { FilterStatus } from '../types';

interface Props {
  current: FilterStatus;
  onChange: (filter: FilterStatus) => void;
  activeCount: number;
}

const filters: { label: string; value: FilterStatus }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export function FilterBar({ current, onChange, activeCount }: Props) {
  return (
    <div className="filter-bar">
      <span className="todo-count">
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </span>
      <div className="filter-buttons">
        {filters.map((f) => (
          <button
            key={f.value}
            className={current === f.value ? 'active' : ''}
            onClick={() => onChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
