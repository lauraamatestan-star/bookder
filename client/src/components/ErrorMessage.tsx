// filepath: client/src/components/ErrorMessage.tsx
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
      <p className="text-red-600 font-medium">⚠️ {message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 text-indigo-600 hover:text-indigo-800 underline"
        >
          Intentar de nuevo
        </button>
      )}
    </div>
  );
}