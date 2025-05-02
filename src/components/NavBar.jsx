// NavBar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdAdd } from "react-icons/io";
import { FaHome, FaUser, FaSearch, FaShoppingCart } from "react-icons/fa";
import { logout } from "../utils/logout";
import { HiOutlineLogout } from "react-icons/hi";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <StyledWrapper>
      <div className="button-container">
        <Link to="/create-task" className="button">
          <IoMdAdd size={24} />
        </Link>
        <Link to="/" className="button">
          <FaHome />
        </Link>
        <Link to="/search" className="button">
          <FaSearch />
        </Link>
        <Link to="/login" className="button">
          <FaUser />
        </Link>
        <Link to="/login" className="button" onClick={() => logout(navigate)}>
          <HiOutlineLogout size={20} />
        </Link>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  .button-container {
    display: flex;
    background-color: rgb(27, 133, 219);
    width: 200px;
    height: 35px;
    align-items: center;
    justify-content: space-around;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px,
      rgba(27, 133, 219, 0.5) 5px 10px 15px;
  }

  .button {
    outline: 0 !important;
    border: 0 !important;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all ease-in-out 0.3s;
    cursor: pointer;
  }

  .button:hover {
    transform: translateY(-3px);
  }

  .icon {
    font-size: 20px;
  }
`;

export default NavBar;
