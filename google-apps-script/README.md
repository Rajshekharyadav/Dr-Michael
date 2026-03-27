# Google Sheets Contact Form Setup

Use the `Code.gs` file in this folder inside a Google Apps Script project connected to your Google account.

## Steps

1. Open [script.new](https://script.new/) while logged into the Google account that owns the sheet.
2. Replace the default Apps Script code with the contents of `Code.gs`.
3. Save the project.
4. Click `Deploy` -> `New deployment`.
5. Choose `Web app`.
6. Set:
   - Execute as: `Me`
   - Who has access: `Anyone`
7. Deploy and copy the generated Web App URL.
8. Paste that URL into `site-config.js` in the `contactFormEndpoint` field.

## Connected Sheet

The script is already set to write to:

`https://docs.google.com/spreadsheets/d/1yzvR38MDrkUdmXzjSAV6Jt64Cp71bSOYF5AHZsGNmXw/edit?usp=sharing`

It will create or use a tab named:

`Form Inquiries`
