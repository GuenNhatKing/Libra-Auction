"use client";

import { useRef, useState } from "react";
import { updateUserProfile } from "@/services/update_user_profile";
import { fetchImageUploadConfig } from "@/services/fetch_image_upload_config";
import { uploadImageToCloudinary } from "@/services/image_upload_to_cloudinary";
import { UserInfo } from "@/types/user_info";

interface EditProfileContentProps {
  userId: string;
  initialData?: {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    identityNumber?: string;
    avatarUrl?: string;
    roleName?: string;
  };
  onSuccess?: (updatedUser: UserInfo) => void;
  onCancel?: () => void;
}

const AVATAR_FOLDER = "avatars";
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function EditProfileContent({
  userId,
  initialData,
  onSuccess,
  onCancel,
}: EditProfileContentProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || "",
    phoneNumber: initialData?.phoneNumber || "",
    identityNumber: initialData?.identityNumber || "",
    avatarUrl: initialData?.avatarUrl || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (formData.phoneNumber && !/^[0-9]{10,11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format (10-11 digits)";
    }

    if (formData.identityNumber && !/^[0-9]{9,12}$/.test(formData.identityNumber)) {
      newErrors.identityNumber = "Invalid identity number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAvatarClick = () => {
    if (avatarUploading || loading) return;
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setAvatarError("Please choose a JPG, PNG, WEBP, or GIF image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAvatarError("Image must be smaller than 5MB.");
      return;
    }

    setAvatarError(null);
    setAvatarUploading(true);

    try {
      const fileName = `avatar-${userId}-${Date.now()}`;
      const uploadConfig = await fetchImageUploadConfig(AVATAR_FOLDER, fileName);
      const uploadedUrl = await uploadImageToCloudinary(file, uploadConfig);

      if (!uploadedUrl) {
        throw new Error("Unable to upload avatar. Please try again.");
      }

      setFormData((prev) => ({ ...prev, avatarUrl: uploadedUrl }));
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unable to upload avatar. Please try again.";
      setAvatarError(message);
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSubmitError(null);
    setSuccess(false);

    try {
      const updatedUser = await updateUserProfile(userId, formData);
      setSuccess(true);

      setTimeout(() => {
        onSuccess?.(updatedUser);
      }, 1500);
    } catch (err: unknown) {
      console.error("Error updating profile:", err);
      const message =
        err instanceof Error ? err.message : "An error occurred while updating profile";
      setSubmitError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-[var(--secondary-color)]">
          Edit Profile
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Update your profile information
        </p>
      </div>

      {success && (
        <div className="mx-6 mt-4 flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Profile updated successfully!</span>
        </div>
      )}

      {submitError && (
        <div className="mx-6 mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <button
              type="button"
              onClick={handleAvatarClick}
              disabled={avatarUploading || loading}
              className="relative group shrink-0 self-start"
              aria-label="Change profile photo"
            >
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] flex items-center justify-center text-white text-4xl font-bold overflow-hidden border-4 border-white shadow-md">
                {formData.avatarUrl ? (
                  <img
                    src={formData.avatarUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  formData.fullName?.charAt(0)?.toUpperCase() || "?"
                )}
              </div>

              <div className="absolute inset-0 rounded-full bg-black/45 opacity-0 group-hover:opacity-100 group-disabled:opacity-60 transition-opacity flex flex-col items-center justify-center text-white">
                {avatarUploading ? (
                  <svg
                    className="animate-spin h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-xs font-medium mt-1">Change photo</span>
                  </>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </button>

            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
              )}
              <p className="text-sm text-gray-500 mt-3">
                Click your photo to upload a new avatar from your device.
              </p>
              {avatarError && (
                <p className="text-xs text-red-500 mt-2">{avatarError}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Identity Number
              </label>
              <input
                type="text"
                name="identityNumber"
                value={formData.identityNumber}
                onChange={handleChange}
                placeholder="123456789012"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all ${
                  errors.identityNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.identityNumber && (
                <p className="text-xs text-red-500 mt-1">{errors.identityNumber}</p>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <h3 className="text-sm font-medium text-gray-500">
              Read-only Information (Cannot be changed)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Username</label>
                <input
                  type="text"
                  value={initialData?.email?.split("@")[0] || "—"}
                  disabled
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Email</label>
                <input
                  type="text"
                  value={initialData?.email || "—"}
                  disabled
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading || avatarUploading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)] transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || avatarUploading}
            className="px-4 py-2 text-sm font-medium text-white bg-[var(--primary-color)] rounded-lg hover:bg-[var(--secondary-color)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)] transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
