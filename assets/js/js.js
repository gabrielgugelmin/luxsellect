$(function(){

  // BANNER
  $('.js-bannerSlider').slick({
    arrows: false,
    cssEase: 'linear',
    dots: true,
    fade: true,
    slide: '.Banner__item'
  });

  // MENU
  // click no hamburguer icon
  $('.MenuTrigger').on('click', function (e) {
    e.preventDefault();

    if ($('.Menu').hasClass('Menu--open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // menu fixo ao scollar
  $(window).scroll(function () {

    if ($(this).scrollTop() >= 100) {
      $('.Header').addClass('is-scrolling');
    } else {
      $('.Header').removeClass('is-scrolling');
    }
  });

  /* FORM CONTATO */
  $('#formContato').submit(function (e) {

    e.preventDefault();
    var qtdErro = 0;

    $(this).find('[data-validate=true]').each(function () {
      var value = $.trim($(this).find('input, textarea').val());
      if (!value.length > 0) {
        $(this).addClass('error');
        qtdErro++;
      } else {
        $(this).removeClass('error');
      }
    });

    if (qtdErro == 0) {
      return $.ajax({
        type: "POST",
        url: "/ajax/contato.php",
        data: $(this).serialize(),
        success: function (data) {
          if (data === "success") {
            alert('Mensagem enviada com sucesso.');
            // Limpa o form
            $('#formContato').trigger("reset");
          } else {
            alert('Erro ao tentar enviar mensagem: ' + data);
          }
        }
      });
    } else {
      alert('Erro ao tentar enviar mensagem. Tente novamente.');
    }

  });

  if ($('.js-grid').length) {
    getProducts();
  }

  if ($('#instafeed').length) {

    var feed = new Instafeed({
      get: 'user',
      userId: '4167153856',
      clientId: '9dd32bbb00284a19b83ebe8dbda91cb6',
      accessToken: '4167153856.1677ed0.7cfe7712070d4c5da39d9a197a0f4d9a',
      limit: 12,
      template: '<li class="Instafeed__item" style="background-image: url({{image}});"><a href="{{link}}"></a></li>'
    });
    feed.run();
  }
});


function initIsotope() {
  // GRID
  // init Isotope
  var $container = $('.js-grid').isotope({
    itemSelector: '.Grid__item',
    layoutMode: 'fitRows',
    getSortData: {
      category: '[data-category]',
      marca: '[data-marca]',
      modelo: '[data-modelo]',
      valor: '[data-valor] parseInt'
    }
  });

  var initShow = 8; //number of items loaded on init & onclick load more button
  var counter = initShow; //counter for load more button
  var iso = $container.data('isotope'); // get Isotope instance

  if ($container.is('#Grid')) {
    //append load more button
    $('.Grid__load .container').append('<a href="#/" class="Grid__loadmore" id="LoadProducts">see all</a>');
  }

  loadMore(initShow); //execute function onload

  function loadMore(toShow) {
    var elems = $container.isotope('getFilteredItemElements');

    $container.find(".hidden").removeClass("hidden");

    var hiddenElems = iso.filteredItems.slice(toShow, elems.length).map(function (item) {
      return item.element;
    });

    $(hiddenElems).addClass('hidden');
    $container.isotope('layout');

    //when no more to load, hide show more button
    if (hiddenElems.length == 0 && $container.is('#Grid')) {
      jQuery("#LoadProducts").hide();
      //$('.Grid__load .container').append('<a href="#/" id="entreContato" class="Grid__loadmore" data-toggle="modal" data-target="#modalContato">entre em contato</a>');
    } else {
      //jQuery("#entreContato").show();
      jQuery("#LoadProducts").show();
    };

    $('#LoadProducts').removeClass('is-loading');

  }




  //when load more button clicked
  $("#LoadProducts").click(function () {
    $(this).addClass('is-loading');

    if ($('.js-filter li').data('clicked')) {
      //when filter button clicked, set initial value for counter
      counter = initShow;
      $('.js-filter li').data('clicked', false);
    } else {
      counter = counter;
    };

    counter = counter + initShow;

    loadMore(counter);
  });

}

function getProducts() {

  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }

  //Veriavel com categoria
  var idCategoria = query_string.categoria;

  // /assets/json/veiculos.php
  $.getJSON("assets/json/produtos.json", function (data) {

  })
    .fail(function (data) {
      console.log("error");
    }).success(function (data) {
      $elementos = [];

      var x = false;
      $.each(data, function (index, element) {
        if (element.titulo != '') {
          console.log(element);

          var $box = '<div class="Grid__item mix ' + element[0].idVeiculoCategoria + '" data-marca="' + element[0].marca + '" data-modelo="' + element[0].nome + '" data-valor="' + element[0].preco + '">' +
            '<div class="Grid__img" style="background-image: url(assets/img/carros/' + element[0].imagem +'.jpg);"></div>' +
              '<div class="Grid__content">' +
              '<h4>' +
            '<small>' + element[0].marca + '</small> ' + element[0].nome +
							'</h4>' +
              '<div class="Grid__date">' +  element[0].ano + '</div>' +
            '<div class="Grid__price">' + element[0].preco + '</div>' +
            '</div>' +
          '</div>';

        } else {

          //var $box = '<h3>Nada por aqui. <a href="./">Clique para voltar.</a></h3><br>';
        }

        $(".js-grid").append($box);

      });

      if (x == true) {
      } else {
        initIsotope();
      }

    });
}

function closeMenu() {
  $('.Menu').removeClass('Menu--open');
  $('.Menu').removeClass('Menu--subOpen');

  $('.Menu-sub').removeClass('Menu-sub--subOpen');
  $('.MenuTrigger').removeClass('is-open');

  $('.Menu--hasSub > a').removeClass('is-selected');

  $('body').removeClass('overflowHidden');
}

function openMenu() {
  $('.MenuTrigger').addClass('is-open');
  $('.Menu').addClass('Menu--open');
  $('body').addClass('overflowHidden');
}

function viewport() {
  var e = window, a = 'inner';
  if (!('innerWidth' in window)) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  return { width: e[a + 'Width'], height: e[a + 'Height'] };
}

function checkWindowWidth() {
  var w = viewport().width;
  var size = '';
  if (w > 991) {
    size = 'desktop';
  } else {
    size = 'mobile';
  }

  return size;
}

function clickOutsideMenu() {

  var x = checkWindowWidth();
  if (x == 'desktop') {
    $(document).on('mouseup', function (e) {
      var elem = $('.Menu-sub');

      if (!elem.is(e.target) && elem.has(e.target).length === 0) {
        closeMenu();
      }
    });
  } else {
    $(document).off('mouseup');
  }
}