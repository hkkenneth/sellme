function mauShowBox(target)
{
  target = $(target);
  var id = target.attr('id');
  console.log(id);
  $(".mau-hidden").hide();
  $(".info-box-read-row").show(); // show all 'Read more'
  $('#'+id).hide();  // hide the clicked 'Read more'
  var targetId = id.replace('_hidden_read','_hidden');
  console.log(targetId);
  var $target = $('#' + targetId);
  $target.show();
}