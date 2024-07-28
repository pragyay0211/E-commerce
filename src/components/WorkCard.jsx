import React from "react";
import "../styles/Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faExclamation } from '@fortawesome/free-solid-svg-icons';

/**
 * Represents a work card component.
 *
 * @component
 * @param {Object} props - The properties of the work card.
 * @param {string} props.id - The ID of the work card.
 * @param {string} props.title - The title of the work card.
 * @param {string[]} props.tags - The tags associated with the work card.
 * @param {string} props.status - The status of the work card.
 * @returns {JSX.Element} The work card component.
 */
const WorkCard = ({ id, title, tags, status }) => {
  return (
    <div className="container">

      <div className="heading">
        <span className="id-text">{id}</span>
        <div className="logo-image">
        <img
          src="https://quicksell.co/assets/logo/logo.png"
          alt="Qs"
        />
      </div>
        <div className="work-status">{status}</div>
      </div>

      <div className="work-title">
      {/* <span style={{padding: "0px 5px"}}><FontAwesomeIcon icon={faCircle} style={{ color: "#a9acb2", alignItems:"left"}} /></span> */}
        <span style={{justifyContent: "center", alignContent:"center", alignItems:"center"}}> {title}</span>
      </div>

      <div className="tags">
        <div className="tag" style={{ backgroundColor: "smoke-white" }}>
          <FontAwesomeIcon icon={faExclamation} style={{ color: "black" }} />
        </div>
        {tags?.map((element, index) => (
          <div key={index} className="tag">
            <FontAwesomeIcon icon={faCircle} style={{ color: "#a9acb2" }} />
            <span></span> {element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkCard;
