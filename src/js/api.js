const throwAwayAccInfo = {
  project: "1133244609073163",
  token: "0/39e59bb0e571b63f7b6efdce4858f521"
};

const { project, token } = throwAwayAccInfo;

/**
 * @summary Fetches all of the existing tasks from Asana's api
 * @returns {Promise<Array>} The promise with the tasks from Asana
 */
const getTasksFromAsana = () => {
  const url = `https://app.asana.com/api/1.0/projects/${project}/tasks?opt_fields=name,id`;

  return fetch(url, {
    cache: "no-cache",
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`
    },

    method: "GET"
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};

/**
 * @summary Post a new task in Asana
 * @param {String} newTask The text of the new task to be created
 * @returns {Promise<Object>} The promise that has the id field for each new task
 */
const postTaskToAsana = (newTask = "") => {
  const newObjectTask = { data: { name: newTask } };

  const url = `https://app.asana.com/api/1.0/tasks?projects=${project}`;

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(newObjectTask),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .catch(error => console.log("unable to create task, fix error: ", error));
};

/**
 * @summary Updates an existing task in Asana
 * @param {Number} taskId The id of the task
 * @param {String} newTaskName The task string
 * @returns void
 */
const editTaskToAsana = (taskId, newTaskName) => {
  const newObjectTask = { data: { name: newTaskName } };
  const url = `https://app.asana.com/api/1.0/tasks/${taskId}`;

  fetch(url, {
    method: "PUT",
    body: JSON.stringify(newObjectTask),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => console.log("Success editing task: ", response))
    .catch(function(error) {
      console.log("Unable to edit task, ", error);
    });
};

/**
 * @summary Deletes the task from Asana
 * @param {Number} taskId The id of the task
 * @returns {Promise} Signifies when task was deleted from Asana
 */
const deleteTaskFromAsana = taskId => {
  const url = `https://app.asana.com/api/1.0/tasks/${taskId}`;

  return fetch(url, {
    cache: "no-cache",
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`
    },

    method: "DELETE"
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};
