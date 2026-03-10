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

  const response = await fetch("/api/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({payload})
  });

  const result = await response.json();
  document.getElementById("output").textContent = JSON.stringify(result, null, 2);
});