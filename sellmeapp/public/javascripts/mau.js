$(document).ready(function(){
  $(".readmore").click(function(){
	var id = this.id;
	$(".readmoreContent").hide();
	$(".readmore").show();
	$('#'+this.id).hide();
    var targetId = id.replace('_readmore','_readmoreContent');
	var $target = $('#' + targetId);
    $target.show();

  });

});