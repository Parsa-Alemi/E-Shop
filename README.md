# E-shop

## backend API for E-shop

This API uses MongoDB and express in order to create backend API for Online shopping

## Installation

```sh
$ git clone https://github.com/Parsa-Alemi/E-shop.git
$ cd E-shop
$ npm i
$ npm start

```

### Creating environment valuables

we need to setup 2 valuables as environment valuables

```sh
API_URL
SECRET
```

you can create environment valuables by adding a file name `.env` to your main folder and assign to value to the file

```sh
API_URL = value1
SECRET  = value2
```

## Usage

### Users

```sh
GET: host://API_URL/users => Show users list,  Is_Admin = true

GET: host://API_URL/users/id => Show user by id,  Is_Admin = true

POST ://API_URL/users => Adding user,  Is_Admin = true

POST ://API_URL/users/login => Login and generating Token,  Is_Admin = false

DELETE://API_URL/users/id => Deleting user,  Is_Admin = true
```

### Products

```sh
GET: host://API_URL/products => Show products list,  Is_Admin = false

GET: host://API_URL/products/id => Show product by id,  Is_Admin = false

POST ://API_URL/products => Adding product,  Is_Admin = true

PUT ://API_URL/products/id => Updating product,  Is_Admin = true

DELETE://API_URL/products/id => Deleting product,  Is_Admin = true
```

### Orders

```sh
GET: host://API_URL/orders => Show orders list,  Is_Admin = true

GET: host://API_URL/orders/id => Show order by id,  Is_Admin = false

POST ://API_URL/orders => Adding order,  Is_Admin = false

PUT ://API_URL/orders/id => Updating order,  Is_Admin = false

DELETE://API_URL/orders/id => Deleting order,  Is_Admin = true
```

### Categories

```sh
GET: host://API_URL/categories => Show Categories list,  Is_Admin = true

GET: host://API_URL/categories/id => Show Categorie by id,  Is_Admin = true

POST ://API_URL/categories => Adding Categorie,  Is_Admin = true

PUT ://API_URL/categories/id => Updating Categorie,  Is_Admin = true

DELETE://API_URL/categories/id => Deleting Categorie,  Is_Admin = true
```
