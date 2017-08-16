
var apidomaine = "http://localhost:50947";

var twoelm = "<article class='row'><div class='col s12 m6'>#elm1#</div><div class='col s12 m6'>#elm2#</div></article>";
var oneelm = "<div class='row'><div class='col s12 m12'>#elm1#</div></div>";
var oneelmcenter = "<div class='row'><div class='col s12 m12 center'>#elm1#</div></div>";

//universal functions
function guidGenerator() {
  var S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4());
}

function renderRow(row, singleColumn) {

  var rowhtml = "";

  rowhtml += "<div " + RenderElementAttributes(row) + ">";
  if (singleColumn) {
    rowhtml += "<div class='container'>";
  }
  rowhtml += "<div class='row'>";
  for (let i = 0; i < row.areas.length; i++) {
    rowhtml += "<div class='col s12 m" + row.areas[i].grid + "'>";
    rowhtml += "<div " + RenderElementAttributes(row.areas[i]) + ">";

    for (let e = 0; e < row.areas[i].controls.length; e++) {
      var control = row.areas[i].controls[e];
      if (control != null && control.editor != null && control.editor.view != null) {
        //console.log(control);
        //console.log(control.editor);
        //console.log(control.editor.view);
        rowhtml += editorview(control);
      }
    }

    rowhtml += "</div>";
    rowhtml += "</div>";
  }
  rowhtml += "</div>";
  if (singleColumn) {
    rowhtml += "</div>";
  }
  rowhtml += "</div>";

  return rowhtml;
}

function initimage(imgid, id){
  var postUrl = apidomaine + "/umbraco/api/contentApi/Getimagesrc/?imgid=" + imgid;
  $.getJSON(postUrl, function(data) {}).success(function(data) {
    if (data) {
      $("#" + id).attr("src", data.url).attr("alt", data.altText);
    }
  }).error(function() {
    console.log("Error getimage");
  }).complete(function(data) {
  });
}

function RenderElementAttributes(contentItem) {
  var r = "";

  var cfg = contentItem.config;
  if (typeof cfg !== "undefined") {
    Object.keys(cfg).forEach(function(key) {
      r += key + "='" + cfg[key].toLowerCase().replace(" ", "-") + "'";
    });
  }

  var style = contentItem.styles;
  if (typeof style !== "undefined") {
    r += "style='";
    Object.keys(style).forEach(function(key) {
      if (key == "background-image") {
        style[key] = "url(http://umb.dynamikfabrikken.com" + style[key].replace("url(", "");
      }
      r += key + ": " + style[key] + "; ";
    });
    r += "'";
  }

  return r;
}

function editorview(contentItem) {
  var e = ""
  var type = contentItem.editor.alias;

  try {
    if (type == "rte") {
      // line 139 - TemplateUtilities.ParseInternalLinks not added

      //e+= "<a href='/kontakt'>Link to kontakt</a>";

      e += contentItem.value.replace("href\"/", "href=\"" + apidomaine + "/");

    }
    else if (type == "ImageText"){
      var data = contentItem.value.macroParamsDictionary
      var imgid = data.Image;
      var id = "imgid_" + guidGenerator();
      //generate text
      var text = "";
      if (data.Heading) {text += "<h1 class='likeh5'>" + data.Heading + "</h1>";}
      if (data.Text) {text += "<p>" + data.Text.replace(/\n/g, "<br />") + "</p>";}
      //tjeck if we will revert
      if (data.Revert != "0") {e += twoelm.replace("#elm1#", text).replace("#elm2#", "<img id='" + id + "' />");}
      else {e += twoelm.replace("#elm1#", "<img id='" + id + "' />").replace("#elm2#", text);}
      // init image src if any id
      if (imgid) {initimage(imgid, id);}
    }
    else if (type == "StatementAndButton"){
      var text = "<h3 class='light header likeh2'>Showcase</h3><p class='col s12 m8 offset-m2 caption'>Checkout what people are creating with Materialize. Get inspired by these beautiful sites and you can even submit your own website to be showcased here.</p><a href='http://materializecss.com/showcase.html' class='btn-large waves-effect waves-light'>Explore our Showcase</a>";
      e += oneelmcenter.replace("#elm1#", text);
    }
    else if (type == "slider"){
      var macroalias = contentItem.value.macroAlias;
      var id = macroalias + "_" + guidGenerator();
      console.log(contentItem.value.macroParamsDictionary);
      e += "<div id='" + id + "'><div class='loader-inner ball-scale center-align'><div></div></div></div>";
      buildlistofitems(contentItem.value.macroParamsDictionary, id, "slide");
    }
    else if (type == "cardlist"){
      var id = macroalias + "_" + guidGenerator();
      //prepare div
      e += "<div id='" + id + "' class='row'><div class='loader-inner ball-scale center-align'><div></div></div></div>";
      //get content for this div
      buildlistofitems(contentItem.value.macroParamsDictionary, id, "card");
    }
    else if (type == "Form"){
      var id = macroalias + "_" + guidGenerator();
      //prepare div
      e += "<div id='" + id + "'><div class='loader-inner ball-scale center-align'><div></div></div></div>";
      initform(contentItem.value.macroParamsDictionary, id);
    }
    else if (type == "macro") {
      // not in use anymore I think...
    } else {
      // image
      if (contentItem.editor.name == "Image") {
        e += "<img src='" + apidomaine + contentItem.value.image + "' alt='" + contentItem.value.altText + "' />";
      }
    }
  } catch (err) {

  }

  return e;
}

