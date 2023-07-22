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
}

export default hbsHelpers;