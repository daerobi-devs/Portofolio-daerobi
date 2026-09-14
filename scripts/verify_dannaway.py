import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        
        print("Navigating to http://localhost:3005 ...")
        await page.goto("http://localhost:3005", wait_until="networkidle", timeout=15000)
        await asyncio.sleep(2)

        # 1. Hero baseline
        await page.screenshot(path="public/clean-hero.png")
        print("Hero screenshot saved.")

        # 2. Scroll to Portfolio
        await page.evaluate("document.getElementById('portfolio').scrollIntoView()")
        await asyncio.sleep(1)
        await page.screenshot(path="public/clean-projects.png")
        print("Projects screenshot saved.")

        # 3. Scroll to About
        await page.evaluate("document.getElementById('about').scrollIntoView()")
        await asyncio.sleep(1)
        await page.screenshot(path="public/clean-about.png")
        print("About screenshot saved.")

        # 4. Scroll to Skills & Footer
        await page.evaluate("document.getElementById('skills').scrollIntoView()")
        await asyncio.sleep(1)
        await page.screenshot(path="public/clean-skills.png")
        print("Skills screenshot saved.")

        # 5. Full Page Desktop
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.5)
        await page.screenshot(path="public/clean-desktop-full.png", full_page=True)
        print("Full desktop screenshot saved.")

        # 6. Mobile Full Page
        mobile = await browser.new_page(viewport={"width": 390, "height": 844})
        await mobile.goto("http://localhost:3005", wait_until="networkidle", timeout=15000)
        await asyncio.sleep(1)
        await mobile.screenshot(path="public/clean-mobile-full.png", full_page=True)
        print("Full mobile screenshot saved.")

        await browser.close()
        print("All visual verifications successful!")

if __name__ == "__main__":
    asyncio.run(run())
