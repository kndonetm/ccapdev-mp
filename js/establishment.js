let reviewed = false;

const review = document.querySelector("body")
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
    } else if (classlist.contains('post-btn')) {
        insertEditReview(event)
    } else if (classlist.contains('trash')) {
        delReview(event)
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
    if (targ.classList.contains("fa-thumbs-o-up")) {
        $(targ).addClass('fa-thumbs-up').removeClass('fa-thumbs-o-up') 
        $(id + '.uvote').text(votes + 1);
        if ($(id + '.down').hasClass("fa-thumbs-down")) {
            $(id + '.fa-thumbs-down').addClass('fa-thumbs-o-down').removeClass('fa-thumbs-down')
            $(id + '.dvote').text(parseInt($(id + '.dvote').text()) - 1);
        }
    } else {
        $(targ).addClass('fa-thumbs-o-up').removeClass('fa-thumbs-up')
        $(id + '.uvote').text(votes - 1);
    }
}

function markDown (event) {
    targ = event.target
    id = "." + targ.className.substring(0,8);
    let votes = parseInt($(id + '.dvote').text());
    if (targ.classList.contains("fa-thumbs-o-down")) {
        $(targ).addClass('fa-thumbs-down').removeClass('fa-thumbs-o-down') 
        $(id + '.dvote').text(votes + 1);
        if ($(id + '.up').hasClass("fa-thumbs-up")) {
            $(id + '.fa-thumbs-up').addClass('fa-thumbs-o-up').removeClass('fa-thumbs-up')
            $(id + '.uvote').text(parseInt($(id + '.uvote').text()) - 1);
        }
    } else {
        console.log("Aww");
        $(targ).addClass('fa-thumbs-o-down').removeClass('fa-thumbs-down')
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

function insertEditReview (event) {
    revbtn = document.querySelector('.review-btn');
    modal = document.querySelector('#post-review');
    rating = document.querySelector('input[name="rate"]:checked').value;
    title = document.querySelector('textarea[name="title"]').value;
    reviewDesc = document.querySelector('textarea[name="revDesc"]').value;
    reviewBox = document.querySelector('.current-review');
    thefiles = document.querySelector('#file-input').files;
   
    username = localStorage.getItem('savedUsername');
    timeReviewed = '0 hours ago';
    pfp = 'icon-placeholder.png';
   

    event.preventDefault();

    content1 = ` <div class="row">
                    <div class="card mb-3">
                        <!-- profile (req)-->
                        <div class="card-header border-bottom-0 pt-2 pb-0">
                                <div class="user-profile pb-0 mb-0">
                                    <img class="pfp img-fluid" src="../assets/${pfp}" alt="">
                                    <span class="fs-6"> ${username} </span>
                                    <span>&#9679; Reviewed ${timeReviewed}</span>
                                </div>
                        </div>

                        <!-- review text (req)-->
                        <div class="card-body pt-0 pb-2 ms-5">
                            <h3><meter class="average-rating yourRevRating mang-inasal d-inline-block" min="0" max="5"></meter></h3>
                            <!-- UNIQUE ID PER REVIEW -->
                            <h6 class="card-title mb-1">${title}</h6>
                            <p class="c00000xx  reviewtext truncate mb-2 card-text">
                                ${reviewDesc}
                            </p>
                          `;

    string2 = ""
    string3 = "";
    if (thefiles.length > 0) {
        string2 = '<div class="card-body p-0 d-flex mb-2 revMedia">'
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
                        string2 += '<span class="d-inline-block video"><video class="vid" src="' + theURL +'" controls /></span>'
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
        `<button class="c00000xx imgBtn text-white" data-bs-toggle="modal" data-bs-target=".c00000xx.moreImg">+` + (thefiles.length-3) +`</button>
        </div><div class="modal c00000xx moreImg">
                            <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header p-4">
                                    <button class="btn-close btn-close-secondary me-2" data-bs-dismiss="modal"></button>
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
                                string4 += '<span class="d-inline-block video"><video class="vid" src="' + theURL +'" controls /></span>'
                                break;
                        }
                    }
                }   
                string5 = '</div></div> </div></div> '        
    }
    
    content2 = `<!-- icons -->
                <div class="d-flex justify-content-between mt-3 icons">
                    <div>
                        <i class="c00000xx fa fa-thumbs-o-up up" type="button"></i>
                        <span class="c00000xx uvote card-text ms-2 count-container d-inline-block">0</span>
                        <i class="c00000xx fa fa-thumbs-o-down down" type="button"></i>
                        <span class="c00000xx dvote card-text ms-2 count-container d-inline-block">0</span>
                        <i class="a00000xx estabResponse far fa-comment-alt comment" type="button"></i>
                    </div>
                    <div>
                        <i class="c00000xx reply ms-1 fas fa-reply" type="button"></i>
                    </div>
                </div>
            </div>

            <!-- reply area (req)-->
            <div class="c00000xx wReply card-footer collapse bg-white pt-2 pb-2 ms-5 mb-3">
                <div class="form-group">
                    <textarea class="form-control" id="c00002xxtext" name="c00000xxtext" placeholder="Write a reply"></textarea>
                    <div class="d-flex justify-content-end"><i class="fas fa-paper-plane c00001xx postReply mt-2 me-1 mb-2 plane" type="button"></i></div>
                </div>
            </div>

            <!-- establishment response (opt) -->
            <div class="pb-2 ps-3 pe-3 ms-5">
                <div class="a00000xx estabResponseText collapse response">
                    <p class="regular mt-1 mb-0">Mang Inasal's response</p>
                    <p class="a00000xx reviewtext truncate mt-1 mb-2 card-text ">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                        Quisquam, dignissimos. Voluptate quos voluptatem numquam 
                        officia quod animi rerum omnis? Repellendus officia 
                    </p>
                </div>
            </div>
            </div>
            </div>` ;
   
   
    if (!review) {
        previousReviews = document.querySelector('.past-reviews').innerHTML;
        reviewBox.innerHTML = content1 + string2 + string3  + string4 + string5 + content2 + previousReviews;
        reviewed = true;
       
    } else {
        header = document.querySelector('#post-review .modal-header h5')
        header.innerText = 'Edit your review'
        reviewBox.innerHTML = content1 + string2 + string3  + string4 + string5 + content2;
        reviewed = false;
    }

    if (thefiles.length > 4) {
    button = document.querySelector('.c00000xx.imgBtn')                                                  
    button.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('+ URL.createObjectURL( thefiles[3]) + ')'
    }

    r = document.querySelector(':root');
    r.style.setProperty('--yourRev', 'calc(' + rating + '/ 5 * 100%)');
    revbtn.innerText = 'Edit review';
    $(modal).modal('hide');
    
}

function delReview(event) {
    event.preventDefault();
    revbtn = document.querySelector('.review-btn');
    modal = document.querySelector('#post-review');
    header = document.querySelector('#post-review .modal-header h5')
    header.innerText = 'New Review'
    revbtn.innerText = 'Leave a review';
    rating = document.querySelector('input[name="rate"]:checked').value;
    document.querySelector('.post-form').reset()
  
    currReview = document.querySelector('.current-review');
    currReview.innerHTML = '';

    let fileList = document.getElementById("files-list");
    fileList.innerHTML = '';
    $(modal).modal('hide');
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
