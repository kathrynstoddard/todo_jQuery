$(function () {//on ready!
var todoItems = [];	

// $.getJSON('/api/data', function (data) {
// 	data.forEach(function (item) {
// 		todos.push(item.description, post, item.done);
// 	});
// 	initiate();
// });

// function initiate () {
// 	renderTasks();
// 	$('#submit-form').click(function () {
		
// 	});
// }
	
	$('#submit-form').click(function() {
		
		var postData = {
			Description: $('#add-new-todo').val(),
			done: false
		}

		todoItems.push(postData);
		renderTasks(postData);

		$.post('/api/data', JSON.stringify(todoItems), function() {
			console.log("Success!");
		});

		initiate();

	});

	function initiate() {
		$.getJSON('/api/data', function (data) {
			todoItems = data;
			renderTasks();
		});
	}	

	function renderTasks (details) {

		$content = $('<tbody></tbody>').addClass('text-center');

	       // <tr>
	       //    <td>Food truck plaid Farm-to-table</td>
	       //    <td><button class="btn btn-default"><i class="glyphicon glyphicon-minus"></i></button></td>
	       //  </tr>
	    
	    todoItems.forEach(function(todo) {
	    	var todoGlyph = todo.done ? 'glyphicon-ok' : 'glyphicon-minus';

	    	var $todoRow = $('<tr></tr>')
		   	var $todoDescription = $('<td>' + todo.Description + '</td>');
		   	var $todoCheckCell = $('<td></td>')
		    var $todoCheck = $('<button></button>').addClass("btn btn-default");
			var $todoImg = $('<i></i>').addClass('glyphicon ' + todoGlyph);

			$todoImg.click(toggleTodo);

			$content.append($todoRow.append($todoDescription));
			$content.append($todoRow.append($todoCheckCell.append($todoCheck.append($todoImg))));


			function toggleTodo () {
				if (!todo.done) {
					todo.done = true;
					$todoImg.removeClass('glyphicon-minus').addClass('glyphicon-ok');
					$todoDescription.addClass('completed');
				} else {
					todo.done = false;
					$todoImg.removeClass('glyphicon-ok completed').addClass('glyphicon-minus');
					$todoDescription.removeClass('completed');
				}
			}
	    
	    });    


		$('#todobox').html($content);

	}
});

// Todo.prototype.toggleDone = function () {
//   this.done = !this.done;
//   this.modelUpdated();
// };



