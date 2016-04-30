const gumtreeUrl = "http://www.gumtree.com.au/s-";
const lastParam = "k0l3008844";
const reqBtn = $('#search-button');
  
var htmlBody, topadsArea, childrenLocationNode;
var childrenNode, titles=[], locations=[];

reqBtn.on('click', function() {
  
  var words = $("input[name='search-word']").val();
  words = words.split(' ').join('+');
  
  var city = $("input[name='city']").val();

	$.ajax({
  		url: gumtreeUrl + city + '/' + words + '/' + lastParam
	}).done(function(data) {
  	
      	htmlBody = $.parseHTML(data);
      	topadsArea = $(htmlBody).find('#srchrslt-adtable-topads');
      	childrenNode = $(topadsArea).children();

  		$(childrenNode).find("a span[itemprop='name']").each(function( n,o){
        	titles.push($.trim($(o).text()));
	  	});
  		
  		$(childrenNode).find(".rs-ad-field .rs-ad-location").each(function(n,o) {
    		locations.push($(o).text());
  		});
  
  		var html = $("<ul></ul>");

		$.each(titles, function(n) {
			$(html).append($("<li>" + titles[n] + "," + locations[n] + "</li>"));
		});

		$('#result').append(html);

	});
});