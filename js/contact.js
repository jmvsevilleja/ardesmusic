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

    // validate contactForm form
    $(function() {
      $("#contactForm").validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: {
            required: true,
            minlength: 4
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
          phone: {
            required: "please enter the phone number",
            minlength: "your phone must consist of at least 5 characters"
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
          $(form).ajaxSubmit({
            type: "POST",
            data: $(form).serialize(),
            url: "contact_process.php",
            success: function() {
              $("#contactForm :input").attr("disabled", "disabled");
              $("#contactForm").fadeTo("slow", 1, function() {
                $(this)
                  .find(":input")
                  .attr("disabled", "disabled");
                $(this)
                  .find("label")
                  .css("cursor", "default");
                $("#success").fadeIn();
                $(".modal").modal("hide");
                $("#success").modal("show");
              });
            },
            error: function() {
              $("#contactForm").fadeTo("slow", 1, function() {
                $("#error").fadeIn();
                $(".modal").modal("hide");
                $("#error").modal("show");
              });
            }
          });
        }
      });
    });
  })(jQuery);
});
