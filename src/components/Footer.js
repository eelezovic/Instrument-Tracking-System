import React from "react";
import styles from "./Footer.module.css"

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className={styles.footerDiv}>
    <footer>
      <p>Copyright © {currentYear} </p>
    </footer>
    </div>
  );
}

export default Footer;