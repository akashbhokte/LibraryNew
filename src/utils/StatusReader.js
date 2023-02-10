export const StatusReader = (type) => {
    switch (type) {
        case 0:
            return 'Pending'
            break;
        case 1:
            return 'Completed'
            break;
        case 2:
            return 'Expired'
            break;
        case 3:
            return 'Cancelled'
            break;

        default:
            break;
    }
}