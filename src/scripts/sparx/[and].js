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

/**
   *
   *  29 july Show/hide customer address forms
   *
   */
 var address_list_container = document.getElementById('cus_address-list');

 var newAddressForm = document.getElementById('AddressNewForm');
 var newAddressFormButton = document.getElementById('AddressNewButton');
 
 
 
 // Toggle new/edit address forms
 document.querySelectorAll('.address-new-toggle').forEach(function(button) {
   button.addEventListener('click', function() {
     var isExpanded =
         newAddressFormButton.getAttribute('aria-expanded') === 'true';
 
     newAddressForm.classList.toggle('hide');
     address_list_container.classList.toggle('show');
     newAddressFormButton.setAttribute('aria-expanded', !isExpanded);
     newAddressFormButton.focus();
   });
 });
 
 document.querySelectorAll('.address-edit-toggle').forEach(function(button) {
   button.addEventListener('click', function(evt) {
     var formId = evt.target.dataset.formId;
     var editButton = document.getElementById('EditFormButton_' + formId);
     var editAddress = document.getElementById('EditAddress_' + formId);
     var isExpanded = editButton.getAttribute('aria-expanded') === 'true';
 
     editAddress.classList.toggle('hide');
     editButton.setAttribute('aria-expanded', !isExpanded);
     editButton.focus();
   });
 });
 
 document.querySelectorAll('.address-delete').forEach(function(button) {
   button.addEventListener('click', function(evt) {
     var target = evt.target.dataset.target;
     var confirmMessage = evt.target.dataset.confirmMessage;
 
     // eslint-disable-next-line no-alert
     if (
       confirm(
         confirmMessage || 'Are you sure you wish to delete this address?'
       )
     ) {
       Shopify.postLink(target, {
         parameters: { _method: 'delete' }
       });
     }
   });
 });
 
 
 
 // custom filter code 27-07-2021
 
 $( document ).ready(function() {
   if($(window).width()<=768) {
     $(document).on("click",".custom-boots h5 svg",function() {
       $(this).parents(".custom-boots").hide();		
         $(".boost-pfs-filter-sort-active").removeClass("boost-pfs-filter-sort-active");
         $(".boost-pfs-filter-filter-dropdown").hide();
     });
   }
 });
 
 $( "#view-order-d" ).click(function() {
   $( "a#my_order" ).click();
 });
 $( "#view-order-m" ).click(function() {
   $( "a#my_order" ).click();
 });
 