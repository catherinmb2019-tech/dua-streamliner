/**
 * Defines the canonical field keys of the DUA template.
 * Used by MappingAgent to resolve extracted field aliases and by
 * AiSemanticExtractor to instruct the AI model on which fields to target.
 *
 * Each key maps to a placeholder in the Word document template.
 */
export const DuaTemplateSchema = {
  // ── Parties ──────────────────────────────────────────────────────────────
  BUYER_NAME: 'buyerName',
  BUYER_ADDRESS: 'buyerAddress',
  BUYER_TAX_ID: 'buyerTaxId',
  SUPPLIER_NAME: 'supplierName',
  SUPPLIER_ADDRESS: 'supplierAddress',
  SUPPLIER_TAX_ID: 'supplierTaxId',

  // ── Document references ───────────────────────────────────────────────────
  INVOICE_NUMBER: 'invoiceNumber',
  INVOICE_DATE: 'invoiceDate',
  PURCHASE_ORDER_NUMBER: 'purchaseOrderNumber',
  CONTRACT_NUMBER: 'contractNumber',

  // ── Delivery ─────────────────────────────────────────────────────────────
  DELIVERY_DATE: 'deliveryDate',
  DELIVERY_ADDRESS: 'deliveryAddress',
  INCOTERMS: 'incoterms',

  // ── Financial ─────────────────────────────────────────────────────────────
  CURRENCY: 'currency',
  SUBTOTAL: 'subtotal',
  TAX_AMOUNT: 'taxAmount',
  TOTAL_AMOUNT: 'totalAmount',
  PAYMENT_TERMS: 'paymentTerms',
  PAYMENT_DUE_DATE: 'paymentDueDate',

  // ── Line items ────────────────────────────────────────────────────────────
  LINE_ITEMS: 'lineItems',

  // ── Signatures ────────────────────────────────────────────────────────────
  SIGNATORY_BUYER: 'signatoryBuyer',
  SIGNATORY_SUPPLIER: 'signatorySupplier',
  SIGNATURE_DATE: 'signatureDate',
} as const;

export type DuaFieldKey = (typeof DuaTemplateSchema)[keyof typeof DuaTemplateSchema];

/** All required fields that must be present for a valid DUA document. */
export const REQUIRED_DUA_FIELDS: DuaFieldKey[] = [
  DuaTemplateSchema.BUYER_NAME,
  DuaTemplateSchema.SUPPLIER_NAME,
  DuaTemplateSchema.INVOICE_NUMBER,
  DuaTemplateSchema.INVOICE_DATE,
  DuaTemplateSchema.TOTAL_AMOUNT,
  DuaTemplateSchema.CURRENCY,
];

/** Field alias map: normalises common alternative names to canonical DUA field keys. */
export const DUA_FIELD_ALIASES: Record<string, DuaFieldKey> = {
  'vendor name': DuaTemplateSchema.SUPPLIER_NAME,
  'vendor address': DuaTemplateSchema.SUPPLIER_ADDRESS,
  'client name': DuaTemplateSchema.BUYER_NAME,
  'bill to': DuaTemplateSchema.BUYER_ADDRESS,
  'ship to': DuaTemplateSchema.DELIVERY_ADDRESS,
  'invoice no': DuaTemplateSchema.INVOICE_NUMBER,
  'inv date': DuaTemplateSchema.INVOICE_DATE,
  'po number': DuaTemplateSchema.PURCHASE_ORDER_NUMBER,
  'grand total': DuaTemplateSchema.TOTAL_AMOUNT,
  'total due': DuaTemplateSchema.TOTAL_AMOUNT,
  'vat': DuaTemplateSchema.TAX_AMOUNT,
};
