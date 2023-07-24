document.addEventListener("click", event=> {
    classlist = event.target.classList;
    // console.log(classlist)
    
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
        } else if (classlist.contains('c00000xx') && 
                    classlist.contains('editRev')) {
            editReview ()
        }else if (classlist.contains('edit-review')) {
            editText(event)
        } else if (classlist.contains('doneEdit')) {
            doneEditText(event)
        } else if (classlist.contains('estabResponse')) {
            showEstabResponse(event)
        } else if (classlist.contains('reviewtext')) {
            showMoreReadLess(event)
        } else if (classlist.contains('del-review')) {
            deleteCommit (event)
        } 
    }

})

document.addEventListener("submit", event=> {
    event.preventDefault()
    if (localStorage.getItem('currentLogin') !==  null) {
        if (classlist.contains('postReview')) {
            insertReview (event)
        } else if (classlist.contains('postReply')) {
            insertReply (event)
        }
    } 
})

document.querySelector("#searchForm button").addEventListener("click", (event) => {
    console.log("flag");
    document.querySelector("#searchForm").submit();
})

async function updateHelp (_id, potch) {
    await fetch('/', {
        method: 'PATCH',
        body: JSON.stringify({
        reviewId: _id,
        userID: "64aed2aff586db31f5a01231",
        updateH: potch
        }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
        }).then(res => console.log(res)).catch((err) => console.log(err))
}

async function markUp (event) {
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
        potch = "up";
    } else {
        $(up).addClass('upbg').removeClass('upbgfill')
        $(upvote).text(votes - 1);
        potch = "up_";
    }
    updateHelp (parent.id, potch)
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
        potch = "down";
    } else {
        $(down).addClass('downbg').removeClass('downbgfill')
        $(downvote).text(votes - 1);
        potch = "down_";
    }
    updateHelp (parent.id, potch)
}

function showChat (event) {
    parent = event.target.closest('.REVIEW')
    targ = parent.querySelector(':scope > .comment')
    if (targ == null) {
        targ = parent.querySelector(':scope .comment')
    } 

    $(targ).collapse('toggle')
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

async function deleteCommit (event) {
    parent = event.target.closest('.REVIEW')
    if (!parent.classList.contains('list-group-item')){
        await fetch('/review', {
            method: 'DELETE',
            body: JSON.stringify({
            reviewId: parent.id
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
            }).then(res => {console.log(res);
                if (res.status == 200)
                    location.reload(); 
            }).catch((err) => console.log(err))
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

 async function respoEstab (event) {
    parent = event.target.closest('.REVIEW')
    formm = new FormData(parent.querySelector('form'));
    formm.append("revID", parent.id)
    event.preventDefault();

    await fetch("/estabRespo", {
        method: "POST",
        body: formm,
    }).then(res => {console.log(res);
        if (res.status == 200)
            location.reload(); 
    }).catch((err) => console.log(err))
}

async function insertReview (event) {
    formDat = new FormData(document.forms.reviewForm)
    console.log(formDat)
    event.preventDefault();

    if (formDat.get("userID") != "") {
        console.log("posted HERE")
        yo = await fetch("/review", {
            method: "PATCH",
            body: formDat,
        })
        .then(res => {console.log(res);
            if (res.status == 200)
                location.reload(); 
        }).catch((err) => console.log(err))
    } else {
    fetch("/review", {
        method: "POST",
        body: formDat,
    }).then(res => {console.log(res);
        if (res.status == 200)
            location.reload(); 
    }).catch((err) => console.log(err))
}
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
    icon = parent.querySelector( ".edit-review");
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
    icon = parent.querySelector( ".edit-review");
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
                                    <a href="user-profile-view.html" class="flex-center"><img class="pfpRev img-fluid" src="${localStorage.getItem('pfp')}" alt=""></a>
                                    <div class="postDeats">
                                        <a class="user-link" href="user-profile-view.html">${localStorage.getItem('savedUsername')}</a>
                                        <div class=" status">Just Now</div>
                                    </div>
                                </div>
                                <p class="reviewtext card-text">
                                ` 
    string2 = `
                                </p>
                                <textarea class=" card-text yourRevEdit form-control mb-2" style="display: none"></textarea>
                                <div class="flex-center iconBox">
                                    <span class="chat chatbg "></span>
                                    <span class="cNum card-text">0</span>
                                    <span class="up upbg"> </span>
                                    <span class=" uvote card-text">0</span>
                                    <span class="down downbg"></span>
                                    <span class="dvote card-text">0</span>
                                    <span class="edit-review editbg ms-3"></span>
                                    <span class="del-review delbg"></span>
                                    <button class="doneEdit btn btn-sm btn-outline-success ms-2" style="display: none">done</button>
                                </div>
                                <ul class="comment list-group list-group-flush collapse"></ul>
                        </li>
    
    `;
    replyList.innerHTML += (string1 + replyDesc + string2)
    parent.querySelector('textarea').value = "";
    
    $(parent.querySelector('.wReply')).collapse('hide')
    $(replyList).collapse('show')
}


let fileInput = document.querySelector('#mediaInput');
let fileList = document.querySelector(".filelist");

fileInput.addEventListener("change", () => {
    updateImgInputList ()
});

function updateImgInputList () {
    fileList.innerHTML = "";
    console.log("hey")
    for (i of fileInput.files) {
      let listItem = document.createElement("li");
      let fileName = i.name;
      let fileSize = (i.size / 1024).toFixed(1);
      listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}KB</p>`;
      if (fileSize >= 1024) {
        fileSize = (fileSize / 1024).toFixed(1);
        listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}MB</p>`;
      }
      fileList.appendChild(listItem);
    }
}