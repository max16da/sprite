$(document).ready(function(e){
	$("#uploadimage").on('submit',function(e) {
		e.preventDefault();
		$("#message").empty();
		$.ajax({
		url: "php/ajax.php", 
		type: "POST",            
		data: new FormData(this), 
		contentType: false,       
		cache: false,             
		processData:false,        
		success: function(data)   
		{
		$("#message").html(data).css("background","#94E457");
		$("#player").css("display","block");
		$("#exemple").css("display","block");
		if ($("#file").val().startsWith("C:")){
			var file=$("#file").val().substring(11);
			$("#animation").css("background-image","url('upload/"+file+"')");
		}
		else {
			$("#animation").css("background-image","url('upload/"+$("#file").val()+"'");
		}
		//$('#image_preview').css("width", "50%");
		//$('#preview').css("width", "90%");
		}
	});
});

$(function() {
$("#file").change(function() {
$("#message").empty();
var file = this.files[0];
var imagefile = file.type;
var match= ["image/jpeg","image/png","image/jpg"];
if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2])))
{
$('#preview').attr('src','images/noimage.png');
$("#message").html("<p id='error'>Please Select A valid Image File</p>"+"<h4>Note</h4>"+"<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
return false;
}
else
{
var reader = new FileReader();
reader.onload = imageIsLoaded;
reader.readAsDataURL(this.files[0]);
}
});
});
function imageIsLoaded(e) {
$("#file").css("color","green");
$('#image_preview').css("display", "block");
$('#preview').attr('src',e.target.result);
$('#image_preview').css("width", "100%");
$('#preview').css("width", "90%"); 
};
});
