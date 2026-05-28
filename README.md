# 🔍 Finifi Three-Way Match Engine

An AI-powered backend system for intelligent **Purchase Order (PO)**, **Goods Receipt Note (GRN)**, and **Invoice** verification using **Node.js, MongoDB, and Gemini API**.

The application extracts data from uploaded PDFs, converts unstructured text into structured JSON using AI, stores documents in MongoDB, and performs automated **three-way matching validation** with support for out-of-order uploads.

---

## 🛠 Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge)
![Gemini API](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge\&logo=google\&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FF9800?style=for-the-badge)
![PDF Parse](https://img.shields.io/badge/pdf--parse-PDF-red?style=for-the-badge)

---

## 📁 Project Structure

```bash id="m2g7qp"
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

## 🚀 Features

## 📤 Document Upload System

Users can upload:

* Purchase Orders (PO)
* Goods Receipt Notes (GRN)
* Invoices

### ✅ Supported Upload Flow

* PO first
* GRN first
* Invoice first
* Any upload order

The system automatically triggers matching whenever related documents become available.

---

## 📄 PDF Text Extraction

Uploaded PDF documents are processed using:

```bash id="x9v2ha"
pdf-parse
```

Features include:

* Raw text extraction
* Structured storage in MongoDB
* Automated processing pipeline

---

## 🤖 Gemini AI Parsing

Gemini API converts extracted PDF text into structured JSON data.

### 📦 Extracted PO Fields

* `poNumber`
* `poDate`
* `vendorName`
* `items[]`

### 📦 Extracted GRN Fields

* `grnNumber`
* `poNumber`
* `grnDate`
* `items[]`

### 📦 Extracted Invoice Fields

* `invoiceNumber`
* `poNumber`
* `invoiceDate`
* `items[]`

---

## 🔄 Three-Way Matching Logic

The engine performs validation between:

* Purchase Order (PO)
* Goods Receipt Note (GRN)
* Invoice

### 🔍 Matching Parameters

* `poNumber`
* Item quantities
* Date validations

---

## ✅ Validation Rules

### 📦 GRN Validation

* GRN quantity must not exceed PO quantity

### 🧾 Invoice Validation

* Invoice quantity must not exceed GRN quantity
* Invoice quantity must not exceed PO quantity
* Invoice date should not be after PO date

---

## 📊 Match Status Responses

The API returns one of the following statuses:

```json id="jlwmvf"
matched
partially_matched
mismatch
insufficient_documents
```

---

## 🌐 API Endpoints

## 1️⃣ Upload Document

### Endpoint

```http id="v0avsn"
POST /documents/upload
```

### Form Data

| Key          | Type |
| ------------ | ---- |
| file         | File |
| documentType | Text |

### Example

```txt id="s2c8v4"
po
```

---

## 2️⃣ Get Parsed Document

### Endpoint

```http id="5iz8m2"
GET /documents/:id
```

---

## 3️⃣ Get Match Result

### Endpoint

```http id="c8az0d"
GET /match/:poNumber
```

### Example

```http id="b9bq0s"
GET /match/TEMP_PO_NUMBER
```

---

## 🗄 MongoDB Schema

```js id="h9pq6k"
{
  documentType,
  poNumber,
  rawText,
  parsedData,
  createdAt
}
```

---

## ⚙️ How to Run Locally

### 1️⃣ Clone Repository

```bash id="cwk1cl"
git clone <repo_url>
```

---

### 2️⃣ Install Dependencies

```bash id="n70ql5"
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file:

```env id="4jqbxe"
GEMINI_API_KEY=your_api_key
MONGODB_URI=your_mongodb_uri
PORT=5000
```

---

### 4️⃣ Start Server

```bash id="dg8edq"
node src/server.js
```

---

## 🧠 System Design Highlights

* AI-powered document parsing
* Out-of-order upload handling
* Automated matching triggers
* Modular service architecture
* MongoDB-based persistence
* Scalable backend design

---

## ⚖️ Assumptions

* Each PO number has one PO document
* Multiple GRNs and Invoices can exist for the same PO
* Item matching is quantity-based
* PDFs contain readable text

---

## 🔄 Tradeoffs

* Gemini parsing depends on API quota availability
* Matching logic simplified for assignment scope
* Temporary fallback PO number used when parsing fails

---

## 💡 Future Improvements

* Frontend dashboard integration
* OCR support for scanned PDFs
* Authentication & authorization
* Queue-based async processing
* Retry handling for Gemini failures
* Advanced item-level reconciliation
* Swagger/OpenAPI documentation
* Docker & Kubernetes deployment

---

## 📌 Example Match Output

```json id="o4dy1n"
{
  "status": "matched",
  "reasons": [],
  "documents": []
}
```

---

## 🎯 Purpose of the Project

This project demonstrates:

* AI-assisted document processing
* Intelligent backend workflows
* Three-way financial reconciliation
* PDF parsing pipelines
* REST API architecture
* Scalable Node.js backend design

Perfect for:

* Backend engineering assignments
* FinTech demos
* ERP workflow automation
* AI document processing systems
* Supply chain reconciliation prototypes

---

## 👨‍💻 Author

**Sai Karthik**
