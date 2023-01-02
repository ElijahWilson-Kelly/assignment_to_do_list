const baseURL = "http://localhost:3000/";
const headers = {
  "Content-Type": "application/json",
};

const getFullListAPI = async function () {
  try {
    const responseObj = await fetch(baseURL, { headers });
    const response = await responseObj.json();
    return response;
  } catch (err) {
    console.log(err);
  }
};

const addTaskAPI = async function (description) {
  const body = JSON.stringify({ description, done: false });

  try {
    const responseObj = await fetch(baseURL, {
      method: "POST",
      body,
      headers,
    });
    const response = await responseObj.json();

    return response;
  } catch (err) {
    console.log(err);
  }
};

const updateTaskAPI = async function (item, key) {
  const body = JSON.stringify({ [key]: item[key] });

  try {
    fetch(baseURL + `${item._id}`, {
      method: "PUT",
      body,
      headers,
    });
  } catch (err) {
    console.log(err);
  }
};

const removeTaskAPI = async function (id) {
  try {
    fetch(baseURL + `${id}`, { method: "DELETE" });
  } catch (err) {
    console.log(err);
  }
};
