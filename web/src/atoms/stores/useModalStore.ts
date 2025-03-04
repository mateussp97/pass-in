import { atom, useAtom } from "jotai";
import { useCallback } from "react";
import { v4 } from "uuid";

interface ModalState {
  id: string;
  isOpen: boolean;
  content: JSX.Element;
}

export const modalsAtom = atom<ModalState[]>([]);

export function useModalStore() {
  const [modals, setModals] = useAtom(modalsAtom);

  const onCloseModal = useCallback(() => {
    setModals((currentModals) => {
      const newModals = currentModals.slice(0, -1);
      return newModals;
    });
  }, [setModals]);

  const onOpenModal = useCallback(
    (modalProps: Omit<ModalState, "id" | "isOpen">) => {
      const modalId = v4();
      const newModal = {
        ...modalProps,
        id: modalId,
        isOpen: true,
      };

      setModals((currentModals) => [...currentModals, newModal]);
    },
    [setModals]
  );

  const onCloseAllModals = useCallback(() => {
    setModals([]);
  }, [setModals]);

  return {
    modals,

    methods: {
      onOpenModal,
      onCloseModal,
      onCloseAllModals,
    },
  };
}
