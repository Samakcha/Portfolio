from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas

output = "output/pdf/Samakcha_Kumar_Mishra_resume.pdf"
c = canvas.Canvas(output, pagesize=A4)
width, height = A4

c.setFillColor(colors.HexColor("#202020"))
c.setFont("Helvetica-Bold", 25)
c.drawString(22 * mm, height - 28 * mm, "Samakcha Kumar Mishra")
c.setFont("Helvetica", 10)
c.setFillColor(colors.HexColor("#77736e"))
c.drawString(22 * mm, height - 36 * mm, "Developer | Full-stack engineering | AI | Product building")
c.setStrokeColor(colors.HexColor("#dedbd4"))
c.line(22 * mm, height - 43 * mm, width - 22 * mm, height - 43 * mm)

y = height - 58 * mm
c.setFillColor(colors.HexColor("#202020"))
c.setFont("Helvetica-Bold", 11)
c.drawString(22 * mm, y, "PROFILE")
y -= 8 * mm
c.setFont("Helvetica", 10)
c.setFillColor(colors.HexColor("#4f4b47"))
c.drawString(22 * mm, y, "Developer exploring the intersection of full-stack engineering, AI, and product building.")
y -= 5 * mm
c.drawString(22 * mm, y, "This is a temporary resume placeholder and will be replaced with the final resume.")
y -= 20 * mm

sections = [
    ("EDUCATION", "College student focused on building practical software products."),
    ("TECHNOLOGIES", "JavaScript, TypeScript, React, Next.js, Node.js, Python, AI tools"),
    ("PROJECTS", "Selected full-stack, AI, and product experiments coming soon."),
]

for title, description in sections:
    c.setFillColor(colors.HexColor("#202020"))
    c.setFont("Helvetica-Bold", 11)
    c.drawString(22 * mm, y, title)
    y -= 7 * mm
    c.setFillColor(colors.HexColor("#4f4b47"))
    c.setFont("Helvetica", 10)
    c.drawString(22 * mm, y, description)
    y -= 13 * mm
    c.setStrokeColor(colors.HexColor("#dedbd4"))
    c.line(22 * mm, y, width - 22 * mm, y)
    y -= 8 * mm

c.setFillColor(colors.HexColor("#77736e"))
c.setFont("Helvetica", 9)
c.drawString(22 * mm, 18 * mm, "Placeholder document for Samakcha Mishra portfolio chat")
c.save()
