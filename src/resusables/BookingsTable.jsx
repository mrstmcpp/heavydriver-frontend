import React from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const BookingsTable = ({ bookings = [], loading }) => {
  const navigate = useNavigate();

  const dateTemplate = (rowData) =>
    new Date(rowData.createdAt).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const fareTemplate = () => (
    <span className="text-yellow-500">
      ₹{Math.floor(Math.random() * 300) + 100}
    </span>
  );

  const statusTemplate = (rowData) => {
    let colorClass = "text-gray-400";
    if (rowData.status === "COMPLETED") colorClass = "text-green-500";
    else if (rowData.status === "CANCELLED") colorClass = "text-red-400";
    return <span className={`font-semibold ${colorClass}`}>{rowData.status}</span>;
  };

  const actionTemplate = (rowData) => (
    <Button
      label=""
      icon="pi pi-eye"
      className="p-button-sm p-button-outlined p-button-secondary"
      onClick={() => navigate(`/rides/${rowData.bookingId}/details`)}
    />
  );

  return (
    <div className="border shadow-md">
      <DataTable
        value={bookings}
        loading={loading}
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
        emptyMessage="No bookings found."
      >
        <Column field="bookingId" header="ID" sortable style={{ width: "10%" }} />
        <Column header="Date" body={dateTemplate} sortable style={{ width: "20%" }} />
        <Column header="Fare" body={fareTemplate} style={{ width: "10%" }} />
        <Column field="status" header="Status" body={statusTemplate} sortable style={{ width: "15%" }} />
        <Column body={actionTemplate} header="Action" style={{ width: "5%" }} />
      </DataTable>
    </div>
  );
};

export default BookingsTable;
