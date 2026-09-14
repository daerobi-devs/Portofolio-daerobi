from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:3005", wait_until="networkidle")
    html = page.content()
    print("daerobi --init present:", "daerobi --init" in html)
    print("REMOTION LIVE present:", "REMOTION LIVE" in html)
    print("REMOTION WEB COMPONENT SHOWCASE present:", "REMOTION WEB COMPONENT SHOWCASE" in html)
    
    # Locate Hero elements
    hero_text = page.locator("#home").inner_text()
    print("\n--- HERO TEXT CONTENT ---\n", hero_text)
    browser.close()
