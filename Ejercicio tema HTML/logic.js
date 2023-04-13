let personas = [];

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

function onLoging() {

    if (localStorage.getItem(document.getElementById("user_form").value) == document.getElementById("password_form").value) {

        const FORMULARIO = document.getElementById("logging_form");
        FORMULARIO.innerHTML = "<input type=\"submit\" name=\"logout\" value=\"logout\">";

        const TABLE = document.getElementById("mainTable");

        for (let elemento of TABLE.getElementsByTagName("td")) {
            elemento.innerHTML += "<input type=\"button\" name=\"edit\" value=\"edit\" onclick=\"editItem(this)\">";
            elemento.innerHTML += "<input type=\"button\" name=\"delete\" value=\"delete\" onclick=\" deleteItem(this)\">";
        }

        const NEWROW = document.createElement("tr");
        TABLE.appendChild(NEWROW);

        NEWROW.innerHTML += "<td><form><input type=\"button\" name=\"nuevo producto\" value=\"nuevo producto\" onclick=\"newProduct()\"></form></td>"
        NEWROW.innerHTML += "<td><form><input type=\"button\" name=\"nueva persona\" value=\"nueva persona\" onclick=\"newFormPerson()\"></form></td>"
        NEWROW.innerHTML += "<td><form><input type=\"button\" name=\"nuevo entidad\" value=\"nueva entidad\" onclick=\"newFormCompany()\"></form></td>"

    }
}

function newForm() {

    const FORM = document.getElementById("newItemForm");

    FORM.innerHTML = "<label for=\"Name\">Nombre y Apellidos: </label><input id=\"Name\" type=\"text\" name=\"Name\"/> <br>";
    FORM.innerHTML += "<label for=\"BornDate\">Año de nacimiento: </label><input id=\"BornDate\" type=\"date\" name=\"BornDate\"/><br>";
    FORM.innerHTML += "<label for=\"DeathDate\">Año de defunci&oacute;n: </label><input id=\"DeathDate\" type=\"date\" name=\"DeathDate\"/><br>";
    FORM.innerHTML += "<label for=\"WikiPage\">P&aacute;gina de la Wikipedia: </label><input id=\"WikiPage\" type=\"text\" name=\"WikiPage\"/><br>";
    FORM.innerHTML += "<label for=\"ImagePath\">Nombre Absoluto de la imagen: </label><input id=\"ImagePath\" type=\"text\" name=\"ImagePath\"/>";

}

function newFormPerson() {

    const MAINSTRUCTURE = document.getElementById("mainStructure");

    const FORM = document.createElement("form");
    FORM.setAttribute("id", "newItemForm");
    MAINSTRUCTURE.appendChild(FORM);

    newForm();

    FORM.innerHTML += "<input type=\"button\" name=\"Crear Persona\" value=\"crear Persona\" onclick=\"newPerson()\">";

}

function newFormCompany() {

    const MAINSTRUCTURE = document.getElementById("mainStructure");
    const FORM = document.createElement("form");
    FORM.setAttribute("id", "newItemForm");
    MAINSTRUCTURE.appendChild(FORM);

    personas = [];

    newForm();
    //En vez de un texto, se podia hacer un selector de personas
    FORM.innerHTML += "<br><label for=\"Addpersonas\">Nombre y Apellidos de la persona: </label><input id=\"Addpersonas\" type=\"text\" name=\"Addpersonas\"/>";
    FORM.innerHTML += "<input type=\"button\" name=\"Add personas\" value=\"Añadir\" onclick=\"addPersona()\"><br><ul></ul><br>";
    FORM.innerHTML += "<input type=\"button\" name=\"crear Compañia\" value=\"crear Compañia\" onclick=\"newCompany()\">";


}

function addPersona() {

    personas[personas.length] = document.getElementById("Addpersonas").value;

    document.getElementsByTagName("ul")[0].innerHTML += `<li>${document.getElementById("Addpersonas").value}</li>`;

}

function newPerson() {

    const PERSONA = {
        nombre: document.getElementById("Name").value,
        fechaNac: document.getElementById("BornDate").value,
        fechaDef: document.getElementById("DeathDate").value,
        imagePath: document.getElementById("ImagePath").value,
        WikiPage: document.getElementById("WikiPage").value,
        referenciaP: 0,
        referenciaE: 0
    };


    document.getElementById("newItemForm").remove();
    //localStorage.setItem(PERSONA['nombre'], JSON.stringify(PERSONA));
    //localStorage.setItem("listaPersonas", localStorage.getItem("listaPersonas") + PERSONA['nombre']);

    console.log(JSON.stringify(PERSONA));
    console.log(PERSONA['nombre']);

}

function newProduct() {

    const MAINSTRUCTURE = document.getElementById("mainStructure");
    const FORM = document.createElement("form");
    FORM.setAttribute("id", "newItemForm");
    MAINSTRUCTURE.appendChild(FORM);

    personas = [];

    newForm();



}

function newCompany() {

    const COMPANY = {
        nombre: document.getElementById("Name").value,
        fechaNac: document.getElementById("BornDate").value,
        fechaDef: document.getElementById("DeathDate").value,
        imagePath: document.getElementById("ImagePath").value,
        WikiPage: document.getElementById("WikiPage").value,
        creadores: personas
    };

    document.getElementById("newItemForm").remove();
    //TODO: FALTARIA MODIFICAR LOS VALORES DE LAS PERSONAS
    //localStorage.setItem(COMPANY['nombre'], JSON.stringify(COMPANY));
    //localStorage.setItem("listaCompany", localStorage.getItem("listaCompany") + COMPANY['nombre']);

    personas = [];

}
