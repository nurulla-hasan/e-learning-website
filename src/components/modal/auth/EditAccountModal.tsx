"use client";

import { useEffect, useState, useRef, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Edit, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  useUpdateProfilePictureMutation,
  useUpdateUserProfileMutation,
} from "@/redux/feature/profile/profileApi";
import { ErrorToast, getInitials, SuccessToast } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditAccountModalProps {
  isLoading: boolean;
  user: {
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender?: string;
    address?: string;
    image?: string;
  };
}

const EditAccountModal = ({ user }: EditAccountModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const t = useTranslations("ProfilePage");
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const [updateProfilePicture, { isLoading: isUpdatingPicture }] =
    useUpdateProfilePictureMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
  });

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: user.gender || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setSelectedImage(file);
    setImagePreview(previewUrl);
  };

  const handleUploadImage = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("profileImage", selectedImage);

    try {
      await updateProfilePicture(formData).unwrap();
      SuccessToast("Profile picture updated successfully");
      // Clear the selected image and preview after successful upload
      setSelectedImage(null);
      setImagePreview(null);
    } catch (error: any) {
      ErrorToast(error?.data?.message || "Failed to update profile picture");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpdate = async () => {
    try {
      const response = await updateUserProfile({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address,
      }).unwrap();

      SuccessToast("Profile updated successfully");
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      ErrorToast(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        className="text-primary hover:text-primary/80"
      >
        <Edit className="h-4 w-4 mr-2" />
        {t("editAccount")}
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="sm:max-w-md"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>{t("editAccount")}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center space-y-6 py-4">
            {/* Profile Picture */}
            <div className="relative flex flex-col items-center">
              <Avatar className="h-20 w-20">
                {imagePreview ? (
                  <AvatarImage src={imagePreview} alt="Profile preview" />
                ) : (
                  <>
                    <AvatarImage src={user?.image} alt="Profile picture" />
                    <AvatarFallback className="bg-teal-400 text-white text-lg">
                      {getInitials(user?.fullName)}
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                >
                  {imagePreview ? "Change Image" : "Select Image"}
                </button>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={handleUploadImage}
                    disabled={isUpdatingPicture}
                    className="text-xs bg-sky-400 hover:bg-sky-500 text-white px-2 py-1 rounded disabled:opacity-50"
                  >
                    {isUpdatingPicture ? "Uploading..." : "Upload"}
                  </button>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t("fullName")}</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">{t("phoneNumber")}</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">{t("dateOfBirth")}</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter your address"
                />
              </div>
            </div>

            {/* Update Button */}
            <Button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="w-full bg-sky-400 hover:bg-sky-500 text-white font-medium py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditAccountModal;
