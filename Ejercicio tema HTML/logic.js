let personas = [];
let companies = [];


function onLoad(event) {

    localStorage.setItem("x", "x");
    localStorage.setItem("y", "y");
    localStorage.setItem("z", "z");

    mostrarElementos();
    addListenerOptions();

}

function addListenerOptions() {

    const TABLE = document.getElementById("mainTable");

    for (let elemento of TABLE.getElementsByTagName("img")) {

        elemento.setAttribute("onclick", "pagina(this)");
    }

    for (let elemento of TABLE.getElementsByTagName("a")) {

        elemento.setAttribute("onclick", "pagina(this)");
    }
}

function pagina(imagen) {

    if (imagen.tagName == 'A') {

        imagen = imagen.previousElementSibling;
    }

    let lista;
    switch (imagen.getAttribute('columna')) {

        case '0':
            lista = "listaProductos";
            break;

        case '1':
            lista = "listaPersonas";
            break;

        case '2':
            lista = "listaCompany";
            break;
    }

    console.log(JSON.parse(localStorage.getItem(lista)));
    const OBJECT = JSON.parse(localStorage.getItem(lista))[imagen.getAttribute("id")];

    let page = `
    <!DOCTYPE html>
    <html lang="es">

<head>
    <title>Anales de la Ciencia - ${OBJECT["nombre"]}</title>
    <meta charset="UTF-8">
    <meta name="author" content="&Aacute;lvaro Alonso Devesa">
    <meta name="keywords" content="Anales de la Ciencia, ${OBJECT["nombre"]}">
    <link rel="stylesheet" type="text/css" href="style.css">
    <script language="JavaScript" src="logic.js"></script>
</head>

<body>
    <header>
        <h1>Anales de la Ciencia</h1>
    </header>
    <nav>
        <a href="index.html" title="index">INICIO</a>
    </nav>
    <main>
        <section>
            <h2>${OBJECT["nombre"]}</h2>
            <article>
                <p>
                    ${OBJECT["fechaNac"]}
                    <br>
                    ${OBJECT["fechaDef"]}
                </p>
            </article>
            <nav>
                <img class="mainImage" src="${OBJECT["imagePath"]}" alt="${OBJECT["nombre"]}">
            </nav>
        </section>
        <section>
            <iframe src="${OBJECT["WikiPage"]}" name="${OBJECT["nombre"]}Frame"></iframe>
        </section>
    </main>
    <footer>`;

    (OBJECT["creadores"] ?? []).forEach(creador => {

        const PERSONAS = JSON.parse(localStorage.getItem("listaPersonas"));

        let i = 0;
        encontrado = false;

        while (!encontrado && i < PERSONAS.length) {

            if (PERSONAS[i]["nombre"] == creador) {
                encontrado = true;
                page += `<img class="rightimages" src="${PERSONAS[i]["imagePath"]}" id=${i} columna="1" onclick="pagina(this)">`;
            }

            i++;
        }
    });

    (OBJECT["empresas"] ?? []).forEach(empresa => {

        const COMPANY = JSON.parse(localStorage.getItem("listaCompany"));

        let i = 0;
        encontrado = false;

        while (!encontrado && i < COMPANY.length) {

            if (COMPANY[i]["nombre"] == empresa) {

                encontrado = true;
                page += `<img class="leftimages" src="${COMPANY[i]["imagePath"]}" id=${i} columna="2" onclick="pagina(this)">`;
            }

            i++;
        }
    });

    page += '</footer></body></html>';

    const VENTANA = window.open(OBJECT["nombre"]);
    VENTANA.document.write(page);

}

function addWriterOptions() {

    const TABLE = document.getElementById("mainTable");

    for (let elemento of TABLE.getElementsByTagName("td")) {

        if (elemento.firstChild) {

            elemento.innerHTML += "<input type=\"button\" name=\"edit\" value=\"edit\" onclick=\"editItem(this)\">";
            elemento.innerHTML += "<input type=\"button\" name=\"delete\" value=\"delete\" onclick=\" deleteItem(this)\">";
        }
    }

    const NEWROW = document.createElement("tr");
    TABLE.appendChild(NEWROW);

    NEWROW.innerHTML += "<td><form><input id=\"botonNuevoProducto\" type=\"button\" name=\"nuevo producto\" value=\"nuevo producto\" onclick=\"newFormProduct()\"></form></td>"
    NEWROW.innerHTML += "<td><form><input id=\"botonNuevaPersona\" type=\"button\" name=\"nueva persona\" value=\"nueva persona\" onclick=\"newFormPerson()\"></form></td>"
    NEWROW.innerHTML += "<td><form><input id=\"botonNuevaEmpresa\" type=\"button\" name=\"nuevo entidad\" value=\"nueva entidad\" onclick=\"newFormCompany()\"></form></td>"

    const MAINSTRUCTURE = document.getElementById("mainStructure");
    const FORM = document.createElement("form");
    FORM.setAttribute("id", "newItemForm");
    MAINSTRUCTURE.appendChild(FORM);

}

