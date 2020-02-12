# Pallete Picker API

This API was built for the [Palette Picker UI](https://github.com/spaceplesiosaur/pallete-picker-client).

## Created by:

- [Allison McCarthy](https://github.com/spaceplesiosaur)
- [Amanda Consuelo Sierra](https://github.com/Asilo5)

## View Pallete Picker API locally in your computer

Clone down the repo:

``$ git clone https://github.com/spaceplesiosaur/palette-picker.git``

Once you have cloned the repo, install dependencies:

``$ npm install``

`` cd `` into Pallete Picker file.

And to view on your local browser:

``$ npm start``

### Endpoints

## GET

``Get`` requests are used to read the API.  You will be adding endpoints `https://palette-picker-ac.herokuapp.com/`.  So, for instance, if you wanted to get all palette available from this API, you would fetch `https://palette-picker-ac.herokuapp.com/api/v1/palettes`.

#### GET all possible projects

Endpoint:

 `https://palette-picker-ac.herokuapp.com/api/v1/projects`

Example reply:

        [
          {
            id: 12,
            name: "Bathroom walls",
            current: true
          },
          {
            id: 13,
            name: "Kid bedroom",
            current: false
          },
          {
            id: 15,
            name: "Garage",
            current: false
          },
          {
            id: 16,
            name: "Powder Room",
            current: false
          },
          {
            id: 18,
            name: "Hello World",
            current: false
          }
        ]


#### GET all available palettes from list

Endpoint:

 `https://palette-picker-ac.herokuapp.com/api/v1/palettes`

Example reply:

        [
          {
            id: 7,
            name: "Ocean",
            color1: "#DFE9FD",
            color2: "#053BA7",
            color3: "#B3C0F7",
            color4: "#4B93FB",
            color5: "#00A8CF",
            project_id: 12,
            created_at: "2020-02-10T21:20:14.842Z",
            updated_at: "2020-02-10T21:20:14.842Z"
          },
          {
            id: 9,
            name: "Sunset",
            color1: "#FA1E88",
            color2: "#ff6100",
            color3: "#F8DF3A",
            color4: "#B3C0F7",
            color5: "#000000",
            project_id: 13,
            created_at: "2020-02-10T21:20:14.843Z",
            updated_at: "2020-02-10T21:20:14.843Z"
          },
          {
            id: 8,
            name: "Seascape",
            color1: "#180353",
            color2: "#00A8CF",
            color3: "#F7EDB7",
            color4: "#EDE0D7",
            color5: "#DFE9FD",
            project_id: 12,
            created_at: "2020-02-10T21:20:14.842Z",
            updated_at: "2020-02-10T21:20:14.842Z"
          }
        ]

#### GET a single project from list

Endpoint:

 `https://palette-picker-ac.herokuapp.com/api/v1/projects/:id`

Example reply:

    [
      {
          "id": 12,
          "name": "bold",
          "good": "extraversion",
          "bad": "emotional_stability",
          "created_at": "2020-01-30T19:57:39.652Z",
          "updated_at": "2020-01-30T19:57:39.652Z"
      }
    ]

#### GET a single pokemon from list

Endpoint:

 `/api/v1/pokemon/:id`

Example reply:

     [
         {
             "id": 13,
             "name": "seel",
             "nature_id": 14,
             "created_at": "2020-01-30T19:57:39.687Z",
             "updated_at": "2020-01-30T19:57:39.687Z"
         }
     ]


## POST
To add data to endpoints, you will need to use post.  Make sure that your options object includes the object you are posting in the body and `application/json` in the Content-Type header.

#### POST a new pokemon to the adoption list

Endpoint:

    `/api/v1/pokemon`

Request body:

    `{"name": <String>, "nature_id": <Integer>}`

Example response:

    {
      "id": [
         81
        ]
    }

#### POST a new nature to the nature list

Endpoint:

    `/api/v1/natures`

Request body:

    `{ name: <String>, good: <String>, bad: <String> }`

Example response:

    {
      "id": [
         14
        ]
    }


## DELETE

When a pokemon has been adopted, it can be deleted from the adoption list.  It does not require a body, but you will need to query the right id.

####

Endpoint:

 `/api/v1/pokemon/:id`

Example response:

    None, expect a 204 status code.

## Built With:
- Node
- Express
- Knex
- PostgreSQL
