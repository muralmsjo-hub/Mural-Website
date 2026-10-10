import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { getFilteredApplications } from "@/server/applications/services";
import { getCareerNameAndIdById } from "@/server/careers/services";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const careerId = searchParams.get("careerId");

    if (!careerId) {
      return NextResponse.json(
        { error: "careerId parameter is required" },
        { status: 400 },
      );
    }

    const careerResult = await getCareerNameAndIdById(careerId);
    if (!careerResult || !careerResult.career) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    const result = await getFilteredApplications(careerId, 1, 100000);
    const applications = result.applications ?? [];

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Mural Dashboard";
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet("Applications");

    worksheet.columns = [
      { header: "First Name", key: "firstName", width: 16 },
      { header: "Last Name", key: "lastName", width: 16 },
      { header: "Email", key: "email", width: 32 },
      { header: "Phone Number", key: "phoneNumber", width: 20 },
      { header: "Major", key: "major", width: 24 },
      { header: "Applied Date", key: "appliedAt", width: 20 },
      { header: "Status", key: "status", width: 14 },
      { header: "CV URL", key: "cv", width: 50 },
    ];

    // Style the header row
    const headerRow = worksheet.getRow(1);
    headerRow.height = 26;
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF062B56" },
      };
      cell.alignment = { vertical: "middle", horizontal: "left" };
      cell.border = {
        bottom: { style: "medium", color: { argb: "FF031B38" } },
      };
    });

    // Populate worksheet rows
    applications.forEach((app) => {
      const formattedDate = app.appliedAt ? new Date(app.appliedAt) : null;
      const statusText = app.isShown ? "Reviewed" : "Pending";

      const row = worksheet.addRow({
        firstName: app.firstName || "",
        lastName: app.lastName || "",
        email: app.email || "",
        phoneNumber: app.phoneNumber || "",
        major: app.major || "",
        appliedAt: formattedDate,
        status: statusText,
        cv: app.cv || "",
      });

      row.height = 22;

      row.eachCell((cell) => {
        cell.alignment = { vertical: "middle", horizontal: "left" };
        cell.border = {
          bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
        };
      });

      // Format Date cell
      const dateCell = row.getCell("appliedAt");
      if (formattedDate) {
        dateCell.value = formattedDate;
        dateCell.numFmt = "yyyy-mm-dd hh:mm";
      }

      // Format Status cell
      const statusCell = row.getCell("status");
      if (app.isShown) {
        statusCell.font = { color: { argb: "FF166534" }, bold: true };
      } else {
        statusCell.font = { color: { argb: "FF9A3412" }, bold: true };
      }

      // Format CV URL as clickable hyperlink
      const cvCell = row.getCell("cv");
      if (app.cv) {
        cvCell.value = {
          text: app.cv,
          hyperlink: app.cv,
        };
        cvCell.font = {
          color: { argb: "FF2563EB" },
          underline: true,
        };
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();

    const positionName = careerResult.career.positionEn
      ? careerResult.career.positionEn.replace(/[^a-zA-Z0-9_-]/g, "_")
      : "Applications";
    const filename = `Applications_${positionName}.xlsx`;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error exporting applications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
