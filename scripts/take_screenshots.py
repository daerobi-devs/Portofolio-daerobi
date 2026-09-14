import os
import time
from playwright.sync_api import sync_playwright

output_dir = "d:/PORTOFOLIO/public/screenshots"
os.makedirs(output_dir, exist_ok=True)

targets = [
    {
        "id": "buatin",
        "name": "Buatin.biz.id",
        "url": "http://buatin.biz.id",
        "shots": [
            {"filename": "buatin.png", "full_page": True},
            {"filename": "buatin-preview.png", "full_page": False},
        ],
        "extra_actions": [
            {
                "action": "click",
                "selector": 'button[data-site="resto"]',
                "filename": "buatin-tab-resto.png"
            },
            {
                "action": "scroll",
                "selector": "#layanan",
                "filename": "buatin-layanan.png"
            }
        ]
    },
    {
        "id": "atlas",
        "name": "Atlas Personal Dashboard",
        "url": "https://atlas.daeroom.my.id",
        "shots": [
            {"filename": "atlas.png", "full_page": True},
            {"filename": "atlas-preview.png", "full_page": False}
        ],
        "subpages": [
            {"url": "https://atlas.daeroom.my.id/login", "filename": "atlas-login.png"},
            {"url": "https://atlas.daeroom.my.id/dashboard", "filename": "atlas-dashboard.png"}
        ]
    },
    {
        "id": "arrohman",
        "name": "Presensi Digital SMP Islam Arrohman",
        "url": "https://arrohman.vercel.app",
        "shots": [
            {"filename": "arrohman.png", "full_page": True},
            {"filename": "arrohman-preview.png", "full_page": False}
        ],
        "subpages": [
            {"url": "https://arrohman.vercel.app/login-siswa", "filename": "arrohman-login-siswa.png"},
            {"url": "https://arrohman.vercel.app/login", "filename": "arrohman-login-staff.png"}
        ]
    },
    {
        "id": "wagate",
        "name": "WaGate AI",
        "url": "https://wagate.daeroom.my.id/",
        "shots": [
            {"filename": "wagate.png", "full_page": True},
            {"filename": "wagate-preview.png", "full_page": False}
        ],
        "subpages": [
            {"url": "https://wagate.daeroom.my.id/login", "filename": "wagate-login.png"},
            {"url": "https://wagate.daeroom.my.id/api-docs", "filename": "wagate-api-docs.png"}
        ]
    }
]

def run():
    print("Starting Playwright screenshot capture...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )
        page = context.new_page()

        results = []

        for target in targets:
            print(f"\n--- Processing: {target['name']} ({target['url']}) ---")
            item_result = {
                "id": target["id"],
                "name": target["name"],
                "url": target["url"],
                "screenshots": [],
                "errors": []
            }

            try:
                # Navigate to main URL
                response = page.goto(target["url"], wait_until="networkidle", timeout=30000)
                status = response.status if response else "unknown"
                print(f"Loaded {target['url']} with status {status}")
                time.sleep(2) # Give a moment for animations / fonts to settle

                for shot in target.get("shots", []):
                    filepath = os.path.join(output_dir, shot["filename"])
                    page.screenshot(path=filepath, full_page=shot.get("full_page", False))
                    size_kb = round(os.path.getsize(filepath) / 1024, 1)
                    print(f"Captured {shot['filename']} ({size_kb} KB, full_page={shot.get('full_page')})")
                    item_result["screenshots"].append({"filename": shot["filename"], "size_kb": size_kb})

                # Handle extra actions if any
                for extra in target.get("extra_actions", []):
                    try:
                        if extra["action"] == "click":
                            page.click(extra["selector"], timeout=5000)
                            time.sleep(1)
                        elif extra["action"] == "scroll":
                            page.locator(extra["selector"]).scroll_into_view_if_needed(timeout=5000)
                            time.sleep(1)
                        filepath = os.path.join(output_dir, extra["filename"])
                        page.screenshot(path=filepath, full_page=False)
                        size_kb = round(os.path.getsize(filepath) / 1024, 1)
                        print(f"Captured extra action {extra['filename']} ({size_kb} KB)")
                        item_result["screenshots"].append({"filename": extra["filename"], "size_kb": size_kb})
                    except Exception as act_err:
                        print(f"Extra action failed ({extra['filename']}): {act_err}")

                # Handle subpages
                for sub in target.get("subpages", []):
                    try:
                        sub_res = page.goto(sub["url"], wait_until="networkidle", timeout=25000)
                        sub_status = sub_res.status if sub_res else "unknown"
                        time.sleep(2)
                        filepath = os.path.join(output_dir, sub["filename"])
                        page.screenshot(path=filepath, full_page=False)
                        size_kb = round(os.path.getsize(filepath) / 1024, 1)
                        print(f"Captured subpage {sub['filename']} ({size_kb} KB, status={sub_status})")
                        item_result["screenshots"].append({"filename": sub["filename"], "size_kb": size_kb})
                    except Exception as sub_err:
                        print(f"Subpage failed ({sub['url']}): {sub_err}")
                        item_result["errors"].append(f"Subpage {sub['url']}: {str(sub_err)}")

            except Exception as e:
                print(f"Error accessing {target['url']}: {e}")
                item_result["errors"].append(str(e))

            results.append(item_result)

        browser.close()
        print("\nAll screenshots processed successfully!")
        return results

if __name__ == "__main__":
    run()
