// for custom select
$(document).ready(function () {
	$('.custom-select').select2({ minimumResultsForSearch: Infinity });
});


// sidebar
$(document).ready(function(){
	$('#sidebar_menu > ul > li:has(ul)').addClass("has-sub");
	$('#sidebar_menu > ul > li > a').click(function() {
	  var checkElement = $(this).next();
	  $('#sidebar_menu li').removeClass('active');
	  $(this).closest('li').addClass('active');	
  
	  if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
		$(this).closest('li').removeClass('active');
		checkElement.slideUp('normal');
	  }
	  
	  if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
		$('#sidebar_menu ul ul:visible').slideUp('normal');
		checkElement.slideDown('normal');
	  }
	  
	  if (checkElement.is('ul')) {
		return false;
	  } else {
		return true;	
	  }		
	});
	});
	
