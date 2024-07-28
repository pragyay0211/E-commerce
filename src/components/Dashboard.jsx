import React from "react";
import "../styles/Dashboard.css";
import Card from "../components/WorkCard";
import { useSelector } from "react-redux";
import { BsReception4, BsPlusLg } from "react-icons/bs";

const Dashboard = () => {
  // Get the dataSelected and user from the Redux store
  const { dataSelected, user } = useSelector((state) => state.dataSelectSlice);

  // Function to render the card heading
  const renderCardHeading = (element) => {
    return (
      <div className="main-heading">
        <div className="sv1">
          {!user ? (
            <BsReception4 />
          ) : (
            <>
              <div className="logo-image">
                <img src="https://quicksell.co/assets/logo/logo.png" alt="QuickSell" />
              </div>
            </>
          )}
          <span>
            {element.title} {element.value?.length}
          </span>
        </div>
        <div className="sv2">
          <BsPlusLg />
          <span style={{ letterSpacing: "2px" }}>...</span>
        </div>
      </div>
    );
  };

  // Function to render the cards
  const renderCards = () => {
    return dataSelected.map((element, index) => (
      <div key={index} className="dashboard" style={{ backgroundColor: "whitesmoke" }}>
        {renderCardHeading(element[index])}
        <div className="list-dec">
          {element[index]?.value?.map((element, ind) => (
            <Card id={element.id} title={element.title} tags={element.tag} />
          ))}
        </div>
      </div>
    ));
  };

  // Render the Dashboard component
  return <div className="container" style={{ justifyContent: "space-evenly" }}>{dataSelected && renderCards()}</div>;
};

export default Dashboard;
