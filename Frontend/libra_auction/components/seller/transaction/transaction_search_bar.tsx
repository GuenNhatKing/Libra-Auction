interface TransactionSearchBarProps {
  onSearch: (value: string) => void;
}

export const TransactionSearchBar = ({ onSearch }: TransactionSearchBarProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
      <div className="relative w-full md:w-96">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </span>
        <input
          type="text"
          placeholder="Search transactions..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary-color) bg-white transition-all text-sm"
        />
      </div>
    </div>
  );
};
