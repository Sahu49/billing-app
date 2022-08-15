import React, { useState, useEffect } from 'react'
import "../styles/displayInv.css"

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function InvoiceDisplay({ data, setData }) {


    const [totalCost, setTotalCost] = useState(0)

    useEffect(()=>{
        let sum = 0;
        for(let i = 0; i < data.products.length; i++)
        {
            sum += data.products[i].total;
        }
        setTotalCost(sum)
        // setData({ ...data, allTotal: sum });
    },[data])

     const exportPdf = () => {
       html2canvas(document.querySelector("#capture")).then((canvas) => {
         document.body.appendChild(canvas); // if you want see your screenshot in body.
         const imgData = canvas.toDataURL("image/png");
         const pdf = new jsPDF();
         pdf.addImage(imgData, "PNG", 0, 0);
         pdf.save("download.pdf");
       });
     };
    return (
      <div>
      <button onClick={()=>{exportPdf()}}>Print</button>
        <div className="mainBody" id="capture">
          {data != undefined && (
            <div>
              <div className="head">
                <div className="shopName">{data.storeDetails.name}</div>
                <div style={{ float: "left" }} className="shopEmail">
                  {data.storeDetails.email}
                </div>
                <div style={{ float: "left" }} className="shopPhone">
                  {data.storeDetails.phone}
                </div>
                <div style={{ float: "left" }} className="shopAddress">
                  {data.storeDetails.address}
                </div>
                <hr />
              </div>
              <div className="customerDetails">
                {data.createdAt != undefined && (
                  <div className="customerName">Time: {data.createdAt}</div>
                )}
                <div className="customerName">
                  Name: {data.customerDetails.name}
                </div>
                <div className="customerPhone">
                  Phone: {data.customerDetails.phone}
                </div>
                <div className="customerPhone">
                  Email: {data.customerDetails.email}
                </div>
                <div className="customerAddress">
                  Address: {data.customerDetails.address}
                </div>
                {data._id != undefined && (
                  <div className="customerAddress">ID: {data._id}</div>
                )}
              </div>
              <hr />
              <div className="billDetails">
                <div style={{ fontWeight: "bold" }} className="productsRow">
                  <div className="pName">Item</div>
                  <div className="pPrice">Price</div>
                  <div className="pQty">Quentity</div>
                  <div className="pTotal">total</div>
                </div>
                {data.products.map((p) => {
                  return (
                    <div className="productsRow">
                      <div className="pName">{p.name}</div>
                      <div className="pPrice">{p.price}</div>
                      <div className="pQty">{p.qty}</div>
                      <div className="pTotal">{p.total}</div>
                    </div>
                  );
                })}
                <div style={{ fontWeight: "bold" }} className="productsRow">
                  <div className="pName"></div>
                  <div className="pPrice"></div>
                  <div className="pQty">total</div>
                  <div className="pTotal">{totalCost}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default InvoiceDisplay
