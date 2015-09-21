var nea50 = {
  cookie:{
    cc:function(n,v,ds,h) {
      var e = "", d;

      if (ds) {
        d = new Date();
        d.setTime(d.getTime() + (ds * 24 * 60 * 60 * 1000));
        e = ";expires=" + d.toGMTString();
      }

      if (h === undefined) {
        h = '.' + nea50.util.domain(window.location.host);
      }

      document.cookie = n + "=" + v + e + ";domain=" + h + ";path=/";
    },
    rc:function(n) {
      var e = n+"=",
        ca = document.cookie.split(';'),
        i, c;

      for(i = 0; i < ca.length; i++) {
        c = ca[i];

        while (c.charAt(0) == ' ')
          c = c.substring(1,c.length);

        if (c.indexOf(e) === 0)
          return c.substring(e.length,c.length);
      }

      return null;
    },
    ec:function(n, h) {
      vx.cookie.cc(n, "", -1, h);
    },
    all:function(prefix) {
      var cookies = {};

      if (document.cookie && document.cookie != '') {
        var name_values = document.cookie.split(/;\s*/),
          name_value,
          prefix_regex;

        if (prefix !== undefined) {
          prefix_regex = new RegExp('^' + prefix);
        }

        for (var i = 0; i < name_values.length; i++) {
          name_value = name_values[i].split("=");
          if (prefix_regex === undefined || name_value[0].match(prefix_regex)) {
            cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
          }
        }
      }

      return cookies;
    }
  },
  modal:{
    resize: function() {
      $(window).resize(function () {
         $('.50th-splash.ui-dialog').css({
              'width': $(window).width(),
              'height': $(window).height(),
              'left': '0px',
              'top':'0px'
         });
      }).resize();
    },
  },
  ui: {
    init: function($) {
      var nea_c = nea50.cookie.rc('nea50');
      var nea_r = parseFloat(nea_c) || nea50.util.rndRng(0,100,2);
      if (!nea_c) {
        nea50.cookie.cc('nea50',nea_r);
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
      return parseFloat((Math.random() * (max - min) + min).toFixed((typeof pl === 'undefined') ? 0 : pl));
    }
  }
};

(function($) {
  nea50.ui.init($);
  $(document).ready(function() {
    $( "#dialog" ).dialog({
      dialogClass: '50th-splash',
      autoOpen: false,
      width: 'auto',
      height: $(window).height(),
      modal: true,
      position: {
        my: 'left top',
        at: 'left top',
        of: window
      },
      draggable: false
    });
    nea50.modal.resize();
  });
})(jQuery)
