function moreorless(event) {
    id = ".".concat(event.target.className.substring(0,6));
    dots = document.querySelector(id.concat('.dots'));
    readMore = document.querySelector(id.concat('.more'));
    rtextbtn = document.querySelector(id.concat('.rtextbtn'));

    console.log(id)
    if(dots.style.display === 'none') {
        dots.style.display = 'inline';
        rtextbtn.innerHTML = 'Read More';
        readMore.style.display = 'none';
    } else{
        dots.style.display = 'none';
        rtextbtn.innerHTML = 'see less';
        readMore.style.display = 'inline'  
}
}

$('.up').on({
    click: function(event){
        let id = ".".concat(event.target.className.substring(0,6));
        let votes = parseInt($(id.concat('.uvote')).text());
        console.log(id.concat('.down'));
        if (this.classList.contains("upbg")) {
            $(this).addClass('upbgfill').removeClass('upbg') 
            $(id.concat('.uvote')).text(votes + 1);
            if ($(id.concat('.down')).hasClass("downbgfill")) {
                $(id.concat('.downbgfill')).addClass('downbg').removeClass('downbgfill')
                $(id.concat('.dvote')).text(parseInt($(id.concat('.dvote')).text()) - 1);
            }
        } else {
            $(this).addClass('upbg').removeClass('upbgfill')
            $(id.concat('.uvote')).text(votes - 1);
        }
    }
})

$('.down').on({
    click: function(event){
        id = ".".concat(event.target.className.substring(0,6));
        let votes = parseInt($(id.concat('.dvote')).text());
        if (this.classList.contains("downbg")) {
            $(this).addClass('downbgfill').removeClass('downbg') 
            $(id.concat('.dvote')).text(votes + 1);
            if ($(id.concat('.up')).hasClass("upbgfill")) {
                $(id.concat('.upbgfill')).addClass('upbg').removeClass('upbgfill')
                $(id.concat('.uvote')).text(parseInt($(id.concat('.uvote')).text()) - 1);
            }
        } else {
            console.log("Aww");
            $(this).addClass('downbg').removeClass('downbgfill')
            $(id.concat('.dvote')).text(votes - 1);
        }
    }
})

$('.chat').on({
    click: function(event){
        let id = ".".concat(event.target.className.substring(0,6));
        $(id.concat('.comment')).collapse('toggle') // changes background on click
        console.log(id)
        updateCommentCount (id)
    }
})

function updateCommentCount (reviewID) {
    var ul = document.querySelector(reviewID.concat('.comment'));
    var i=0, itemCount =0;
    while(ul.getElementsByTagName('li') [i++]) itemCount++;
    //from https://techwelkin.com/javascript-count-items-in-html-list
    document.querySelector(reviewID.concat('.cNum')).innerHTML = itemCount;
}
