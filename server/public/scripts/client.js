$(document).ready(function () {
    console.log("JQ")

    
});


function getTasks(){
  $.ajax({
    type: "GET",
    url: "/tasks",
  }) .then((response) => {
    renderTasks(response);
  })
  .catch((error) => {
    console.log("error in get client", error);
  });
}


function renderTasks(tasks) {
    $("#taskBody").empty();
  
    for (let i = 0; i < tasks.length; i += 1) {
      let task = tasks[i];
      let newRow = $(`
      <tr class="table-danger" >
                        <th scope="row" data-id = ${task.id}>${task.id}</th>
                        <td>${task.task}</td>
                        <td>${task.completed}</td>
                        <td>
                          <button type="submit" class="btn btn-danger">Delete</button>
                          <button type="submit" class="btn btn-success ms-1">Finish</button>
                        </td>
                        <td>${task.date}</td>
                      </tr>
      <td><button class = "transfer-button">Ready to transfer!</button></td>
      <td><button class = "delete-button">Delete</button></td>
      </tr>
  
      `);
  
      $("#taskBody").append(newRow);
    }
  } // end renderTasks
