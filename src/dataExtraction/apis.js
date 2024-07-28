export const fetchData = () => async (dispatch) => {
  try {
    dispatch({ type: "dataRequest" });

    const response = await fetch(
      "https://api.quicksell.co/v1/internal/frontend-assignment/"
    );

    if (response.ok) {
      const data = await response.json();
      // const title = data.tickets[0].title;
      // console.log("data is" ,title);
      dispatch({ type: "dataSuccess", payload: data });
    } else {
      throw new Error("Request failed");
    }
  } catch (error) {
    dispatch({ type: "dataFailure" });
  }
};

