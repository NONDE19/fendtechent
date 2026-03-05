// Track the current item being requested
let currentItem = "";

//Open the modal when a product's Request button is clicked
function requestItem(item) {
  currentItem = item;
  document.getElementById("modalTitle").innerText = `Request: ${item}`;
  document.getElementById("requestModal").style.display = "flex";
}

// Close the modal
function closeModal() {
  document.getElementById("requestModal").style.display = "none";
}






// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("modalForm");

  if (form) {
    form.addEventListener("submit", function (e) {
  e.preventDefault();

  const userEmail = document.getElementById("userEmail").value;
  const details = document.getElementById("details").value;

  //Timestamp at time of sending
  const timestamp = new Date().toLocaleString();

  emailjs.send("service_xfw9cxn", "template_lsliend", {
    item_name: currentItem,
    item_details: details || "No extra details",
    user_email: userEmail,
    timestamp: timestamp   
  })
  .then(function (response) {
    alert("🎉 Your request has been sent successfully!");
    form.reset();
    closeModal();
  })
  .catch(function (error) {
    console.error("EmailJS error:", error);
    alert("❌ Failed to send request: " + error.text);
  });
    });
  }
});
