class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
    
    addProduct() {

    }
}

//Funcion de la interfaz de usuario
class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        //Vamod a listar lo que va dentro de nuestro HTML
        element.innerHTML = `
        <div class='card text-center mb-4'> 
            <div class="card-body">
                <strong>Product Name</strong>: ${product.name}
                <strong>Product Price</strong>: ${product.price}
                <strong>Product Year</strong>: ${product.year}
                <a href="#" class="btn btn-danger" name="delete">Delete</a>
            </div>
        </div>
        `;
        productList.appendChild(element);
        this.resetForm();//llamada al reseteo del formulario
    }

    //Funcion para resetear el formulario pero hay que llamarlo
    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        //Si da un click en el boton con el nombre delete
        if(element.name === 'delete') {
            //desde el elemento subimos un elemento para eliminar la targeta padre
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product Deleted Successfuly', 'danger');
        }
    }

    showMessage(message, cssClass) {
        //creamos otro div con estilo y dentro tiene el mensaje que le pasamos
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message))
        //Showing in DOM 
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

//DOM Events
document.getElementById('product-form').addEventListener('submit', function(e) {
    //Cogemos los valores 
     const name = document.getElementById('name').value;
     const price =  document.getElementById('price').value;
     const year = document.getElementById('year').value;

     console.log(name, price, year);

     //Instanciamos la clase Producto i creamos un objeto
     const product = new Product(name, price, year);
    //Instanciamos la clase UI y obtenemos el objeto con nos permite usar sus metodos y le
    //pasamos por parametro el objeto producto
    const ui = new UI();

    if(name === '' || price === '' || year === '') {
       return ui.showMessage('Complete Fields Please', 'danger');
    }

    ui.addProduct(product);
    ui.resetForm();//otra manera de llamar al metodo
    ui.showMessage('Product Added Successfuly', 'success')

    e.preventDefault(); //Para prevenir la recarga del submit
});

document.getElementById('product-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteProduct(e.target);
})