import { Dialog } from "@headlessui/react";
import type { AttendeeSchema } from "../../../types/types";

interface DeleteAttendeeModalProps {
  onClose: () => void;
  attendee: AttendeeSchema;
}

export default function DeleteAttendeeModal({
  onClose,
  attendee,
}: DeleteAttendeeModalProps) {
  return (
    <div className="w-full max-w-lg p-6">
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-zinc-50"
          >
            Delete attendee
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete <b>{attendee.name}</b> who is{" "}
              <b>{attendee.email}</b> attendee? This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-full bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={onClose}
        >
          Delete
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
