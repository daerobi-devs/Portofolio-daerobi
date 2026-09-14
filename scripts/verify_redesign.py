import time
from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        print("Visiting http://localhost:3005...")
        page.goto("http://localhost:3005", wait_until="networkidle")
        time.sleep(1)

        # 1. Capture Hero
        page.screenshot(path="public/redesign-hero.png")
        print("Hero captured -> public/redesign-hero.png")

        # 2. Smoothly scroll down step by step to trigger all whileInView animations
        scroll_steps = [
            ("about-skills", 850),
            ("projects", 1900),
            ("showcase", 3100),
            ("footer", 4200)
        ]

        for section_name, y_offset in scroll_steps:
            page.evaluate(f"window.scrollTo(0, {y_offset})")
            time.sleep(1.5)
            page.screenshot(path=f"public/redesign-{section_name}.png")
            print(f"Scrolled to {y_offset}px, captured -> public/redesign-{section_name}.png")

        # 3. Wait for Remotion players to play frames
        time.sleep(2)

        # 4. Capture Full Page Desktop
        page.screenshot(path="public/redesign-desktop-full.png", full_page=True)
        print("Full page desktop captured -> public/redesign-desktop-full.png")

        # 5. Mobile verification
        mobile_page = browser.new_page(viewport={"width": 390, "height": 844})
        mobile_page.goto("http://localhost:3005", wait_until="networkidle")
        time.sleep(1)

        # Scroll mobile step by step
        for y_offset in [600, 1500, 2600, 3800, 5200]:
            mobile_page.evaluate(f"window.scrollTo(0, {y_offset})")
            time.sleep(0.5)

        time.sleep(1.5)
        mobile_page.screenshot(path="public/redesign-mobile-full.png", full_page=True)
        print("Full page mobile captured -> public/redesign-mobile-full.png")

        browser.close()
        print("\nAll verification screenshots captured successfully!")

if __name__ == "__main__":
    verify()