function addslide(slide, itemnumber) {
  var s = "";

  let slideObject = {};
  slide.forEach(function(item) {
    slideObject = Object.assign(slideObject, item)
  });

  s += "<div style='background-color: " + slideObject.backgroundColor + ";'>";

  s += "<div class='slick-text'>";
  if (slideObject.title) {
    s += "<h1>" + slideObject.title + "</h1>";
  }
  //slide text
  if (slideObject.text) {
    s += slideObject.text;
  }
  s += "</div> ";

  if (slideObject.image) {
    s += "<img src='" + slideObject.image.url + "'alt='' />"

  }


  s += "</div> ";

  return s;
}

function addcard(card) {
  var c = ""
  let cardObject = {};
  card.forEach(function(item){
    cardObject = Object.assign(cardObject, item);
  });

  c += "<div class='col s12 m6'>";
  c += "<div class='card'>";

  // card image
  if (cardObject.image.url) {
    c += "<div class='card-image'>";
    c += "<img src='" + cardObject.image.url + "' alt='" + cardObject.image.alttext + "' />";
    if (cardObject.imageTitle) {
      c += "<span class='card-title'>" + cardObject.imageTitle + "</span>";
    }
    c += "</div>";
  }

  // card title
  c += "<div class='card-content'>";
  if (card.title) {
    c += "<span class='card-title'>" + card.title + "</span>";
  }
  //card text
  if (cardObject.text) {
    c += cardObject.text;
  }
  c += "</div>";

  //card link
  if (cardObject.link) {
    var href = cardObject.link.url;
    if (cardObject.link.hashtarget) {
      href = "#" + cardObject.link.hashtarget;
    }
    c += "<div class='card-action'>";
    c += "<a href='" + href + "' target='" + cardObject.link.target + "''>" + cardObject.link.name + "</a>";
    c += "</div>";
  }

  c += "</div>";
  c += "</div>";
  return c;
};

function buildlistofitems(nodeinfo, target, type) {
  var cl = "";
  var nodeids = nodeinfo.listitems;
  if (type == "slide") {
    nodeids = nodeinfo.Slider;
  }

  var postUrl = apidomaine + "/umbraco/api/contentApi/GetListContent/?idlist=" + nodeids;
  $.getJSON(postUrl, function(data) {}).success(function(data) {
    //add each card
    var li = data.data[0].nodelist;

    if (type == "card") {
      $("#" + target).empty();
      for (var i = 0; i < li.length; i++) {
        $("#" + target).append(addcard(li[i].nodedata));
      }
    }
    if (type == "slide") {
      var s = "";
      //s += "<div class='carousel-fixed-item center'>";
      //s += "<a class='btn waves-effect white grey-text darken-text-2'>button</a>";
      //s += "</div>";

      for (var i = 0; i < li.length; i++) {
        //$("#" + target).append(addslide(li[i].nodedata));
        s += addslide(li[i].nodedata, [i]);
      }

      setTimeout(function() {
        $("#" + target).empty();
        $("#" + target).closest(".container").removeClass("container").addClass("container-full");
        let height = 340;
        if (nodeinfo.sliderHeight !== "null" && nodeinfo.sliderHeight !== "") {height = nodeinfo.sliderHeight;}
        let speed = 400;
        if (nodeinfo.speed !== "null" && nodeinfo.speed !== "") {speed = nodeinfo.speed;}
        let slidesToShow = 1;
        if (nodeinfo.slidesToShow !== "null" && nodeinfo.slidesToShow !== "") {slidesToShow = nodeinfo.slidesToShow;}
        //  arrows dots
        let showarrows = false;
        if (nodeinfo.arrows !== "null" && nodeinfo.arrows !== "0") {showarrows = true;}
        let showdots = false;
        if (nodeinfo.dots !== "null" && nodeinfo.dots !== "0") {showdots = true;}

        $("#" + target).attr("data-height", height);
        $("#" + target).attr("data-speed", speed);
        $("#" + target).attr("data-slidestoshow", slidesToShow);
        $("#" + target).attr("data-showarrows", showarrows);
        $("#" + target).attr("data-showdots", showdots);

        $("#" + target).append(s);
        $("#" + target).slick({
          dots: $("#" + target).data("showdots"),
          arrows: $("#" + target).data("showarrows"),
          nextArrow: '<div class="next-slide"><i class="material-icons">keyboard_arrow_right</i></div>',
          prevArrow: '<div class="prev-slide"><i class="material-icons">keyboard_arrow_left</i></div>',
          infinite: true,
          speed: $("#" + target).data("speed"),
          slidesToShow: $("#" + target).data("slidestoshow"),
          adaptiveHeight: false

        });
        $("#" + target + " .slick-slide").css("height", $("#" + target).data("height"));
      }, 0);
      }


  }).error(function() {
    console.log("Error on getting content list data");
  }).complete(function(data) {

  });
  return cl
}

