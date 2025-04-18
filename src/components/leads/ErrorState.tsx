import React from "react";

type ErrorStateProps = {
  error: string;
};

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div
      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{error}</span>
    </div>
  );
};

export default ErrorState;
