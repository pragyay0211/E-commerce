import React, { useEffect, useState } from "react";
import { BsSliders, BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { dataSelect } from "../dataExtraction/dataSelect";
import "../styles/Navbar.css";


const Navbar = () => {
  const [slider, setSlider] = useState(false);
  const dispatch = useDispatch();
  const { tickets, users } = useSelector((state) => state.dataSlice);
  const [groups, setGroups] = useState(getGroup());
  const [order, setOrder] = useState(getOrder());

  // Helper function to get the group value from localStorage or default to "status"
  function getGroup() {
    return localStorage.getItem("group") || "status";
  }

  // Helper function to get the order value from localStorage or default to "priority"
  function getOrder() {
    return localStorage.getItem("order") || "priority";
  }

  // Handle group and order changes
  const handleGroups = (e, isGroup) => {
    const value = e.target.value;
    if (isGroup) {
      setGroups(value);
      localStorage.setItem("group", value);
    } else {
      setOrder(value);
      localStorage.setItem("order", value);
    }
    setSlider(!slider);
  };

  // Dispatch dataSelect action when tickets, users, groups, or order change
  useEffect(() => {
    if (groups === "user") {
      dispatch(
        dataSelect(groups, {
          tickets,
          users,
        }, order)
      );
    } else {
      dispatch(dataSelect(groups, tickets, order));
    }
  }, [tickets, dispatch, groups, users, order]);

  return (
    <div className="navbar">
      <div className="navbarButton">
        <button className="groupButton" onClick={() => setSlider(!slider)}>
          <BsSliders /> Display <BsChevronDown />
        </button>

        {slider && (
          <DropdownMenu>
            <GroupOption
              groups={groups}
              handleGroups={handleGroups}
            />
            <OrderOption
              order={order}
              handleGroups={handleGroups}
            />
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

// Dropdown menu component
const DropdownMenu = ({ children }) => {
  return (
    <div className="dropDown">
      {children}
    </div>
  );
};

// Group option component
const GroupOption = ({ groups, handleGroups }) => {
  return (
    <div className="group">
      <span style={{ color: "grey" }}>Grouping</span>
      <select
        value={groups}
        onChange={(e) => handleGroups(e, true)}
        name="group"
        id="group"
      >
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

// Order option component
const OrderOption = ({ order, handleGroups }) => {
  return (
    <div className="group">
      <span style={{ color: "grey" }}>Ordering</span>
      <select
        value={order}
        onChange={(e) => handleGroups(e, false)}
        name="order"
        id="order"
      >
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default Navbar;
