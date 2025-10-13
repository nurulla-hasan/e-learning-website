"use client"

import { useState } from "react"
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

const EditAccountModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const t = useTranslations("ProfilePage")

  const [formData, setFormData] = useState({
    fullName: "Leslie Alexander",
    email: "debra.holt@example.com",
    phoneNumber: "(208) 555-0112",
    dateOfBirth: "05/11/2002"
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleUpdate = () => {
    console.log("Updated profile:", formData)
    setIsModalOpen(false)
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
                  onChange={(e) => handleInputChange("email", e.target.value)}
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
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                />
              </div>
            </div>

            {/* Update Button */}
            <Button
              onClick={handleUpdate}
              className="w-full bg-sky-400 hover:bg-sky-500 text-white font-medium py-2.5"
            >
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditAccountModal
