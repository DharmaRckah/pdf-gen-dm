// // src/Invoice.js
// import React from 'react';
// import { PDFDocument, rgb } from 'pdf-lib';
// import dharma from "./assets/dharma.png";

// const Invoice = () => {
//   const generatePDF = async () => {
//     // Create a new PDF document
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([600, 400]);

//     // Draw the title
//     page.drawText('Invoice', {
//       x: 200,
//       y: 350,
//       size: 30,
//       color: rgb(0, 0, 0),
//     });

//     // Load the image
//     const imageBytes = await fetch(dharma).then(res => res.arrayBuffer());
//     const image = await pdfDoc.embedPng(imageBytes);
//     const { width, height } = image.scale(0.5);

//     // Draw the image
//     page.drawImage(image, {
//       x: 200,
//       y: 200,
//       width,
//       height,
//     });

//     // Draw the description
//     page.drawText('This is a sample invoice description.', {
//       x: 150,
//       y: 180,
//       size: 12,
//       color: rgb(0, 0, 0),
//     });

//     // Serialize the PDF document to bytes
//     const pdfBytes = await pdfDoc.save();

//     // Create a blob and open it in a new window
//     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//     const url = URL.createObjectURL(blob);
//     window.open(url);
//   };

//   return (
//     <div className="p-4">
//       <div className="border p-4">
//         <h2 className="text-xl font-bold">Invoice</h2>
//         <img src={dharma} alt="Sample" className="my-4" />
//         <p className="text-gray-700">This is a sample invoice description.</p>
//       </div>
//       <button
//         onClick={generatePDF}
//         className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
//       >
//         Generate PDF
//       </button>
//     </div>
//   );
// };

// export default Invoice;

// src/Invoice.js
// src/Invoice.js
import React from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import laptopImage from './assets/dharma.png'; // Replace with your laptop image path

const Invoice = () => {
  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    // Draw the title
    page.drawText('Invoice', {
      x: 200,
      y: 350,
      size: 30,
      color: rgb(0, 0, 0),
    });

    // Load the laptop image
    const imageBytes = await fetch(laptopImage).then(res => res.arrayBuffer());
    const image = await pdfDoc.embedPng(imageBytes);
    const { width, height } = image.scale(0.5);

    // Draw the image
    page.drawImage(image, {
      x: 200,
      y: 200,
      width,
      height,
    });

    // Draw product details
    page.drawText('Product: Laptop', {
      x: 50,
      y: 180,
      size: 16,
      color: rgb(0, 0, 0),
    });

    page.drawText('Price: 200,000', {
      x: 50,
      y: 160,
      size: 16,
      color: rgb(0, 0, 0),
    });

    page.drawText('Tax (18%): 36,000', {
      x: 50,
      y: 140,
      size: 16,
      color: rgb(0, 0, 0),
    });

    page.drawText('Total Amount: 236,000', {
      x: 50,
      y: 120,
      size: 16,
      color: rgb(0, 0, 0),
    });

    // Serialize the PDF document to bytes
    const pdfBytes = await pdfDoc.save();

    // Create a blob and open it in a new window
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <div className="p-4">
      <div className="border p-4">
        <h2 className="text-xl font-bold">Invoice</h2>
        <img src={laptopImage} alt="Laptop" className="my-4" />
        <p className="text-gray-700">Product: Laptop</p>
        <p className="text-gray-700">Price: ₹200,000</p>
        <p className="text-gray-700">Tax (18%): ₹36,000</p>
        <p className="text-gray-700">Total Amount: ₹236,000</p>
      </div>
      <button
        onClick={generatePDF}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Generate PDF
      </button>
    </div>
  );
};

export default Invoice;