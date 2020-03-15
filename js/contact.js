$(document).ready(function() {
  (function($) {
    "use strict";

    jQuery.validator.addMethod(
      "answercheck",
      function(value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value);
      },
      "type the correct answer -_-"
    );

    var currentdate = new Date();
    var today =
      currentdate.getMonth() +
      1 +
      "/" +
      currentdate.getDate() +
      "/" +
      currentdate.getFullYear() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();

    $("#contactForm input[name='date']").val(today);
    //console.log(today);

    // validate contactForm form
    $(function() {
      $("#contactForm").validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          contact: {
            required: true,
            minlength: 5
          },
          location: {
            required: true,
            minlength: 2
          },
          number: {
            required: true,
            minlength: 5
          },
          email: {
            required: true,
            email: true
          },
          message: {
            required: true,
            minlength: 20
          }
        },
        messages: {
          name: {
            required: "please enter your name",
            minlength: "your name must consist of at least 2 characters"
          },
          contact: {
            required: "please enter your contact number",
            minlength: "your contact must consist of at least 5 characters"
          },
          location: {
            required: "please enter your location",
            minlength: "your contact must consist of at least 2 characters"
          },
          number: {
            required: "please enter your number",
            minlength: "your number must consist of at least 5 characters"
          },
          email: {
            required: "please enter your email"
          },
          message: {
            required: "please enter your message",
            minlength: "your message must consist of at least 20 characters"
          }
        },
        submitHandler: function(form) {
          $("#submitBtn").html("Sending ...");
          $("#submitBtn").attr("disabled", "disabled");

          $(form).ajaxSubmit({
            method: "GET",
            dataType: "json",
            data: $(form).serialize(),
            url:
              "https://script.google.com/macros/s/AKfycbyLNcExdi3KrcfK3dNpB56jC6c91OZp53JQ8sr-5FfeUGRfbhve/exec",
            success: function() {
              $("#contactForm :input").attr("disabled", "disabled");
              $("#contactForm").addClass("d-none");
              $("#contactSuccess").removeClass("d-none");
            },
            error: function() {
              $("#contactForm").fadeTo("fast", 0, function() {
                $("#contactError").removeClass("d-none");
              });
            }
          });
        }
      });
    });
  })(jQuery);
});
