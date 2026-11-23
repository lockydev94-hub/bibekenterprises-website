"use client";

import { fmtDateIST, fmtDateTimeIST, relativeTimeIST, todayIST } from "@/lib/tz";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import * as auth from "@/lib/auth";
import { UpdateCustomerInput } from "@/types";

const INPUT =
  "w-full border border-ink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition bg-white text-ink-900 placeholder-ink-400";

export default function ProfilePage() {
  const { user, customer, refreshCustomer, syncUserName } = useAuth();

  const [form,    setForm]    = useState<UpdateCustomerInput>({});
  const [saving,  setSaving]  = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState("");

  // Track whether form has been populated at least once so we don't
  // overwrite user edits on an unrelated context re-render.
  const populated = useRef(false);

  // Reset only when the logged-in user changes (login/logout),
  // NOT on every customer refresh — otherwise refreshCustomer() after save
  // would trigger this effect and wipe the success message instantly.
  useEffect(() => {
    populated.current = false;
    setSuccess(false);
    setError("");
    setForm({});
  }, [user?.user_id]);

  // Populate form fields from customer data on first load (or after logout/login).
  useEffect(() => {
    if (!customer || populated.current) return;
    populated.current = true;
    setForm({
      name:             customer.name,
      email:            customer.email ?? "",
      alternate_mobile: customer.alternate_mobile ?? "",
      gst_number:       customer.gst_number ?? "",
      gst_name:         customer.gst_name ?? "",
      gst_address:      customer.gst_address ?? "",
    });
  }, [customer]);

  // Clear feedback when user starts editing
  const handleChange = (k: keyof UpdateCustomerInput, v: string) => {
    setSuccess(false);
    setError("");
    setForm((f) => ({ ...f, [k]: v }));
  };

  const handleSave = async () => {
    if (!form.name?.trim()) { setError("Name is required."); return; }
    setSaving(true); setError(""); setSuccess(false);
    try {
      await auth.updateCustomerProfile(form);
      // Sync name in header immediately
      if (form.name?.trim()) syncUserName(form.name.trim());
      // Refresh customer context in background — won't wipe success message
      // because useEffect now depends only on user_id, not customer object.
      refreshCustomer();
      setSuccess(true);
    } catch (e: any) {
      const msg =
        e?.response?.data?.detail ??
        e?.response?.data?.message ??
        "Could not update profile. Please try again.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-ink-900">My Profile</h2>

      <div className="bg-white rounded-2xl border border-ink-100 shadow-sm p-6 space-y-5">

        {/* Read-only: mobile */}
        <div>
          <label className="block text-xs font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Mobile Number</label>
          <div className="flex items-center gap-2 px-4 py-3 bg-ink-50 rounded-xl border border-ink-100 text-sm text-ink-600">
            <span>📞</span> +91 {user?.mobile}
            <span className="ml-auto text-xs text-brand-600 font-semibold bg-brand-50 border border-brand-100 px-2 py-0.5 rounded-full">
              Verified ✓
            </span>
          </div>
        </div>

        {customer?.customer_code && (
          <div>
            <label className="block text-xs font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Customer ID</label>
            <div className="px-4 py-3 bg-ink-50 rounded-xl border border-ink-100 text-sm font-mono text-ink-600">
              {customer.customer_code}
            </div>
          </div>
        )}

        {/* Editable fields */}
        <div>
          <label className="block text-xs font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Full Name *</label>
          <input
            type="text"
            placeholder="Your full name"
            value={form.name ?? ""}
            onChange={(e) => handleChange("name", e.target.value)}
            className={INPUT}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Email Address</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={form.email ?? ""}
            onChange={(e) => handleChange("email", e.target.value)}
            className={INPUT}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink-500 uppercase tracking-wide mb-1.5">Alternate Mobile</label>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit mobile"
            value={form.alternate_mobile ?? ""}
            onChange={(e) =>
              handleChange("alternate_mobile", e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            className={INPUT}
          />
        </div>

        {/* GST details (optional) */}
        <details className="group">
          <summary className="text-xs font-semibold text-ink-500 uppercase tracking-wide cursor-pointer select-none hover:text-ink-700 transition-colors list-none flex items-center gap-2">
            <span>🧾 GST Details</span>
            <span className="text-ink-300 font-normal normal-case tracking-normal group-open:hidden">(click to expand)</span>
          </summary>
          <div className="mt-3 space-y-3">
            <input
              type="text"
              placeholder="GST Number"
              value={form.gst_number ?? ""}
              onChange={(e) => handleChange("gst_number", e.target.value.toUpperCase())}
              className={INPUT}
            />
            <input
              type="text"
              placeholder="GST Business Name"
              value={form.gst_name ?? ""}
              onChange={(e) => handleChange("gst_name", e.target.value)}
              className={INPUT}
            />
            <input
              type="text"
              placeholder="GST Registered Address"
              value={form.gst_address ?? ""}
              onChange={(e) => handleChange("gst_address", e.target.value)}
              className={INPUT}
            />
          </div>
        </details>

        {/* ── Feedback messages ── */}
        {error && (
          <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <span className="mt-0.5">❌</span>
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <span>✅</span>
            <span>Profile updated successfully!</span>
          </div>
        )}

        {/* ── Save button ── */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700"
        >
          {saving ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin" />
              Saving…
            </>
          ) : (
            "💾 Save Changes"
          )}
        </button>
      </div>

      {/* ── Account stats ── */}
      {customer && (
        <div className="bg-white rounded-2xl border border-ink-100 shadow-sm p-6">
          <h3 className="font-semibold text-ink-900 mb-4 text-sm">Account Info</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-ink-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-brand-600">{customer.total_bookings ?? "0"}</p>
              <p className="text-ink-400 mt-1 text-xs">Total Bookings</p>
            </div>
            <div className="bg-ink-50 rounded-xl p-4 text-center">
              <p className="text-sm font-semibold text-ink-700">
                {customer.created_at
                  ? new Date(customer.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "—"}
              </p>
              <p className="text-ink-400 mt-1 text-xs">Member Since</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
