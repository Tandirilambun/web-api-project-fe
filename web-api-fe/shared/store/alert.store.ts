import { create } from "zustand";
import { type AlertStatus } from "../type";

type AlertState = {
  isOpen: boolean;
  status: AlertStatus;
  message?: string;
  timeoutId?: ReturnType<typeof setTimeout>;
  setIsOpen: (isOpen: boolean, duration?: number) => void;
  showAlert: (args: {
    status?: AlertStatus;
    message?: string;
    duration?: number;
  }) => void;
  hideAlert: () => void;
};

const DEFAULT_ALERT_DURATION = 3000;

export const useAlertStore = create<AlertState>((set) => ({
  isOpen: false,
  status: "success",
  message: undefined,
  timeoutId: undefined,
  setIsOpen: (isOpen, duration = DEFAULT_ALERT_DURATION) => {
    set((state) => {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }

      if (!isOpen) {
        return {
          ...state,
          isOpen: false,
          message: undefined,
          timeoutId: undefined,
        };
      }

      const timeoutId = setTimeout(() => {
        set({ isOpen: false, message: undefined, timeoutId: undefined });
      }, duration);

      return {
        ...state,
        isOpen: true,
        timeoutId,
      };
    });
  },
  showAlert: ({ status = "success", message = "", duration = DEFAULT_ALERT_DURATION }) => {
    set((state) => {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }

      const timeoutId = setTimeout(() => {
        set({ isOpen: false, message: undefined, timeoutId: undefined });
      }, duration);

      return {
        ...state,
        isOpen: true,
        status,
        message,
        timeoutId,
      };
    });
  },
  hideAlert: () => {
    set((state) => {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }

      return {
        ...state,
        isOpen: false,
        message: undefined,
        timeoutId: undefined,
      };
    });
  },
}));

export const selectAlertState = (state: AlertState) => state.isOpen;
export const selectAlertStatus = (state: AlertState) => state.status;
export const selectAlertMessage = (state: AlertState) => state.message;
