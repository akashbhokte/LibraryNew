export const CategoryReader = (cat) => {
    switch (cat) {
        case 0:
            return 'History'
            break;
        case 1:
            return 'Documentry'
            break;
        case 2:
            return 'Fantacy'
            break;
        case 3:
            return 'Other'
            break;

        default:
            break;
    }
}