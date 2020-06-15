$(document).ready(function () {
  (function ($) {
    "use strict";

    jQuery.validator.addMethod(
      "answercheck",
      function (value, element) {
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

    $("#registerForm input[name='date']").val(today);

    $("#registerForm select[name='know']").change(function () {
      var $option = $(this).find('option:selected');
      var value = $option.val();

      $("#registerForm input[name='referred']").parent().parent().addClass('d-none');
      $("#registerForm input[name='others']").parent().parent().addClass('d-none');

      if (value == 'Others') {
        $("#registerForm input[name='others']").parent().parent().removeClass('d-none');
      }

      if (value == 'Referred by') {
        $("#registerForm input[name='referred']").parent().parent().removeClass('d-none');
      }

    });

    // validate registerForm form
    $(function () {
      $("#registerForm").validate({
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
          major: {
            required: true,
          },
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
          major: {
            required: "please enter the specific major of study you are inquiring about",
          }
        },
        submitHandler: function (form) {
          $("#submitBtn").html("Sending ...");
          $("#submitBtn").attr("disabled", "disabled");
          var htrib = $("#birth").val();
          if (htrib) {
            $("#registerForm").addClass("d-none");
            $("#contactSuccess").removeClass("d-none");
            return;
          }
          var last = $("#registerForm input[name='last']").val();

          if (last) {
            $("#registerForm :input").attr("disabled", "disabled");
            $("#registerForm").addClass("d-none");
            $("#contactSuccess").removeClass("d-none");
          } else {
            $(form).ajaxSubmit({
              method: "GET",
              dataType: "json",
              data: $(form).serialize(),
              url:
                "https://script.google.com/macros/s/AKfycbyLNcExdi3KrcfK3dNpB56jC6c91OZp53JQ8sr-5FfeUGRfbhve/exec",
              success: function () {
                $("#registerForm :input").attr("disabled", "disabled");
                $("#registerForm").addClass("d-none");
                $("#contactSuccess").removeClass("d-none");
              },
              error: function () {
                $("#registerForm").fadeTo("fast", 0, function () {
                  $("#contactError").removeClass("d-none");
                  $("#registerForm").addClass("d-none");
                });
              }
            });
          }
        }
      });
    });
  })(jQuery);
});
