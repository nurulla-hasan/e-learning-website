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
  const esc = (val: unknown) =>
    String(val ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c] as string));

  const handlePrintInvoice = (order: IOrder) => {
    if (!order?.invoice) return;
    const rows = Object.entries(order.invoice)
      .map(
        ([k, v]) =>
          `<tr><td>${esc(k)}</td><td>${esc(v ?? "")}</td></tr>`
      )
      .join("");
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1" /><title>Invoice ${esc(order.invoice["Invoice Number"] ?? "")}</title><style>body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,Noto Sans,sans-serif;padding:24px;color:#0f172a} .container{max-width:800px;margin:0 auto} h1{font-size:24px;margin-bottom:16px} .meta{margin-bottom:16px} .meta div{margin:4px 0} table{width:100%;border-collapse:collapse} td{border:1px solid #e5e7eb;padding:8px;font-size:14px} td:first-child{width:40%;background:#f8fafc;font-weight:500}</style></head><body><div class="container"><h1>Invoice</h1><div class="meta"><div>Order ID: ${esc(order.id)}</div><div>Date: ${esc(new Date(order.enrolledAt).toLocaleDateString())}</div><div>Course: ${esc(order.courseTitle)}</div><div>Amount: ${esc(String(order.coursePrice))}</div></div><table>${rows}</table></div><script>window.onload=function(){window.focus();window.print();}</script></body></html>`;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.open();
    w.document.write(html);
    w.document.close();
  };

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
                    {order?.invoice ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePrintInvoice(order)}
                      >
                        <Download className="text-blue-500"/>
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
                        variant="outline"
                        size="icon"
                      >
                        <Eye />
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
                {order?.invoice ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-normal"
                    onClick={() => handlePrintInvoice(order)}
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
