$(document).ready(function () {
	$(".signin").click(function () {
		$(".popup_login").css({"visibility":"visible"});
		$(".popup_login_exit").click(function () {
			$(".popup_login").css({"visibility":"hidden"}).end();
		});
		$(".reg").click(function () {
			$(".popup_login").css({"visibility":"hidden"}).end();
			$(".popup_registration").css({"visibility":"visible"});
		});
	});
});