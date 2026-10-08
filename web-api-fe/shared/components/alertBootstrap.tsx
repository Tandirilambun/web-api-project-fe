"use client";

import {
  selectAlertMessage,
  selectAlertState,
  useAlertStore,
  selectAlertStatus,
} from "../store/alert.store";
import Alert from "./alert";

export function AlertBootstrap() {
  const state = useAlertStore(selectAlertState);
  const message = useAlertStore(selectAlertMessage);
  const status = useAlertStore(selectAlertStatus);
  if (state) return <Alert status={status}>{message}</Alert>;
  return null;
}
