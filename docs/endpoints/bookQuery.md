# Book List Query #

To see CRUD [routes](/books.md)

|Parameter|Query|Type|Options|Default|Description|
|---|---|---|---|---|---|
|[Page Number](#Page-Number)|`page`|Number| `>1` |`1`|Each Page Is Limited to return 10 results, for more results pass page number|
|[Name](#Name)|`name`|String|`utf-8 string`|`' '`|Key Word of Book Name can be used to search|
|[Genre](#Genre)|`genr`|String|`utf-8 string`|`' '`|Filter by Genre or search by genre|
|[Sort](#Sort)|`sort`|String|```['asc','desc']```|`asc`|Sort Book by CBN|
|[Cup Board Number(CBN)](#Cup-Board-Number(CBN))|`cbNum`|Number| `>1` |`1`|Filters Books with Cupboard Number Greater than given|
|[Less Than (CBN)](#Less-Than-(CBN))|`lte`|boolean|```[true, false]```|`false`|To get Books less than a particular Number Must be passed with (CBN)|

## Page Number ##

For Paginated Results change the page number, In case of Page Number passed is greater than available pages then messgage is returned by saying number of pages to be moved back. [See here](#edge)

## Example Page Request ##

```console
curl --location --request GET 'localhost:7894/api/books/?page=2'
```

### Example Page Response ###

```json
{
    "count": 10,
    "total": 66,
    "page": "2", // Changed from result in LIST route
    "books": [
        {
            "_id": "5e86e953e2cffa44407da469",
            "name": "Universal motivating matrices",
            "cupBoardNumber": 975,
            "genre": "purple",
            "__v": 0
        },
        {
            "_id": "5e86e4be053d682afc34f12e",
            "name": "gold",
            "cupBoardNumber": 996,
            "genre": "Thriller",
            "__v": 0
        },
        {
            "_id": "5f0ee78ca4091a0874c45999",
            "name": "olive initiatives front-end",
            "cupBoardNumber": 1705,
            "genre": "Shoes",
            "__v": 0
        },
        {
            "_id": "5f0ee8d29b07ff3c2cfd9470",
            "name": "olive initiatives front-end",
            "cupBoardNumber": 1705,
            "genre": "Shoes",
            "__v": 0
        },
        {
            "_id": "5f0eea40687b51453833c20e",
            "name": "olive initiatives front-end",
            "cupBoardNumber": 1705,
            "genre": "Shoes",
            "__v": 0
        },
        {
            "_id": "5f0eea519ddb573e6c0622fa",
            "name": "olive initiatives front-end",
            "cupBoardNumber": 1705,
            "genre": "Shoes",
            "__v": 0
        },
        {
            "_id": "5f0ee78da4091a0874c4599c",
            "name": "Grass-roots RSS",
            "cupBoardNumber": 3111,
            "genre": "XSS",
            "__v": 0
        },
        {
            "_id": "5f0ee8d29b07ff3c2cfd9473",
            "name": "Grass-roots RSS",
            "cupBoardNumber": 3111,
            "genre": "XSS",
            "__v": 0
        },
        {
            "_id": "5f0eea40687b51453833c211",
            "name": "Grass-roots RSS",
            "cupBoardNumber": 3111,
            "genre": "XSS",
            "__v": 0
        },
        {
            "_id": "5f0eea519ddb573e6c0622fd",
            "name": "Grass-roots RSS",
            "cupBoardNumber": 3111,
            "genre": "XSS",
            "__v": 0
        }
    ]
}
```

<details open>
<summary> Edge Case with Page Numbers</summary>

### Edge Case Request with Page Query ###

```console
curl --location --request GET 'localhost:7894/api/books/?page=10'
```

### Edge Case Response with Page Query ###

```json
{
    "count": 0,
    "total": 66,
    "page": "10",// Requested Page
    "books": "No Books\n Move Back by 3 Page(s)"
}
```

</details>

## Name ##

``` console
curl --location --request GET 'localhost:7894/api/books/?name=apple'
```

```json
{
    "count": 1,
    "total": 1,
    "page": 1,
    "books": [
        {
            "_id": "5e865bd5e7c8f435d4372dd5",
            "name": "Apples and Mongo",
            "cupBoardNumber": 7894,
            "genre": "Thriller",
            "__v": 0
        }
    ]
}
```

## Genre ##

```console
curl --location --request GET 'localhost:7894/api/books/?genr=red'
```

```json
{
    "count": 2,
    "total": 2,
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
            "_id": "5e7fc914cb2d74473c3ee4c9",
            "name": "Liberia Tools encoding",
            "cupBoardNumber": 3973,
            "genre": "Reverse-engineered",
            "__v": 0
        }
    ]
}
```

## Sort ##

```console
curl --location --request GET 'localhost:7894/api/books/?sort=desc'
```

```json
{
    "count": 10,
    "total": 66,
    "page": 1,
    "books": [
        {
            "_id": "5f0ee78da4091a0874c4599d",
            "name": "input Intranet Adaptive",
            "cupBoardNumber": 97443,
            "genre": "withdrawal",
            "__v": 0
        },
        {
            "_id": "5f0ee8d29b07ff3c2cfd9474",
            "name": "input Intranet Adaptive",
            "cupBoardNumber": 97443,
            "genre": "withdrawal",
            "__v": 0
        },
        {
            "_id": "5f0eea40687b51453833c212",
            "name": "input Intranet Adaptive",
            "cupBoardNumber": 97443,
            "genre": "withdrawal",
            "__v": 0
        },
        {
            "_id": "5f0eea519ddb573e6c0622fe",
            "name": "input Intranet Adaptive",
            "cupBoardNumber": 97443,
            "genre": "withdrawal",
            "__v": 0
        },
        {
            "_id": "5e7fca99e376711f48e368f2",
            "name": "Angels and Demons",
            "cupBoardNumber": 88562,
            "genre": "GB",
            "__v": 0
        },
        {
            "_id": "5e7fc914cb2d74473c3ee4c3",
            "name": "Post Man",
            "cupBoardNumber": 74185,
            "genre": "Intelligent",
            "__v": 0
        },
        {
            "_id": "5e86ea93399829324809680a",
            "name": "Object-based clear-thinking hub",
            "cupBoardNumber": 74185,
            "genre": "Intelligent",
            "__v": 0
        },
        {
            "_id": "5e86eb872265693504dfc450",
            "name": "Stand-alone leading edge workforce",
            "cupBoardNumber": 74185,
            "genre": "Intelligent",
            "__v": 0
        },
        {
            "_id": "5e86ebdc9b9f673984b7e5ac",
            "name": "User-centric empowering methodology",
            "cupBoardNumber": 74185,
            "genre": "Intelligent",
            "__v": 0
        },
        {
            "_id": "5e86edc44abd4b2858598e38",
            "name": "Virtual empowering support",
            "cupBoardNumber": 74185,
            "genre": "Intelligent",
            "__v": 0
        }
    ]
}
```

## Cup Board Number(CBN) ###

```console
curl --location --request GET 'localhost:7894/api/books/?cbNum=99'
```

```json
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

## Less Than (CBN) ###

Preferred to PASS with CBN since default CBN is set to one.

```console
curl --location --request GET 'localhost:7894/api/books/?cbNum=999&lte=true'
```

```json
{
    "count": 10,
    "total": 12,
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

## Miscellaneous ##

```console
curl --location --request GET 'localhost:7894/api/books/?name=a&cbNum=999&genr=i&sort=desc&lte=true'
```

```json
{
    "count": 8,
    "total": 8,
    "page": 1,
    "books": [
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
        },
        {
            "_id": "5e86e9707a5efc43b460c07e",
            "name": "Optional solution-oriented structure",
            "cupBoardNumber": 837,
            "genre": "white",
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
            "_id": "5f0f3a864423821280007471",
            "name": "Vision-oriented logistical hub",
            "cupBoardNumber": 715,
            "genre": "Streamlined",
            "__v": 0
        },
        {
            "_id": "5e86e964e2cffa44407da46a",
            "name": "Configurable homogeneous function",
            "cupBoardNumber": 640,
            "genre": "lime",
            "__v": 0
        }
    ]
}
```
