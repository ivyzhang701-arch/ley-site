/* =====================================================================
   LEY contact form validation
   Requirements from the brief:
     - First letter of first name, last name, city must be capitalised
       automatically (client side).
     - ZIP code must be validated.
     - Email must be validated.
     - All checks run in JavaScript on submit and on blur.
   ===================================================================== */
(function () {
  "use strict";

  var form = document.getElementById("contactForm");
  if (!form) return;

  var summary = document.getElementById("formSummary");

  /* ---------- helpers ---------- */

  // Capitalise the first letter of every word; lowercase the rest.
  // Applied to first name, last name, and city per the brief.
  function toTitleCase(value) {
    if (!value) return "";
    return value
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/(^|\s|-|')([a-z])/g, function (match) {
        return match.toUpperCase();
      });
  }

  // US zip code: 5 digits, or 5+4 format "12345-6789".
  function isZip(value) {
    return /^\d{5}(-\d{4})?$/.test(value.trim());
  }

  // Email: basic RFC-compatible pattern with mandatory dot in domain.
  function isEmail(value) {
    var v = value.trim();
    if (v.length > 254) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  }

  function isPhone(value) {
    var cleaned = value.replace(/[\s().-]/g, "");
    return /^\+?\d{7,15}$/.test(cleaned);
  }

  function setFieldState(fieldEl, state, message) {
    fieldEl.classList.remove("has-error", "is-valid");
    if (state === "error") fieldEl.classList.add("has-error");
    if (state === "ok") fieldEl.classList.add("is-valid");
    var hint = fieldEl.querySelector(".hint");
    if (hint && message !== undefined) hint.textContent = message;
  }

  function showSummary(state, text) {
    if (!summary) return;
    summary.hidden = false;
    summary.setAttribute("data-state", state);
    summary.textContent = text;
  }

  function hideSummary() {
    if (!summary) return;
    summary.hidden = true;
    summary.removeAttribute("data-state");
    summary.textContent = "";
  }

  /* ---------- field validators ---------- */

  function validateRequiredName(input, label) {
    var field = input.closest(".field");
    var raw = input.value.trim();
    if (!raw) {
      setFieldState(field, "error", label + " is required.");
      return false;
    }
    if (raw.length < 2) {
      setFieldState(field, "error", label + " must be at least 2 characters.");
      return false;
    }
    if (!/^[A-Za-z][A-Za-z '\-]*$/.test(raw)) {
      setFieldState(
        field,
        "error",
        label +
          " should contain only letters, spaces, hyphens, or apostrophes.",
      );
      return false;
    }
    var formatted = toTitleCase(raw);
    input.value = formatted;
    setFieldState(field, "ok", label + " looks good.");
    return true;
  }

  function validateCity(input) {
    var field = input.closest(".field");
    var raw = input.value.trim();
    if (!raw) {
      setFieldState(field, "error", "City is required.");
      return false;
    }
    if (!/^[A-Za-z][A-Za-z '\-\.]*$/.test(raw)) {
      setFieldState(
        field,
        "error",
        "City should only contain letters, spaces, hyphens, and apostrophes.",
      );
      return false;
    }
    input.value = toTitleCase(raw);
    setFieldState(field, "ok", "City is formatted.");
    return true;
  }

  function validateZip(input) {
    var field = input.closest(".field");
    var raw = input.value.trim();
    if (!raw) {
      setFieldState(field, "error", "ZIP code is required.");
      return false;
    }
    if (!isZip(raw)) {
      setFieldState(
        field,
        "error",
        "Use a 5-digit ZIP (e.g. 02115) or ZIP+4 (02115-1234).",
      );
      return false;
    }
    input.value = raw;
    setFieldState(field, "ok", "ZIP verified.");
    return true;
  }

  function validateEmail(input) {
    var field = input.closest(".field");
    var raw = input.value.trim();
    if (!raw) {
      setFieldState(field, "error", "Email is required.");
      return false;
    }
    if (!isEmail(raw)) {
      setFieldState(
        field,
        "error",
        "Enter a valid email address (name@example.com).",
      );
      return false;
    }
    input.value = raw.toLowerCase();
    setFieldState(field, "ok", "Email verified.");
    return true;
  }

  function validatePhone(input) {
    var field = input.closest(".field");
    var raw = input.value.trim();
    if (!raw) {
      setFieldState(field, "", "Optional. We will only call if needed.");
      return true;
    }
    if (!isPhone(raw)) {
      setFieldState(
        field,
        "error",
        "Use 7-15 digits, with optional +, spaces, dashes, or parens.",
      );
      return false;
    }
    setFieldState(field, "ok", "Phone looks good.");
    return true;
  }

  function validateState(select) {
    var field = select.closest(".field");
    if (!select.value) {
      setFieldState(field, "error", "Select a state.");
      return false;
    }
    setFieldState(field, "ok", "");
    return true;
  }

  function validateService(select) {
    var field = select.closest(".field");
    if (!select.value) {
      setFieldState(
        field,
        "error",
        "Select the service you are interested in.",
      );
      return false;
    }
    setFieldState(field, "ok", "");
    return true;
  }

  function validateMessage(textarea) {
    var field = textarea.closest(".field");
    var raw = textarea.value.trim();
    if (!raw) {
      setFieldState(field, "error", "Please share a short message.");
      return false;
    }
    if (raw.length < 10) {
      setFieldState(
        field,
        "error",
        "Message should be at least 10 characters.",
      );
      return false;
    }
    if (raw.length > 1000) {
      setFieldState(field, "error", "Message is limited to 1000 characters.");
      return false;
    }
    setFieldState(field, "ok", raw.length + " / 1000 characters.");
    return true;
  }

  function validateConsent(input) {
    var field = input.closest(".field");
    if (!input.checked) {
      setFieldState(field, "error", "Consent is required before we can reply.");
      return false;
    }
    setFieldState(field, "ok", "");
    return true;
  }

  /* ---------- wire up ---------- */

  var fields = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    city: document.getElementById("city"),
    state: document.getElementById("state"),
    zip: document.getElementById("zip"),
    service: document.getElementById("service"),
    message: document.getElementById("message"),
    consent: document.getElementById("consent"),
  };

  var blurMap = [
    [
      fields.firstName,
      function (el) {
        return validateRequiredName(el, "First name");
      },
    ],
    [
      fields.lastName,
      function (el) {
        return validateRequiredName(el, "Last name");
      },
    ],
    [fields.email, validateEmail],
    [fields.phone, validatePhone],
    [fields.city, validateCity],
    [fields.state, validateState],
    [fields.zip, validateZip],
    [fields.service, validateService],
    [fields.message, validateMessage],
  ];

  blurMap.forEach(function (pair) {
    var el = pair[0];
    var fn = pair[1];
    if (!el) return;
    var eventName = el.tagName === "SELECT" ? "change" : "blur";
    el.addEventListener(eventName, function () {
      fn(el);
    });
  });

  if (fields.message) {
    fields.message.addEventListener("input", function () {
      var field = fields.message.closest(".field");
      var hint = field.querySelector(".hint");
      if (hint && !field.classList.contains("has-error")) {
        hint.textContent = fields.message.value.length + " / 1000 characters.";
      }
    });
  }

  if (fields.consent) {
    fields.consent.addEventListener("change", function () {
      validateConsent(fields.consent);
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    hideSummary();

    var checks = [
      validateRequiredName(fields.firstName, "First name"),
      validateRequiredName(fields.lastName, "Last name"),
      validateEmail(fields.email),
      validatePhone(fields.phone),
      validateCity(fields.city),
      validateState(fields.state),
      validateZip(fields.zip),
      validateService(fields.service),
      validateMessage(fields.message),
      validateConsent(fields.consent),
    ];

    var allValid = checks.every(function (v) {
      return v === true;
    });

    if (!allValid) {
      showSummary(
        "error",
        "Please review the highlighted fields before submitting.",
      );
      var firstInvalid = form.querySelector(
        ".has-error input, .has-error select, .has-error textarea",
      );
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    var name = fields.firstName.value + " " + fields.lastName.value;
    // Clear fields manually so the summary persists (form.reset would fire the
    // reset handler and wipe the confirmation message).
    Array.prototype.forEach.call(
      form.querySelectorAll("input, select, textarea"),
      function (el) {
        if (el.type === "checkbox" || el.type === "radio") {
          el.checked = false;
        } else {
          el.value = "";
        }
      },
    );
    Array.prototype.forEach.call(form.querySelectorAll(".field"), function (f) {
      f.classList.remove("has-error", "is-valid");
    });
    Array.prototype.forEach.call(form.querySelectorAll(".hint"), function (h) {
      h.textContent = h.dataset.default || "";
    });
    showSummary(
      "success",
      "Thank you, " +
        name +
        ". Your request has been recorded locally — Ivy will reach out within two business days.",
    );
    if (form.scrollIntoView) {
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  form.addEventListener("reset", function () {
    hideSummary();
    Array.prototype.forEach.call(form.querySelectorAll(".field"), function (f) {
      f.classList.remove("has-error", "is-valid");
    });
    Array.prototype.forEach.call(form.querySelectorAll(".hint"), function (h) {
      h.textContent = h.dataset.default || "";
    });
  });
})();
