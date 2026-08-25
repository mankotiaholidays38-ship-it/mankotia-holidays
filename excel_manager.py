import os
import threading
from datetime import datetime
from openpyxl import Workbook, load_workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

DEFAULT_DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
EXCEL_FILE_PATH = os.path.abspath(
    os.getenv("PRIVATE_EXCEL_PATH", os.path.join(DEFAULT_DATA_DIR, "mankotia_leads.xlsx"))
)
DATA_DIR = os.path.dirname(EXCEL_FILE_PATH)
_excel_lock = threading.Lock()

HEADERS = [
    "Lead ID",
    "Date & Time",
    "Customer Name",
    "Phone / WhatsApp",
    "Email Address",
    "Destination / Yatra",
    "Travel Date",
    "Pickup",
    "Drop",
    "Tour Days",
    "Number of Persons",
    "Children",
    "Children Ages",
    "Vehicle Category",
    "Rooms Required",
    "Meal Plan",
    "Hotel Category",
    "Travelers",
    "Budget Category",
    "Special Requirements / Notes",
    "Source",
    "Status",
]

# Premium Corporate / Executive Styling
HEADER_FILL = PatternFill(start_color="0F172A", end_color="0F172A", fill_type="solid")  # Sleek Slate Navy
HEADER_FONT = Font(name="Calibri", size=11, bold=True, color="FFFFFF")

ROW_FONT = Font(name="Calibri", size=11, color="1E293B")
BOLD_FONT = Font(name="Calibri", size=11, bold=True, color="0F172A")

ZEBRA_FILL_ODD = PatternFill(start_color="FFFFFF", end_color="FFFFFF", fill_type="solid")
ZEBRA_FILL_EVEN = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")

STATUS_NEW_FILL = PatternFill(start_color="DCFCE7", end_color="DCFCE7", fill_type="solid")
STATUS_NEW_FONT = Font(name="Calibri", size=10, bold=True, color="15803D")

BORDER_LIGHT = Border(
    left=Side(style='thin', color='E2E8F0'),
    right=Side(style='thin', color='E2E8F0'),
    top=Side(style='thin', color='E2E8F0'),
    bottom=Side(style='thin', color='E2E8F0')
)

COLUMN_MIN_WIDTHS = {
    1: 18, 2: 22, 3: 24, 4: 20, 5: 32, 6: 28, 7: 18, 8: 20, 9: 20,
    10: 12, 11: 18, 12: 12, 13: 18, 14: 22, 15: 16, 16: 18, 17: 20, 18: 36, 19: 20, 20: 16
}

def format_readable_time(dt_str: str) -> str:
    """Converts ISO or raw datetime to a clean, readable 12-hour format."""
    try:
        if isinstance(dt_str, datetime):
            return dt_str.strftime("%d-%b-%Y  %I:%M %p")
        for fmt in ("%Y-%m-%d %H:%M:%S", "%Y-%m-%d %H:%M", "%Y-%m-%d", "%d-%b-%Y %I:%M %p"):
            try:
                parsed = datetime.strptime(str(dt_str).strip(), fmt)
                return parsed.strftime("%d-%b-%Y  %I:%M %p")
            except ValueError:
                continue
    except Exception:
        pass
    return str(dt_str)

