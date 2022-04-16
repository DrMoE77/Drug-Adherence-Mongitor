function get_medoclock() {
    var medoclock = new Array;
    var medoclcock_str = localStorage.getItem('todo');
    if (medoclock_str !== null) {
        medoclock = JSON.parse(medoclock_str); 
    }
    return todos;
}
 
function add() {
    var medicine = document.getElementById('medicine').value;
 
    var medoclock = get_medoclock();
    medoclock.push(medicine);
    localStorage.setItem('medicine', JSON.stringify(medicine));
 
    show();
 
    return false;
}
 
function clearDefault(a) {
if (a.defaultValue==a.value) {a.value=""}
	
};
function remove() {
    var id = this.getAttribute('id');
    var medicine = get_medicine();
    medicine.splice(id, 1);
    localStorage.setItem('medicine', JSON.stringify(medicine));
 
    show();
 
    return false;
}
 
function show() {
    var medicine = get_medicine();
 
    var html = '<ul>';
    for(var i=0; i<medicine.length; i++) {
        html += '<li>' + medicine[i] + '<button class="remove" id="' + i  + '">Delete</button> </li>';
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