//form handling
function initform(forminfo, target){

  var f = "";

  var postUrl = apidomaine + "/umbraco/api/contentApi/getform?formid=" + forminfo.formular;
  $.getJSON(postUrl, function(data) {}).success(function(data) {

      // build form html
      $("#" + target).empty();
      var fd = data.data[0];
      var elements = data.data[0].elements;

      // build form html
      f += '<form data-formid="' + forminfo.formular + '" data-errorMessage="' + fd.errorMessage + '" data-successMessage="' + fd.successMessage + '">';
        for (var i = 0; i < elements.length; i++) {
          var name = elements[i].label;
          var type = elements[i].type;
          var subType = elements[i].subType;
          var validateclass = "";
          var isrequired = "";
          if (elements[i].required) {
            validateclass = "validate"; //invalid or valid // not used yet
            isrequired = "required";
          }
          f += '<label for="' + name + '">' + name + '</label>';
          f += '<' + type + ' type="' + subType + '" name="' + name + '" autocomplete="off"  ' + isrequired + ' />';
        }
      f += '<button class="waves-effect waves-light btn" type="submit">' + fd.buttonText + '</button>';
      f += '</form>';
      // add form to DOM
      $("#" + target).append(f);
      $("#" + target + " form").submit(function(e) {e.preventDefault();});
  }).error(function() {
    console.log("Error on form init");
  }).complete(function(data) {
  });

  $(document).on("click", "form button", function (e) {
      if ($(this).closest("form").valid()) {
        sendformtoapi($(this).closest("form"));
      }
      else{
        alert("please check form");
      }
  });


}

function sendformtoapi(form){

  var formid = form.data("formid");
  var text = "";
  form.css("opacity", "0");
  form.children('input').each(function () {
    text += this.name + ": " + this.value + "<br/>"
  });

  var postUrl = apidomaine + "/umbraco/api/formApi/SaveFormRequest?=" + formid + "&formcontent=" + text;
  $.getJSON(postUrl, function(data) {}).success(function(data) {

  }).error(function() {
    console.log("Error sending");
  }).complete(function(data) {
  });


}
//form handling end

//main function
function buildcontenthtml(j, domaine) {
  apidomaine = domaine;
  var s = "<div>";
  if (j) {
    //if one col
    if (Object.keys(j.sections).length <= 1) {
      for (let i = 0; i < Object.keys(j.sections).length; i++) {
        var array = j.sections[i].rows;
        for (let i = 0; i < array.length; i++) {
          s += renderRow(array[i], true);
        }
      }
    } else {
      s += "<div class='container'>";
      s += "<div class='row'>";
      for (var i = 0; i < j.sections.length; i++) {
        s += "<div class='col s12 m" + j.sections[i].grid + "'>";
        var array = j.sections[i].rows;
        for (let i = 0; i < array.length; i++) {
          s += renderRow(array[i], false);
        }
        s += "</div>";
      }
      s += "</div>";
      s += "</div>";

    }
  } else {
    s += "<p>EMPTY</p>";
  }
  s += "</div>";
  return s;
}
