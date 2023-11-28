const draggables = document.querySelectorAll(".task");
//task
const droppables = document.querySelectorAll(".swim-lane");//container

draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault(); 
    // ---> a zone is nothing more than an element..
    // console.log(zone, "<=======")
    const bottomTask = insertAboveTask(zone, e.clientY);
    console.log(bottomTask, "<==== , this is bottom task ") //nothing more than an specific p tag 
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
//here if statemet is true then it must add that element before that  element

  });
});

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");
console.log(els, "this is els ")

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;
  // console.log(closestOffset, " this is closestOffset")

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};
