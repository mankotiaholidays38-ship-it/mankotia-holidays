// Current Itinerary State
let currentItinerary = null;
const config = window.AGENCY_CONFIG || {};
const AGENCY_WHATSAPP = config.whatsapp || "919876543210";
const AGENCY_PHONE = config.phone || "+919876543210";
const AGENCY_NAME = config.name || "Mankotia Holidays";
const AGENCY_EMAIL = config.email || "bookings@mankotiaholidays.com";

// ----------------------------------------------------
// 1. AI ITINERARY GENERATOR
// ----------------------------------------------------
async function generateItinerary() {
  const destInput = document.getElementById("plan-destination").value.trim();
  const daysInput = parseInt(document.getElementById("plan-days").value, 10);
  const budgetInput = document.getElementById("plan-budget").value;
  const styleInput = document.getElementById("plan-style").value;

  if (!destInput) {
    alert("Please enter a destination to generate an itinerary.");
    return;
  }

  const loadingElem = document.getElementById("planner-loading");
  const resultContainer = document.getElementById("itinerary-result");
  const generateBtn = document.getElementById("btn-generate-plan");

  loadingElem.style.display = "block";
  resultContainer.style.display = "none";
  generateBtn.disabled = true;

  try {
    const response = await fetch("/api/generate-itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destination: destInput,
        days: daysInput,
        budget: budgetInput,
        travel_style: styleInput,
        travelers: "2 Adults",
        special_requests: ""
      })
    });

    const data = await response.json();
    if (data.success && data.itinerary) {
      currentItinerary = data.itinerary;
      renderItinerary(data.itinerary);
      resultContainer.style.display = "block";
      resultContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      alert("Failed to generate itinerary. Please try again.");
    }
  } catch (error) {
    console.error("Error generating itinerary:", error);
    alert("An error occurred while communicating with the AI service.");
  } finally {
    loadingElem.style.display = "none";
    generateBtn.disabled = false;
  }
}

