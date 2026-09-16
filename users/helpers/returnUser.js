const returnUser = (user) => {
    return {
        _id: user._id, // לפעמים נוח שיהיה גם למעלה
        name: {
            _id: user.name?._id,
            first: user.name?.first,
            middle: user.name?.middle,
            last: user.name?.last,
        },
        phone: user.phone, // <--- הוספנו את הטלפון!
        email: user.email,
        image: {
            url: user.image?.url,
            alt: user.image?.alt,
        },
        address: {         // <--- הוספנו את הכתובת המלאה!
            state: user.address?.state,
            country: user.address?.country,
            city: user.address?.city,
            street: user.address?.street,
            houseNumber: user.address?.houseNumber,
            zip: user.address?.zip,
        },
        isRecruiter: user.isRecruiter,
        isAdmin: user.isAdmin
    };
};

module.exports = returnUser;