# `Book` Endpoints

Get Deatils of Books.

## Routes

|Name|Method|Route|
|---|---|---|
|[List](#endpoint-list)|`GET`| `/api/books/`|
|[Show](#endpoint-show)|`GET`| `/api/books/:id`|
|[Create](#endpoint-create)|`POST`| `/api/books/:id`|
|[Update](#endpoint-update)|`PUT`| `/api/books/:id/edit`|
|[Delete](#endpoint-delete)|`DELETE`|`/api/books/:id`|

## EndPoint LIST

Lists all the Books in DB

### LIST Example

#### Request `GET /api/books/`

```properties
curl --location --request GET 'localhost:7894/api/books/'
```

#### Response `GET /api/books/`

``` json
[
    {
        "_id": "5e7fc914cb2d74473c3ee4c0",
        "name": "fault-tolerant Enhanced",
        "cupBoardNumber": 88562,
        "genre": "GB",
        "__v": 0
    },
    {
        "_id": "5e7fc914cb2d74473c3ee4c2",
        "name": "open-source",
        "cupBoardNumber": 69213,
        "genre": "Intelligent",
        "__v": 0
    },
    {
        "_id": "5e7fc914cb2d74473c3ee4c3",
        "name": "Post Man",
        "cupBoardNumber": 74185,
        "genre": "Intelligent",
        "__v": 0
    }
]
```

## EndPoint SHOW

Shows The Book Requested

### SHOW Example

#### Request `GET /api/books/:id`

```properties
curl --location --request GET 'localhost:7894/api/books/5e7fc914cb2d74473c3ee4c0'
```

#### Response `GET /api/books/:id`

``` json
{
    "_id": "5e7fc914cb2d74473c3ee4c0",
    "name": "fault-tolerant Enhanced",
    "cupBoardNumber": 88562,
    "genre": "GB",
    "__v": 0
}
```

## EndPoint Create

Creates A Book and Sends the Created Book

### CREATE Example

#### Request `POST /api/books/:id`

```properties
curl --location --request POST 'localhost:7894/api/books/' \
--header 'Content-Type: application/json' \
--data-raw '{
 "name":"Multi-lateral systemic synergy",
 "cupBoardNumber":727,
 "genre":"Down-sized"
}'
```

#### Response `POST /api/books/:id`

``` json
{
    "_id": "5f0e9ff99221a82888bdc8cb",
    "name": "Multi-lateral systemic synergy",
    "cupBoardNumber": 727,
    "genre": "Down-sized",
    "__v": 0
}
```

## EndPoint Update

Updates the Book by  ID and Sends the Updated Book

### UPDATE Example

#### Request `PUT /api/books/:id/edit`

```properties
curl --location --request PUT 'localhost:7894/api/books/5f0e9ff99221a82888bdc8cb/edit' \
--header 'Content-Type: application/json' \
--data-raw '{
 "genre": "Future-proofed"
}'
```

#### Response `PUT /api/books/:id/edit`

``` json
{
    "_id": "5f0e9ff99221a82888bdc8cb",
    "name": "Multi-lateral systemic synergy",
    "cupBoardNumber": 727,
    "genre": "Future-proofed",
    "__v": 0
}
```

## EndPoint Delete

Deletes the Book by ID Send JSON Response.

### DELETE Example

#### Request `DELETE /api/books/:id`

```properties
curl --location --request DELETE 'localhost:7894/api/books/5e7fc914cb2d74473c3ee4c2'
```

#### Response `DELETE /api/books/:id`

``` properties
StatusCode 204 is Sent
```
