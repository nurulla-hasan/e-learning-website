"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Eye } from "lucide-react"
import Image from "next/image"
import { orders } from "@/data/order.data"


const OrdersTable = () => {
  return (
    <Card className="overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-4 font-medium text-muted-foreground">Order ID</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Course Name</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Amount</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Invoice</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b hover:bg-muted/25 transition-colors">
                <td className="p-4">
                  <span className="text-sm font-medium">{order.id}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={order.courseImage || "/placeholder.svg"}
                        alt={order.courseName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{order.courseName}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">{order.date}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium">${order.amount}</span>
                </td>
                <td className="p-4">
                  <Badge
                    variant={order.status === "Paid" ? "default" : "secondary"}
                    className={order.status === "Paid" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                  >
                    {order.status}
                  </Badge>
                </td>
                <td className="p-4">
                  {order.hasInvoice ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-normal"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  ) : (
                    <span className="text-sm text-muted-foreground">--------</span>
                  )}
                </td>
                <td className="p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-normal"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Course
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile responsive cards for smaller screens */}
      <div className="md:hidden">
        <div className="p-4 space-y-4">
          {orders.map((order, index) => (
            <Card key={index} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{order.id}</span>
                <Badge
                  variant={order.status === "Paid" ? "default" : "secondary"}
                  className={order.status === "Paid" ? "bg-green-100 text-green-800" : ""}
                >
                  {order.status}
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={order.courseImage || "/placeholder.svg"}
                    alt={order.courseName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{order.courseName}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{order.date}</span>
                <span className="font-medium">${order.amount}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                {order.hasInvoice ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-normal"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground">No invoice</span>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-normal"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Course
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  )
}


export default OrdersTable;