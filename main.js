document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();

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

  const statusDiv = document.getElementbyId("statusMessage");
  const outputDiv = document.getelementbyId("output");

  statusDiv.textContent = "Submitting application...";
  statusDiv.style.color = "blue";

  const response = await fetch("/api/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({payload})
  });

  const result = await response.json();

  const outcome = result.summary?.outcome;

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
