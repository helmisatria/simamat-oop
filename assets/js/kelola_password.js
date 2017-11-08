$(document).ready(function() {
  //Autocomplete
  $(function() {
    $.ajax({
      type: 'GET',
      url: '/get_username_user',
      statusCode: {
        400: function(response) {
          swal(
            'Maaf...',
            response,
            'error'
          )
        },
        200: function(response) {
          console.log(response);
          var barangArray = response;
          var dataUser = {};
          for (var i = 0; i < barangArray.length; i++) {
            dataUser[barangArray[i].username] = barangArray[i].flag; //countryArray[i].flag or null
          }
          $('#username-kelola-password').autocomplete({
            data: dataUser,
            limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
          });
        }
      }
    });
  });
});