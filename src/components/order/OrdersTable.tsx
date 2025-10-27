"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye } from "lucide-react";
import Image from "next/image";

import { IOrder } from "@/types/order.type";
import { Skeleton } from "../ui/skeleton";
import { Link } from "@/i18n/navigation";

const OrdersTable = ({
  items,
  isLoading,
  isError,
}: {
  items: IOrder[];
  isLoading?: boolean;
  isError?: boolean;
}) => {
  return (
    <Card className="overflow-hidden p-0">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-4 font-medium text-muted-foreground">
                Course Name
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                Date
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                Amount
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                Invoice
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="p-4 space-y-2">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={7} className="p-4">
                  <p className="text-center text-red-500">
                    Failed to load orders
                  </p>
                </td>
              </tr>
            ) : (
              items.map((order, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-muted/25 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={order?.courseThumbnail || "/placeholder.svg"}
                          alt={order?.courseTitle}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {order?.courseTitle}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">
                      {order?.enrolledAt
                        ? new Date(order.enrolledAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium">
                      zł {order?.coursePrice}
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={
                        order?.paymentStatus === "COMPLETED"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        order?.paymentStatus === "COMPLETED"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : ""
                      }
                    >
                      {order?.paymentStatus}
                    </Badge>
                  </td>
                  <td className="p-4">
                    {order?.invoiceId ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-normal"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        --------
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <Link href={`/courses/${order?.courseId}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-normal"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Course
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile responsive cards for smaller screens */}
      <div className="md:hidden">
        <div className="p-4 space-y-4">
          {items.map((order, index) => (
            <Card key={index} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    order.paymentStatus === "COMPLETED"
                      ? "default"
                      : "secondary"
                  }
                  className={
                    order.paymentStatus === "COMPLETED"
                      ? "bg-green-100 text-green-800"
                      : ""
                  }
                >
                  {order.paymentStatus}
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={order?.courseThumbnail || "/placeholder.svg"}
                    alt={order?.courseTitle}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {order?.courseTitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {order?.enrolledAt
                    ? new Date(order.enrolledAt).toLocaleDateString()
                    : "N/A"}
                </span>
                <span className="font-medium">zł {order?.coursePrice}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                {order?.invoiceId ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-normal"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No invoice
                  </span>
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
  );
};

export default OrdersTable;
