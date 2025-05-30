import React, { useState, useEffect } from "react";

type Props = {
  message: string;
  onClose: () => void;
  profileUrl?: string;
};

const MessageModal: React.FC<Props> = ({ message, onClose, profileUrl }) => {
  const [copied, setCopied] = useState(false);
  const [editableMessage, setEditableMessage] = useState(message);

  useEffect(() => {
    setEditableMessage(message);
  }, [message]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editableMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableMessage(e.target.value);
  };

  const handleSendOnLinkedIn = () => {
    navigator.clipboard.writeText(editableMessage);
    setCopied(true);

    if (profileUrl) {
      window.open(profileUrl, "_blank");
    }

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
            </svg>
            <span className="truncate">Personalized Outreach Message</span>
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none p-1"
            onClick={onClose}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div className="px-4 py-3 sm:px-6 sm:py-4 max-h-[calc(100vh-250px)] sm:max-h-[60vh] overflow-y-auto">
          <textarea
            className="w-full min-h-[150px] sm:min-h-[250px] p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y font-medium leading-relaxed text-sm sm:text-base"
            value={editableMessage}
            onChange={handleEdit}
          />
          <div className="mt-2 text-xs sm:text-sm text-gray-500 flex items-center">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            Feel free to edit this message before copying
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleCopy}
                className="flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path>
                  <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"></path>
                </svg>
                {copied ? "Copied to clipboard!" : "Copy message"}
              </button>

              {profileUrl && (
                <button
                  onClick={handleSendOnLinkedIn}
                  className="flex items-center justify-center text-sm font-medium bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0zM6.96 15H4.707V7.978h2.255V15zM5.833 7.033a1.128 1.128 0 1 1 1.1-1.129 1.115 1.115 0 0 1-1.1 1.129zM15 15h-2.25v-3.772c0-.92-.042-2.103-1.328-2.103-1.328 0-1.53 1.002-1.53 2.037V15h-2.25V7.978h2.16v.955h.031a2.699 2.699 0 0 1 2.427-1.295c2.595 0 3.07 1.659 3.07 3.82V15z" />
                  </svg>
                  Send on LinkedIn
                </button>
              )}
            </div>

            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setEditableMessage(message)}
                className="text-gray-600 hover:text-gray-800 border border-gray-300 px-3 py-1 rounded-md text-sm font-medium transition-colors"
              >
                Reset
              </button>
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
