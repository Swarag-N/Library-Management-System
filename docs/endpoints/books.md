# `Book` Endpoints #

Get Deatils of Books.

## Routes ##

|Name|Method|Route|
|---|---|---|
|[List](#endpoint-list)|`GET`| `/api/books/`|
|[Show](#endpoint-show)|`GET`| `/api/books/:id`|
|[Create](#endpoint-create)|`POST`| `/api/books/:id`|
|[Update](#endpoint-update)|`PUT`| `/api/books/:id/edit`|
|[Delete](#endpoint-delete)|`DELETE`|`/api/books/:id`|

## EndPoint LIST ##

Lists all the Books in DB. Query Parameters are [here](/bookQuery.md)

### LIST Example ###

#### Request `GET /api/books/` ####

```properties
curl --location --request GET 'localhost:7894/api/books/'
```

#### Response `GET /api/books/` ####

``` json
{
    "count": 10,
    "total": 66,
    "page": 1,
    "books": [
        {
            "_id": "5e86e51d053d682afc34f12f",
            "name": "Quality-focused demand-driven analyzer",
            "cupBoardNumber": 216,
            "genre": "red",
            "__v": 0
        },
        {
            "_id": "5e86e964e2cffa44407da46a",
            "name": "Configurable homogeneous function",
            "cupBoardNumber": 640,
            "genre": "lime",
            "__v": 0
        },
        {
            "_id": "5f0f3a864423821280007471",
            "name": "Vision-oriented logistical hub",
            "cupBoardNumber": 715,
            "genre": "Streamlined",
            "__v": 0
        },
        {
            "_id": "5e86e7cb5915d240683a4488",
            "name": "Upgradable holistic encryption",
            "cupBoardNumber": 780,
            "genre": "indigo",
            "__v": 0
        },
        {
            "_id": "5e86e9707a5efc43b460c07e",
            "name": "Optional solution-oriented structure",
            "cupBoardNumber": 837,
            "genre": "white",
            "__v": 0
        },
        {
            "_id": "5e86e77bf87a1d362c476ccb",
            "name": "Realigned stable circuit",
            "cupBoardNumber": 873,
            "genre": "blue",
            "__v": 0
        },
        {
            "_id": "5f0ee78da4091a0874c4599e",
            "name": "payment",
            "cupBoardNumber": 938,
            "genre": "Generic Granite Chicken",
            "__v": 0
        },
        {
            "_id": "5f0ee8d29b07ff3c2cfd9475",
            "name": "payment",
            "cupBoardNumber": 938,
            "genre": "Generic Granite Chicken",
            "__v": 0
        },
        {
            "_id": "5f0eea40687b51453833c213",
            "name": "payment",
            "cupBoardNumber": 938,
            "genre": "Generic Granite Chicken",
            "__v": 0
        },
        {
            "_id": "5f0eea519ddb573e6c0622ff",
            "name": "payment",
            "cupBoardNumber": 938,
            "genre": "Generic Granite Chicken",
            "__v": 0
        }
    ]
}
```

## EndPoint SHOW ##

Shows The Book Requested

### SHOW Example ##

#### Request `GET /api/books/:id` ####

```properties
curl --location --request GET 'localhost:7894/api/books/5e7fc914cb2d74473c3ee4c0'
```

#### Response `GET /api/books/:id` ####

``` json
{
    "_id": "5e7fc914cb2d74473c3ee4c0",
    "name": "fault-tolerant Enhanced",
    "cupBoardNumber": 88562,
    "genre": "GB",
    "__v": 0
}
```

## EndPoint Create ##

Creates A Book and Sends the Created Book

### CREATE Example ###

#### Request `POST /api/books/:id` ####

```properties
curl --location --request POST 'localhost:7894/api/books/' \
--header 'Content-Type: application/json' \
--data-raw '{
 "name":"Multi-lateral systemic synergy",
 "cupBoardNumber":727,
 "genre":"Down-sized"
}'
```

#### Response `POST /api/books/:id` ####

``` json
{
    "_id": "5f0e9ff99221a82888bdc8cb",
    "name": "Multi-lateral systemic synergy",
    "cupBoardNumber": 727,
    "genre": "Down-sized",
    "__v": 0
}
```

## EndPoint Update ##

Updates the Book by  ID and Sends the Updated Book

### UPDATE Example ##

#### Request `PUT /api/books/:id/edit` ####

```properties
curl --location --request PUT 'localhost:7894/api/books/5f0e9ff99221a82888bdc8cb/edit' \
--header 'Content-Type: application/json' \
--data-raw '{
 "genre": "Future-proofed"
}'
```

#### Response `PUT /api/books/:id/edit` ####

``` json
{
    "_id": "5f0e9ff99221a82888bdc8cb",
    "name": "Multi-lateral systemic synergy",
    "cupBoardNumber": 727,
    "genre": "Future-proofed",
    "__v": 0
}
```

## EndPoint Delete ##

Deletes the Book by ID Send JSON Response.

### DELETE Example ###

#### Request `DELETE /api/books/:id` ####

```properties
curl --location --request DELETE 'localhost:7894/api/books/5e7fc914cb2d74473c3ee4c2'
```

#### Response `DELETE /api/books/:id` ####

``` properties
StatusCode 204 is Sent
```
