import { Link } from "react-router-dom";
import React from "react";
import { isUserAuthenticated } from "../../Services/LocalService/localService";
import styles from "./../../Styles/notFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.notfound}>
      <div className={styles.notfoundd}>
        <div className={styles.notfound404}>
          <h1>
            4<span>0</span>4
          </h1>
        </div>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <Link to={isUserAuthenticated ? "/main" : "/welcome"}>Home Page</Link>
      </div>
    </div>
  );
}
