
$(function(){

setTimeout(function(){
  $.extend( $.validator.messages, {
  	required: "Dette felt er påkrævet.",
  	maxlength: $.validator.format( "Indtast højst {0} tegn." ),
  	minlength: $.validator.format( "Indtast mindst {0} tegn." ),
  	rangelength: $.validator.format( "Indtast mindst {0} og højst {1} tegn." ),
  	email: "Indtast en gyldig email-adresse.",
  	url: "Indtast en gyldig URL.",
  	date: "Indtast en gyldig dato.",
  	number: "Indtast et tal.",
  	digits: "Indtast kun cifre.",
  	equalTo: "Indtast den samme værdi igen.",
  	range: $.validator.format( "Angiv en værdi mellem {0} og {1}." ),
  	max: $.validator.format( "Angiv en værdi der højst er {0}." ),
  	min: $.validator.format( "Angiv en værdi der mindst er {0}." ),
  	creditcard: "Indtast et gyldigt kreditkortnummer."
  } );
}, 2000);

  $('.modal').modal({
    //  dismissible: true, // Modal can be dismissed by clicking outside of the modal
    //  opacity: .5, // Opacity of modal background
    //  inDuration: 300, // Transition in duration
    //  outDuration: 200, // Transition out duration
    //  startingTop: '4%', // Starting top style attribute
    //  endingTop: '10%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        fitiframe(modal.find(".modal-content div").innerWidth(), 460);
      },
     complete: function() {  }
   });

   $(window).resize(function(){
     fitiframe($("#modalchat").width()-48, 400);
   });

   function fitiframe(width, height){
         var iFrame = document.getElementById('tawkframe');
         iFrame.width  = width;
         iFrame.height = height;
   }

  $("form").submit(function(e) {e.preventDefault();});
  $(document).on("click", "form button", function (e) {

      $(this).closest("form").validate({
        lang: 'da'
      });

      if ($(this).closest("form").valid()) {
        sendformtoapi($(this).closest("form"));
      }
      else{
        //alert("please check form");
      }
  });

  var thinkbubble = $(".think");
  var thinkbubble1 = $(".think1");
  var talkbubble = $(".talk-bubble");

  setTimeout(function(){thinkbubble.addClass("show");},200);
  setTimeout(function(){thinkbubble.removeClass("show");},4000);
  setTimeout(function(){thinkbubble1.addClass("show");},4200);
  setTimeout(function(){thinkbubble1.removeClass("show");},8000);

  setTimeout(function(){
    startspeak();
  },8500);

  function startspeak(){
    talkbubble.show();
    $("#shuffletext p, #shuffletext h1").each(function(){
      $(this).hide();
    });
    var timer = 100;
    var count = $('#shuffletext p, #shuffletext h1').length;
    $("#shuffletext p, #shuffletext h1").each(function(i){
        var txtblock = $(this);
        var text = $(this).html();
        var length = text.length;

        setTimeout(function(){
          txtblock.show();
          txtblock.shuffleLetters({
              "text": text
          });
        },timer);
        if (i === count - 2) {
          talkend(timer);
        }
        //new timer
        timer = timer+(length*80);

     });
  }

  function talkend(timer){
    setTimeout(function(){
      $(".theendbackground").show();
      $(".theendtext").addClass("show");
    },timer+1000);
  }

  function sendformtoapi(form){
    d = "<div class='formthanks'><div class='formthankstext'>Et øjeblik.</div></div>";
    form.closest(".modal").append(d);

    var formid = 1132
    var text = "";
    form.find('input, textarea').each(function () {
      text += this.name + ": " + this.value + "<br/>"
    });

    var postUrl = "http://umb.dynamikfabrikken.com/umbraco/api/formApi/SaveFormRequest?=" + formid + "&formcontent=" + text;
      $.getJSON(postUrl, function(data) {}).success(function(data) {
    }).error(function(d) {
      console.log("Error sending");
      console.log(d);
    }).success(function(d) {
        form.closest(".modal").find(".formthankstext").html("Tak for henvendelse.<br/>Vi vender tilbage med svar så snart det er muligt.");
    }).complete(function(d) {
    });
  }
});
