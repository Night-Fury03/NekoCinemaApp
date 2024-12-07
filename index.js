const day = [
    {
        id: 1,
        day: 12,
        thu: 'Mon'
    },
    {
        id: 2,
        day: 13,
        thu: 'Tue'
    },
    {
        id: 3,
        day: 14,
        thu: 'Wed'
    },
    {
        id: 4,
        day: 15,
        thu: 'Thu'
    },
    {
        id: 5,
        day: 16,
        thu: 'Fri'
    },
    {
        id: 6,
        day: 17,
        thu: 'Sat'
    },
    {
        id: 7,
        day: 18,
        thu: 'Sun'
    },
]

const time = [
    {
        id: 1,
        dayID: 1,
        time: '8:40'
    },
    {
        id: 2,
        dayID: 1,
        time: '9:00'
    },
    {
        id: 3,
        dayID: 1,
        time: '15:20'
    },
    {
        id: 4,
        dayID: 1,
        time: '17:15'
    },
    {
        id: 5,
        dayID: 1,
        time: '19:40'
    },
    {
        id: 6,
        dayID: 1,
        time: '20:55'
    },
]

const chair = [ 
    {
        "chair": 1,
        "name": 'A',
        "position": [
            { "name": 'A1', "ordered": false },
            { "name": 'A2', "ordered": false },
            { "name": 'A3', "ordered": false },
            { "name": 'A4', "ordered": false },
            { "name": 'A5', "ordered": false },
            { "name": 'A6', "ordered": false },
            { "name": 'A7', "ordered": false },
            { "name": 'A8', "ordered": false }
        ]
    },
    {
        "chair": 2,
        "name": 'B',
        "position": [
            { "name": 'B1', "ordered": false },
            { "name": 'B2', "ordered": false },
            { "name": 'B3', "ordered": false },
            { "name": 'B4', "ordered": true },
            { "name": 'B5', "ordered": true },
            { "name": 'B6', "ordered": false },
            { "name": 'B7', "ordered": false },
            { "name": 'B8', "ordered": false }
        ]
    },
    {
        "chair": 3,
        "name": 'C',
        "position": [
            { "name": 'C1', "ordered": true },
            { "name": 'C2', "ordered": true },
            { "name": 'C3', "ordered": false },
            { "name": 'C4', "ordered": false },
            { "name": 'C5', "ordered": false },
            { "name": 'C6', "ordered": false },
            { "name": 'C7', "ordered": false },
            { "name": 'C8', "ordered": false }
        ]
    },
    {
        "chair": 4,
        "name": 'D',
        "position": [
            { "name": 'D1', "ordered": false },
            { "name": 'D2', "ordered": false },
            { "name": 'D3', "ordered": false },
            { "name": 'D4', "ordered": false },
            { "name": 'D5', "ordered": false },
            { "name": 'D6', "ordered": false },
            { "name": 'D7', "ordered": false },
            { "name": 'D8', "ordered": false }
        ]
    },
    {
        "chair": 5,
        "name": 'E',
        "position": [
            { "name": 'E1', "ordered": false },
            { "name": 'E2', "ordered": true },
            { "name": 'E3', "ordered": true },
            { "name": 'E4', "ordered": true },
            { "name": 'E5', "ordered": true },
            { "name": 'E6', "ordered": false },
            { "name": 'E7', "ordered": true },
            { "name": 'E8', "ordered": true },
            { "name": 'E9', "ordered": true },
            { "name": 'E10', "ordered": false }
        ]
    },
    {
        "chair": 6,
        "name": 'F',
        "position": [
            { "name": 'F1', "ordered": false },
            { "name": 'F2', "ordered": false },
            { "name": 'F3', "ordered": true },
            { "name": 'F4', "ordered": true },
            { "name": 'F5', "ordered": true },
            { "name": 'F6', "ordered": true },
            { "name": 'F7', "ordered": true },
            { "name": 'F8', "ordered": true },
            { "name": 'F9', "ordered": false },
            { "name": 'F10', "ordered": false }
        ]
    },
    {
        "chair": 7,
        "name": 'G',
        "position": [
            { "name": 'G1', "ordered": false },
            { "name": 'G2', "ordered": false },
            { "name": 'G3', "ordered": false },
            { "name": 'G4', "ordered": false },
            { "name": 'G5', "ordered": false },
            { "name": 'G6', "ordered": false },
            { "name": 'G7', "ordered": false },
            { "name": 'G8', "ordered": false },
            { "name": 'G9', "ordered": false },
            { "name": 'G10', "ordered": false }
        ]
    },
    {
        "chair": 8,
        "name": 'H',
        "position": [
            { "name": 'H1', "ordered": false },
            { "name": 'H2', "ordered": true },
            { "name": 'H3', "ordered": true },
            { "name": 'H4', "ordered": true },
            { "name": 'H5', "ordered": false },
            { "name": 'H6', "ordered": false },
            { "name": 'H7', "ordered": false },
            { "name": 'H8', "ordered": false },
            { "name": 'H9', "ordered": true },
            { "name": 'H10', "ordered": true }
        ]
    }
];


const FoodDrink = [
    { id: 1, name: "PopCorn", cost: 2.5 },
    { id: 2, name: "Snack", cost: 0.8 },
    { id: 3, name: "Coke", cost: 1.2 },
    { id: 4, name: "Sprite", cost: 1.2 },
]

export {time, day, chair, FoodDrink} 