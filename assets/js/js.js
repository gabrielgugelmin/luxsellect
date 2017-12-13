$(function(){

  // BANNER
  $('.js-bannerSlider').slick({
    arrows: false,
    cssEase: 'linear',
    dots: true,
    fade: true,
    slide: '.Banner__item'
  });

  $('.js-slider-modal').slick({
    arrows: false,
    cssEase: 'linear',
    dots: true,
  });

  $('.modal').on('show.bs.modal', function (e) {
    //var id = $();
    console.log(e.relatedTarget.getAttribute('data-id'));

    $.getJSON("assets/json/veiculos.php", function (data) {
      var item = getProduto(data, 1);
      console.log(item);
    });

  }); 
  

  $('.modal').on('shown.bs.modal', function (e) {
    $('.js-slider-modal').resize();
    $('.js-slider-modal')[0].slick.setPosition();
    
  });

  $('.lux-modal .Button').on('click', function() {
    var nome = $('.lux-modal__title h4').text().trim();

    $('#formContato textarea').val('Olá, tenho interesse no veículo ' + nome);
  });

  // SCROLLBAR
  $('.js-scrollbar').perfectScrollbar();

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

  // SMOOTH SCROLL
  $('.js-scroll').on('click', function (event) {
    if (this.hash !== '') {
      event.preventDefault();

      var hash = this.hash;

      if (checkWindowWidth() == 'desktop') {
        h = 70;
      } else {
        h = 60;
      }

      $('html, body').animate({
        scrollTop: $(hash).offset().top - h
      }, 800, function () {
        window.location.hash = hash;
      });
    } // End if

    closeMenu();
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
	$('#formContato').submit(function(e){ 
	    
	    e.preventDefault();
	    var qtdErro = 0;
	
	    	$(this).find('[data-validate=true]').each(function() {
				var value = $.trim($(this).find('input, textarea').val());
				if(!value.length > 0){
					$(this).addClass('error');
					qtdErro++;
				}else{
					$(this).removeClass('error');
				}
			}); 
			
			if(qtdErro == 0){
				return $.ajax({
					type: "POST",
					url: "/ajax/contato.php",
					data: $(this).serialize(),
					success: function(data) {
					if (data === "success") {
						alert('Message sent successfully.');
			 			// Limpa o form
			 			$('#formContato').trigger("reset");
					} else {
					  alert('Error trying to send data: '+data);
					}
					}
				});
			}else{
				alert('Error while trying to send message. Try again.');
			}
	
	});

  
  	/* FORM NEWSLETTER */
	$('#formNews').submit(function(e){ 
	    
	    e.preventDefault();
	    var qtdErro = 0;
	
	    	$(this).find('[data-validate=true]').each(function() {
				var value = $.trim($(this).find('input').val());
				if(!value.length > 0){
					$(this).addClass('error');
					qtdErro++;
				}else{
					$(this).removeClass('error');
				}
			}); 
			
			if(qtdErro == 0){
				return $.ajax({
					type: "POST",
					url: "/ajax/newsletter.php",
					data: $(this).serialize(),
					success: function(data) {
					if (data === "success") {
						alert('Successful registration.');
			 			// Limpa o form
			 			$('#formNewsletter').trigger("reset");
					} else {
					  alert('Error trying to send data: '+data);
					}
					}
				});
			}else{
				alert('Erro ao tentar enviar dados. Tente novamente.');
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
      template: '<li class="Instafeed__item" style="background-image: url({{image}});"><a href="{{link}}" target="_blank"></a></li>'
    });
    feed.run();
  }


  // MAPS

  function initialize() {

    var chicago = new google.maps.LatLng(49.611573, 6.130197);
    var myOptions = {
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: chicago,
      mapTypeControl: false,
      scrollwheel: false,
      styles: 
      [
        {
          "featureType": "all",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#444444"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
            {
              "color": "#f2f2f2"
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "color": "#e8e2cc"
            }
          ]
        },
        {
          "featureType": "landscape.natural.landcover",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "landscape.natural.landcover",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "landscape.natural.landcover",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "landscape.natural.terrain",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#ff0000"
            },
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": 45
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "lightness": "-75"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "color": "#ebc766"
            },
            {
              "weight": "2"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "visibility": "off"
            },
            {
              "color": "#410707"
            },
            {
              "weight": "2.29"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "lightness": "-3"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
            {
              "color": "#81cfce"
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "color": "#ff0000"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#4cc2c1"
            },
            {
              "lightness": "13"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#020000"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);

    var icon = {
      url: "assets/img/icons/pin.png", // url
      scaledSize: new google.maps.Size(44, 44), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    markerMuseu = new google.maps.Marker({
      position: new google.maps.LatLng(49.611573, 6.130197),
      map: map,
      title: 'LuxSellect',
      icon: icon
    });
  }

  if ($('#map').length) {
    initialize();
  }
});

function formValidate(form) {
  var qtdErro = 0;

  form.find('[data-validate=true]').each(function () {
    var value = $.trim(form.find('input, textarea').val());
    if (!value.length > 0) {
      $(this).addClass('error');
      qtdErro++;

      return qtdErro;
    } else {
      $(this).removeClass('error');

      return qtdErro;
    }
  });
}

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

  if ($container.is('#Cars')) {
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
    if (hiddenElems.length == 0 && $container.is('#Cars')) {
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

  // /assets/json/veiculos.php
  $.getJSON("assets/json/showroom.php", function (data) {

  })
    .fail(function (data) {
      console.log("error");
    }).success(function (data) {
      $elementos = [];

      var x = false;
      $.each(data, function (index, element) {
        if (element.titulo != '') {

          var $box = '<a href="#" class="Grid__item js-open-modal" data-toggle="modal" data-id="' + element.idVeiculo + '" data-target="#carro' + element.idVeiculo + '" data-marca="' + element.idMarca + '" data-modelo="' + element.modelo + '" data-valor="' + element.preco + '">' +
            '<div class="Grid__img" style="background-image: url(/assets/img/albuns/album_'+ element.idAlbum +'/'+ element.capa +');"></div>' +
              '<div class="Grid__content">' +
              '<h4>' +
            '<small>' + element.idMarca + '</small> ' + element.modelo +
							'</h4>' +
              '<div class="Car-info">' +
                '<div class="Car-info__date">' + element.anoModelo + '</div>' +
                '<div class="Car-info__price">' + element.preco + '</div>' +
              '</div>' +
            '</div>' +
          '</a>';
          
          
          var $modal = '<div class="modal fade lux-modal" tabindex="-1" role="dialog" id="carro'+ element.idVeiculo +'">'+
							'<div class="modal-dialog modal-lg" role="document">'+
								'<div class="modal-content">'+
									'<img src="assets/img/logo.png" alt="Lux Sell Ect" class="lux-modal__logo">'+
									'<button class="lux-modal__close js-close" data-dismiss="modal" aria-label="Close">'+
									'<span></span>'+
									'</button>'+
									'<div class="lux-modal-content">'+
									  '<div class="lux-modal__column">'+
											'<div class="lux-modal-slider js-slider-modal">'+
												'<div class="lux-modal-slider__item" style="background-image: url(/assets/img/albuns/album_'+ element.idAlbum +'/'+ element.capa[0] +');"></div>'+
												'<div class="lux-modal-slider__item" url(/assets/img/albuns/album_'+ element.idAlbum +'/'+ element.capa[1] +');"></div>'+
												'<div class="lux-modal-slider__item" style="background-image: url(assets/img/carros/c1.jpg); "></div>'+
												'<div class="lux-modal-slider__item" style="background-image: url(assets/img/carros/c2.jpg); "></div>'+
											'</div>'+
										'</div>'+
										'<div class="lux-modal__column">'+
											'<div class="lux-modal__desc">'+
												'<div class="lux-modal__title">'+
													'<h4><small>'+ element.idMarca +'</small> '+ element.modelo +'</h4>'+
												'</div>'+
												'<div class="Car-info">'+
													'<div class="Car-info__date">'+ element.anoModelo +'</div>'+
													'<div class="Car-info__price">'+ element.preco +'</div>'+
												'</div>'+
												'<p class="js-scrollbar">Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o...</p>'+
												'<a href="#Contact" class="Button js-scroll" data-dismiss="modal" aria-label="Close">ENTRAR EM CONTATO</a>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>';
          

        } else {

          //var $box = '<h3>Nada por aqui. <a href="./">Clique para voltar.</a></h3><br>';
        }

        $(".js-grid").append($box);
        //$("#modalWrapper").append($modal);

      });
      
      
      
      
      
/*
      var x = false;
  	$.each(data, function(index, element) { 
		if(element.modelo!=''){
	  //albuns/album_' + element.idAlbum + '/' + element.capa +'
      var blindado = 'Blindado';
      if(element.blindado=='sim'){ blindado = 'Blindado'; } else { blindado = ''; }

      var $box = '<div class="Grid__item marca_' + element.km + '" data-category="' + element.idVeiculoCategoria + '" data-marca="' + element.idMarca + '" data-modelo="' + element.modelo + '" data-valor="' + element.preco + '" data-anofabricacao="' + element.anoFabricacao + '" data-anomodelo="' + element.anoModelo + '">' +
        '<a href="/veiculo/'+ element.alias +'/'+ element.idVeiculo +'">' +
          '<div class="Grid__img" style="background-image: url(/assets/img/albuns/album_'+ element.idAlbum +'/'+ element.capa +');"></div>' +
          '<div class="Grid__title">' +
            '<h4>' + element.idMarca + '</h4>' +
            '<h5>' + element.modelo + '</h5>' +
            '<small>'+ element.anoFabricacao +'/'+ element.anoModelo + '<br> R$ ' + element.preco +'</small>' +
          '</div>' +
        '</a>' +
      '</div>';
  		
  		}else{

	  		var $box = '<h3>Nada por aqui. <a href="./">Clique para voltar.</a></h3><br>';
		}
		
		$(".js-grid").append($box);
		
	});
*/
      
      
      
      
      
      

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

function getProduto(data, id) {
  
  console.log(data);
  for (var i = 0; i < data.length; i++) {

    if (data[i].id == id) {
      return (data[i].nome);
    }
  }
}