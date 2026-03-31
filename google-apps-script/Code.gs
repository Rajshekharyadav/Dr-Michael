const SHEET_ID = "1yzvR38MDrkUdmXzjSAV6Jt64Cp71bSOYF5AHZsGNmXw";
const TARGET_SHEET_NAME = "";

function doPost(e) {
  try {
    const sheet = getTargetSheet_();
    ensureHeaderRow_(sheet);

    const payload = getPayload_(e);
    const row = [
      new Date(),
      payload.name || "",
      payload.phone || "",
      payload.email || "",
      payload.message || "",
      payload.sourcePage || "",
      payload.submittedAt || "",
    ];

    sheet.appendRow(row);

    return createJsonResponse_({
      ok: true,
      message: "Saved successfully.",
    });
  } catch (error) {
    return createJsonResponse_({
      ok: false,
      message: error.message || "Unknown error.",
    });
  }
}

function doGet() {
  return createJsonResponse_({
    ok: true,
    message: "Apps Script endpoint is live.",
  });
}

function getTargetSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);

  if (TARGET_SHEET_NAME) {
    const existingSheet = spreadsheet.getSheetByName(TARGET_SHEET_NAME);
    return existingSheet || spreadsheet.insertSheet(TARGET_SHEET_NAME);
  }

  return spreadsheet.getSheets()[0];
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() > 0) {
    return;
  }

  sheet.appendRow([
    "Timestamp",
    "Name",
    "Phone",
    "Email",
    "Message",
    "Source Page",
    "Submitted At (Browser)",
  ]);
}

function getPayload_(e) {
  if (!e) {
    return {};
  }

  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (error) {
      // Ignore JSON parsing and fall back to form fields.
    }
  }

  return e.parameter || {};
}

function createJsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
