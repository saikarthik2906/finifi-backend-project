# Finifi Backend Developer Project

## Three-Way Match Engine for PO, GRN, and Invoice

## Project Overview

This project is a backend service built using Node.js, Express.js, MongoDB, and Gemini API.

The system allows users to:

* Upload Purchase Order (PO), Goods Receipt Note (GRN), and Invoice PDFs
* Extract text from uploaded PDFs
* Parse structured JSON using Gemini API
* Store parsed documents in MongoDB
* Perform three-way matching between PO, GRN, and Invoice documents
* Support out-of-order document uploads

The system supports out-of-order uploads by storing PO, GRN, and Invoice documents independently and triggering matching whenever related documents become available.

---

# Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Gemini API
* Multer
* pdf-parse
* dotenv

---

# Folder Structure

```bash
src/
 ├── config/
 │    └── db.js
 │
 ├── models/
 │    ├── Document.js
 │    └── MatchResult.js
 │
 ├── routes/
 │    ├── documentRoutes.js
 │    └── matchRoutes.js
 │
 ├── services/
 │    ├── pdfService.js
 │    ├── geminiService.js
 │    └── matchService.js
 │
 ├── uploads/
 │
 ├── app.js
 └── server.js
```

---

# Features

## 1. Upload Documents

Users can upload:

* Purchase Orders
* GRNs
* Invoices

Supported upload order:

* PO first
* GRN first
* Invoice first
* Any order

---

## 2. PDF Text Extraction

Uploaded PDF files are parsed using `pdf-parse`.

The extracted raw text is stored in MongoDB.

---

## 3. Gemini AI Parsing

Gemini API is used to convert extracted PDF text into structured JSON.

Extracted fields include:

### PO

* poNumber
* poDate
* vendorName
* items[]

### GRN

* grnNumber
* poNumber
* grnDate
* items[]

### Invoice

* invoiceNumber
* poNumber
* invoiceDate
* items[]

---

# Matching Logic

The system performs three-way matching using:

* PO
* GRN
* Invoice

Matching is performed using:

* `poNumber`
* Item quantities

## Validation Rules

### GRN Checks

* GRN quantity should not exceed PO quantity

### Invoice Checks

* Invoice quantity should not exceed total GRN quantity
* Invoice quantity should not exceed PO quantity
* Invoice date should not be after PO date

---

# Match Status

The API returns one of the following:

```json
matched
partially_matched
mismatch
insufficient_documents
```

---

# APIs

## 1. Upload Document

### Endpoint

```http
POST /documents/upload
```

### Form Data

| Key          | Type |
| ------------ | ---- |
| file         | File |
| documentType | Text |

### Example

```txt
po
```

---

## 2. Get Parsed Document

### Endpoint

```http
GET /documents/:id
```

---

## 3. Get Match Result

### Endpoint

```http
GET /match/:poNumber
```

### Example

```http
GET /match/TEMP_PO_NUMBER
```

---

# MongoDB Schema

```js
{
  documentType,
  poNumber,
  rawText,
  parsedData,
  createdAt
}
```

---

# How to Run Locally

## 1. Clone Repository

```bash
git clone <repo_url>
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Create .env File

```env
GEMINI_API_KEY=your_api_key
```

## 4. Start Server

```bash
node src/server.js
```

---

# Assumptions

* Each PO number has only one PO
* Multiple GRNs and Invoices can exist for the same PO
* Item matching is based on quantity comparison
* PDFs contain readable text

---

# Tradeoffs

* Gemini parsing depends on API quota availability
* Current matching logic is simplified for assignment scope
* Temporary fallback PO number is used if parsing fails

---

# Future Improvements

* Add frontend dashboard
* Improve OCR support for scanned PDFs
* Add authentication and authorization
* Add queue-based async processing
* Add retry mechanism for Gemini API failures
* Improve item-level matching accuracy
* Add Swagger/OpenAPI documentation
* Deploy using Docker and Kubernetes

---

# Example Match Output

```json
{
  "status": "matched",
  "reasons": [],
  "documents": []
}
```

---

# Author

Sai Karthik
