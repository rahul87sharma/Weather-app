import { X } from "lucide-react";

const HistoryList = ({ history, onSelectCity, onDeleteCity }) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="max-w-xl mx-auto mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold">Recent Searches:</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((city, idx) => (
          <div
            key={idx}
            className="flex items-center bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <button
              onClick={() => onSelectCity(city)}
              className="text-sm px-3 py-1"
            >
              {city}
            </button>
            <button
              onClick={() => onDeleteCity(city)}
              className="h-full px-1 hover:bg-gray-400 dark:hover:bg-gray-500 rounded-r flex items-center justify-center"
              aria-label={`Remove ${city} from history`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;