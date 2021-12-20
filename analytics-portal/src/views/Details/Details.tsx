import { useState } from "react";
import { useParams } from "react-router-dom";
import Popup from "../../components/Popup/Popup";
import { isNameValid } from "../../utils/utilities";

function Details() {
  const { name } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  function handleAddingCampaign(campaignName: string) {
    //TODO validate campaignName.
    if (isNameValid(campaignName)) {
      console.log("adding campaign");
      setIsPopupOpen(false);
      return;
    }
    console.log("Name is not valid");
    //TODO show success message in snackbar here.
  }
  return (
    <div>
      Details page: {name}
      <Popup
        isOpen={isPopupOpen}
        hide={() => {
          setIsPopupOpen(false);
        }}
        onAdd={handleAddingCampaign}
      ></Popup>
    </div>
  );
}

export default Details;
