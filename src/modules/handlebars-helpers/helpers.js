const hbsHelpers = {
    'length': function(arr) {
        console.log(arr)
        return arr.length;
    },
    'formatDate': function(date) {
        let month = date.toLocaleString('default', {month: 'long'});
        let day = date.getDate().toString();
        let year = date.getFullYear().toString();
        return `${month} ${day}, ${year}`
    }
}

export default hbsHelpers;