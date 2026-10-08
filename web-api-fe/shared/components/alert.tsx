import { CheckCircle, XCircle, AlertCircle } from "@deemlol/next-icons";
import { useAlertStore, selectAlertState } from "../store/alert.store";
import { AlertStatus } from "../type";

type AlertAttributeProp = React.HTMLAttributes<HTMLDivElement> & {
  status: AlertStatus;
  children: React.ReactNode;
};

export default function Alert({ status, children }: AlertAttributeProp) {
    const isOpen = useAlertStore(selectAlertState);
  return (
    <div className={`alert-component w-fit max-w-[600px] h-fit 
        flex p-3 rounded-[12px] text-sm text-white
        ${isOpen ? 'alert-component--open' : 'alert-component--closed'}`}>
      <div className="size-fit mr-2 pt-[3px]">
        {status == "warning" ? (
          <AlertCircle size={16} color="#FFFFFF" strokeWidth={2} />
        ) : status == "success" ? (
          <CheckCircle size={16} color="#FFFFFF" strokeWidth={2} />
        ) : (
          <XCircle size={16} color="#FFFFFF" strokeWidth={2} />
        )}
      </div>
      <p >{children}</p>
    </div>
  );
}
