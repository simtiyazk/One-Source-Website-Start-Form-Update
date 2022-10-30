import $ from 'jquery';
import { prefix} from '../../helpers/constants';
import 'jquery-validation';
import 'jquery-mask-plugin';


export default () => {
  
  const $formContainer       = $(`.${prefix}-m-sign-up-form`);
  const $btn_hcp             = $('.btn-hcp');
  const $btn_pat             = $('.btn-pat');
  if ($formContainer.length) {
    const $form                = $formContainer.find('#registration-form');
    const $submitButton        = $form.find('button[type=submit]');
    
    if ($('input.checkbox_check').is(':checked')) {
      //$('#email2').prop(disabled)
    }
    $.validator.addMethod('matches',function(value, element) {
      //var re = param instanceof RegExp ? param : new RegExp(param);
      return this.optional(element) || /^[a-zA-Z]*$/.test(value);
    });
    $.validator.methods.email = function( value, element ) {
      return this.optional( element ) || /[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z]+/.test( value );
    }

    $($form).validate({
      ignore: ':hidden',
      rules: {
        fname: {
          required: true,
          maxlength: 20,
          matches: true
        },
        lname: {
          required: true,
          maxlength: 20,
          matches: true
        },
        fname2: {
          required: true,
          maxlength: 20,
          matches: true
        },
        lname2: {
          required: true,
          maxlength: 20,
          matches: true
        },
        email: {
          required: true,
          email: true
        },
        email2: {
          email: true
        },
        pfname2: {
          required: true,
          maxlength: 20,
          matches: true
        },
        plname2: {
          required: true,
          maxlength: 20,
          matches: true
        },
        pfname: {
          required: true,
          maxlength: 20,
          matches: true
        },
        plname: {
          required: true,
          maxlength: 20,
          matches: true
        },
        pemail2: {
          required: true,
          email: true
        },
        pemail: {
          email: true
        },
        
      },
      messages: {
        fname: {
            required: 'First name is a required field.',
            matches: 'Please enter a valid First name.'
        },
        lname: {
            required: 'Last name is a required field.',
            matches: 'Please enter a valid Last name.'
        },
        fname2: {
          required: 'First name is a required field.',
          matches: 'Please enter a valid First name.'
        },
        lname2: {
            required: 'Last name is a required field.',
            matches: 'Please enter a valid Last name.'
        },
        email: {
          required: 'Email is a required field.',
          email: 'Enter a valid email.'
        },
        email2: {
          email: 'Enter a valid email.'
        },

        pfname2: {
          required: 'First name is a required field.',
          matches: 'Please enter a valid First name.'
        },
        plname2: {
            required: 'Last name is a required field.',
            matches: 'Please enter a valid Last name.'
        },
        pfname: {
          required: 'First name is a required field.',
          matches: 'Please enter a valid First name.'
        },
        plname: {
            required: 'Last name is a required field.',
            matches: 'Please enter a valid Last name.'
        },
        pemail2: {
          required: 'Email is a required field.',
          email: 'Enter a valid email.'
        },
        pemail: {
          email: 'Enter a valid email.'
        },

    },

      submitHandler: () => {
        
        //$submitButton.html('<span class="text text-center">PLEASE WAIT</span><div class="spinner-border" role="status" aria-hidden="true"></div>');
        //$submitButton.addClass('wait-btn');
        $submitButton.prop('disabled', true);
   
        $.ajax({
					// type: 'post',
					// //url: 'https://datacapture.qa.hibbertgroup.com/genericapi/v1/feed/provention/layout/load/get.jsonp?input=' + encodeURIComponent(JSON.stringify(input1)),
					// url: 'https://datacapture.qa.hibbertgroup.com/genericapi/v1/feed/provention/layout/load/post.json',
					// //url: 'https://datacapture.hibbertgroup.com/genericapi/v1/feed/provention/layout/load/get.jsonp?input=' + encodeURIComponent(JSON.stringify(input1)),
					// //url: 'http://tccapplxd1:10228/genericapi/v1/feed/provention/layout/load/get.jsonp?input=' + encodeURIComponent(JSON.stringify(input1)),
          // dataType: 'json',
          // data: JSON.stringify(input1),
					// cache: true,
					// contentType: 'application/json; charset=utf-8',
					success: function() {
            // For example, filter the response
            $submitButton.removeProp('disabled');
            window.location.href = "https://alexiononesource.com/enrollment-form-thank-you?event=signing_complete";
						//callback(response);
					}
        });
      }
    });
  }
  $($btn_hcp).on('click', function() {
    $('.temp-op').remove();
    $('.patient').hide();
    $('.btns').removeClass('actv');
    $('.btns').removeClass('inactv');
    $('.hcp,.submit-btn').fadeIn(20);
    $($btn_hcp).addClass('actv');
    $($btn_pat).addClass('inactv');
  });
  $($btn_pat).on('click', function() {
    $('.temp-op').remove();
    $('.hcp').hide();
    $('.patient,.submit-btn').fadeIn(20);
    $('.btns').removeClass('actv');
    $('.btns').removeClass('inactv');
    $($btn_pat).addClass('actv');
    $($btn_hcp).addClass('inactv');
  });
  
  
  $('#emailcheck').on('click', function() {
    this.setAttribute('checked',this.checked);
    if ($('#emailcheck')[0].checked) {
      $('#email2').addClass('disabl');
      $('#email2').val("");
    }
    else {
      $('#email2,#pemail').removeClass('disabl');
    }
  })
  $('#emailcheck2').on('click', function() {
    this.setAttribute('checked',this.checked);
    if ($('#emailcheck2')[0].checked) {
      $('#pemail').addClass('disabl');
      $('#pemail').val("");
    }
    else {
      $('#pemail').removeClass('disabl');
    }
  });


  // $($btn_hcp).mouseover(function(){
  //   $(this).addClass('actv');
  //   $($btn_pat).addClass('inactv')
  // });
  // $($btn_hcp).mouseout(function(){
  //   $(this).removeClass('actv');
  //   $('.btns').removeClass('inactv');
  // });
  // $($btn_pat).mouseover(function(){
  //   $('.btns').removeClass('actv');
  //   $('.btns').removeClass('inactv')
  //   $($btn_pat).addClass('actv');
  //   $($btn_hcp).addClass('inactv')
  // });
  // $($btn_pat).mouseout(function(){
  //   $('.btns').removeClass('actv');
  //   $('.btns').removeClass('inactv');
  // })
};
