function onLoad(event) {
    localStorage.setItem("x", "x");
    localStorage.setItem("y", "y");
    localStorage.setItem("z", "z");
}

function editItem(element) {
    const padre = element.padre;
}

function deleteItem(element) {
    const padre = element.padre;
}

function onLoging() {

    if (localStorage.getItem(document.getElementById("user_form").value) == document.getElementById("password_form").value) {

        const formulario = document.getElementById("logging_form");
        const table = document.getElementById("principal_table");

        formulario.innerHTML = "<input type=\"submit\" name=\"logout\" value=\"logout\">";
        for (let elemento of table.getElementsByTagName("td")) {
            elemento.innerHTML += "<input type=\"button\" name=\"edit\" value=\"edit\" onclick=\"editItem(this)\">";
            elemento.innerHTML += "<input type=\"button\" name=\"delete\" value=\"delete\" onclick=\deleteItem(this)\">";
        }
    }
}