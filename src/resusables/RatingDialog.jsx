import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Rating } from "primereact/rating";
import axios from "axios";
import { useToast } from "../context/ToastContext";

const RatingDialog = ({
  visible,
  onClose,
  bookingId,
  submitUrl = `${
    import.meta.env.VITE_REVIEW_BACKEND_URL
  }/booking/${bookingId}`,
}) => {
  const [ratingValue, setRatingValue] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async () => {
    if (!ratingValue) return;
    try {
      setLoading(true);

      await axios.post(`${submitUrl}`, {
        rating: ratingValue,
        content: content?.trim() || "",
      });

      showToast({
        severity: "success",
        summary: "Thank you!",
        detail: "Your feedback has been submitted.",
      });

      setRatingValue(null);
      setContent("");
      onClose(true);
    } catch (err) {
      showToast({
        severity: "error",
        summary: "Error",
        detail: err.response?.data?.error || "Failed to submit feedback.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      header="Rate Your Ride"
      visible={visible}
      style={{
        width: "90vw",
        maxWidth: "400px",
        borderRadius: "12px",
      }}
      onHide={() => onClose(false)}
      modal
      dismissableMask
    >
      <div className="text-center py-4 px-2 sm:px-4">
        <p className="text-lg text-gray-300 mb-4">How was your experience?</p>

        <Rating
          value={ratingValue}
          onChange={(e) => setRatingValue(e.value)}
          cancel={false}
          stars={5}
          className="mb-4"
        />

        <textarea
          className="w-full rounded-lg p-3 bg-[#111] text-white border border-gray-600 focus:border-yellow-400 focus:outline-none"
          rows={4}
          placeholder="Write your feedback (optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="bg-yellow-400 text-black font-semibold rounded-lg px-6 py-2 mt-4 disabled:opacity-50"
          disabled={!ratingValue || loading}
          onClick={handleSubmit}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </Dialog>
  );
};

export default RatingDialog;
