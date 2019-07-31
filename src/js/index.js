/**
 * @summary Adds a spinner while app is fetching the tasks from Asana
 * @returns void
 */
const addLoadingSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("loading-spinner");
  document.querySelector(".project-body").appendChild(spinner);
};

/**
 * @summary Main entry point of the app
 * @returns void
 */
const main = async () => {
  addInitialEventListeners();
  addLoadingSpinner();

  const { data } = await getTasksFromAsana();
  insertTasksToDom(data);

  document.querySelector(".loading-spinner").remove();
};

main();
