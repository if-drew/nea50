var nea50 = {
  cookie:{
    // Create Cookie
    // @n Name
    // @v Value
    // @ds Date Stamp
    // @h Host
    cc:function(n,v,ds,h) {
      var e = "", d;

      if (ds) {
        d = new Date();
        d.setTime(d.getTime() + (ds * 24 * 60 * 60 * 1000));
        e = ";expires=" + d.toGMTString();
      }

      if (h === undefined) {
        // go get the site's domain
        h = '.' + nea50.util.domain(window.location.host);
      }

      // Set the cookie
      document.cookie = n + "=" + v + e + ";domain=" + h + ";path=/";
    },
    // Read Cookie
    // @n Name
    rc:function(n) {
      var e = n+"=",
        ca = document.cookie.split(';'), // Grap all the cookies and make into an array
        i, c;

      for(i = 0; i < ca.length; i++) {
        c = ca[i];

        while (c.charAt(0) == ' ')
          c = c.substring(1,c.length);

        // If the name (@n) is in the cookie array return the cookie
        if (c.indexOf(e) === 0)
          return c.substring(e.length,c.length);
      }

      // No cookie found
      return null;
    },
    // Erase Cookie
    // @n Name
    // @h Host
    ec:function(n, h) {
      // Wipe the cookie
      vx.cookie.cc(n, "", -1, h);
    }
  },
  modal:{
    resize: function($win) {
      // https://api.jquery.com/resize/
      $win.resize(function () {
         $('.50th-splash.ui-dialog').css({
              'width': $win.width(),
              'height': $win.height(),
              'left': '0px',
              'top':'0px'
         });
      }).resize();
    },
  },
  ui: {
    init: function($) {
      // First, let's see if the user has been cookied
      var neaCookie = nea50.cookie.rc('nea50');
      // If the cookie exists, set the value as val, else create a random number between 1-100
      var val = parseFloat(neaCookie) || nea50.util.rndRng(0,100,2);
      if (!neaCookie) {
        // User hasn't been cookied, so set the cookie and trigger the dialog
        nea50.cookie.cc('nea50',val);
        $( "#dialog" ).dialog();
      }
    }
  },
  util: {
    domain:function(hostname) {
      var parts = hostname.split('.').reverse();

      if (parts.length >= 3) {
        // see if the second level domain is a common SLD.
        if (parts[1].match(/^(com|edu|gov|net|mil|org|nom|co|name|info|biz)$/i)) {
          return parts[2] + '.' + parts[1] + '.' + parts[0];
        }
      }

      return parts[1] + '.' + parts[0];
    },
    rndRng:function(min,max,pl) {
      // Create a random number between min - max
      return parseFloat((Math.random() * (max - min) + min).toFixed((typeof pl === 'undefined') ? 0 : pl));
    }
  }
};

// IIFE - https://en.wikipedia.org/wiki/Immediately-invoked_function_expression
(function($) {
  // Start Cookie Code
  nea50.ui.init($);
  // On DOM ready, set up the modal but don't show yet
  $(document).ready(function() {
    // We're calling $(window) more than once, so let's cache it in var for performance
    // http://stackoverflow.com/questions/10055165/performance-of-jquery-selectors-vs-local-variables
    var $win = $(window);
    // Bind the jQuery UI Dialog with any element that has the ID 'dialog'
    // If the site is using that ID elsewhere it may make sense to use a
    // more specific element ID (e.g. #nea-splash-dialog)
    $( "#dialog" ).dialog({
      dialogClass: '50th-splash', //Adds custom class to the final dialog element
      autoOpen: false, // We're triggering the Dialog to open after testing for the cookie
      width: 'auto', // Responsive width
      height: $(window).height(), // Sets the Dialog container to the height of the browser window
      modal: true, // Not using the default 'dialog' so users have to click one of the CTAs
      position: {
        my: 'left top',
        at: 'left top',
        of: window
      }, // Setting the position to the upper left corner of the browser window
      draggable: false // Do I really need to explain this one?
    });
    // We're doing some on-the-fly calculations when resizing the browser width, so lets initialize that
    nea50.modal.resize($win);
  });
})(jQuery) // Passing in jQuery (namespaces to $) to ensure that $. won't throw errors. http://stackoverflow.com/a/24930981
