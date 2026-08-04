import PDFDocument from 'pdfkit';

export interface ReceiptPdfData {
  receiptNumber: string;
  referenceNumber: string; // bookingNumber / schemeNumber / donationNumber
  referenceLabel: string;  // "Booking Number" / "Scheme Number" / "Donation Number"
  payerName: string;
  itemName: string;        // pooja name / scheme name / donation type
  amount: number;
  date: Date;
  transactionId: string;
}

const TEMPLE_NAME = process.env.TEMPLE_NAME || 'Sree Temple Trust';
const TEMPLE_ADDRESS = process.env.TEMPLE_ADDRESS || '';
const TEMPLE_PHONE = process.env.TEMPLE_PHONE || '';
const TEMPLE_EMAIL = process.env.TEMPLE_EMAIL || '';

export function buildReceiptPdf(data: ReceiptPdfData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A5', margin: 40 });
    const chunks: Buffer[] = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    doc.fontSize(18).fillColor('#7a1f1f').text(TEMPLE_NAME, { align: 'center' });
    doc.fontSize(9).fillColor('#444').text(TEMPLE_ADDRESS, { align: 'center' });
    doc.text(`${TEMPLE_PHONE}  ${TEMPLE_EMAIL}`, { align: 'center' });
    doc.moveDown();
    doc.moveTo(40, doc.y).lineTo(doc.page.width - 40, doc.y).strokeColor('#d4af37').stroke();
    doc.moveDown();

    doc.fontSize(14).fillColor('#000').text('Payment Receipt', { align: 'center', underline: true });
    doc.moveDown();

    const row = (label: string, value: string) => {
      doc.fontSize(11).fillColor('#555').text(label, 50, doc.y, { continued: true, width: 150 });
      doc.fillColor('#000').text(`  ${value}`);
    };

    row('Receipt Number:', data.receiptNumber);
    row(`${data.referenceLabel}:`, data.referenceNumber);
    row('Name:', data.payerName);
    row('Item:', data.itemName);
    row('Amount:', `Rs. ${data.amount.toFixed(2)}`);
    row('Date:', data.date.toLocaleString('en-IN'));
    row('Transaction ID:', data.transactionId);

    doc.moveDown(2);
    doc.fontSize(9).fillColor('#777').text(
      'This is a computer-generated receipt and does not require a signature.',
      { align: 'center' },
    );

    doc.end();
  });
}
