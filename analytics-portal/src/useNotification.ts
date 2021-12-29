import { useState } from "react";

function useNotification() {
  const [visible, setVisible] = useState(false);
  function showNotification() {
    setVisible(true);
  }
  function hideNotification() {
    setVisible(true);
  }
  return { showNotification, hideNotification, visible };
}

export default useNotification;
