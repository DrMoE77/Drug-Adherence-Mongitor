function get_medicine() {
    var get_medicine = new Array;
    var medicine_str = localStorage.getItem('todo');
    if (medicine_str !== null) {
        medicine = JSON.parse(todos_str); 
    }
    return medicine;
}
 
function add() {
    var task = document.getElementById('dispense').value;
 
    var medicine = get_todos();
    medicine.push(task);
    localStorage.setItem('medicine', JSON.stringify(medicine));
 
    show();
 
    return false;
}
 
function clearDefault(a) {
if (a.defaultValue==a.value) {a.value=""}
	
};
function remove() {
    var id = this.getAttribute('id');
    var todos = get_medicine();
    medicine.splice(id, 1);
    localStorage.setItem('medicine', JSON.stringify(medicine));
 
    show();
 
    return false;
}
 
function show() {
    var todos = get_medicine();
 
    var html = '<ul>';
    for(var i=0; i<medicine.length; i++) {
        html += '<li>' +medicine[i] + '<button class="remove" id="' + i  + '">Delete</button> </li>';
    };
    html += '</ul>';
 
    document.getElementById('todos').innerHTML = html;
 
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
}
 
document.getElementById('add').addEventListener('click', add);
show();