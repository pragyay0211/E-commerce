/**
 * Selects and groups data based on the given parameters.
 *
 * @param {string} group - The grouping criteria ("status", "user", or any other value).
 * @param {Array} tickets - The array of tickets to be grouped.
 * @param {string} order - The sorting order ("title", "priority", or any other value).
 * @returns {Function} - The async dispatch function.
 */
export const dataSelect = (group, tickets, order) => async (dispatch) => {
    try {
        dispatch({ type: "dataSelectRequest" });

        let user = false;
        let dataSelected = [];

        if (order === "title") {
            dataSelected = sortByTitle(dataSelected);
        }

        if (group === "status") {
            dataSelected = groupByStatus(tickets);
        } else if (group === "user") {
            user = true;
            dataSelected = groupByUser(tickets);

        } else {
            dataSelected = groupByPriority(tickets);
        }

        if (order === "priority") {
            dataSelected = sortByPriority(dataSelected);
        }


        dispatch({ type: "dataSelectSuccess", payload: { dataSelected, user } });
    } catch (error) {
        dispatch({ type: "dataSelectFailure", payload: error.message });
    }
};

const sortByTitle = (dataSelected) => {
    dataSelected.forEach((element, index) => {
        element[index]?.value?.sort((a, b) => a.title.localeCompare(b.title));
    });
    return dataSelected;
};

const sortByPriority = (dataSelected) => {
    dataSelected.forEach((element, index) => {
        element[index]?.value?.sort((a, b) => b.priority - a.priority);
    });
    return dataSelected;
};


const groupByStatus = (tickets) => {
    const set = new Set();
    const dataSelected = [];

    tickets.forEach((element) => {
        set.add(element.status);
    });

    const array = [...set];

    array.forEach((element, index) => {
        const array = tickets.filter((filterElement) => {
            return element === filterElement.status;
        });
        dataSelected.push({
            [index]: {
                title: element,
                value: array,
            },
        });
    });

    return dataSelected;
};

const groupByUser = (tickets) => {
    const dataSelected = [];

    tickets?.users?.forEach((element, index) => {
        const array = tickets?.tickets?.filter((filterElement) => {
            return element.id === filterElement.userId;
        });

        dataSelected.push({
            [index]: {
                title: element.name,
                value: array,
            },
        });
    });

    return dataSelected;
};

const groupByPriority = (tickets) => {
    const priorityList = ["No priority", "Low", "Medium", "High", "Urgent"];
    const dataSelected = [];

    priorityList.forEach((element, index) => {
        const array = tickets.filter((filterElement) => {
            return index === filterElement.priority;
        });

        dataSelected.push({
            [index]: {
                title: element,
                value: array,
            },
        });
    });

    return dataSelected;
};

