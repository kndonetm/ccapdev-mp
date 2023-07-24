const hbsHelpers = {
    'length': function(arr) {
        return arr.length;
    },
    'formatDate': function(date) {
        let month = date.toLocaleString('default', {month: 'long'});
        let day = date.getDate().toString();
        let year = date.getFullYear().toString();
        return `${month} ${day}, ${year}`
    },
    'starr':  (num) => num / 5 *100,
    'check': (rate, star) => rate == star ? "checked": "",
    'filename': (file) => file.split('/').slice(-1),
}

export default hbsHelpers;