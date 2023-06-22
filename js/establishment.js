const review = document.querySelector(".reviews")
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
    } else if (classlist.contains('estabResponse')) {
        showEstabResponse(event)
    } else if (classlist.contains('reviewtext')) {
        showMoreReadLess(event)
    } else if (classlist.contains('del')) {
        deleteCommit (event)
    }
})

function markUp (event) {
    targ = event.target
    let id = "." + targ.className.substring(0,8);
    let votes = parseInt($(id + '.uvote').text());
    console.log(id + '.down');
    if (targ.classList.contains("upbg")) {
        $(targ).addClass('upbgfill').removeClass('upbg') 
        $(id + '.uvote').text(votes + 1);
        if ($(id + '.down').hasClass("downbgfill")) {
            $(id + '.downbgfill').addClass('downbg').removeClass('downbgfill')
            $(id + '.dvote').text(parseInt($(id + '.dvote').text()) - 1);
        }
    } else {
        $(targ).addClass('upbg').removeClass('upbgfill')
        $(id + '.uvote').text(votes - 1);
    }
}

function markDown (event) {
    targ = event.target
    id = "." + targ.className.substring(0,8);
    let votes = parseInt($(id + '.dvote').text());
    if (targ.classList.contains("downbg")) {
        $(targ).addClass('downbgfill').removeClass('downbg') 
        $(id + '.dvote').text(votes + 1);
        if ($(id + '.up').hasClass("upbgfill")) {
            $(id + '.upbgfill').addClass('upbg').removeClass('upbgfill')
            $(id + '.uvote').text(parseInt($(id + '.uvote').text()) - 1);
        }
    } else {
        console.log("Aww");
        $(targ).addClass('downbg').removeClass('downbgfill')
        $(id + '.dvote').text(votes - 1);
    }
}

function showChat (event) {
    let id = "." + event.target.className.substring(0,8);
    $(id + '.comment').collapse('toggle') // changes background on click
    console.log(id)
    updateCommentCount (id)
}

function reply (event) {
    id = "." + event.target.className.substring(0,8);
    $(id + '.wReply').collapse('toggle') // changes background on click
    console.log(id)
}

function showEstabResponse (event) {
    id = "." + event.target.className.substring(0,8);
    $(id + '.estabResponseText').collapse('toggle') // changes background on click
    console.log(id)
}

function deleteCommit (event) {
    id = "." + event.target.className.substring(0,8);
    if (id == ".c00000xx"){
        bye = document.querySelector('.yourReview')
        bye.innerHTML = "";
        $('.revForm').collapse('show')
    } else {
        bye = document.querySelector(id + '.list-group-item')
        bye.remove();
    }
}

function showMoreReadLess(event) {
    targ = event.target
    id = "." + targ.className.substring(0,8);
    if (targ.classList.contains("truncate")) {
        $(targ).removeClass('truncate') 
    } else {
        $(targ).addClass('truncate') 
    }
}

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
    var ul = document.querySelector(reviewID + '.comment');
    var i=0, itemCount =0;
    while(ul.getElementsByTagName('li') [i++]) itemCount++;
    //from https://techwelkin.com/javascript-count-items-in-html-list
    document.querySelector(reviewID + '.cNum').innerHTML = itemCount;
}

function insertReview (event) {
    rating = document.querySelector('input[name="rate"]:checked').value;
    reviewDesc = document.querySelector('textarea[name="revDesc"]').value;
    reviewBox = document.querySelector('.yourReview');

    event.preventDefault();
    $('.revForm').collapse('hide')
    reviewBox.innerHTML = `<p class="fw-light mb-2">Your Review</p>` + `
    <div class="card mb-3">
    <div class="card-header border-bottom-0 bg-white d-flex justify-content-between align-items-center">
            <div class="user-profile">
                <img class="pfp img-fluid" src="../assets/icon-placeholder.png" alt="">
                <span class="fs-6"> Juan </span>
            </div>
            <div>
                <h5 class="d-inline-blockz"><span class="me-3">` + rating + `</span><meter class="average-rating yourRevRating mang-inasal d-inline-block" min="0" max="5"></meter></h5>
            </div>
    </div>
    <div class="card-body pt-0 pb-2 m-0">
        <p class="c00000xx reviewtext mb-2 card-text">
        ` + reviewDesc + `
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
            <span class="c00000xx edit editbg ms-3"></span>
            <span class="c00000xx del delbg ms-2"></span>
            <button class="c00000xx doneEdit btn btn-sm btn-outline-dark ms-2" style="display: none">done</button>
        </div>
    </div>

    `;
    r = document.querySelector(':root');
    r.style.setProperty('--yourRev', 'calc(' + rating + '/ 5 * 100%)');
    clearForm = document.querySelector("#reviewForm")
    clearForm.reset();
}

function editText(event) {
    let id = "." + event.target.className.substring(0,8);
    desc = document.querySelector(id + ".reviewtext");
    textarea = document.querySelector(id + ".yourRevEdit");
    icon = document.querySelector(id + ".edit");
    btn = document.querySelector(id + ".doneEdit");

    console.log(id + ".reviewtext")
    console.log(id + ".yourRevEdit")
    desc.style.display = "none";
    textarea.style.display = null;
    icon.style.display = "none";
    btn.style.display = null;
    textarea.innerHTML = desc.innerHTML.trim();
}

function doneEditText(event){
    let id = "." + event.target.className.substring(0,8);
    desc = document.querySelector(id + ".reviewtext");
    textarea = document.querySelector(id + ".yourRevEdit");
    icon = document.querySelector(id + ".edit");
    btn = document.querySelector(id + ".doneEdit");
    
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
                                    <span class="` + newReplyID + ` edit editbg ms-3"></span>
                                    <span class="` + newReplyID + ` del delbg ms-2"></span>
                                    <button class="` + newReplyID + ` doneEdit btn btn-sm btn-outline-dark ms-2" style="display: none">done</button>
                                </div>
                                <ul class="` + newReplyID + `  ms-4 comment list-group list-group-flush collapse"></ul>
                        </li>
    
    `;
    replyNum--; 
    updateCommentCount ("." + id)
    $("." + id + '.wReply').collapse('hide')
    $("." + id + '.comment').collapse('show')
}
