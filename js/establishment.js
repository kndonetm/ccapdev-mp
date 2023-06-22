function moreorless(event) {
    id = ".".concat(event.target.className.substring(0,8));
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

// classlist = event.target.classList;
//     console.log(classlist)

//     if (classlist.contains('reply')) {


function markUp (event) {
    targ = event.target
    let id = ".".concat(targ.className.substring(0,8));
    let votes = parseInt($(id.concat('.uvote')).text());
    console.log(id.concat('.down'));
    if (targ.classList.contains("upbg")) {
        $(targ).addClass('upbgfill').removeClass('upbg') 
        $(id.concat('.uvote')).text(votes + 1);
        if ($(id.concat('.down')).hasClass("downbgfill")) {
            $(id.concat('.downbgfill')).addClass('downbg').removeClass('downbgfill')
            $(id.concat('.dvote')).text(parseInt($(id.concat('.dvote')).text()) - 1);
        }
    } else {
        $(targ).addClass('upbg').removeClass('upbgfill')
        $(id.concat('.uvote')).text(votes - 1);
    }
}

function markDown (event) {
    targ = event.target
    id = ".".concat(targ.className.substring(0,8));
    let votes = parseInt($(id.concat('.dvote')).text());
    if (targ.classList.contains("downbg")) {
        $(targ).addClass('downbgfill').removeClass('downbg') 
        $(id.concat('.dvote')).text(votes + 1);
        if ($(id.concat('.up')).hasClass("upbgfill")) {
            $(id.concat('.upbgfill')).addClass('upbg').removeClass('upbgfill')
            $(id.concat('.uvote')).text(parseInt($(id.concat('.uvote')).text()) - 1);
        }
    } else {
        console.log("Aww");
        $(targ).addClass('downbg').removeClass('downbgfill')
        $(id.concat('.dvote')).text(votes - 1);
    }
}

function showChat (event) {
    let id = ".".concat(event.target.className.substring(0,8));
    $(id.concat('.comment')).collapse('toggle') // changes background on click
    console.log(id)
    updateCommentCount (id)
}

function reply (event) {
    id = ".".concat(event.target.className.substring(0,8));
    $(id.concat('.wReply')).collapse('toggle') // changes background on click
    console.log(id)
}

review = document.querySelector(".reviews")

review.addEventListener("click", event=> {
    classlist = event.target.classList;
    console.log(classlist)

    if (classlist.contains('reply')) {
        reply(event)
    } else if (classlist.contains('chat')) {
        showChat(event)
    } else if (classlist.contains('down')) {
        markDown(event)
    } else if (classlist.contains('up')) {
        markUp(event)
    } else if (classlist.contains('postReply')) {
        insertReply (event)
    } else if (classlist.contains('postReview')) {
        insertReview (event)
    } else if (classlist.contains('edit')) {
        editText(event)
    } else if (classlist.contains('doneEdit')) {
        doneEditText(event)
    }


})

$('button.moreRev').on({
    click: function(event){
         $('div.moreRev').collapse('toggle')
        if ($(this).text().includes("more")) {
        $('button.moreRev').text('------------ see less ------------')
        }
        else {
            $('button.moreRev').text('see more')
        }
     }
 })

function updateCommentCount (reviewID) {
    var ul = document.querySelector(reviewID.concat('.comment'));
    var i=0, itemCount =0;
    while(ul.getElementsByTagName('li') [i++]) itemCount++;
    //from https://techwelkin.com/javascript-count-items-in-html-list
    document.querySelector(reviewID.concat('.cNum')).innerHTML = itemCount;
}

function insertReview (event) {
    rating = document.querySelector('input[name="rate"]:checked').value;
    reviewDesc = document.querySelector('textarea[name="revDesc"]').value;
    reviewBox = document.querySelector('.yourReview');

    event.preventDefault();
    $('.revForm').collapse('hide')
    reviewBox.innerHTML = `<p class="fw-light mb-2">Your Review</p>`.concat(`
    <div class="card mb-3">
    <div class="card-header border-bottom-0 bg-white d-flex justify-content-between align-items-center">
            <div class="user-profile">
                <img class="pfp img-fluid" src="../assets/icon-placeholder.png" alt="">
                <span class="fs-6"> Juan </span>
            </div>
            <div>
                <h5 class="d-inline-blockz"><span class="me-3">`).concat(rating).concat(`</span><meter class="average-rating yourRevRating mang-inasal d-inline-block" min="0" max="5"></meter></h5>
            </div>
    </div>
    <div class="card-body pt-0 pb-2 m-0">
        <p class="c00000xx reviewtext mb-2 card-text">
        `).concat(reviewDesc).concat(`
        </p>
        <textarea class="card-text c00000xx yourRevEdit form-control mb-2" style="display: none">
        </textarea>
        <div class="d-flex justify-content-end align-items-center mb-0">
            <span class="c00000xx chat chatbg "></span>
            <span class="c00000xx cNum card-text">0</span>
            <span class="c00000xx up upbg ms-2"> </span>
            <span class="c00000xx uvote card-text">0</span>
            <span class="c00000xx down downbg ms-2"></span>
            <span class="c00000xx dvote card-text">0</span>
            <span class="c00000xx edit editbg ms-2"></span>
            <button class="c00000xx doneEdit btn btn-sm btn-outline-dark ms-2" style="display: none">done</button>
        </div>
    </div>

    `);
    r = document.querySelector(':root');
    r.style.setProperty('--yourRev', 'calc('.concat(rating).concat('/ 5 * 100%)'));
}

function editText(event) {
    let id = ".".concat(event.target.className.substring(0,8));
    desc = document.querySelector(id.concat(".reviewtext"));
    textarea = document.querySelector(id.concat(".yourRevEdit"));
    icon = document.querySelector(id.concat(".edit"));
    btn = document.querySelector(id.concat(".doneEdit"));

    console.log(id.concat(".reviewtext"))
    console.log(id.concat(".yourRevEdit"))
    desc.style.display = "none";
    textarea.style.display = null;
    icon.style.display = "none";
    btn.style.display = null;
    textarea.innerHTML = desc.innerHTML.trim();
}

function doneEditText(event){
    let id = ".".concat(event.target.className.substring(0,8));
    desc = document.querySelector(id.concat(".reviewtext"));
    textarea = document.querySelector(id.concat(".yourRevEdit"));
    icon = document.querySelector(id.concat(".edit"));
    btn = document.querySelector(id.concat(".doneEdit"));
    
    textarea.style.display = "none";
    desc.style.display = null;
    btn.style.display = "none";
    icon.style.display = null;
    desc.innerHTML = textarea.value.trim();
}

var replyNum = 99; 

function insertReply (event) {
    let id = event.target.className.substring(0,8);
    textname = id + 'text';
    console.log("#" + textname)
    replyDesc = document.querySelector('textarea[name="' + textname + '"]').value;
    replyList = document.querySelector('.comment.' + id);
    replyTextArea = document.querySelector("#" + textname);
 
    event.preventDefault();
    replyTextArea.value = "";

    newReplyID = id.substring(0,6) + replyNum;
    console.log(newReplyID)
    replyList.innerHTML += `
    <li class=" ` + newReplyID + ` list-group-item">
                                <div class="  user-profilecomment">
                                    <img class="pfp img-fluid" src="../assets/icon-placeholder.png" alt="">
                                    <span class="fs-6"> Juan </span>
                                </div>
                                <p class="` + newReplyID + ` reviewtext mb-1 card-text">
                                ` + replyDesc + `
                                </p>
                                <textarea class="` + newReplyID + ` card-text yourRevEdit form-control mb-2" style="display: none">
                                </textarea>
                                <div class="d-flex justify-content-end align-items-center mb-0">
                                    <span class="` + newReplyID + ` chat chatbg "></span>
                                    <span class="` + newReplyID + ` cNum card-text">0</span>
                                    <span class="` + newReplyID + ` up upbg ms-2"> </span>
                                    <span class="` + newReplyID + ` uvote card-text">0</span>
                                    <span class="` + newReplyID + ` down downbg ms-2"></span>
                                    <span class="` + newReplyID + ` dvote card-text">0</span>
                                    <span class="` + newReplyID + ` edit editbg ms-2"></span>
                                    <button class="` + newReplyID + ` doneEdit btn btn-sm btn-outline-dark ms-2" style="display: none">done</button>
                                </div>
                                <ul class="` + newReplyID + `  ms-4 comment list-group list-group-flush collapse"></ul>
                        </li>
    
    `;
    replyNum--; 
    updateCommentCount ("." + id)
    $("." + id.concat('.wReply')).collapse('hide')
    $("." + id.concat('.comment')).collapse('show')
}
