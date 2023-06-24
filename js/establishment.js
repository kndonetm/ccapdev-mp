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
    } else if (classlist.contains('c00000xx') && 
                classlist.contains('editRev')) {
        editReview ()
    }else if (classlist.contains('edit')) {
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
        $(targ).addClass('downbg').removeClass('downbgfill')
        $(id + '.dvote').text(votes - 1);
    }
}

function showChat (event) {
    let id = "." + event.target.className.substring(0,8);
    $(id + '.comment').collapse('toggle')
    updateCommentCount (id)
}

function reply (event) {
    id = "." + event.target.className.substring(0,8);
    $(id + '.wReply').collapse('toggle') 
}

function showEstabResponse (event) {
    id = "." + event.target.className.substring(0,8);
    $(id + '.estabResponseText').collapse('toggle') 
}

function deleteCommit (event) {
    id = "." + event.target.className.substring(0,8);
    if (id == ".c00000xx"){
        bye = document.querySelector('.yourReview')
        bye.innerHTML = "";
        clearForm = document.querySelector("#reviewForm")
        clearForm.reset();
        $('.revForm').collapse('show')
        btn = document.querySelector('.postReview')
        btn.innerHTML = "Post"
        posted = false;
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
        targ.style.cursor = "pointer";
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

var posted = false;
function insertReview (event) {
    rating = document.querySelector('input[name="rate"]:checked').value;
    tite = document.querySelector('input[name="title"]').value;
    reviewDesc = document.querySelector('textarea[name="revDesc"]').value;
    reviewBox = document.querySelector('.yourReview');
    thefiles = document.querySelector('#customFile1').files;

    event.preventDefault();
    $('.yourReview').collapse('show')
    console.log($('.revForm').collapse('hide'))
    string1 = `<p class="fw-light mb-2">Your Review</p>
    <div class="card mb-3">
                <div class="card-header reviewHeader flex-center">
                <div class="user-profile flex-center">
                <a href="user-profile-view.html" class="flex-center"><img class="pfp img-fluid" src="../assets/icon-placeholder.png" alt=""></a>
                <div class="postDeats">
                    <a class="user-link" href="user-profile-view.html">Juan De La Cruz</a>
                    <div class="c00000xx status">`
    if (posted == false) {
        string1a = "Just Now"
    } else {
        string1a = "moments ago • edited"
    }
    console.log(string1a)

    string1b = `</div>
                </div>
                </div>
            <div>
                <h5 class="d-inline-blockz">
                <span class="ratingz">` + rating + `</span><meter class="average-rating yourRevRating mang-inasal d-inline-block" min="0" max="5">
                </meter></h5>
            </div>
    </div>
    <div class="card-body reviewBody">
        <h6 class="card-title reviewTitle">` + tite +`</h6>
        <p class="c00000xx reviewtext card-text">
        ` + reviewDesc + `
        </p>
    
        `;

    string2 = ""
    string3 = "";
    if (thefiles.length > 0) {
        string2 = '<div class="card-body revMedia">'
        y = 4
        if (thefiles.length > 4)
            y = 3
        for(let x = 0; x < y; x++) {
            if (thefiles[x] instanceof File) {
                theURL = URL.createObjectURL( thefiles[x]);
                type = thefiles[x]['type'];
        
                switch (type.split('/')[0]) {
                    case "image":
                        string2 += '<span><img class="img-fluid" src="' + theURL +'"></span>'
                        break;
                    case "video":
                        string2 += '<span><video class="img-fluid" src="' + theURL +'" controls /></span>'
                        break;
                    case "audio":
                        string2 += '<span class="audio"><audio  src="' + theURL +'" controls></span>'
                        break;
                }
            }
        }
        string3 = "</div>"
    }
    string4 ="";
    string5 ="";
    if (thefiles.length > 4) {
        string3 = 
        `<button class="imgBtn" data-bs-toggle="modal" data-bs-target=".c00000xx.moreImg">+` + (thefiles.length-3) +`</button>
        </div><div class="modal c00000xx moreImg">
                            <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button class="btn-close btn-close-success me-2" data-bs-dismiss="modal"></button>
                                </div><div class="modal-body moreImgBox">
                `

                for (x in thefiles) {
                    if (thefiles[x] instanceof File) {
                        theURL = URL.createObjectURL( thefiles[x]);
                        type = thefiles[x]['type'];
                
                        switch (type.split('/')[0]) {
                            case "image":
                                string4 += '<span><img class="img-fluid" src="' + theURL +'"></span>'
                                break;
                            case "video":
                                string4 += '<span><video class="img-fluid" src="' + theURL +'" controls /></span>'
                                break;
                            case "audio":
                                string4 += '<span class="audio"><audio  src="' + theURL +'" controls></span>'
                                break;
                        }
                    }
                }   
                string5 = '</div></div> </div></div> '        
    }
    string6 = `
            <div class="flex-center iconBox">
            <span class="c00000xx chat chatbg "></span>
            <span class="c00000xx cNum card-text">0</span>
            <span class="c00000xx up upbg"> </span>
            <span class="c00000xx uvote card-text">0</span>
            <span class="c00000xx down downbg"></span>
            <span class="c00000xx dvote card-text">0</span>
            <span class="c00000xx editRev edit editbg ms-3"></span>
            <span class="c00000xx del delbg ms-2"></span>
        </div>
        </form>
    </div>

    `;

    reviewBox.innerHTML = string1 + string1a + string1b + string2 + string3  + string4 + string5 + string6;
    
    if (thefiles.length > 4) {
    button = document.querySelector('.c00000xx.imgBtn')                                                     
    button.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('+ URL.createObjectURL( thefiles[3]) + ')'
    }

    r = document.querySelector(':root');
    r.style.setProperty('--yourRev', 'calc(' + rating + '/ 5 * 100%)');
    posted = true;
}

var x = "";

function editReview() {
    $('.revForm').collapse('show')
    $('.yourReview').collapse('hide')
    bye = document.querySelector('.yourReview')
    bye.innerHTML = "";
    btn = document.querySelector('.postReview')
    btn.innerHTML = "done"
}

function editText(event) {
    console.log("Her")
    let id = "." + event.target.className.substring(0,8);
    desc = document.querySelector(id + ".reviewtext");
    textarea = document.querySelector(id + ".yourRevEdit");
    icon = document.querySelector(id + ".edit");
    btn = document.querySelector(id + ".doneEdit");

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
    thestatus = document.querySelector(id + ".status");
    
    textarea.style.display = "none";
    desc.style.display = null;
    btn.style.display = "none";
    icon.style.display = null;
    desc.innerHTML = textarea.value.trim();
    
    console.log(id + ".status")
    
    console.log(thestatus)
    thestatus.innerHTML = "moments ago • edited"
}


var replyNum = 99; 
function insertReply (event) {
    let id = event.target.className.substring(0,8);
    textname = id + 'text';
    replyDesc = document.querySelector('textarea[name="' + textname + '"]').value;
    replyList = document.querySelector('.comment.' + id);
    replyTextArea = document.querySelector("#" + textname);
 
    event.preventDefault();
    replyTextArea.value = "";

    newReplyID = id.substring(0,6) + replyNum;
    replyList.innerHTML += `
    <li class=" ` + newReplyID + ` list-group-item">
                                <div class="user-profile flex-center">
                                    <a href="user-profile-view.html" class="flex-center"><img class="pfp img-fluid" src="../assets/icon-placeholder.png" alt=""></a>
                                    <div class="postDeats">
                                        <a class="user-link" href="user-profile-view.html">Juan De La Cruz</a>
                                        <div class="` + newReplyID + ` status">Just Now</div>
                                    </div>
                                </div>
                                <p class="` + newReplyID + ` reviewtext card-text">
                                ` + replyDesc + `
                                </p>
                                <textarea class="` + newReplyID + ` card-text yourRevEdit form-control mb-2" style="display: none">
                                </textarea>
                                <div class="flex-center iconBox">
                                    <span class="` + newReplyID + ` chat chatbg "></span>
                                    <span class="` + newReplyID + ` cNum card-text">0</span>
                                    <span class="` + newReplyID + ` up upbg"> </span>
                                    <span class="` + newReplyID + ` uvote card-text">0</span>
                                    <span class="` + newReplyID + ` down downbg"></span>
                                    <span class="` + newReplyID + ` dvote card-text">0</span>
                                    <span class="` + newReplyID + ` edit editbg ms-3"></span>
                                    <span class="` + newReplyID + ` del delbg ms-2"></span>
                                    <button class="` + newReplyID + ` doneEdit btn btn-sm btn-outline-success ms-2" style="display: none">done</button>
                                </div>
                                <ul class="` + newReplyID + ` comment list-group list-group-flush collapse"></ul>
                        </li>
    
    `;
    replyNum--; 
    updateCommentCount ("." + id)
    $("." + id + '.wReply').collapse('hide')
    $("." + id + '.comment').collapse('show')
}
