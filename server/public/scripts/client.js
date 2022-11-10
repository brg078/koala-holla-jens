console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners();
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
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
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
    // renderTable(response);
  })
  .catch(function (error) {
    console.log('error', error);
  })

} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
}


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

  for (koala of koalas) {
    $('#viewKoalas').append(`
      <tr>
        <td>${koala.name}</td>
        <td>${koala.gender}</td>
        <td>${koala.age}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td>
          <button type="button" class="transportBtn" data-id="${koala.id}>Mark Ready For Transport</button>
        </td>
        <td>
          <button type="button" class="deleteBtn" data-id="${koala.id}>Delete</button>
        </td>
      </tr>
    `)
  }
}