$(function () {//on ready!
	var todos = [];

	$.getJSON('/api/data', function (data) {
		data.forEach(function (item) {
			todos.push(new Todo(item.description, post, item.done));
		});
		whenTodosAreLoaded();
	});

	function whenTodosAreLoaded() {
		renderTasks(todos);
		
		$('#clear-completed').click(function () {
			var remainingTodos = [];
			todos.forEach(function (todo) {
				if (todo.done === false) {
					remainingTodos.push(todo);
				}
			});

			toDos = remaingingTodos;
			post();
		});

		$('#add-new-todo').click(function () {
			var $newTodo = $('#new-todo');
			var newTodo = $newTodo.val();

			if (newTodo) {
				todos.push(new Todo(newTodo, post));
				$newTodo.val('');
				post();
			}
		});

	}

	function post () {
		$.post('/api/data', JSON.stringify(todos), function (data) {
			var returnedTodos = [];
			data.forEach(function (item) {
				returnedTodos.push(new Todo(item.description, post, item.done));
			});
			todos = returnedTodos;
			renderTasks(todos);
		});
	}

});

function renderTasks (details) {

	$content = $('<tbody></tbody>').addClass('text-center');

       // <tr>
       //    <td>Food truck plaid Farm-to-table</td>
       //    <td><button class="btn btn-default"><i class="glyphicon glyphicon-minus"></i></button></td>
       //  </tr>
    
    todos.forEach(function(todo) {
    	var todoGlyph = todo.done ? 'glyphicon-ok' : 'glyphicon-remove';

    	var $todoRow = $('<tr></tr>')
	   	var $todoDescription = $('<td>' + todo.description + '</td>');
	   	var $todoCheckRow = $('<td></td>')
	    var $todoCheck = $('<button></button>').addClass("btn btn-default");
		var $todoImg = $('<i></i>').addClass('glyphicon ' + todoGlyph);

		

		$todoButton.click(toggleTodo);

		$content.append($todoRow.append($todoDescription.append($todoCheckRow(($todoCheck.append($todoImg))))));

		function toggleTodo () {
			todo.toggleDone():
			if (todo.done) {
				$todoCheck.removeClass('glyphicon-minus').addClass('glyphicon-ok');
			} else {
				$todoIcon.removeClass('glyphicon-ok').addClass('glyphicon-minus');
			}
		}
    });    


	$('#todobox').html($content);

}

//Setup class
function Todo (description, onUpdate, done) {
	this.description = description || "Go grocery shopping";
	this.modelUpdated = onUpdate || function () {};
	this.done = false;
}

Todo.prototype.toggleDone = function () {
	this.done = !this.done;
	this.modelUpdated();
}



