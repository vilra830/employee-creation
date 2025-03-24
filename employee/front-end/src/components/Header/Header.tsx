import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logo}>
          Employee Management System
        </Link>
        <nav className={styles.header__nav}>
          <Link to="/employees" className={styles.header__link}>
            Employees
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;