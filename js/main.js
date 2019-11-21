var domain = 'https://2geolist.ru';
var apiAction = '/v1/geo';


function ajaxGet(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch (err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

/**
 *
 * @param className
 * @param variable   (city||country||region|code)
 * @param lang
 */

function setGeoByClass(options) {
    className = 'city-chose-js';
    var Opt = {
        'type':'city'
    }

    if (className == undefined) {
        console.log('Error. Please set class name.')
        return
    }

    for (var attrname in options) { Opt[attrname] = options[attrname]; }

    ajaxGet(domain + apiAction, function (e) {

        if (e['payload'][Opt.type] != "") {
            var element = document.getElementsByClassName(className);
            var i;
            for (i = 0; i < element.length; i++) {
                element[i].innerHTML = e['payload'][Opt.type];
            }
        }

    })

}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            break;
        case error.POSITION_UNAVAILABLE:
            break;
        case error.TIMEOUT:
            break;
        case error.UNKNOWN_ERROR:
            break;
    }
}

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setGeoByClass, showError);
} else {
    console.error("Geolocation is not supported by this browser!");
}

$(function () {
    function check_width(width) {
        var windowH = $(window).width();
        if(windowH<width) {
            return true;
        }
        return false;
    }
    function owlbuild() {
        $('.girl-catalog-js').owlCarousel({
            loop:true,
            margin:0,
            items:1,
            nav:true,
            dots: false
        });
    }

    $(document).ready(function(){
        $('.navbar-toggler').click(function(){
            $(this).toggleClass('open');
        });
    });

    var tunner = check_width(576);
    if (tunner) {
        owlbuild();
    }

    $(window).on('resize', function(event) {
        var tunner = check_width(576);
        if (tunner) {
            owlbuild();
        } else {
            $(".girl-catalog-js").trigger('destroy.owl.carousel');
        }
    });
    $('#fullpage').fullpage({
        scrollOverflow: true,
        sectionsColor: ['#000']
    });
    $('.scroll-to-bottom').click(function(){
        $.fn.fullpage.moveSectionDown();
    });
    $(function(){
        if ($(window).height() < 415) {
            $('.girl').addClass('eventdd');
            $('.cat').addClass('eventdd');
        }  else {
            $('.girl').removeClass('eventdd');
            $('.cat').removeClass('eventdd');
        }
        $(window).resize(function() {
            if ($(window).height() < 415) {
                $('.girl').addClass('eventdd');
                $('.cat').addClass('eventdd');
            }  else {
                $('.girl').removeClass('eventdd');
                $('.cat').removeClass('eventdd');
            }
        })
    })
    $(window).on('load', function () {
        setTimeout(function(){
            var $preloader = $('.girl'),
                $svg_anm   = $('.cat');
            $pree   = $('.pree');
            $svg_anm.fadeOut('slow');
            $preloader.delay(500).fadeOut('slow');
            $pree.delay(600).fadeOut('slow');
        }, 1000)
    });
    $(window).on('load', function () {
        setTimeout(function(){
            var $preloader = $('.girl'),
                $svg_anm   = $('.cat');
            $pree   = $('.pree');
            $svg_anm.fadeOut('slow');
            $preloader.delay(500).fadeOut('slow');
            $pree.delay(600).fadeOut('slow');
        }, 1000)
    });
});