def ensure_excel_file_exists() -> str:
    """Creates or migrates the workbook to store complete inquiry details."""
    os.makedirs(DATA_DIR, exist_ok=True)
    with _excel_lock:
        needs_migration = False
        if os.path.exists(EXCEL_FILE_PATH):
            existing = load_workbook(EXCEL_FILE_PATH, read_only=True, data_only=True)
            existing_ws = existing["Customer Leads"] if "Customer Leads" in existing.sheetnames else existing.active
            needs_migration = [cell.value for cell in existing_ws[1]] != HEADERS
            existing.close()
        if not os.path.exists(EXCEL_FILE_PATH) or needs_migration:
            old_rows = []
            if os.path.exists(EXCEL_FILE_PATH):
                old_book = load_workbook(EXCEL_FILE_PATH, data_only=True)
                old_sheet = old_book["Customer Leads"] if "Customer Leads" in old_book.sheetnames else old_book.active
                old_headers = [str(cell.value or "") for cell in old_sheet[1]]
                for row_number, values in enumerate(old_sheet.iter_rows(min_row=2, values_only=True), start=2):
                    old_record = dict(zip(old_headers, values))
                    if any(values):
                        old_row = [old_record.get(header, "") or "" for header in HEADERS]
                        if not old_row[0]:
                            old_row[0] = f"#MK-LEGACY-{row_number:04d}"
                        if not old_row[1]:
                            old_row[1] = "Legacy record"
                        old_rows.append(old_row)
                old_book.close()
            wb = Workbook()
            ws = wb.active
            ws.title = "Customer Leads"
            ws.views.sheetView[0].showGridLines = True
            
            # Write and style headers
            ws.append(HEADERS)
            for col_num, header in enumerate(HEADERS, 1):
                cell = ws.cell(row=1, column=col_num)
                cell.fill = HEADER_FILL
                cell.font = HEADER_FONT
                cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
                cell.border = BORDER_LIGHT
            
            ws.row_dimensions[1].height = 30
            ws.freeze_panes = "A2"
            
            for col_num, min_w in COLUMN_MIN_WIDTHS.items():
                col_letter = get_column_letter(col_num)
                ws.column_dimensions[col_letter].width = min_w

            for row in old_rows:
                ws.append(row)
                
            wb.save(EXCEL_FILE_PATH)
    return EXCEL_FILE_PATH

def add_lead_to_excel(
    name: str,
    phone: str,
    email: str,
    destination: str = "General Inquiry",
    travel_date: str = "Flexible",
    pickup: str = "",
    drop: str = "",
    days: int = 1,
    number_of_persons: int = 1,
    children: int = 0,
    child_ages: str = "",
    vehicle_category: str = "",
    rooms_required: int = 1,
    meal_plan: str = "",
    hotel_category: str = "",
    travelers: str = "1-2 Travelers",
    budget: str = "Standard",
    notes: str = "",
    source: str = "Website Inquiry"
) -> dict:
    """Appends a new customer lead to the Excel spreadsheet in readable format."""
    ensure_excel_file_exists()
    
    timestamp = datetime.now().strftime("%d-%b-%Y  %I:%M %p")
    status = "New Inquiry"
    
    with _excel_lock:
        wb = load_workbook(EXCEL_FILE_PATH)
        ws = wb["Customer Leads"] if "Customer Leads" in wb.sheetnames else wb.active
        ws.views.sheetView[0].showGridLines = True
        
        lead_id = f"#MK-{datetime.now().strftime('%Y%m%d%H%M%S%f')}"
        row_data = [
            lead_id,
            timestamp,
            name.strip(),
            phone.strip(),
            email.strip(),
            destination.strip() if destination else "General Inquiry",
            travel_date.strip() if travel_date else "Flexible",
            pickup.strip() if pickup else "",
            drop.strip() if drop else "",
            days,
            number_of_persons,
            children,
            child_ages.strip() if child_ages else "",
            vehicle_category.strip() if vehicle_category else "",
            rooms_required,
            meal_plan.strip() if meal_plan else "",
            hotel_category.strip() if hotel_category else "",
            travelers.strip() if travelers else "",
            budget.strip() if budget else "Standard",
            notes.strip() if notes else "",
            source.strip() if source else "Website",
            status
        ]
        
        ws.append(row_data)
        current_row = ws.max_row
        ws.row_dimensions[current_row].height = 24
        
        # Determine row background (zebra striping)
        row_fill = ZEBRA_FILL_EVEN if current_row % 2 == 0 else ZEBRA_FILL_ODD
        
        # Apply formatting to all cells
        for col_idx in range(1, len(row_data) + 1):
            cell = ws.cell(row=current_row, column=col_idx)
            cell.font = ROW_FONT
            cell.border = BORDER_LIGHT
            cell.fill = row_fill
            
            # Alignments
            if col_idx in [1, 2, 4, 5, 7, 8, 10, 11, 12, 17]:
                cell.alignment = Alignment(horizontal="center", vertical="center")
            else:
                cell.alignment = Alignment(horizontal="left", vertical="center", wrap_text=True)
                
            # Name bold
            if col_idx == 3:
                cell.font = BOLD_FONT
                
        # Set auto-filter across all columns
        ws.auto_filter.ref = f"A1:{get_column_letter(len(HEADERS))}{current_row}"
        ws.freeze_panes = "A2"
        
        # Adjust column widths gracefully
        for col_idx in range(1, len(HEADERS) + 1):
            col_letter = get_column_letter(col_idx)
            min_w = COLUMN_MIN_WIDTHS.get(col_idx, 15)
            # Find max content length
            max_len = 0
            for row in ws.iter_rows(min_col=col_idx, max_col=col_idx, values_only=True):
                val_len = len(str(row[0] or ''))
                if val_len > max_len:
                    max_len = val_len
            ws.column_dimensions[col_letter].width = max(min_w, min(max_len + 4, 45))

        wb.save(EXCEL_FILE_PATH)
        
    return {
        "lead_id": lead_id,
        "timestamp": timestamp,
        "name": name,
        "phone": phone,
        "email": email,
        "destination": destination,
        "travelers": travelers,
        "travel_date": travel_date,
        "pickup": pickup,
        "drop": drop,
        "days": days,
        "number_of_persons": number_of_persons,
        "children": children,
        "child_ages": child_ages,
        "vehicle_category": vehicle_category,
        "rooms_required": rooms_required,
        "meal_plan": meal_plan,
        "hotel_category": hotel_category,
        "budget": budget,
        "notes": notes,
        "status": status
    }

