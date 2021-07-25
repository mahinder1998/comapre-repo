checkUrlHash(); 
$('#RecoverPassword').on('click',function(evt) {
                evt.preventDefault();
              showRecoverPasswordForm();
                $('#RecoverHeading').attr('tabindex', '-1').focus();
            });
  $('#HideRecoverPasswordLink').on('click',function(evt) {
                evt.preventDefault();
                hideRecoverPasswordForm();
               $('#LoginHeading').attr('tabindex', '-1').focus();
            });
 /**  Show/Hide recover password form  **/

    function showRecoverPasswordForm() {
        $('#recover_form').removeClass('hide');
        $('#LoginForm').addClass('hide');

        if ($('#RecoverEmail').attr('aria-invalid') === 'true') {
            $('#RecoverEmail').focus();
        }
    }

    function hideRecoverPasswordForm() {
        $('#recover_form').addClass('hide');
        $('#LoginForm').removeClass('hide');
    }

    /**  Show reset password success message **/
    function resetPasswordSuccess() {
        var $formState = $('.reset-password-success');

        // check if reset password form was successfully submited.
        if (!$formState.length) {
            return;
        }

        // show success message
        $('#ResetSuccess')
            .removeClass('hide')
            .focus();
    }

    /**  Check URL for reset password hash  **/
    function checkUrlHash() {
        var hash = window.location.hash;

        // Allow deep linking to recover password form
        if (hash === '#recover') {
            showRecoverPasswordForm();
        }
    }
