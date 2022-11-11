console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );

  // Establish Click Listeners
  setupClickListeners();

  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $('#viewKoalas').on('click', '.isReadyButton', markAsReady);
  $('#viewKoalas').on('click', '.deleteButton', deleteKoala);
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );

    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $( '#nameIn' ).val(),
      age: Number($( '#ageIn' ).val()),
      gender: $( '#genderIn' ).val(),
      readyForTransfer: $( '#readyForTransferIn' ).val(),
      notes: $( '#notesIn' ).val()
    };

    // call saveKoala with the new object
    saveKoala( koalaToSend );
  }); 

  //click listener for filter field
  $('#inputFilter').on('keyup', getFilteredKoala);
}

function getKoalas(){
  console.log( 'in getKoalas' );

  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
  })
  .then(function (response) {
    // console.log('AJAX GET successful');
    // console.log(response.rows);
    renderTable(response.rows);
  })
  .catch(function (error) {
    console.log('error', error);
  })
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  
  if (!checkInputs(newKoala)) { // if this function returns false,
    return false; // fail input.
  }

    $.ajax({
      type: 'POST',
      url: '/koalas',
      data: newKoala
      }).then(function(response) {
        console.log('Response from server.', response);
        $('#nameIn').val('');
        $('#ageIn').val('');
        $('#genderIn').val('');
        $('#readyForTransferIn').val('');
        $('#notesIn').val('');
        getKoalas();
      }).catch(function(error) {
        console.log('Error in POST', error)
        alert('Unable to add koala at this time. Please try again later.');
      });
}  // end saveKoala

function checkInputs(newKoala) {
  let inputs = Object.values(newKoala); // array of all input values

  // if any input is empty:
  if (inputs.some((e) => e == '')) {
    alert('All inputs are required.');
    return false; // fail the vibe check
  }
  
  // if age is negative,
  // or DOM is manipulated to send something other than a number:
  else if (typeof newKoala.age != 'number' || newKoala.age < 0) { 
    alert('Age must be a positive number.');
    return false; // and fail the vibe check.
  }
  
  else { return true } // passed the vibe check 😎
}

function markAsReady () {
  console.log('Marking Koala as ready/not ready for Transfer');
  const id = $(this).data('id');
  const readyStatus = $(this).data('ready_to_transfer');


  $.ajax({
      method: 'PUT',
      url: '/koalas/' + id,
      data: {
          ready_to_transfer: readyStatus
      }
  })
  .then(function() {
      getKoalas();
  })
  .catch(function(error) {
      alert('Uh oh! Error!', error);
  })

        // if (readyStatus === true) {
        //   toggleReady();
        // }else if (readyStatus === false){
        //   toggleNotReady();
        // }

      // } else {
        // console.log('in cancel transfer button')
        // return false;
      };
    // });
 
// } // end markAsReady


function deleteKoala (){
  const koalaId = $(this).data('id');
  console.log('Deleting Koala', koalaId);

//add in sweetAlert, .ifConfirmed, then proceed
  Swal.fire({
   title: 'CONFIRM KOALA NO LONGER EXISTS',
   icon: 'warning',
   showCancelButton: true,
   confirmButtonText: 'Correct, this koala no longer exists =(',
   cancelButtonText: 'Koala still exists and is accounted for! Cancel!'

  })
   
  .then(function(result) {
      if (result.isConfirmed) {
        console.log('in is confirmed', result.isConfirmed)
        $.ajax({
          method: 'DELETE',
          url: `/koalas/remove/${koalaId}`
        })
        .then(function() {
          getKoalas();
        })
        .catch(function(error) {
          alert(`Oh no! We couldn't delete this koala!, error: ${error}`);
        });
      } else {
        console.log('in cancel delete button')
        return false;
      };
  });  
} // end deleteKoala

// stretch goal- sweetAlert
// Swal.fire({
//   title: 'Do you REALLY want to remove this koala from the list?',
//   showDenyButton: true,
//   showCancelButton: true,
//   confirmButtonText: 'Save',
//   denyButtonText: `Don't save`,
// }).then((result) => {
//   if (result.isConfirmed) {
//     Swal.fire('Saved!', '', 'success')
//   } else if (result.isDenied) {
//     Swal.fire('Changes are not saved', '', 'info')
//   }
// })


// below function does get API request on keyup from input filter field
function getFilteredKoala() {
  const searchValue = $('#inputFilter').val();

  // if blank input, refresh DOM and skip this function
  if (searchValue == '') {
    getKoalas();
    return false;
  };

  $.ajax({
    type: 'GET',
    url: '/koalas/' + searchValue
  }).then(function (response) {

    // console.log('get /filter/:search response', response);
    renderTable(response);
  }).catch(function (error) {
    alert('error getting filtered data', error);
  });
};

// show koala table on the DOM

function renderTable (koalas) {
  $('#viewKoalas').empty();

  const buttonStatus = {
    true: 'Ready for Transport',
    false: 'Not Ready for Transport'
  }

  for (let koala of koalas) {
    $('#viewKoalas').append(`
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td>
          <button type="button" class="isReadyButton" data-id="${koala.id}" data-ready_to_transfer="${koala.ready_to_transfer}">${buttonStatus[koala.ready_to_transfer]}</button>
        </td>
        <td class="deleteButtonTd">
          <button type="button" class="deleteButton" data-id="${koala.id}">Delete</button>
        </td>
      </tr>
    `);
  };
} // end renderTable

// display toggle ready button on DOM
function toggleReady() {
  $('.isReadyButton').text("Ready for Transport");
} // end toggleReady

function toggleNotReady() {
  $('.isReadyButton').text("Not Ready for Transport");
} // end toggleNotReady