def get_all_leads() -> list[dict]:
    """Reads all stored leads from the Excel sheet."""
    ensure_excel_file_exists()
    leads = []
    with _excel_lock:
        wb = load_workbook(EXCEL_FILE_PATH, data_only=True)
        ws = wb["Customer Leads"] if "Customer Leads" in wb.sheetnames else wb.active
        headers = [str(cell.value or "") for cell in ws[1]]
        
        for row in ws.iter_rows(min_row=2, values_only=True):
            if any(row):
                record = dict(zip(headers, row))
                lead_id = record.get("Lead ID") or f"#MK-{100 + len(leads) + 1}"
                ts = format_readable_time(record.get("Date & Time", ""))
                name = record.get("Customer Name", "") or ""
                phone = record.get("Phone / WhatsApp", "") or ""
                email = record.get("Email Address", "") or ""
                dest = record.get("Destination / Yatra", "") or ""
                trav = record.get("Travelers", "") or ""
                tdate = record.get("Travel Date", "") or ""
                budget = record.get("Budget Category", "") or ""
                notes = record.get("Special Requirements / Notes", "") or ""
                source = record.get("Source", "Website") or "Website"
                status = record.get("Status", "New") or "New"
                    
                leads.append({
                    "lead_id": lead_id,
                    "timestamp": ts,
                    "name": name,
                    "phone": phone,
                    "email": email,
                    "destination": dest,
                    "travelers": trav,
                    "travel_date": tdate,
                    "pickup": record.get("Pickup", "") or "",
                    "drop": record.get("Drop", "") or "",
                    "days": record.get("Tour Days", "") or "",
                    "number_of_persons": record.get("Number of Persons", "") or "",
                    "children": record.get("Children", "") or "",
                    "child_ages": record.get("Children Ages", "") or "",
                    "vehicle_category": record.get("Vehicle Category", "") or "",
                    "rooms_required": record.get("Rooms Required", "") or "",
                    "meal_plan": record.get("Meal Plan", "") or "",
                    "hotel_category": record.get("Hotel Category", "") or "",
                    "budget": budget,
                    "notes": notes,
                    "source": source,
                    "status": status
                })
    return list(reversed(leads))  # newest first

