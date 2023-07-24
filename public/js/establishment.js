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
            reply(event);
            
        } 
        else if (classlist.contains('edit-reply')) {
            editReply(event);
        } else if (classlist.contains('del-reply')) {
            deleteReplyfetch(event)
        }
        else if (classlist.contains('chat')) {
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
            console.log("rehrehr")
            if (classlist.contains('estab'))
                respoEstab(event)
            else
                replyfetch (event)
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
        if (parent.classList.contains('estab')) 
            deleteRespoEstab(event);
        else await fetch('/review', {
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
    }else {
        deleteReplyfetch (event)
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

async function editRespoEstab (event) {
    parent = event.target.closest('.REVIEW')
    formm = new FormData(parent.querySelector('form'));
    formm.append("revID", parent.id)
    event.preventDefault();

    await fetch("/estabRespo", {
        method: "patch",
        body: formm,
    }).then(res => {console.log(res);
        if (res.status == 200)
            location.reload(); 
    }).catch((err) => console.log(err))
}

async function deleteRespoEstab (event) {
    parent = event.target.closest('.REVIEW')
    formm = new FormData(parent.querySelector('form'));
    formm.append("revID", parent.id)
    event.preventDefault();

    await fetch("/estabRespo", {
        method: "delete",
        body: formm,
    }).then(res => {console.log(res);
        if (res.status == 200)
            location.reload(); 
    }).catch((err) => console.log(err))
}

async function replyfetch (event) {
    parent = event.target.closest('.REVIEW')
    formm = new FormData(parent.querySelector('form'));
    revID = parent.id;
    parID = null;
    event.preventDefault();
    console.log("rehrdsehr")

    if (parent.classList.contains('list-group-item')) {
        parID = revID;
        revID = null;
    }

    formm.append("revID", revID)
    formm.append("parID", parID)
    console.log("dsd")
    console.log(formm.get("text"))

    await fetch("/comment", {
        method: "POST",
        body: JSON.stringify({
            revID: formm.get("revID"),
            parID: formm.get("parID"),
            text: formm.get("text")
        }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(res => {console.log(res);
        if (res.status == 200)
            location.reload(); 
    }).catch((err) => console.log(err))
}

function editReply(event) {
    console.log("Her")
    parent = event.target.closest('.REVIEW')
    desc = parent.querySelector( ".reviewtext");
    textarea = parent.querySelector( ".yourRevEdit");
    icon = parent.querySelector( ".edit-reply");
    btn = parent.querySelector(".doneEdit");

    desc.style.display = "none";
    textarea.style.display = null;
    icon.style.display = "none";
    btn.style.display = null;
    textarea.innerHTML = desc.innerHTML.trim();
}

async function editReplyfetch (event) {
    formm = new FormData(parent.querySelector('.edit-comment-form'));
    console.log(parent.querySelector('.edit-comment-form'))
    console.log(formm);

    formm.append("commID", parent.id)
    event.preventDefault();

    await fetch("/comment", {
        method: "PATCH",
        body: JSON.stringify({
            commID: formm.get("commID"),
            text: formm.get("text")
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
    }).then(res => {console.log(res);
        if (res.status == 200)
            location.reload(); 
    }).catch((err) => console.log(err))
}

async function deleteReplyfetch (event) {
    parent = event.target.closest('.REVIEW')
    console.log(parent.getAttribute("name"));

    event.preventDefault();

    await fetch("/comment", {
        method: "DELETE",
        body: JSON.stringify({commID: parent.id}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
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
    
    if (parent.classList.contains('estab')) 
        editRespoEstab (event)
    else {
        editReplyfetch (event)
    }
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