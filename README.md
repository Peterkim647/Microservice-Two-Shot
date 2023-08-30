# Wardrobify

Team:

* Peter Kim - Shoes
* Amanda Taing - Hats

## Design

This is an application that allows people to organize their hats and shoes within their closets. It has three microservices:
    1. wardrobe: This contains the location and bin data
    2. shoes: This contains the shoes data
    3. hats: This contains the hats data
People can see a list of all their hats and shoes and can also create or delete a hat or shoe object.

## Shoes microservice

There is a bin value object model and a shoe model in this microservice. It integrates with the wardrobe microservice through react components and shows the data given through the api's of the models. On the webpage it shows the details of each shoe that is created, along with the bin that the shoe is in. Additionally, there is a button to delete shoes as well as a buttom to create shoes.

## Hats microservice

The hats microservice has two models:

    1. LocationVO: This creates a location value object within the hats microservice by polling data from Location in the wardrobe microservice. Whenever a Location object is created, the hats poller will create a LocationVO for that Location object. Instead of an id, LocationVO uses an href that we use when we want to create a hat. Each LocationVo contains the closet_name, shelf_number, and section_number properties.

    2. Hat: This represents a hat that a person wants to add to their closet. They must specify the style, color, fabric, picture_url, and location of that hat.

There are two views to either list hats or show a specific hat:

    1. The list hats view contains functionality to get all Hat instances and to make a new Hat instance.

    2. The show hat view contains functional to get the details of a specific Hat instance and to delete it.