def delete_lead(lead_id: str) -> bool:
    """Delete exactly one lead by its stable, non-repeating lead ID."""
    ensure_excel_file_exists()
    with _excel_lock:
        wb = load_workbook(EXCEL_FILE_PATH)
        ws = wb["Customer Leads"] if "Customer Leads" in wb.sheetnames else wb.active
        headers = [str(cell.value or "") for cell in ws[1]]
        try:
            lead_id_column = headers.index("Lead ID") + 1
        except ValueError:
            wb.close()
            return False
        for row_number in range(2, ws.max_row + 1):
            if str(ws.cell(row=row_number, column=lead_id_column).value or "") == lead_id:
                ws.delete_rows(row_number, 1)
                wb.save(EXCEL_FILE_PATH)
                wb.close()
                return True
        wb.close()
    return False

def reformat_existing_excel():
    """Migrates any existing raw entries into the new readable styled format."""
    if not os.path.exists(EXCEL_FILE_PATH):
        ensure_excel_file_exists()
        return

    leads = get_all_leads()  # reversed, so newest first
    leads.reverse()  # chronological order for rewriting
    
    with _excel_lock:
        wb = Workbook()
        ws = wb.active
        ws.title = "Customer Leads"
        ws.views.sheetView[0].showGridLines = True
        
        # Header Row
        ws.append(HEADERS)
        for col_num, header in enumerate(HEADERS, 1):
            cell = ws.cell(row=1, column=col_num)
            cell.fill = HEADER_FILL
            cell.font = HEADER_FONT
            cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
            cell.border = BORDER_LIGHT
        
        ws.row_dimensions[1].height = 30
        ws.freeze_panes = "A2"
        
        # Append data rows
        for idx, lead in enumerate(leads, 1):
            lead_id = f"#MK-{100 + idx}"
            row_data = [
                lead_id,
                format_readable_time(lead.get("timestamp", "")),
                lead.get("name", "").strip(),
                str(lead.get("phone", "")).strip(),
                lead.get("email", "").strip(),
                lead.get("destination", "").strip(),
                lead.get("travelers", "").strip(),
                lead.get("travel_date", "").strip(),
                lead.get("budget", "").strip(),
                lead.get("notes", "").strip() or "—",
                lead.get("source", "Website").strip(),
                lead.get("status", "New Inquiry").strip()
            ]
            ws.append(row_data)
            row_idx = idx + 1
            ws.row_dimensions[row_idx].height = 24
            
            row_fill = ZEBRA_FILL_EVEN if row_idx % 2 == 0 else ZEBRA_FILL_ODD
            
            for col_idx in range(1, len(row_data) + 1):
                cell = ws.cell(row=row_idx, column=col_idx)
                cell.font = ROW_FONT
                cell.border = BORDER_LIGHT
                cell.fill = row_fill
                
                if col_idx in [1, 2, 4, 7, 8, 9, 11, 12]:
                    cell.alignment = Alignment(horizontal="center", vertical="center")
                else:
                    cell.alignment = Alignment(horizontal="left", vertical="center", wrap_text=True)
                    
                if col_idx in [1, 3]:
                    cell.font = BOLD_FONT
                    
                if col_idx == 12:
                    cell.fill = STATUS_NEW_FILL
                    cell.font = STATUS_NEW_FONT
                    cell.alignment = Alignment(horizontal="center", vertical="center")

        ws.auto_filter.ref = f"A1:{get_column_letter(len(HEADERS))}{max(len(leads) + 1, 1)}"
        
        # Set column widths
        for col_idx, min_w in COLUMN_MIN_WIDTHS.items():
            col_letter = get_column_letter(col_idx)
            max_len = 0
            for row in ws.iter_rows(min_col=col_idx, max_col=col_idx, values_only=True):
                val_len = len(str(row[0] or ''))
                if val_len > max_len:
                    max_len = val_len
            ws.column_dimensions[col_letter].width = max(min_w, min(max_len + 4, 45))
            
        wb.save(EXCEL_FILE_PATH)
