// Helper: populate a <select> with options from an array
function populateSelect(id, options, placeholder = "--") {
  const select = document.getElementById(id);
  select.innerHTML = `<option value="" disabled selected>${placeholder}</option>`;
  options.forEach(opt => {
    const o = document.createElement("option");
    o.value = typeof opt === "string" ? opt : opt.value;
    o.textContent = typeof opt === "string" ? opt : opt.label;
    select.appendChild(o);
  });
}

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL",
  "GA","HI","ID","IL","IN","IA","KS","KY","LA","ME",
  "MD","MA","MI","MN","MS","MO","MT","NE","NV","NH",
  "NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI",
  "SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
];

populateSelect("address_state", US_STATES, "Select state");

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
    address_country_code: document.getElementById("address_country_code").value
  };

  const statusDiv = document.getElementById("statusMessage");
  const outputDiv = document.getElementById("output");

  statusDiv.innerHTML = `
    <div class="status-banner loading">
      <span class="status-icon">&#8987;</span>
      <span class="status-text">Submitting application...</span>
    </div>`;

  try {
    const response = await fetch("/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const result = await response.json();
    const outcome = result.summary?.outcome;

    if (outcome === "Approved") {
      statusDiv.innerHTML = `
        <div class="status-banner approved">
          <span class="status-icon">&#10004;</span>
          <span class="status-text"><strong>Outcome: ${outcome}</strong> — Success! Your application has been approved.</span>
        </div>`;
    } else if (outcome === "Deny" || outcome === "Denied") {
      statusDiv.innerHTML = `
        <div class="status-banner denied">
          <span class="status-icon">&#10008;</span>
          <span class="status-text"><strong>Outcome: ${outcome}</strong> — Sorry, your application was not successful.</span>
        </div>`;
    } else if (outcome === "Manual Review") {
      statusDiv.innerHTML = `
        <div class="status-banner review">
          <span class="status-icon">&#9202;</span>
          <span class="status-text"><strong>Outcome: ${outcome}</strong> — Thanks for submitting your application, we'll be in touch shortly.</span>
        </div>`;
    } else {
      statusDiv.innerHTML = `
        <div class="status-banner error">
          <span class="status-icon">&#63;</span>
          <span class="status-text">Unknown status received.</span>
        </div>`;
    }

    outputDiv.textContent = "";
  } catch (err) {
    statusDiv.innerHTML = `
      <div class="status-banner error">
        <span class="status-icon">&#9888;</span>
        <span class="status-text">An error occurred. Please try again.</span>
      </div>`;
    outputDiv.textContent = err.message;
  }
});
