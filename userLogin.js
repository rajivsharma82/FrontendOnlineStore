// Event Listener
document.getElementById('form').addEventListener('submit', processFormData);

let isValid=false;

function processFormData(e) {
    e.preventDefault();
    // Validate Form
   //console.log("hello");
    // Submit Form if Valid

    isValid = form.checkValidity();
    //submit data if valid 
    if(isValid){
        // storeFormData();
        // var url= "store.html";
        // window.location = url;
        window.location.href="index.html";
    }
  }