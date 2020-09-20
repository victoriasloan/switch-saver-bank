import React from "react";

const ConfirmScreen = ({
  img,
  heading,
  description,
  subheading,
  withdrawalAmount,
  hasConfirmButton,
  onCancel,
  onConfirm,
}) => {
  const showConfirmButton = hasConfirmButton;
  return (
    <div>
      <img src={img} />
      <div className="text-white mb-12 mt-12">
        <h3 className="text-xl font-bold">{heading}</h3>
        {showConfirmButton && (
          <p>Are you sure you want to withdraw £{withdrawalAmount}?</p>
        )}
        <p>{description}</p>
        <p>{subheading}</p>
      </div>

      <div className="flex justify-between">
        <button
          className="bg-white hover:text-indigo-500 text-indigo-700 font-bold font-bold py-2 px-8 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>

        {showConfirmButton && (
          <button
            className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold font-bold py-2 px-8 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        )}
      </div>
    </div>
  );
};

export default ConfirmScreen;
