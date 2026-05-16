const Document = require("../models/Document");

const matchDocuments = async (poNumber) => {

  const documents = await Document.find({ poNumber });

  const po = documents.find(doc => doc.documentType === "po");

  const grns = documents.filter(doc => doc.documentType === "grn");

  const invoices = documents.filter(doc => doc.documentType === "invoice");

  if (!po) {
    return {
      status: "insufficient_documents",
      reasons: ["po_missing"]
    };
  }

  const reasons = [];

  const poItems = po.parsedData.items || [];

  let totalGRNQty = 0;
  let totalInvoiceQty = 0;

  grns.forEach(grn => {

    grn.parsedData.items?.forEach(item => {

      totalGRNQty += Number(item.receivedQuantity || 0);

    });
  });

  invoices.forEach(invoice => {

    invoice.parsedData.items?.forEach(item => {

      totalInvoiceQty += Number(item.quantity || 0);

    });
  });

  poItems.forEach(item => {

    const poQty = Number(item.quantity || 0);

    if (totalGRNQty > poQty) {
      reasons.push("grn_qty_exceeds_po_qty");
    }

    if (totalInvoiceQty > poQty) {
      reasons.push("invoice_qty_exceeds_po_qty");
    }

    if (totalInvoiceQty > totalGRNQty) {
      reasons.push("invoice_qty_exceeds_grn_qty");
    }

  });

  let status = "matched";

  if (reasons.length > 0) {
    status = "mismatch";
  }

  if (grns.length === 0 || invoices.length === 0) {
    status = "partially_matched";
  }

  return {
    status,
    reasons,
    documents
  };
};

module.exports = matchDocuments;