import { motion } from "framer-motion";
import { Wrapper } from "./NotFound404.styles";

function NotFound404() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper>
        <h1>404</h1>
        <h2>Page not found</h2>
      </Wrapper>
    </motion.div>
  );
}

export default NotFound404;
