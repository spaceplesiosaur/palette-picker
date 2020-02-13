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

#### GET all current projects

The endpoint is set up so that it will automatically look for a query string on your URL.

Endpoint:

`https://palette-picker-ac.herokuapp.com/api/v1/projects?current=true`

Example reply:

        [
          {
            "id": 35,
            "name": "Bathroom walls",
            "current": true
          },
          {
            "id": 35,
            "name": "Bedroom walls",
            "current": true
          },
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
            id: 13,
            name: "Kid bedroom",
            current: false
          }
        ]

#### GET a single pokemon from list

Endpoint:

 `https://palette-picker-ac.herokuapp.com/api/v1/palettes/:id`

Example reply:

        [
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
          }
        ]


## POST
To add data to endpoints, you will need to use post.  Make sure that your options object includes the object you are posting in the body and `application/json` in the Content-Type header.

#### POST a new project to the list

Endpoint:

    `https://palette-picker-ac.herokuapp.com/api/v1/projects`

Request body:

    `{name: <string>}`

Example response:

    {
      "id": [
         14
        ]
    }

#### POST a new palette list

Endpoint:

    `https://palette-picker-ac.herokuapp.com/api/v1/projects`

Request body:

    `{ project_id: <Integer>, name: <String>, color1: <String>, color2: <String>, color3: <String>, color4: <String>, color5: <String>}`

Example response:

    {
      "id": [
         13
        ]
    }

#### PATCH a project status

You can change a project's 'current' attribute from true to false.

Endpoint:

`https://palette-picker-ac.herokuapp.com/api/v1/projects/:id`

Request body:

    `{ "current": <Boolean>}`

#### PATCH a palette name

You can change a palette's name.

Endpoint:

`https://palette-picker-ac.herokuapp.com/api/v1/projects/:id`

Request body:

    `{ "name": <Boolean>}`

## DELETE

When a project is deleted, all palettes are deleted with it.

####

Endpoint:

 `https://palette-picker-ac.herokuapp.com/api/v1/projects`

 Endpoint:

  `https://palette-picker-ac.herokuapp.com/api/v1/palettes`

Example response:

    None, expect a 204 status code.

## Built With:
- Node
- Express
- Knex
- PostgreSQL
