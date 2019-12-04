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
function moveTo(number, turn) {
    if (!$(".inner_page").length) {
        $.fn.fullpage.moveTo(number);
        if (turn) {
            var bottomCoord = $('.section2 .fp-scrollable')[0].scrollHeight;
            $('.section2 .fp-scrollable').slimScroll({scrollTo: bottomCoord});
        }
    } else {
        $('html, body').animate({
            scrollTop: $("footer").offset().top
        }, 1000)
    }
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
    });

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

$(function () {
    var os = window.navigator.platform;
    if (/win/i.test(os)) {
        $('body').addClass('winda');
    }
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
        $('.navbar-toggler-js').click(function(){
            if($(this).hasClass('open')) {
                $(this).removeClass('open');
                $('body').css({
                    "overflow" : "auto"
                });
            } else {
                $(this).addClass('open');
                $('body').css({
                    "overflow" : "hidden"
                });
            }

        });
    });
    if ($('.prod-bot-part-js img').length) {
        $('.prod-bot-part-js img').each(function(i){
            if(i+1 > 4) {
                return false;
            }

            $('.mainGall').append($(this).clone());
        });


        $('.mainGall').owlCarousel({
            loop:true,
            margin:10,
            items:1,
            nav:true,
            dots: true
        });
    }



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

    $('select.sorting-js').styler();

    function sortingProducts(type){
        var $wrapper = $('.girl-catalog-js3');
        $wrapper.find('.js-sorting-block').sort(function(a, b) {
            return +$(a).data(type) - +$(b).data(type);
        }).appendTo($wrapper);
    }
    $('select.sorting-js').on('change', function() {
        val = $(this).val();
        $('.girl-sorting-list-js[data-name="'+ val + '"]').addClass("active").siblings("li").removeClass("active");
        sortingProducts(val);
    })
    $('.girl-sorting-list-js').on('click', function() {
        if (!$(this).hasClass("active")) {
            name = $(this).data('name');
            $(this).addClass("active").siblings('.girl-sorting-list-js').removeClass("active");
            $(".sorting-js").val(name).trigger('refresh');
            sortingProducts(name);
        }
    })

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
    $('.city-chose-js').on('click', function(){
        $('.choose-city-pop-up').fadeIn(300);
        $.fn.fullpage.setAutoScrolling(false);
        $('body').css({
            "overflow" : "hidden"
        });
    });
    $('.choose-city-pop-up-close').on('click', function(){
        var parent = $(this).parents('.choose-city-pop-up');
        $.fn.fullpage.setAutoScrolling(true);
        parent.fadeOut(300);
        $('body').css({
            "overflow" : "auto"
        });
    });
    var availableTags = [
        "Москва",
        "Санкт-Петербург",
        "Волгоград",
        "Пермь",
        "Уфа",
        "Тюмень",
        "Ульяновск",
        "Орск",
        "Казань",
        "Воронеж",
        "Ужур",
        "Омск",
        "Самара",
        "Чита",
        "Новосибирск",
        "Челябинск",
        "Махачкала",
        "Екатеринбург",
        "Братск",
        "Новокузнецк",
        "Дзержинск",
        "Нижний Новгород",
        "Саратов",
        "Курган",
        "Магнитогорск",
        "Хабаровск",
        "Улан-Удэ",
        "Петропавловск-Камчатский",
        "Сургут",
        "Красноярск",
        "Ростов-на-Дону",
        "Краснодар",
        "Ханты-Мансийск",
        "Междуреченск",
        "Владивосток",
        "Липецк",
        "Комсомольск-на-Амуре",
        "Грозный",
        "Барнаул",
        "Благовещенск",
        "Ижевск",
        "Тольятти",
        "Пенза",
        "Нижний Тагил",
        "Томск",
        "Магадан",
        "Кемерово",
        "Архангельск",
        "Ангарск",
        "Бийск",
        "Владикавказ",
        "Иркутск",
        "Лесосибирск",
        "Ставрополь",
        "Нижневартовск",
        "Оренбург",
        "Новоульяновск",
        "Тобольск",
        "Копейск",
        "Волжский",
        "Рязань",
        "Калининград",
        "Белово",
        "Прокопьевск",
        "Астрахань",
        "Усть-Илимск",
        "Ярославль",
        "Старый Оскол",
        "Чапаевск",
        "Златоуст",
        "Курск",
        "Брянск",
        "Севастополь",
        "Сочи",
        "Шадринск",
        "Уссурийск",
        "Киров",
        "Кумертау",
        "Биробиджан",
        "Волгодонск",
        "Калуга",
        "Соликамск",
        "Смоленск",
        "Южно-Сахалинск",
        "Набережные Челны",
        "Выборг",
        "Красноармейск",
        "Белгород",
        "Каменск-Шахтинский",
        "Домодедово",
        "Шахты",
        "Мурманск",
        "Сибай",
        "Нефтеюганск",
        "Тверь",
        "Сыктывкар",
        "Нефтекамск",
        "Тула",
        "Кострома",
        "Каменск-Уральский",
        "Троицк",
        "Новошахтинск",
        "Владимир",
        "Новочеркасск",
        "Находка",
        "Якутск",
        "Орёл",
        "Череповец",
        "Северодвинск",
        "Камышин",
        "Сызрань",
        "Нижнекамск",
        "Вологда",
        "Альметьевск",
        "Энгельс",
        "Петрозаводск",
        "Абакан",
        "Воткинск",
        "Железногорск",
        "Донецк",
        "Химки",
        "Чебоксары",
        "Мыски",
        "Стерлитамак",
        "Керчь",
        "Симферополь",
        "Салават",
        "Иваново",
        "Димитровград",
        "Пятигорск",
        "Ишимбай",
        "Рыбинск",
        "Невинномысск",
        "Йошкар-Ола"
    ];
    if (window.location.href.indexOf("/en/") > -1) {
        availableTags = [
            "Moscow",
            "St. Petersburg",
            "Volgograd",
            "Permian",
            "Ufa",
            "Tyumen",
            "Ulyanovsk",
            "Orsk",
            "Kazan",
            "Voronezh",
            "Uzhur",
            "Omsk",
            "Samara",
            "Chita",
            "Novosibirsk",
            "Chelyabinsk",
            "Makhachkala",
            "Yekaterinburg",
            "Bratsk",
            "Novokuznetsk",
            "Dzerzhinsk",
            "Nizhny Novgorod",
            "Saratov",
            "Mound",
            "Magnitogorsk",
            "Khabarovsk",
            "Ulan-Ude",
            "Petropavlovsk-Kamchatsky",
            "Surgut",
            "Krasnoyarsk",
            "Rostov-on-Don",
            "Krasnodar",
            "Khanty-Mansiysk",
            "Mezhdurechensk",
            "Vladivostok",
            "Lipetsk",
            "Komsomolsk-on-Amur",
            "Terrible",
            "Barnaul",
            "Blagoveshchensk",
            "Izhevsk",
            "Tolyatti",
            "Penza",
            "Nizhny Tagil",
            "Tomsk",
            "Magadan",
            "Kemerovo",
            "Arkhangelsk",
            "Angarsk",
            "Biysk",
            "Vladikavkaz",
            "Irkutsk",
            "Lesosibirsk",
            "Stavropol",
            "Nizhnevartovsk",
            "Orenburg",
            "Novoulyanovsk",
            "Tobolsk",
            "Kopeisk",
            "Volzhsky",
            "Ryazan",
            "Kaliningrad",
            "Belovo",
            "Prokopyevsk",
            "Astrakhan",
            "Ust-Ilimsk",
            "Yaroslavl",
            "Stary Oskol",
            "Chapaevsk",
            "Zlatoust",
            "Kursk",
            "Bryansk",
            "Sevastopol",
            "Sochi",
            "Shadrinsk",
            "Ussuriysk",
            "Kirov",
            "Kumertau",
            "Birobidzhan",
            "Volgodonsk",
            "Kaluga",
            "Solikamsk",
            "Smolensk",
            "Yuzhno-Sakhalinsk",
            "Naberezhnye Chelny",
            "Vyborg",
            "Krasnoarmeysk",
            "Belgorod",
            "Kamensk-Shakhtinsky",
            "Domodedovo",
            "Mines",
            "Murmansk",
            "Sibay",
            "Nefteyugansk",
            "Tver",
            "Syktyvkar",
            "Neftekamsk",
            "Tula",
            "Kostroma",
            "Kamensk-Uralsky",
            "Troitsk",
            "Novoshakhtinsk",
            "Vladimir",
            "Novocherkassk",
            "Find",
            "Yakutsk",
            "Eagle",
            "Cherepovets",
            "Severodvinsk",
            "Kamyshin",
            "Sizran",
            "Nizhnekamsk",
            "Vologda",
            "Almetyevsk",
            "Engels",
            "Petrozavodsk",
            "Abakan",
            "Votkinsk",
            "Zheleznogorsk",
            "Donetsk",
            "Khimki",
            "Cheboksary",
            "Myski",
            "Sterlitamak",
            "Kerch",
            "Simferopol",
            "Salavat",
            "Ivanovo",
            "Dimitrovgrad",
            "Pyatigorsk",
            "Ishimbay",
            "Rybinsk",
            "Nevinnomyssk",
            "Yoshkar-Ola"
        ];
    }
    $(".form-city-js").autocomplete({
        source: availableTags,
        select: function( event, ui ) {
            if(ui.item.value != "") {
                $('.city-chose-js').text(ui.item.value);
                $.fn.fullpage.setAutoScrolling(true);
                $('.choose-city-pop-up').fadeOut(300);
            }
        }
    });
    if($('.city-chose-js').length) {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setGeoByClass, showError);
        } else {
            console.error("Geolocation is not supported by this browser!");
        }
    }

    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true
    });
    if ($('.prod-bot-part--in-more').length == 0) {
        $('.load-more-product-img-js').parents('.container-load-more-product').addClass('hide_imporatnt');
    }
    $('.load-more-product-img-js').on("click", function(){
        $('.prod-bot-part--in-more').fadeIn(200).css({
            "display" : "flex"
        });
        $(this).parents('.container-load-more-product').addClass('hide_imporatnt');
        return false;
    });
    $('.load-more-prods-lots-btn-js').on("click", function(){
        $('.load-more-prods-lots-js').fadeIn(200).addClass("show_inportant");
        $(this).parents('.container-load-more').addClass('hide_imporatnt');
        return false;
    });
    $firstclick = 0;
    $('.load-more-prods-lots-btn-js2').on("click", function() {
        if ($firstclick == 0) {
            $('.load-more-prods-lots-js3').fadeIn(200).addClass("show_inportant");
            $firstclick = 1;
        } else {
            $('.load-more-prods-lots-js').fadeIn(200).addClass("show_inportant");
            $(this).parents('.container-load-more').addClass('hide_imporatnt');
        }
        return false;
    });

    $('a[href^="tel"]').on('click', function(){
        setTimeout(function(){
            window.location.href = "thanks.html"
        }, 5000);
    });
});

$(window).on('load', function () {
    setTimeout(function(){
        var $preloader = $('.girl'),
            $svg_anm   = $('.cat');
        $pree   = $('.pree');
        $svg_anm.fadeOut('slow');
        $preloader.delay(500).fadeOut('slow');
        $pree.delay(600).fadeOut('slow');
        new WOW().init();
    }, 1000)
});

