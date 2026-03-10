document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  // Log the button click
  console.log("🚀 Form submitted!"); 
  
  const payload = {
    name_first: document.getElementById("name_first").value,
    name_last: document.getElementById("name_last").value,
    address_line_1: document.getElementById("address_line_1").value,
    address_line_2: document.getElementById("address_line_2").value,
    address_city: document.getElementById("address_city").value,
    address_state: document.getElementById("address_state").value,
    address_postal_code: document.getElementById("address_postal_code").value,
    document_ssn: document.getElementById("document_ssn").value,
    email_address: document.getElementById("email_address").value,
    birth_date: document.getElementById("birth_date").value,
    address_country_code: "US" // Hardcoded to US
};
// Log the payload
  console.log("Sending to backend:", payload);
  
  const statusDiv = document.getElementbyId("statusMessage");
  const outputDiv = document.getelementbyId("output");

  statusDiv.textContent = "Submitting application...";
  statusDiv.style.color = "blue";

  const response = await fetch("/api/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({payload})
  });
// Log the HTTP status   
  console.log("Server response status:", response.status);
  
  const result = await response.json();
// Log the full object Alloy returned
    console.log("Data received from backend:", result);
  
  const outcome = result.summary?.outcome;
  // Log the outcome from Alloy 
    console.log("Outcome received from backend:", outcome);

  if (outcome == "Approved") {
     statusDiv.textContent = "Application Approved!";
     statusDiv.style.color = "green";
  } else if (outcome == "Denied") {
     statusDiv.textContent = "Application Denied!";
    statusDiv.style.color = "red";
  } else if (outcome == "Manual Review") {
    statusDiv.textContent = "Application Pending.";
    statusDiv.style.color = "yellow";
  } else {
    statusDiv.textContent = "Unknown Status.";
    statusDiv.style.color = "black";
  }
  outputDiv.textContent = JSON.stringify(result, null, 2);
  
  document.getElementById("output").textContent = JSON.stringify(result, null, 2);
});
