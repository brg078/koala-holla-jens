console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners();
  $('#viewKoalas').on('click', '.isReadyButton', markAsReady);
  $('#viewKoalas').on('click', '.deleteButton', deleteKoala);
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 20,
      gender: 'M',
      readyForTransfer: true,
      notes: 'testName'
    };
    // call saveKoala with the new object
    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  
  $.ajax({
    method: 'GET',
    url: '/koalas'
  })
  .then(function (response) {
    console.log('AJAX GET successful');
    console.log(response.rows);
    renderTable(response.rows);
  })
  .catch(function (error) {
    console.log('error', error);
  })

} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );

    $.ajax({
      type: 'POST',
      url: '/koalas',
      data: newKoala
      }).then(function(response) {
        console.log('Response from server.', response);
        getKoalas();
      }).catch(function(error) {
        console.log('Error in POST', error)
        alert('Unable to add koala at this time. Please try again later.');
      });
}  // end saveKoala

function markAsReady () {
  console.log('Marking Koala as ready for Transfer');
  const id = $(this).data('id');
  const status = $(this).data('status');

  $.ajax({
      method: 'PUT',
      url: `/koalas/${id}`,
      data: {
          status: status
      }
  })
  .then(function() {
      getKoalas();
  })
  .catch(function(error) {
      alert('Uh oh! Error!', error);
  })

} // end markAsReady


function deleteKoala (){
  const koalaId = $(this).data('id');
  console.log('Deleting Koala', koalaId);

  $.ajax({
      method: 'DELETE',
      url: `/koalas/${koalaId}`
  })
  .then(function() {
      getKoalas();
  })
  .catch(function(error) {
      alert(`Oh no! We couldn't delete this koala!, error: ${error}`);
  });
} // end deleteKoala

// stretch goal- toggle
// $("#isReadyBtn").click(function(){
//   $("p").toggle();
// });

// stretch goal- sweetAlert
// Swal.fire({
//   title: 'Do you want to remove this koala from the list?',
//   showDenyButton: true,
//   showCancelButton: true,
//   confirmButtonText: 'Save',
//   denyButtonText: `Don't save`,
// }).then((result) => {
//   /* Read more about isConfirmed, isDenied below */
//   if (result.isConfirmed) {
//     Swal.fire('Saved!', '', 'success')
//   } else if (result.isDenied) {
//     Swal.fire('Changes are not saved', '', 'info')
//   }
// })

function renderTable (koalas) {
  $('#viewKoalas').empty();

  for (let koala of koalas) {
    $('#viewKoalas').append(`
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td>
          <button type="button" class=".isReadyButton" data-id="${koala.id}">Mark Ready For Transport</button>
        </td>
        <td>
          <button type="button" class=".deleteButton" data-id="${koala.id}">Delete</button>
        </td>
      </tr>
    `);
  };
};

