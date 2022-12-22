$('#bologna-list a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

  $('#logInForm').on('submit', function() {
    return $('#logInForm').jqxValidator('validate');
});

