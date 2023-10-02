import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifActions } from "../store/notifSlice";

const Notification = () => {
  const notification = useSelector((state) => state.notif);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification.active) {
      switch (notification.type) {
        case "success":
          toast.success(notification.message, {
            onClose: () => {
              dispatch(notifActions.DESACTIVE_NOTIFICATION());
            },
          });
          break;
        case "error":
          toast.error(notification.message, {
            onClose: () => {
              dispatch(notifActions.DESACTIVE_NOTIFICATION());
            },
          });
          break;
        case "warning":
          toast.warning(notification.message, {
            onClose: () => {
              dispatch(notifActions.DESACTIVE_NOTIFICATION());
            },
          });
          break;
        case "info":
          toast.info(notification.message, {
            onClose: () => {
              dispatch(notifActions.DESACTIVE_NOTIFICATION());
            },
          });
          break;
        default:
          toast(notification.message, {
            onClose: () => {
              dispatch(notifActions.DESACTIVE_NOTIFICATION());
            },
          });
      }
    }
  }, [notification, dispatch]);

  return <ToastContainer></ToastContainer>;
};

export default Notification;