function mostrarElementos() {

    const ARRAYPRODUCTOS = JSON.parse(localStorage.getItem("listaProductos")) ?? [];
    const ARRAYPEOPLE = JSON.parse(localStorage.getItem("listaPersonas")) ?? [];
    const ARRAYCOMPANIES = JSON.parse(localStorage.getItem("listaCompany")) ?? [];
    const TABLE = document.getElementById("mainTable");

    TABLE.innerHTML = "";

    for (let i = 0; i < Math.max(ARRAYPRODUCTOS.length, ARRAYPEOPLE.length, ARRAYCOMPANIES.length); i++) {

        const NEWROW = document.createElement("tr");
        TABLE.appendChild(NEWROW);

        [ARRAYPRODUCTOS, ARRAYPEOPLE, ARRAYCOMPANIES].forEach((element, index) => {

            const OBJECT = element[i] ?? [];

            if (OBJECT['nombre']) {

                let newElement = document.createElement("td");
                NEWROW.appendChild(newElement);
                newElement.innerHTML = `<img src="${OBJECT['imagePath']}" name="${OBJECT['nombre']}" id="${i}" columna="${index}"><a>${OBJECT['nombre']}</a>`;

            } else { NEWROW.innerHTML += "<td></>"; }
        });
    }
}

function editItem(element) {
    const IMAGEN = element.parentElement.firstChild;
    console.log(IMAGEN.getAttribute("columna"));

    switch (IMAGEN.getAttribute("columna")) {

        case '0':
            newFormProduct(IMAGEN.getAttribute("id"));
            break;

        case '1':
            newFormPerson(IMAGEN.getAttribute("id"));
            break;

        case '2':
            newFormCompany(IMAGEN.getAttribute("id"));
            break;
    }
}

function deleteItem(element) {

    let lista;

    switch (element.parentElement.getElementsByTagName("img")[0].getAttribute('columna')) {

        case '0':
            lista = "listaProductos";
            break;

        case '1':
            lista = "listaPersonas";
            break;

        case '2':
            lista = "listaCompany";
            break;
    }

    const ARRAY = JSON.parse(localStorage.getItem(lista));
    ARRAY.splice(element.parentElement.getElementsByTagName("img")[0].getAttribute('id'), 1);

    localStorage.setItem(lista, JSON.stringify(ARRAY));
    element.parentElement.innerHTML = "<td></td>";
}

function onLoging() {

    if (localStorage.getItem(document.getElementById("user_form").value) == document.getElementById("password_form").value) {

        const FORMULARIO = document.getElementById("logging_form");
        FORMULARIO.innerHTML = "<input type=\"submit\" name=\"logout\" value=\"logout\">";

        addWriterOptions();
    }
}

function newForm() {

    const FORM = document.getElementById("newItemForm");

    FORM.innerHTML = "<label for=\"Name\">Nombre y Apellidos: </label><input id=\"Name\" type=\"text\" name=\"Name\"/> <br>";
    FORM.innerHTML += "<label for=\"BornDate\">Año de nacimiento: </label><input id=\"BornDate\" type=\"date\" name=\"BornDate\"/><br>";
    FORM.innerHTML += "<label for=\"DeathDate\">Año de defunci&oacute;n: </label><input id=\"DeathDate\" type=\"date\" name=\"DeathDate\"/><br>";
    FORM.innerHTML += "<label for=\"WikiPage\">P&aacute;gina de la Wikipedia: </label><input id=\"WikiPage\" type=\"text\" name=\"WikiPage\"/><br>";
    FORM.innerHTML += "<label for=\"ImagePath\">Nombre Absoluto de la im&aacutegen o enlace web a una im&aacutegen: </label><input id=\"ImagePath\" type=\"text\" name=\"ImagePath\"/>";

}

