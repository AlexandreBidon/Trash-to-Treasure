// https://stackoverflow.com/questions/49164635/javascript-get-random-result-with-probability-for-specific-array

export const TrashLootType = [
    {
        "type": "default",
        "weight": 5,
        "img": "./img/trashcan/1.png",
        "light_img": "./img/vfx/light.png",
        "owner": [ 
            "Citizen", 
            "Family", 
            "Couple", 
            "Villager", 
            "Taxpayer", 
            "Resident"
        ],
        "name": "Trash Can",
        "min_price": 50,
        "max_price": 200,
        "min_loot": 2,
        "max_loot": 4,
        "loot_list": [
            {
                "name": "Bone",
                "img": "./img/trash/bone.png",
                "weight": 4
            },
            {
                "name": "Can",
                "img": "./img/trash/can.png",
                "weight": 4  
            },
            {
                "name": "Paper",
                "img": "./img/trash/paper.png",
                "weight": 5   
            },
            {
                "name": "Bulb",
                "img": "./img/trash/bulb.png",
                "weight": 5   
            },
            {
                "name": "Stick",
                "img": "./img/trash/stick.png",
                "weight": 5   
            }
        ]
    },
    {
        "type": "food",
        "weight": 3,
        "img": "./img/trashcan/2.png",
        "light_img": "./img/vfx/light.png",
        "owner": [ 
            "Restaurant", 
            "Fast-Food", 
            "Kebab",
            "Pizzeria",
            "Cafeteria",
            "Bar"
        ],
        "name": "Trash Can",
        "min_price": 90,
        "max_price": 220,
        "min_loot": 3,
        "max_loot": 6,
        "loot_list": [
            {
                "name": "Apple",
                "img": "./img/trash/rotten-apple.png",
                "weight": 5
            },
            {
                "name": "Can",
                "img": "./img/trash/can.png",
                "weight": 4   
            },
            {
                "name": "Fish Bone",
                "img": "./img/trash/fish-bone.png",
                "weight": 4   
            },
            {
                "name": "Bottle",
                "img": "./img/trash/bottle.png",
                "weight": 5   
            }
        ]
    },
    {
        "type": "rare",
        "weight": 1,
        "img": "./img/trashcan/3.png",
        "light_img": "./img/vfx/gold_light.png",
        "owner": [ 
            "President", 
            "Star", 
            "Actor", 
            "Millionaire"
        ],
        "name": "Gold Trash Can",
        "min_price": 300,
        "max_price": 500,
        "min_loot": 3,
        "max_loot": 6,
        "loot_list": [
            {
                "name": "Bone",
                "img": "./img/trash/bone.png",
                "weight": 3
            },
            {
                "name": "Can",
                "img": "./img/trash/can.png",
                "weight": 3   
            },
            {
                "name": "Apple",
                "img": "./img/trash/rotten-apple.png",
                "weight": 3
            },
            {
                "name": "Fish Bone",
                "img": "./img/trash/fish-bone.png",
                "weight": 3   
            },
            {
                "name": "Gold Nugget",
                "img": "./img/trash/gold-nugget.png",
                "weight": 2
            }
        ]
    },
    {
        "type": "default",
        "weight": 5,
        "img": "./img/trashcan/4.png",
        "light_img": "./img/vfx/light.png",
        "owner": [ 
            "Citizen", 
            "Family", 
            "Couple", 
            "Villager", 
            "Taxpayer", 
            "Resident"
        ],
        "name": "Garbage Bag",
        "min_price": 50,
        "max_price": 100,
        "min_loot": 1,
        "max_loot": 3,
        "loot_list": [
            {
                "name": "Bone",
                "img": "./img/trash/bone.png",
                "weight": 5
            },
            {
                "name": "Can",
                "img": "./img/trash/can.png",
                "weight": 5   
            },
            {
                "name": "Paper",
                "img": "./img/trash/paper.png",
                "weight": 5   
            },
            {
                "name": "Bulb",
                "img": "./img/trash/bulb.png",
                "weight": 5   
            },
            {
                "name": "Stick",
                "img": "./img/trash/stick.png",
                "weight": 5   
            }
        ]
    },
    {
        "type": "pirate",
        "weight": 3,
        "img": "./img/trashcan/5.png",
        "light_img": "./img/vfx/light.png",
        "owner": [ 
            "Pirate", 
            "Corsair", 
            "Freebooter", 
            "Sailor"
        ],
        "name": "Garbage Barrel",
        "min_price": 150,
        "max_price": 400,
        "min_loot": 1,
        "max_loot": 4,
        "loot_list": [
            {
                "name": "Bone",
                "img": "./img/trash/bone.png",
                "weight": 5
            },
            {
                "name": "Ship Helm",
                "img": "./img/trash/ship-helm.png",
                "weight": 5   
            },
            {
                "name": "Paper",
                "img": "./img/trash/paper.png",
                "weight": 5   
            },
            {
                "name": "Bottle",
                "img": "./img/trash/bottle.png",
                "weight": 5   
            }
        ]
    },
]