import { Toaster } from "react-hot-toast";

const ToastConfig = () => {
  return (
    <Toaster
      position="bottom-left"
      toastOptions={{
        duration: 3000,

        style: {
          fontSize: 14,
        },
      }}
    />
  );
};

export default ToastConfig;
