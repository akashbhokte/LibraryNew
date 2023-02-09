export const UserTypeReader = (type) => {
    switch (type) {
        case 0:
            return 'Buyer'
            break;
        case 1:
            return 'Seller'
            break;
        case 3:
            return 'Admin'
            break;

        default:
            break;
    }
}