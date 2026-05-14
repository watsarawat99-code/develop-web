// ===============================
// โหลด Component กลาง
// ===============================
async function loadComponent(id, file) {

    const el = document.getElementById(id);

    // ถ้าไม่มี element นี้ในหน้า
    // ให้ข้ามทันที
    if (!el) return;

    try {

        // โหลดไฟล์ HTML
        const response = await fetch(file);

        // ถ้าโหลดไม่สำเร็จ
        if (!response.ok) {
            throw new Error(
                `HTTP error! status: ${response.status}`
            );
        }

        // แปลงเป็น text
        const data = await response.text();

        // ใส่ HTML ลง element
        el.innerHTML = data;

        // ทำ active menu
        highlightActiveLink(id);

        console.log(`✅ โหลด ${file} สำเร็จ`);

    } catch (error) {

        console.error(
            `❌ โหลด ${file} ล้มเหลว`,
            error
        );
    }
}


// ===============================
// Active Link
// ===============================
function highlightActiveLink(containerId) {

    // path ปัจจุบัน
    let currentPath =
        window.location.pathname.split("/").pop()
        || "index";

    // ลบ .html ออก
    currentPath =
        currentPath.replace(".html", "");

    // ถ้า path ว่าง
    if (currentPath === "") {
        currentPath = "index";
    }

    // หา links ทั้งหมด
    const links = document.querySelectorAll(
        `#${containerId} a`
    );

    links.forEach(link => {

        // ข้ามโลโก้
        if (link.querySelector("img")) return;

        const href = link.getAttribute("href");

        // ถ้าไม่มี href
        if (!href) return;

        // ลบ .html ออกจาก href
        let cleanHref =
            href.replace(".html", "");

        // ลบ / หน้า path
        cleanHref =
            cleanHref.replace("/", "");

        // =========================
        // หน้า Active
        // =========================
        if (cleanHref === currentPath) {

            // Footer Style
            if (
                containerId ===
                "footer-placeholder"
            ) {

                link.className =
                    "text-blue-600 font-bold bg-white px-4 py-2 rounded-xl shadow-sm inline-block transition-all";

            } else {

                // Navbar Style
                link.classList.add(
                    "text-blue-600",
                    "font-bold"
                );

                link.classList.remove(
                    "text-slate-600",
                    "text-gray-600"
                );
            }

        }

        // =========================
        // หน้าอื่น
        // =========================
        else {

            // Footer Style
            if (
                containerId ===
                "footer-placeholder"
            ) {

                link.className =
                    "text-slate-400 px-4 py-2 transition-all hover:text-white";

            } else {

                // Navbar หน้าอื่น
                link.classList.remove(
                    "text-blue-600",
                    "font-bold"
                );
            }
        }
    });
}


// ===============================
// โหลดทุกอย่างเมื่อ DOM พร้อม
// ===============================
document.addEventListener(
    "DOMContentLoaded",
    async () => {

        console.log("🚀 DOM Loaded");

        // โหลด Navbar
        await loadComponent(
            "navbar-placeholder",
            "/components/navbar.html"
        );
        
        // โหลด Footer
        await loadComponent(
            "footer-placeholder",
            "/components/footer.html"
        );
        
        // โหลด Reviews
        await loadComponent(
            "reviews-placeholder",
            "/components/reviews.html"
);
        console.log("✅ Components Loaded");
    }
);