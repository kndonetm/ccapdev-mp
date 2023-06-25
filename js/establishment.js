document.addEventListener("click", event=> {
    classlist = event.target.classList;
    console.log(classlist)
    
    if (localStorage.getItem('currentLogin') === null && 
         (classlist.contains('reply') ||
            classlist.contains('down') ||
            classlist.contains('up') ||
            classlist.contains('postReview')
        )) {
            var myModal = new bootstrap.Modal(document.getElementById('signin'), {
                keyboard: false
                })
            myModal.show()
         
    }  else {
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
    }

})


function markUp (event) {
    parent = event.target.closest('.REVIEW')
    up = parent.querySelector('.up')
    down = parent.querySelector('.down')
    upvote = parent.querySelector('.uvote')
    downvote = parent.querySelector('.dvote')
    let votes = parseInt(upvote.innerHTML);

    if ($(up).hasClass("upbg")) {
        $(up).addClass('upbgfill').removeClass('upbg') 
        $(upvote).text(votes + 1);
        if ($(down).hasClass("downbgfill")) {
            $(down).addClass('downbg').removeClass('downbgfill')
            $(downvote).text(parseInt($(downvote).text()) - 1);
        }
    } else {
        $(up).addClass('upbg').removeClass('upbgfill')
        $(upvote).text(votes - 1);
    }
}

function markDown (event) {
    parent = event.target.closest('.REVIEW')
    up = parent.querySelector('.up')
    down = parent.querySelector('.down')
    upvote = parent.querySelector('.uvote')
    downvote = parent.querySelector('.dvote')
    let votes = parseInt(downvote.innerHTML);


    if ($(down).hasClass("downbg")) {
        $(down).addClass('downbgfill').removeClass('downbg') 
        $(downvote).text(votes + 1);
        if ($(up).hasClass("upbgfill")) {
            $(up).addClass('upbg').removeClass('upbgfill')
            $(upvote).text(parseInt($(upvote).text()) - 1);
        }
    } else {
        $(down).addClass('downbg').removeClass('downbgfill')
        $(downvote).text(votes - 1);
    }
}

function showChat (event) {
    parent = event.target.closest('.REVIEW')
    targ = parent.querySelector(':scope > .comment')
    if (targ == null) {
        targ = parent.querySelector(':scope .comment')
    } 

    $(targ).collapse('toggle')
    updateCommentCount(targ);
}

function reply (event) {
    parent = event.target.closest('.REVIEW')
    replies = parent.querySelector('.wReply')
    $(replies).collapse('toggle') 
}

function showEstabResponse (event) {
    parent = event.target.closest('.REVIEW')
    $(parent.querySelector('.estabResponseText')).collapse('toggle') 
}

function deleteCommit (event) {
    parent = event.target.closest('.REVIEW')
    if (!parent.classList.contains('list-group-item')){
        bye = document.querySelector('.yourReview')
        bye.innerHTML = "";
        clearForm = document.querySelector("#reviewForm")
        clearForm.reset();
        $('.revForm').collapse('show')
        btn = document.querySelector('.postReview')
        btn.innerHTML = "Post"
        posted = false;
    } else {
        parent.remove();
    }
}

function showMoreReadLess(event) {
    parent = event.target.closest('.REVIEW')
    text = parent.querySelector('.reviewtext')
    if (text.classList.contains("truncate")) {
        $(text).removeClass('truncate') 
        text.style.cursor = "pointer";
    } else {
        $(text).addClass('truncate') 
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

function updateCommentCount (list) {
    console.log(list.getElementsByTagName("li"))
    parent.querySelector('.cNum').innerHTML = list.getElementsByTagName("li").length;
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
    <div class="card REVIEW mb-3">
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
            <span class=" chat chatbg "></span>
            <span class=" cNum card-text">0</span>
            <span class=" up upbg"> </span>
            <span class=" uvote card-text">0</span>
            <span class=" down downbg"></span>
            <span class=" dvote card-text">0</span>
            <span class="c00000xx editRev edit editbg ms-3"></span>
            <span class=" del delbg ms-2"></span>
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
    parent = event.target.closest('.REVIEW')
    desc = parent.querySelector( ".reviewtext");
    textarea = parent.querySelector( ".yourRevEdit");
    icon = parent.querySelector( ".edit");
    btn = parent.querySelector(".doneEdit");

    desc.style.display = "none";
    textarea.style.display = null;
    icon.style.display = "none";
    btn.style.display = null;
    textarea.innerHTML = desc.innerHTML.trim();
}

function doneEditText(event){
    parent = event.target.closest('.REVIEW')
    desc = parent.querySelector(".reviewtext");
    textarea = parent.querySelector(".yourRevEdit");
    icon = parent.querySelector( ".edit");
    btn = parent.querySelector(".doneEdit");
    thestatus = parent.querySelector(".status");
    
    textarea.style.display = "none";
    desc.style.display = null;
    btn.style.display = "none";
    icon.style.display = null;
    desc.innerHTML = textarea.value.trim();
    thestatus.innerHTML = "moments ago • edited"
}

function insertReply (event) {
    parent = event.target.closest('.REVIEW')
    replyDesc = parent.querySelector('textarea').value;
    replyList = parent.querySelector(':scope > .comment');
    
    if (replyList == null) {
        replyList = parent.querySelector(':scope .comment');
    }

    console.log(event.target)
    console.log(parent)
    console.log(replyList)

    event.preventDefault();
    string1 = `
    <li class=" list-group-item REVIEW">
                                <div class="user-profile flex-center">
                                    <a href="user-profile-view.html" class="flex-center"><img class="pfp img-fluid" src="../assets/icon-placeholder.png" alt=""></a>
                                    <div class="postDeats">
                                        <a class="user-link" href="user-profile-view.html">Juan De La Cruz</a>
                                        <div class=" status">Just Now</div>
                                    </div>
                                </div>
                                <p class="reviewtext card-text">
                                ` 
    string2 = `
                                </p>
                                <textarea class=" card-text yourRevEdit form-control mb-2" style="display: none">
                                </textarea>
                                <div class="flex-center iconBox">
                                    <span class="chat chatbg "></span>
                                    <span class="cNum card-text">0</span>
                                    <span class="up upbg"> </span>
                                    <span class=" uvote card-text">0</span>
                                    <span class="down downbg"></span>
                                    <span class="dvote card-text">0</span>
                                    <span class="edit editbg ms-3"></span>
                                    <span class=" del delbg ms-2"></span>
                                    <button class="doneEdit btn btn-sm btn-outline-success ms-2" style="display: none">done</button>
                                </div>
                                <ul class="comment list-group list-group-flush collapse"></ul>
                        </li>
    
    `;
    replyList.innerHTML += (string1 + replyDesc + string2)
    parent.querySelector('textarea').value = "";
    
    $(parent.querySelector('.wReply')).collapse('hide')
    $(replyList).collapse('show')
    
    updateCommentCount (replyList)
}

