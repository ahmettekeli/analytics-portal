import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";

function Home() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h3>Home page</h3>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/overview");
        }}
      >
        Overview
      </Button>
    </motion.div>
  );
}

export default Home;
