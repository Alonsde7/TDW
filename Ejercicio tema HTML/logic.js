function onLoad(event) {
    localStorage.setItem("x", "x");
    localStorage.setItem("y", "y");
    localStorage.setItem("z", "z");
}

function editItem(element) {
    const padre = element.parentElement;
}

function deleteItem(element) {
    console.log("Borrando");
    element.parentElement.innerHTML = "<td></td>";
}

function newTech() {

}

function newAuthor() {

}

function newComp() {

}

function newItem(){


    
}

function onLoging() {

    if (localStorage.getItem(document.getElementById("user_form").value) == document.getElementById("password_form").value) {

        const formulario = document.getElementById("logging_form");
        formulario.innerHTML = "<input type=\"submit\" name=\"logout\" value=\"logout\">";

        const table = document.getElementById("principal_table");

        for (let elemento of table.getElementsByTagName("td")) {
            elemento.innerHTML += "<input type=\"button\" name=\"edit\" value=\"edit\" onclick=\"editItem(this)\">";
            elemento.innerHTML += "<input type=\"button\" name=\"delete\" value=\"delete\" onclick=\" deleteItem(this)\">";
        }

        const newRow = document.createElement("tr");
        table.appendChild(newRow);

        newRow.innerHTML += "<td><form><input type=\"button\" name=\"nueva tecnolog&iacute;a\" value=\"nueva tacnolog&iacute;a\" onclick=\"newTech()\"></form></td>"
        newRow.innerHTML += "<td><form><input type=\"button\" name=\"nuevo autor\" value=\"nuevo autor\" onclick=\"newAuthor()\"></form></td>"
        newRow.innerHTML += "<td><form><input type=\"button\" name=\"nueva empresa\" value=\"nueva empresa\" onclick=\"newComp()\"></form></td>"

    }
}
