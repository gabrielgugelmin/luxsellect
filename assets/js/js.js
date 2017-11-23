$(function(){

  // BANNER
  $('.js-bannerSlider').slick({
    fade: true,
    arrows: false,
    cssEase: 'linear',
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
});

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

  $.getJSON("/assets/json/veiculos.php", function (data) {

  })
    .fail(function (data) {
      console.log("error");
    }).success(function (data) {
      $elementos = [];

      var x = false;
      $.each(data, function (index, element) {
        if (element.titulo != '') {

          var $box = '<div class="Grid__item mix ' + element.idVeiculoCategoria + '" style="background-image: url(/assets/img/albuns/album_' + element.idAlbum + '/' + element.capa + ');" data-category="' + element.idVeiculoCategoria + '" data-marca="' + element.idMarca + '" data-modelo="' + element.modelo + '" data-valor="' + element.preco + '">' +
            '<div class="Grid__title">' +
            '<h4>' + element.idMarca + ' <small>' + element.modelo + '</small></h4>' +
            '</div>' +
            '<div class="Grid__buttons">' +
            '<a href="/estoque/' + element.alias + '/' + element.idVeiculo + '">VER DETALHES</a>' +
            '<a href="#/" class="btnProposta" data-veiculo="' + element.idMarca + ' ' + element.modelo + ' / ' + element.anoFabricacao + ' - ' + element.anoModelo + ' / ' + element.idCor + ' / R$ ' + element.preco + '" data-toggle="modal" data-target="#modalProposta">FAZER PROPOSTA</a>' +
            '</div>' +
            '</div>';

        } else {

          var $box = '<h3>Nada por aqui. <a href="./">Clique para voltar.</a></h3><br>';
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