function newFormPerson(id = -1) {

    newForm();

    document.getElementById("newItemForm").innerHTML += `<br><br><input type="button" name="Crear Persona" value="crear Persona" onclick="newPerson(${id})">`;

}

function newFormCompany(id = -1) {

    const FORM = document.getElementById("newItemForm");
    personas = [];
    newForm();

    FORM.innerHTML += "<br><label for=\"Addpersonas\">Nombre y Apellidos de la persona: </label><input id=\"Addpersonas\" type=\"text\" name=\"Addpersonas\"/>";
    FORM.innerHTML += "<input type=\"button\" name=\"Add personas\" value=\"Añadir\" onclick=\"addPersona()\"><br><ul></ul><br>";
    FORM.innerHTML += `<input type="button" name="crear Compañia" value="crear Compañia" onclick="newCompany(${id})">`;

}

function addPersona() {

    personas.push(document.getElementById("Addpersonas").value);
    document.getElementsByTagName("ul")[0].innerHTML += `<li>${document.getElementById("Addpersonas").value}</li>`;

}

function newPerson() {

    const PERSONA = {
        nombre: document.getElementById("Name").value,
        fechaNac: document.getElementById("BornDate").value,
        fechaDef: document.getElementById("DeathDate").value,
        imagePath: document.getElementById("ImagePath").value,
        WikiPage: document.getElementById("WikiPage").value,
    };

    document.getElementById("newItemForm").innerHTML = "";

    const ARRAYPERSONAS = JSON.parse(localStorage.getItem("listaPersonas")) ?? [];
    if (id == -1) { ARRAYPERSONAS.push(PERSONA); }
    else { ARRAYPERSONAS[id] = PERSONA; }
    localStorage.setItem("listaPersonas", JSON.stringify(ARRAYPERSONAS));

    mostrarElementos();
    addWriterOptions();
    addListenerOptions();

}

function newFormProduct(id = -1) {

    personas = [];

    newForm();

    const FORM = document.getElementById("newItemForm");

    FORM.innerHTML += "<br><label for=\"Addpersonas\">Nombre y Apellidos de la persona: </label><input id=\"Addpersonas\" type=\"text\" name=\"Addpersonas\"/>";
    FORM.innerHTML += "<input type=\"button\" name=\"Add personas\" value=\"Añadir\" onclick=\"addPersona()\"><br><ul></ul><br>";

    FORM.innerHTML += "<br><label for=\"AddCompany\">Nombre de la compañia: </label><input id=\"AddCompany\" type=\"text\" name=\"AddCompany\"/>";
    FORM.innerHTML += "<input type=\"button\" name=\"Add Compañia\" value=\"Añadir\" onclick=\"addCompany()\"><br><ul></ul><br>";

    FORM.innerHTML += `<input type="button" name="crear Producto" value="crear Producto" onclick="newProduct(${id})">`;

}

function addCompany() {

    companies.push(document.getElementById("AddCompany").value);
    document.getElementsByTagName("ul")[1].innerHTML += `<li>${document.getElementById("AddCompany").value}</li>`;

}

function newProduct() {

    const PRODUCT = {

        nombre: document.getElementById("Name").value,
        fechaNac: document.getElementById("BornDate").value,
        fechaDef: document.getElementById("DeathDate").value,
        imagePath: document.getElementById("ImagePath").value,
        WikiPage: document.getElementById("WikiPage").value,
        creadores: personas,
        empresas: companies
    }

    document.getElementById("newItemForm").innerHTML = "";

    const ARRAYPRODUCTOS = JSON.parse(localStorage.getItem("listaProductos")) ?? [];
    if (id == -1) { ARRAYPRODUCTOS.push(PRODUCT); }
    else { ARRAYPRODUCTOS[id] = PRODUCT; }
    localStorage.setItem("listaProductos", JSON.stringify(ARRAYPRODUCTOS));

    mostrarElementos();
    addWriterOptions();
    addListenerOptions();

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

    document.getElementById("newItemForm").innerHTML = "";

    const ARRAYCOMPANIES = JSON.parse(localStorage.getItem("listaCompany")) ?? [];
    if (id == -1) { ARRAYCOMPANIES.push(COMPANY); }
    else { ARRAYCOMPANIES[id] = COMPANY; }
    localStorage.setItem("listaCompany", JSON.stringify(ARRAYCOMPANIES));

    personas = [];

    mostrarElementos();
    addWriterOptions();
    addListenerOptions();

}
