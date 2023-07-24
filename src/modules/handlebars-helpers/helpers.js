const hbsHelpers = {
    'length': function(arr) {
        if (arr != null) return arr.length
        else return 0;
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
    'cmpId': function(a, b) {
        return a === b.toString();
    },
    'idIn': function(a, b) {
        return b.includes(a.toString());
    }
}

export default hbsHelpers;