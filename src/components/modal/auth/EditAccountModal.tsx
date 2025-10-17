"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Edit } from "lucide-react"
import { useTranslations } from "next-intl"
import { useUpdateUserProfileMutation } from "@/redux/feature/profile/profileApi"
import { ErrorToast, SuccessToast } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface EditAccountModalProps {
  isLoading: boolean;
  user: {
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender?: string;
    address?: string;
  };
}

const EditAccountModal = ({ user }: EditAccountModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const t = useTranslations("ProfilePage")
  const [updateUserProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: ""
  })

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : "",
        gender: user.gender || "",
        address: user.address || ""
      })
    }
  }, [user])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleUpdate = async () => {
    try {
      const response = await updateUserProfile({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address
      }).unwrap()
      
      SuccessToast("Profile updated successfully")
      setIsModalOpen(false)
    } catch (error: any) {
      console.error('Failed to update profile:', error)
      ErrorToast(error?.data?.message || 'Failed to update profile')
    }
  }

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
        <DialogContent className="sm:max-w-md"  onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>{t("editAccount")}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center space-y-6 py-4">
            {/* Profile Picture */}
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/images/profile.png" alt="Profile picture" />
                <AvatarFallback className="bg-teal-400 text-white text-lg">
                  LA
                </AvatarFallback>
              </Avatar>
              <button className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-sky-400 flex items-center justify-center hover:bg-sky-500 transition-colors">
                <Camera className="h-3 w-3 text-white" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t("fullName")}</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
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
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">{t("dateOfBirth")}</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
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
  )
}

export default EditAccountModal
