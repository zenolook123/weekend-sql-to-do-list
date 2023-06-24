$(document).ready(function () {
    console.log("JQ")
    getTasks()
    $("#task-body").on('click', '.btn.btn-success.ms-1', completeTask )
    $("#save-button").on('click', postTask)
    $("#task-body").on('click', '.btn.btn-danger', deleteTask)
});




function getTasks(){
  $.ajax({
    type: "GET",
    url: "/tasks",
  }) .then((response) => {
    renderTasks(response)
  })
  .catch((error) => {
    console.log("error in get client", error);
  });
}

function completeTask() {
    let idToUpdate = $(this).closest("tr").find("th[data-id]").data("id");
    console.log(idToUpdate)
    $.ajax({
      type: "PUT",
      url: `/tasks/${idToUpdate}`,
    })
      .then((response) => {
        console.log("Completed task is set to true", response);
        getTasks()
      })
      .catch((error) => {
        console.log("Complete", error);
      });
}

function deleteTask(){
    let idToUpdate = $(this).closest("tr").find("th[data-id]").data("id");
    console.log(idToUpdate)
    $.ajax({
        type: "DELETE",
        url: `/tasks/${idToUpdate}`,
      })
        .then((response) => {
          console.log("Task is deleted", response);
          getTasks()
        })
        .catch((error) => {
          console.log("Error deleting task in client", error);
        });
}
function renderTasks(tasks) {
    $("#task-body").empty();
    for (let i = 0; i < tasks.length; i += 1) {
      let task = tasks[i];
      let newRowNotComplete = $(`
      <tr class="table-danger">
                        <th scope="row" data-id = ${task.id}>${task.id}</th>
                        <td>${task.task}</td>
                        <td>${task.completed}</td>
                        <td>
                          <button type="submit" class="btn btn-danger">Delete</button>
                          <button type="submit" class="btn btn-success ms-1">Finish</button>
                        </td>
                        <td>${task.date.split('T')[0]}</td>
                      </tr>
      `);
      let newRow = $(`
      <tr class="table-success">
                        <th scope="row" data-id = ${task.id}>${task.id}</th>
                        <td>${task.task}</td>
                        <td>${task.completed}</td>
                        <td>
                          <button type="submit" class="btn btn-danger">Delete</button>
                          <button type="submit" class="btn btn-success ms-1">Finish</button>
                        </td>
                        <td>${task.date.split('T')[0]}</td>
                      </tr>
      `);
  
        if (task.completed == true) {
            $("#task-body").append(newRow);
        } else {
            $("#task-body").append(newRowNotComplete);
        }
    
      
    }
  } // end renderTasks

  function postTask(event) {
    event.preventDefault()
console.log("in post task") 
    $.getScript("https://cdn.jsdelivr.net/npm/sweetalert2@11", function () {
      swal
        .fire({
          title: "Are you sure you want to add this task?",
          text: "Yes!",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#C64EB2",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        })
        .then((result) => {
          if (result.isConfirmed) {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            let taskObject = {
              task: $("#form1").val(),
              completed: false,
              date: formattedDate
            };
            $.ajax({
              method: "POST",
              url: "/tasks",
              data: taskObject,
            })
              .then((response) => {
                console.log("Response from server.", response);
                $("#form1").val(""),
                getTasks()
              })
              .catch((error) => {
                console.log("Error in POST", error);
                alert("Unable to add task at this time.");
              });
            Swal.fire("Confirmed!", "Do you want to add this task?", "success");
          } else {
            console.log("action cancelled");
          }
        });
    }); 
  
    
  } // en
