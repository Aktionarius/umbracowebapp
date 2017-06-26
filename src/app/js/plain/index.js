$(function () {

    $(".menushuffelbtn").find("div").removeClass("open");

    $(document).on("click", ".menushuffelbtn", function () {
        if ($(".swishmenu").hasClass("closed")) {
            $(".swishmenu").addClass("opend").removeClass("closed");
            $(this).find("div").addClass("open");
        }
        else {
            $(".swishmenu").addClass("closed").removeClass("opend");
            $(this).find("div").removeClass("open");
        }
    });
});
