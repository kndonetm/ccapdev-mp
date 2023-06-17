$('.up').on({
    click: function(){
        $(this).addClass('upbgfill').removeClass('upbg') // changes background on click
        $('.down').addClass('downbg').removeClass('downbgfill')
    },
    mousedown: function() {
        // :active state
    },
    mouseup: function() {
        // on click release
    },
    mouseenter: function() {
        // on hover
    },
    mouseleave: function() {
        // hover exit
    }
    /* 
      , hover: function(){
           // or hover instead of enter/leave
        }
    */
})

$('.down').on({
    click: function(){
        $(this).addClass('downbgfill').removeClass('downbg') // changes background on click
        $('.up').addClass('upbg').removeClass('upbgfill')
    },
    mousedown: function() {
        // :active state
    },
    mouseup: function() {
        // on click release
    },
    mouseenter: function() {
        // on hover
    },
    mouseleave: function() {
        // hover exit
    }
    /* 
      , hover: function(){
           // or hover instead of enter/leave
        }
    */
})

$('.chat').on({
    click: function(){
        $('#c00001').collapse('show') // changes background on click
    },
    mousedown: function() {
        // :active state
    },
    mouseup: function() {
        // on click release
    },
    mouseenter: function() {
        $(this).addClass('chatbgfill').removeClass('chatbg')
    },
    mouseleave: function() {
        $(this).addClass('chatbg').removeClass('chatbgfill')
    }
    /* 
      , hover: function(){
           // or hover instead of enter/leave
        }
    */
})