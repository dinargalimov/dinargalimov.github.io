var root = document.getElementsByTagName('script')[0].parentElement;
var arrayOfJS = [
	'include',
	'jquery.datetimepicker',
	'jquery.textarea_autosize',
	'jquery.multiple.select',
	'owl.carousel',
	'tether',
	'drop',
	'bootstrap.tooltip',
	'equalize',
	'nv.d3',
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




    $("select,.select_inline").filter(function(){
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


d3.json("http://nvd3.org/examples/linePlusBarData.json",function(error,data) {
  nv.addGraph(function() {
      var chart = nv.models.linePlusBarChart()
            .margin({top: 30, right: 60, bottom: 50, left: 70})
            //We can set x data accessor to use index. Reason? So the bars all appear evenly spaced.
            .x(function(d,i) { return i })
            .y(function(d,i) {return d[1] })
            ;

      chart.xAxis.tickFormat(function(d) {
        var dx = data[0].values[d] && data[0].values[d][0] || 0;
        return d3.time.format('%x')(new Date(dx))
      });

      chart.y1Axis
          .tickFormat(d3.format(',f'));

      chart.y2Axis
          .tickFormat(function(d) { return '$' + d3.format(',f')(d) });

      chart.bars.forceY([0]);

      d3.select('#chart svg')
        .datum(data)
        .transition()
        .duration(0)
        .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
  });

});

}