function renderItinerary(itin) {
  document.getElementById("itinerary-title").textContent = itin.title || `${itin.destination} Travel Plan`;
  document.getElementById("itinerary-subtitle").textContent = `${itin.destination} • ${itin.duration}`;
  document.getElementById("meta-cost").textContent = itin.estimated_cost_inr || "Custom Quote";
  document.getElementById("meta-season").textContent = itin.best_season || "Year-round";

  // Highlights
  const hlList = document.getElementById("itinerary-highlights");
  hlList.innerHTML = "";
  (itin.highlights || []).forEach(hl => {
    const li = document.createElement("li");
    li.innerHTML = `<i class="fa-solid fa-star" style="color: #F59E0B; margin-right: 6px;"></i> ${hl}`;
    hlList.appendChild(li);
  });

  // Packing
  const packList = document.getElementById("itinerary-packing");
  packList.innerHTML = "";
  (itin.packing_essentials || []).forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10B981; margin-right: 6px;"></i> ${item}`;
    packList.appendChild(li);
  });

  // Day by Day Timeline
  const timeline = document.getElementById("timeline-container");
  timeline.innerHTML = "";

  (itin.days || []).forEach(day => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="day-card">
        <div class="day-title">
          <span class="day-badge">Day ${day.day_number}</span>
          <span>${day.theme || ''}</span>
        </div>
        
        <div class="schedule-grid">
          <div class="schedule-box">
            <h5><i class="fa-solid fa-sun" style="color: #F59E0B;"></i> Morning</h5>
            <p>${day.morning || 'Sightseeing & exploration'}</p>
          </div>
          <div class="schedule-box">
            <h5><i class="fa-solid fa-cloud-sun" style="color: #0284C7;"></i> Afternoon</h5>
            <p>${day.afternoon || 'Local attraction visits & activities'}</p>
          </div>
          <div class="schedule-box">
            <h5><i class="fa-solid fa-moon" style="color: #6366F1;"></i> Evening & Night</h5>
            <p>${day.evening || 'Leisure, dinner & cultural experience'}</p>
          </div>
        </div>

        <div class="day-extra-info">
          ${day.meal_recommendation ? `<div><strong><i class="fa-solid fa-utensils"></i> Cuisine Tip:</strong> ${day.meal_recommendation}</div>` : ''}
          ${day.stay_suggestion ? `<div><strong><i class="fa-solid fa-hotel"></i> Stay:</strong> ${day.stay_suggestion}</div>` : ''}
          ${day.pro_tip ? `<div><strong><i class="fa-solid fa-lightbulb" style="color: #F59E0B;"></i> Pro Tip:</strong> ${day.pro_tip}</div>` : ''}
        </div>
      </div>
    `;
    timeline.appendChild(item);
  });
}

function quickFillPlan(dest, days, budget, style) {
  document.getElementById("plan-destination").value = dest;
  document.getElementById("plan-days").value = days;
  document.getElementById("plan-budget").value = budget;
  document.getElementById("plan-style").value = style;

  const plannerSection = document.getElementById("ai-planner");
  plannerSection.scrollIntoView({ behavior: "smooth" });
  generateItinerary();
}

// ----------------------------------------------------
// 2. WHATSAPP & PHONE CALL DEEP-LINKS
// ----------------------------------------------------
function bookItineraryViaWhatsApp() {
  if (!currentItinerary) return;
  const msg = 
    `Hi ${AGENCY_NAME}! I just generated an AI itinerary on your website:\n\n` +
    `🗺️ *Trip:* ${currentItinerary.title}\n` +
    `📍 *Destination:* ${currentItinerary.destination}\n` +
    `⏳ *Duration:* ${currentItinerary.duration}\n` +
    `💰 *Budget Level:* ${currentItinerary.estimated_cost_inr}\n\n` +
    `Please provide a customized quote and check hotel availability for me!`;

  const url = `https://wa.me/${AGENCY_WHATSAPP}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

function bookPackageWhatsApp(packageTitle, price) {
  const msg = 
    `Hi ${AGENCY_NAME}! I am interested in booking the *${packageTitle}* package (₹${price}/person).\n\n` +
    `Please share available departure dates, inclusions, and best available offers.`;
  
  const url = `https://wa.me/${AGENCY_WHATSAPP}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// ----------------------------------------------------
// 3. LEAD CAPTURE & EXCEL STORAGE
// ----------------------------------------------------
async function submitHeroInquiry() {
  const name = document.getElementById("hero-name").value.trim();
  const phone = document.getElementById("hero-phone").value.trim();
  const email = document.getElementById("hero-email").value.trim();
  const dest = document.getElementById("hero-dest").value.trim() || "General Inquiry";

  if (!name || !phone || !email) {
    alert("Please fill in your Name, Phone Number, and Email ID.");
    return;
  }

  await postInquiryToServer({
    name: name,
    phone: phone,
    email: email,
    destination: dest,
    travelers: "1-2",
    travel_date: "Flexible",
    budget: "Standard",
    notes: "Submitted via Hero Inquiry bar",
    source: "Hero Quick Bar"
  });

  // Clear inputs
  document.getElementById("hero-name").value = "";
  document.getElementById("hero-phone").value = "";
  document.getElementById("hero-email").value = "";
  document.getElementById("hero-dest").value = "";
}

function openInquiryModalWithPlan() {
  if (currentItinerary) {
    document.getElementById("modal-dest").value = currentItinerary.destination;
    document.getElementById("modal-budget").value = currentItinerary.estimated_cost_inr;
    document.getElementById("modal-notes").value = `Interested in AI Itinerary: ${currentItinerary.title}`;
  }
  openInquiryModal();
}

function openInquiryModal() {
  document.getElementById("inquiry-modal").style.display = "flex";
}

function closeInquiryModal() {
  document.getElementById("inquiry-modal").style.display = "none";
}

function closeSuccessModal() {
  document.getElementById("success-modal").style.display = "none";
}

async function handleInquirySubmit(e) {
  e.preventDefault();
  const name = document.getElementById("modal-name").value.trim();
  const phone = document.getElementById("modal-phone").value.trim();
  const email = document.getElementById("modal-email").value.trim();
  const dest = document.getElementById("modal-dest").value.trim();
  const travelers = document.getElementById("modal-travelers").value.trim();
  const date = document.getElementById("modal-date").value.trim();
  const budget = document.getElementById("modal-budget").value.trim();
  const notes = document.getElementById("modal-notes").value.trim();

  const submitBtn = document.getElementById("btn-submit-inquiry");
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="spinner"></span> Saving to Excel...`;

  try {
    await postInquiryToServer({
      name, phone, email,
      destination: dest,
      travelers: travelers,
      travel_date: date,
      budget: budget,
      notes: notes,
      source: "Booking Modal Form"
    });
    closeInquiryModal();
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> Submit Inquiry & Save to Excel`;
  }
}

async function postInquiryToServer(payload) {
  try {
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    if (result.success) {
      // Set WhatsApp redirect link in the confirmation modal
      document.getElementById("success-wa-link").href = result.whatsapp_redirect_url;
      document.getElementById("success-modal").style.display = "flex";
    } else {
      alert("Could not record inquiry: " + (result.detail || "Unknown error"));
    }
  } catch (err) {
    console.error("Error submitting inquiry:", err);
    alert("Connection error while saving inquiry.");
  }
}



// ----------------------------------------------------
// 5. AI CONCIERGE CHAT DRAWER
// ----------------------------------------------------
function toggleChatDrawer() {
  const drawer = document.getElementById("chat-drawer");
  if (drawer.style.display === "flex") {
    drawer.style.display = "none";
  } else {
    drawer.style.display = "flex";
    document.getElementById("chat-input").focus();
  }
}

function handleChatKeyPress(e) {
  if (e.key === "Enter") {
    sendChatMessage();
  }
}

async function sendChatMessage() {
  const input = document.getElementById("chat-input");
  const msg = input.value.trim();
  if (!msg) return;

  const chatBody = document.getElementById("chat-body");

  // Append user bubble
  const userBubble = document.createElement("div");
  userBubble.className = "chat-bubble bubble-user";
  userBubble.textContent = msg;
  chatBody.appendChild(userBubble);
  input.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;

  // Append typing indicator
  const botBubble = document.createElement("div");
  botBubble.className = "chat-bubble bubble-bot";
  botBubble.innerHTML = `<span class="spinner" style="border-top-color: #6366F1; width: 14px; height: 14px;"></span> Aria is thinking...`;
  chatBody.appendChild(botBubble);
  chatBody.scrollTop = chatBody.scrollHeight;

  try {
    const res = await fetch("/api/chat-concierge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });
    const data = await res.json();
    if (data.success) {
      // Basic markdown replacement
      let formatted = data.reply
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
      botBubble.innerHTML = formatted;
    } else {
      botBubble.textContent = "I'm having a little trouble connecting right now. Feel free to call us at " + AGENCY_PHONE;
    }
  } catch (err) {
    botBubble.textContent = "Connection issue. Please call or WhatsApp us for instant help!";
  }
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Close modals when clicking backdrop
window.onclick = function(event) {
  const inqModal = document.getElementById("inquiry-modal");
  const succModal = document.getElementById("success-modal");
  if (event.target === inqModal) closeInquiryModal();
  if (event.target === succModal) closeSuccessModal();
};
