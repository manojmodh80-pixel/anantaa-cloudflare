let data = null;

async function loadData() {
  try {
    const res = await fetch("/api/config", { cache: "no-store" });
    if (!res.ok) throw new Error("Config request failed");
    data = await res.json();
    render(data);
  } catch (err) {
    console.error("Anantaa configuration error:", err);
    // Keep the original HTML visible if config fails.
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value != null) el.textContent = value;
}

function setLink(id, value) {
  const el = document.getElementById(id);
  if (el && value) {
    el.href = value;
    el.target = "_blank";
    el.rel = "noopener";
  }
}

function render(c) {
  if (!c) return;
const logo = document.querySelector('.logo');
if (logo && c.logo && c.logo.url) {
  logo.src = c.logo.url;
}
  setText("siteName", c.siteName);
  setText("eyebrow", c.eyebrow);
  setText("subtitle", c.subtitle);

  if (c.review) {
    setText("reviewTitle", c.review.title);
    setText("reviewSubtitle", c.review.subtitle);
    setLink("reviewBtn", c.review.url);
  }

  if (c.instagram) {
    setText("instagramTitle", c.instagram.title);
    setText("instagramSubtitle", c.instagram.subtitle);
    setLink("instagramBtn", c.instagram.url);
  }

  if (c.facebook) {
    setText("facebookTitle", c.facebook.title);
    setText("facebookSubtitle", c.facebook.subtitle);
    setLink("facebookBtn", c.facebook.url);
  }

  if (c.payment) {
    setText("paymentTitle", c.payment.title);
    setText("paymentSubtitle", c.payment.subtitle);
  }

  if (c.maps) {
    setText("mapsTitle", c.maps.title);
    setText("mapsSubtitle", c.maps.subtitle);
    setLink("mapsBtn", c.maps.url);
  }

  if (c.whatsapp) {
    setText("whatsappTitle", c.whatsapp.title);
    setText("whatsappSubtitle", c.whatsapp.subtitle);
    setLink("whatsappBtn", c.whatsapp.url);
  }

  if (c.phone) {
    setText("phoneTitle", c.phone.title);
    setText("phoneSubtitle", c.phone.subtitle);
    const phoneBtn = document.getElementById("phoneBtn");
    if (phoneBtn && c.phone.number) {
      phoneBtn.href = "tel:" + c.phone.number;
    }
  }

  if (c.footer) {
    setText("footerName", c.footer.name);
    setText("footerAddress", c.footer.address);
  }

  // Payment button
  const upiBtn = document.getElementById("upiBtn");
  if (upiBtn && c.payment && c.payment.upiId) {
    upiBtn.onclick = function () {
      window.location.href =
        "upi://pay?pa=" +
        encodeURIComponent(c.payment.upiId) +
        "&pn=" +
        encodeURIComponent(c.siteName || "Anantaa Creation") +
        "&cu=INR";
    };
  }
}

// Normal website modals
function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add("open");
    el.setAttribute("aria-hidden", "false");
  }
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove("open");
    el.setAttribute("aria-hidden", "true");
  }
}

document.addEventListener("DOMContentLoaded", function () {

  loadData();

  const payBtn = document.getElementById("payBtn");
  if (payBtn) {
    payBtn.addEventListener("click", function () {
      openModal("paymentModal");
    });
  }

  const reviewHelpBtn = document.getElementById("reviewHelpBtn");
  if (reviewHelpBtn) {
    reviewHelpBtn.addEventListener("click", function () {
      openModal("reviewModal");
    });
  }

  document.querySelectorAll("[data-close]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      closeModal(btn.dataset.close);
    });
  });

  document.querySelectorAll(".modal").forEach(function (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // IMPORTANT:
  // Google Review popup is allowed to stay open.
  const autoReviewClose = document.getElementById("autoReviewClose");
  const autoReviewLater = document.getElementById("autoReviewLater");

  if (autoReviewClose) {
    autoReviewClose.addEventListener("click", function () {
      const modal = document.getElementById("autoReviewModal");
      if (modal) {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
      }
    });
  }

  if (autoReviewLater) {
    autoReviewLater.addEventListener("click", function () {
      const modal = document.getElementById("autoReviewModal");
      if (modal) {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
      }
    });
  }
});
