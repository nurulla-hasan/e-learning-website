/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Printer } from "lucide-react";
import Image from "next/image";

import { IOrder } from "@/types/order.type";
import { Skeleton } from "../ui/skeleton";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const OrdersTable = ({
  items,
  isLoading,
  isError,
}: {
  items: IOrder[];
  isLoading?: boolean;
  isError?: boolean;
}) => {
  const t = useTranslations("Orders.table");

  const getStatusLabel = (status?: string | null) => {
    if (!status) {
      return t("status.unknown");
    }
    const key = status.toLowerCase();
    return t(`status.${key}`, { defaultMessage: status });
  };

  const getFormattedDate = (date?: string | null) => {
    if (!date) {
      return t("not_available");
    }
    return new Date(date).toLocaleDateString();
  };

  const formatAmount = (amount?: number | null) => {
    const value = amount ?? 0;
    return t("amount", { value });
  };

  const getInvoiceHtml = (order: IOrder) => {
    if (!order?.invoice) return null;

    const inv = order.invoice;

    const esc = (text: any) => {
      if (text === null || text === undefined) return "";
      return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const netTotal = parseFloat((inv["Total Amount (ex VAT)"] || "0").toString());
    const vatTotal = parseFloat((inv["Total VAT amount"] || "0").toString());
    const qty = parseInt((inv["Number of Course(s)"] || "1").toString());
    const unitNetPrice = qty > 0 ? (netTotal / qty).toFixed(2) : "0.00";
    let calculatedVatRate = "0%";
    if (netTotal > 0) {
      const rate = Math.round((vatTotal / netTotal) * 100);
      calculatedVatRate = rate + "%";
    }

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice ${esc(inv["Invoice"] || inv["Invoice Number"] || "-")}</title>
        <style>
            body { 
                font-family: 'Arial', sans-serif; 
                font-size: 12px; 
                color: #000; 
                margin: 0; 
                padding: 40px; 
                line-height: 1.5;
            }
            .container { 
                max-width: 900px; 
                margin: 0 auto; 
            }
            
            /* TOP HEADER SECTION - CENTERED */
            .top-header {
                display: flex;
                justify-content: center; /* Centered as per request */
                margin-bottom: 30px;
                padding-bottom: 10px;
            }
            
            /* Invoice Number Box */
            .invoice-number-box {
                text-align: center; /* Text centered inside the box */
            }
            .invoice-number-box h2 {
                margin: 0;
                font-size: 18px; /* Slightly larger for emphasis */
                color: #000;
                border: 2px solid #333; 
                padding: 8px 20px;
                display: inline-block;
            }
            .invoice-date {
                margin-top: 8px;
                font-size: 14px;
                font-weight: bold;
            }

            /* PARTIES (Seller & Buyer) */
            .parties-container {
                display: flex;
                justify-content: space-between;
                margin-bottom: 30px;
                gap: 20px;
            }
            .party-box {
                width: 48%;
                border: 1px solid #ddd;
                padding: 15px;
                border-radius: 4px;
                background-color: #fcfcfc;
            }
            .party-title {
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 10px;
                border-bottom: 1px solid #ccc;
                padding-bottom: 5px;
                color: #444;
            }
            .party-info {
                font-size: 13px;
            }

            /* TABLE */
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
                font-size: 11px;
            }
            th {
                border: 1px solid #000;
                padding: 8px 4px;
                background-color: #f0f0f0;
                font-weight: bold;
                text-align: center;
                vertical-align: middle;
            }
            td {
                border: 1px solid #000;
                padding: 8px 4px;
                text-align: center;
                vertical-align: middle;
            }
            .text-left { text-align: left; padding-left: 8px; }
            .text-right { text-align: right; padding-right: 8px; }

            /* TOTALS */
            .total-row {
                font-weight: bold;
                background-color: #fafafa;
            }
            .summary-section {
                margin-top: 30px;
                text-align: right;
            }
            .big-total {
                font-size: 18px;
                font-weight: bold;
                color: #000;
                border-bottom: 1px double #000;
                display: inline-block;
                padding-bottom: 2px;
            }

            /* FOOTER & SIGNATURES */
            .footer-notes {
                margin-top: 50px;
                font-size: 11px;
                color: #555;
                font-style: italic;
                border-top: 1px dashed #ccc;
                padding-top: 15px;
            }
            .signatures {
                display: flex;
                justify-content: space-between;
                margin-top: 80px;
            }
            .sig-line {
                width: 250px;
                border-top: 1px solid #000;
                text-align: center;
                font-size: 10px;
                padding-top: 5px;
            }

            @media print {
                body { padding: 0; -webkit-print-color-adjust: exact; }
                .party-box { background-color: #fff !important; border: 1px solid #000; }
                th { background-color: #ddd !important; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            
            <!-- TOP HEADER: CENTERED -->
            <div class="top-header">
                <div class="invoice-number-box">
                    <h2>Faktura VAT nr: ${esc(inv["Invoice"] || inv["Invoice Number"] || "-")}</h2>
                    <div class="invoice-date">Date: ${esc(inv["Invoice Date"])}</div>
                </div>
            </div>

            <!-- PARTIES -->
            <div class="parties-container">
                <!-- Seller Info -->
                <div class="party-box">
                    <div class="party-title">Sprzedawca (Seller)</div>
                    <div class="party-info">
                        <strong>${esc(inv["Seller"])}</strong><br>
                        ${esc(inv["Address"])}<br>
                        Email: ${esc(inv["Email"])}<br>
                        <strong>NIP: ${esc(inv["NIP"])}</strong>
                    </div>
                </div>

                <!-- Buyer Info -->
                <div class="party-box">
                    <div class="party-title">Nabywca (Buyer)</div>
                    <div class="party-info">
                        <strong>${esc(inv["Buyer"])}</strong><br>
                        ${esc(inv["Buyer Address"])}<br>
                        Email: ${esc(inv["Buyer Email"])}<br>
                        NIP: ${esc(inv["Buyer NIP"] || "-")}
                    </div>
                </div>
            </div>

            <!-- TABLE -->
            <table>
                <thead>
                    <tr>
                        <th width="4%">L.P.</th>
                        <th width="32%">NAZWA TOWARU LUB USŁUGI<br><span style="font-weight:normal; font-size:9px">(Description)</span></th>
                        <th width="6%">j.m.<br><span style="font-weight:normal; font-size:9px">(Unit)</span></th>
                        <th width="6%">ilość sztuk<br><span style="font-weight:normal; font-size:9px">(Qty)</span></th>
                        <th width="12%">cena netto<br><span style="font-weight:normal; font-size:9px">(Net Price)</span></th>
                        <th width="12%">Wartość netto<br><span style="font-weight:normal; font-size:9px">(Net Value)</span></th>
                        <th width="8%">stawka Vat<br><span style="font-weight:normal; font-size:9px">(VAT %)</span></th>
                        <th width="10%">kwota Vat<br><span style="font-weight:normal; font-size:9px">(VAT Amt)</span></th>
                        <th width="10%">Wartość z Vat<br><span style="font-weight:normal; font-size:9px">(Gross Value)</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1.</td>
                        <td class="text-left">${esc(inv["Course(s) Purchased"])}</td>
                        <td>${esc(inv["Course(s) unit"] || "szt.")}</td>
                        <td>${esc(qty)}</td>
                        <td>${esc(unitNetPrice)}</td>
                        <td>${esc(inv["Total Amount (ex VAT)"])}</td>
                        <td>${esc(calculatedVatRate)}</td>
                        <td>${esc(inv["Total VAT amount"])}</td>
                        <td>${esc(inv["Total Amount (inc VAT)"])}</td>
                    </tr>
                    
                    <tr class="total-row">
                        <td colspan="5" class="text-right">RAZEM (TOTAL):</td>
                        <td>${esc(inv["Total Amount (ex VAT)"])}</td>
                        <td>X</td>
                        <td>${esc(inv["Total VAT amount"])}</td>
                        <td>${esc(inv["Total Amount (inc VAT)"])}</td>
                    </tr>
                </tbody>
            </table>

            <!-- SUMMARY -->
            <div class="summary-section">
                <div class="big-total">Do zapłaty (Total Payable): ${esc(inv["Total Amount Payable"])}</div>
                <p style="font-size: 11px; margin-top:5px;">
                    Słownie (In words): ${esc(inv["Total amount in words"])}
                </p>
            </div>

            <!-- FOOTER -->
            <div class="footer-notes">
                <strong>Bank Account:</strong> ${esc(inv["Company account number"])} <br>
                <strong>Payment Method:</strong> ${esc(inv["Payment Method"])} <br><br>
                * LE - Internal company distinguishing feature indicating e-learning platform.
            </div>

            <!-- SIGNATURES -->
            <div class="signatures">
                <div class="sig-line">
                    Podpis osoby upoważnionej do wystawienia<br>
                    (Authorized Signature - Issuer)
                </div>
                <div class="sig-line">
                    Podpis osoby upoważnionej do odbioru<br>
                    (Authorized Signature - Receiver)
                </div>
            </div>

        </div>
        <script>
            window.onload = function() {
                setTimeout(() => {
                    window.focus();
                    window.print();
                }, 500);
            };
        </script>
    </body>
    </html>
    `;

    return html;
  };

  const handlePrintInvoice = (order: IOrder) => {
    const html = getInvoiceHtml(order);
    if (!html) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.open();
    w.document.write(html);
    w.document.close();
  };

  const handleDownloadInvoicePdf = async (order: IOrder) => {
    const html = getInvoiceHtml(order);
    if (!html || !order?.invoice) return;

    // Dynamic imports to avoid SSR issues
    const { jsPDF } = await import("jspdf");
    const html2canvas = (await import("html2canvas")).default;

    // Create hidden iframe to render full HTML for accurate capture
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const inv = order.invoice;
    const filename = `Invoice-${(inv["Invoice"] || inv["Invoice Number"] || order.id || "-")}.pdf`;

    await new Promise<void>((resolve) => {
      iframe.onload = () => resolve();
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      } else {
        resolve();
      }
    });

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    const contentEl = iframeDoc?.body as HTMLElement | null;
    if (!contentEl) {
      iframe.remove();
      return;
    }

    // Render to canvas
    const canvas = await html2canvas(contentEl, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: 900,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
    iframe.remove();
  };

  return (
    <Card className="overflow-hidden p-0">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-4 font-medium text-muted-foreground">
                {t("headers.course_name")}
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                {t("headers.date")}
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                {t("headers.amount")}
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                {t("headers.status")}
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                {t("headers.invoice")}
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                {t("headers.print", { default: "Print" })}
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                {t("headers.action")}
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="p-4 space-y-2">
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
                <td colSpan={8} className="p-4">
                  <p className="text-center text-red-500">
                    {t("states.error")}
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
                          unoptimized={true}
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
                      {getFormattedDate(order?.enrolledAt)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium">
                      {formatAmount(order?.coursePrice)}
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
                      {getStatusLabel(order?.paymentStatus)}
                    </Badge>
                  </td>
                  <td className="p-4">
                    {order?.invoice ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownloadInvoicePdf(order)}
                      >
                        <Download className="text-blue-500" />
                      </Button>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {t("invoice.none")}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => order?.invoice && handlePrintInvoice(order)}
                      disabled={!order?.invoice}
                      aria-label="Print invoice"
                      title={t("headers.print", { default: "Print" })}
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                  </td>
                  <td className="p-4">
                    <Link href={`/courses/${order?.courseId}`}>
                      <Button variant="outline" size="icon">
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
                  {getStatusLabel(order.paymentStatus)}
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
                <span className="text-sm text-muted-foreground">
                  {getFormattedDate(order?.enrolledAt)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{formatAmount(order?.coursePrice)}</span>
                <Link href={`/courses/${order?.courseId}`}>
                  <Button variant="link" size="sm" className="px-0">
                    {t("actions.view_course")}
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-between pt-2">

                {order?.invoice ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-normal"
                    onClick={() => handleDownloadInvoicePdf(order)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    {t("invoice.download")}
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {t("invoice.none")}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-normal"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  {t("actions.view_course")}
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
