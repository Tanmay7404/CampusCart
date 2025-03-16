const DummyOrder = [
    {
        id: 1,
        orderNumber: 1,
        createdAt: '2023/09/03 01:00:00',
        bill: 150,
        status: 'completed',
        items: [
            {
                veg: 1,
                num: 1,
                item: 'Burger',
                price: 50,
            },
            {
                veg: 0,
                num: 3,
                item: 'Fries',
                price: 50,
            },
            {
                veg: 1,
                num: 2,
                item: 'Coke',
                price: 50,
            }
        ]

    },
    {   
        id: 2,
        orderNumber: 2,
        createdAt: '2021/09/01 12:00:00',
        bill: 150,
        status: 'pending',
        items: [
            {
                veg: 1,
                num: 1,
                item: 'Burger',
                price: 50,
            },
            {
                veg: 0,
                num: 3,
                item: 'Fries',
                price: 50,
            },
            {
                veg: 1,
                num: 2,
                item: 'Coke',
                price: 50,
            }
        ]

    },
    {
        id: 3,
        orderNumber: 3,
        createdAt: '2021/09/01 12:00:00',
        bill: 300,
        status: 'ready',
        items: [
            {
                veg: 1,
                num: 1,
                item: 'Burger',
                price: 50,
            },
            {
                veg: 0,
                num: 3,
                item: 'Fries',
                price: 50,
            },
            {
                veg: 1,
                num: 2,
                item: 'Coke',
                price: 50,
            }
        ]
    },
    {   
        id: 4,
        orderNumber: 4,
        createdAt: '2023/09/03 18:17:00',
        bill: 150,
        status: 'incoming',
        items: [
            {
                key:1,
                veg: 1,
                num: 1,
                item: 'Burger',
                price: 50,
            },
            {
                key:2,
                veg: 0,
                num: 3,
                item: 'Fries',
                price: 50,
            },
            {
                key:3,
                veg: 1,
                num: 2,
                item: 'Coke',
                price: 50,
            }
        ]

    },
    {   
        id: 5,
        orderNumber: 5,
        createdAt: '2021/09/01 12:00:00',
        bill: 150,
        status: 'incoming',
        items: [
            {
                key:1,
                veg: 1,
                num: 1,
                item: 'Burger',
                price: 50,
            },
            {
                key:2,
                veg: 0,
                num: 3,
                item: 'Fries',
                price: 50,
            },
            {
                key:3,
                veg: 1,
                num: 2,
                item: 'Coke',
                price: 50,
            }
        ]

    }
]

export default DummyOrder;