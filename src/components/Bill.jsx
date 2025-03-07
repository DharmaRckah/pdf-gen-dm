import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Modal, Button, Table } from "antd";
import { jsPDF } from "jspdf";

const Bill = () => {
  // Static data for bills
  const [billsData, setBillsData] = useState([
    {
      _id: "1",
      customerName: "ram nathu godse",
      customerNumber: "1234567890",
      subTotal: 100,
      tax: 10,
      totalAmount: 110,
      date: new Date(),
      cartItems: [
        { name: "Item 1", quantity: 1, price: 50 },
        { name: "Item 2", quantity: 1, price: 50 },
      ],
    },
    {
      _id: "2",
      customerName: "galib mirza",
      customerNumber: "0987654321",
      subTotal: 200,
      tax: 20,
      totalAmount: 220,
      date: new Date(),
      cartItems: [
        { name: "Item 3", quantity: 2, price: 100 },
      ],
    },
  ]);
  
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const columns = [
    { title: "ID", dataIndex: "_id" },
    { title: "Customer Name", dataIndex: "customerName" },
    { title: "Contact No", dataIndex: "customerNumber" },
    { title: "Subtotal", dataIndex: "subTotal" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Total Amount", dataIndex: "totalAmount" },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedBill(record);
              setPopupModal(true);
            }}
          >
            View
          </Button>
        ),
    },
  ];

  const generatePdf = () => {
    const doc = new jsPDF();

    // Add invoice details
    doc.setFontSize(18);
    doc.text("Invoice Details", 10, 10);
    doc.setFontSize(12);
    doc.text(`Customer Name: ${selectedBill.customerName}`, 10, 20);
    doc.text(`Phone No: ${selectedBill.customerNumber}`, 10, 30);
    doc.text(`Date: ${new Date(selectedBill.date).toLocaleDateString()}`, 10, 40);

    // Add table headers
    doc.text("Item Name", 10, 50);
    doc.text("Quantity", 70, 50);
    doc.text("Price", 130, 50);

    // Add cart items
    let yPos = 60;
    selectedBill.cartItems.forEach((item, index) => {
      doc.text(item.name, 10, yPos + index * 10);
      doc.text(item.quantity.toString(), 70, yPos + index * 10);
      doc.text(`$${item.price.toFixed(2)}`, 130, yPos + index * 10);
    });

    // Add totals
    yPos += selectedBill.cartItems.length * 10 + 10;
    doc.text(`Subtotal: $${selectedBill.subTotal.toFixed(2)}`, 10, yPos);
    doc.text(`Tax: $${selectedBill.tax.toFixed(2)}`, 10, yPos + 10);
    doc.text(`Total Amount: $${selectedBill.totalAmount.toFixed(2)}`, 10, yPos + 20);

    // Save the PDF
    doc.save(`invoice_${selectedBill._id}.pdf`);
  };

  return (
    <div>
         <div className='text-blue-500 m-4'><a target="_blank" href="https://github.com/DharmaRckah/pdf-gen-dm/tree/pdfkit">get source code -Dharmendra jspdf</a></div>
      <Table dataSource={billsData} columns={columns} rowKey="_id" />
      <Modal
        title="Bill Details"
        visible={popupModal}
        onCancel={() => setPopupModal(false)}
        footer={null}
      >
        {selectedBill && (
          <div>
            <h3>Invoice Details</h3>
            <p>Customer Name: {selectedBill.customerName}</p>
            <p>Phone No: {selectedBill.customerNumber}</p>
            <p>Date: {new Date(selectedBill.date).toLocaleDateString()}</p>
            <h4>Cart Items</h4>
            <ul>
              {selectedBill.cartItems.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <p>Subtotal: ${selectedBill.subTotal.toFixed(2)}</p>
            <p>Tax: ${selectedBill.tax.toFixed(2)}</p>
            <p>Total Amount: ${selectedBill.totalAmount.toFixed(2)}</p>
            <Button type="primary" onClick={generatePdf}>
              Download PDF
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Bill;