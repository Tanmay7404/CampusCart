// dummyData.js
const shopDetails = [
    {
        shopId: 1,
        name: 'Lohit Canteen',
        description: 'Restaurant',
        image: ' ',
        rating: 4.5,
        contact: '1234567890',
        address: 'Lohit Hostel, IIT Guwahati',
        isOpen: true,
        workingDays: 'Mon-Sun',
        workingHours: '9:00 AM - 9:00 PM',
        menu: [
            {
                itemId: 1,
                itemName: 'Bread Omelette',
                price: 30,
                itemImage: ' ',
                itemRating: 4.5,
                isBestSeller: true,
                isVeg: true,
                isRecommended: true,
                inStock: true,
            },
            {
                itemId: 2,
                itemName: 'Maggi',
                price: 20,
                itemImage: '',
                itemRating: 4.7,
                isBestSeller: false,
                isVeg: false,
                isRecommended: false,
                inStock: false,
            }
        ],
        reviews: [
            {
                reviewId: 1,
                reviewerName: 'Student1',
                comment: 'Good food',
                reviewRating: 4.5,
                reviewerImage: '',
            },
            {
                reviewId: 2,
                reviewerName: 'Student2',
                comment: 'Okayish food',
                reviewRating: 4,
                reviewerImage: '',
            },
        ],
    },
    {
        shopId: 2,
        name: 'Disang Canteen',
        description: 'Restaurant',
        image: '',
        rating: 4,
        contact: '1234567890',
        address: 'Disang Hostel, IIT Guwahati',
        status: 'Close',
        workingDays: 'Mon-Sun',
        workingHours: '9:00 AM - 9:00 PM',
        menu: [
            {
                itemId: 1,
                itemName: 'Bread Omelette',
                price: 30,
                itemImage: '',
                itemRating: 4,
                isBestSeller: false,
                isVeg: false,
                isRecommended: false,
                inStock: true,
            },
            {
                itemId: 2,
                itemName: 'Paratha',
                price: 20,
                itemImage: '',
                itemRating: 4.5,
                isBestSeller: false,
                isVeg: true,
                isRecommended: true,
                inStock: false,
            }
        ],
        reviews: [
            {
                reviewId: 1,
                reviewerName: 'Student3',
                comment: 'Good food',
                reviewRating: 4,
                reviewerImage: '',
            },
            {
                reviewId: 2,
                reviewerName: 'Student2',
                comment: 'Great food',
                reviewRating: 5,
                reviewerImage: '',
            },
        ],
    },
    // Add more dummy shops here
  ];
  
export default shopDetails;