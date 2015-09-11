var root = document.getElementsByTagName('script')[0].parentElement;
var arrayOfJS = [
	'rad-select',
	'include',
	'jquery.datetimepicker',
	'jquery.textarea_autosize',
	'jquery.multiple.select',
	'owl.carousel',
	'tether',
	'drop',
	'bootstrap.tooltip',
	'equalize',
	'stream_layers'
];

loadJs();

function loadJs(){

	if (!arrayOfJS.length){
		return init();
	}

	var sc = document.createElement('script');
	sc.src = '/js/' + arrayOfJS.shift()  + '.js';
	sc.onload = function(){
		if ((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
			loadJs();
		}
	};
	root.appendChild(sc);
}

function init(){

	$('.open_schet').click(function(){
		$('.page').removeClass('hide');
		$('.page').addClass('open');
	});

	$('.page_close').click(function(){
		$('.page').removeClass('open');
		$('.page').addClass('hide');
	});

	$('.page_expand').click(function(){
		if($('.page_expand').hasClass('rotate'))
		{
			$('.page').removeClass('fullsize');
			$('.page').addClass('normalsize');
			$('.page_expand').removeClass('rotate');
		}
		else{
			$('.page_expand').addClass('rotate');
			$('.page').removeClass('normalsize');
			$('.page').addClass('fullsize');
		}
	});




    $("select, .select, .select_inline").filter(function(){
    	return !$(this).hasClass('select_multi');
    }).multipleSelect({
    	selectAll: false,
    	noMatchesFound: 'Ничего не найдено',
    	single: true,
    	isOpen: false,
        keepOpen: false,
        textTemplate: function(el){
    		return el.html();
    	}
    });

     $(".select_multi").multipleSelect({
    	selectAll: false,
    	selectAllText: 'Выбрать все',
    	allSelected: 'Выбраны все',
    	noMatchesFound: 'Ничего не найдено',
    	countSelected: '# из % выбрано',
    	textTemplate: function(el){
    		return el.html();
    	}
    });




	// высота чата в слое
	// var messenger_chat_height = $('.page_messenger_main').innerHeight() - $('.add_message').outerHeight();
	// $('.page_messenger_main .messenger_chat').css('height', messenger_chat_height);

	// высота чата в слое
	var messenger_chat_height_client = $('.fullsize .add_message').outerHeight();
	$('.fullsize .messenger_chat').css('max-height',  'calc(100vh - 65px - 42px - ' + messenger_chat_height_client + ')');

	// авторесайз textarea
	$('textarea.js_autosize').textareaAutoSize();

	// карусель счетов
	$('.transaction_choose_account').owlCarousel({
	    margin: 0,
	    nav: true,
	    dots: false,
	    margin: 15,
	    rewindNav:false,
	    navText: '',
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:3
	        },
	        1170:{
	            items:4
	        },
	        1400:{
	            items:5
	        },
	        1700:{
	            items:6
	        }
	    }
	});

	$('.datetimepicker').datetimepicker({
		timepicker: true,
		lang:'ru',
		closeOnDateSelect: true,
		format: 'd.m.Y',
		validateOnBlur: false
	});

    Array.prototype.forEach.call(document.querySelectorAll('.drop-target'), function(target){
    	new Drop({
		  target:target,
		  content: $(target).next('.drop-content').html(),
		  classes: 'drop-theme-basic',
		  position: $(target).data('position') || 'bottom left',
		  openOnfor: 'click'
	})});

	$('[b365-tooltip]').tooltip({
		placement: 'left',
		trigger: 'click'
	});

	// $('.equalize_height').equalize('innerHeight');


	$('.tabs_scroll ul').owlCarousel({
	    margin: 0,
	    nav: true,
	    dots: false,
	    margin: 0,
	    rewindNav:false,
	    navText: '',
	    autoWidth:true
	});


	$('section.main').scroll(function() {
	    var scroll = $('section.main').scrollTop();
	    if (scroll >= 30) {
	        $("header").addClass("shadow");
	    }
	    else {
	    	$("header").removeClass("shadow");
	    }
	});

	$('.page_content').scroll(function() {
	    var scroll = $('.page_content').scrollTop();
	    if (scroll >= 30) {
	        $(".page_header").addClass("shadow");
	    }
	    else {
	    	$(".page_header").removeClass("shadow");
	    }
	});



}



