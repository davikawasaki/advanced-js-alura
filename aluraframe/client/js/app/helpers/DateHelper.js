class DateHelper {

    constructor() {
        throw new Error('This class cannot be instantiated!');
    }
    
    // Static methods: appertained to the class definition
    // Using template strings
    static date2txt(date) {
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    }

    static txt2date(text) {

        if(!/^\d{4}-\d{2}-\d{2}$/.test(text)) throw new Error('Should be on format YYYY-MM-DD!');

        // Version with spread operator
        return new Date(...text
            .split('-')
            .map((item, index) => index == 1 ? item-1 : item));
            // Alternative with module, which declares 1 for index equal to 1
            // return item - index % 2

        // Simpler version with split
        // return new Date(text.split('-'));

        // Date converts the given array to string with commas delimeters
        // return new Date(text.split('-').join(','));

        // Date converted with regex, changing every hyphen to comma
        // return new Date(text.replace(/-/g, ','));
    }

}