import { useState } from "react";

function usePopup() {
  const [visible, setVisible] = useState(false);
  function showPopup() {
    setVisible(true);
  }
  function hidePopup() {
    setVisible(false);
  }
  return { showPopup, hidePopup, visible };
}

export default usePopup;
