document.addEventListener("DOMContentLoaded", () => {
    const isIndexPage = document.body.contains(document.getElementById("reportsGrid"));
    const isFormPage = document.body.contains(document.getElementById("reportForm"));

    // === INDEX PAGE ===
    if (isIndexPage) {
        const reportsGrid = document.getElementById("reportsGrid");
        const reportCount = document.getElementById("reportCount");
        const noReportsMessage = document.getElementById("noReportsMessage");

        function loadReports() {
            const reports = JSON.parse(localStorage.getItem("reports") || "[]");
            reportsGrid.innerHTML = "";

            if (reports.length === 0) {
                noReportsMessage.classList.remove("d-none");
                reportCount.textContent = "0 laporan";
                return;
            }

            noReportsMessage.classList.add("d-none");
            reportCount.textContent = `${reports.length} laporan`;

            reports.forEach((r, index) => {
                const card = document.createElement("div");
                card.className = "card mb-3 shadow-sm";
                card.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-4 d-flex align-items-center justify-content-center p-2">
                            ${r.image
                                ? `<img src="${r.image}" class="img-fluid rounded" style="max-height:200px; object-fit:cover;">`
                                : `<div class="report-placeholder"><i class="bi bi-image text-muted fs-1"></i></div>`}
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title mb-2">${r.itemName}</h5>
                                <span class="badge ${
                                    r.itemStatus === "hilang" ? "bg-danger" : "bg-success"
                                }">${r.itemStatus}</span>
                                <p class="mt-2 mb-1"><strong>Lokasi:</strong> ${r.location}</p>
                                <p class="mb-1"><strong>Tanggal:</strong> ${r.reportDate}</p>
                                <p class="mb-1"><strong>Pelapor:</strong> ${r.reporterName}</p>
                                <p class="text-muted small">${r.description || ""}</p>
                                <button class="btn btn-danger btn-sm delete-report" data-index="${index}">
                                    <i class="bi bi-trash"></i> Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                reportsGrid.appendChild(card);
            });

            
            // === Tombol hapus ===
            document.querySelectorAll(".delete-report").forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    const idx = e.target.closest("button").dataset.index;
                    const updated = reports.filter((_, i) => i != idx);
                    localStorage.setItem("reports", JSON.stringify(updated));
                    loadReports();
                });
            });
        }

        loadReports();
        
        // === POPUP ANNOUNCEMENT ===
const popup = document.getElementById("announcement-popup");
const closeBtn = document.getElementById("close-popup");

// muncul setelah 300ms
setTimeout(() => {
    popup.classList.add("show");
}, 300);

// tombol tutup
closeBtn.addEventListener("click", () => {
    popup.classList.remove("show");
});

    }

    // === FORM PAGE ===
    if (isFormPage) {
        const form = document.getElementById("reportForm");
        const imageInput = document.getElementById("imageUpload");
        const previewContainer = document.getElementById("imagePreview");
        const previewImg = document.getElementById("previewImg");
        const removeImage = document.getElementById("removeImage");
        const cameraBtn = document.getElementById("cameraBtn");
        const cameraModal = document.getElementById("cameraModal");
        const cameraVideo = document.getElementById("cameraVideo");
        const captureBtn = document.getElementById("captureBtn");
        let imageBase64 = "";
        let cameraStream = null;

        // === Preview gambar dari file storage ===
        imageInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    imageBase64 = reader.result;
                    previewImg.src = imageBase64;
                    previewContainer.classList.remove("d-none");
                };
                reader.readAsDataURL(file);
            }
        });

        removeImage.addEventListener("click", () => {
            imageBase64 = "";
            imageInput.value = "";
            previewContainer.classList.add("d-none");
        });

        // === Kamera Realtime (dengan fallback otomatis) ===
        cameraBtn?.addEventListener("click", async () => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                alert("Browser tidak mendukung akses kamera di mode ini.\nGunakan HTTPS atau pilih file dari galeri.");
                return;
            }

            try {
                const isSecure = window.location.protocol === "https:" || window.location.hostname === "localhost";
                if (!isSecure) {
                    alert("Kamera hanya dapat digunakan di HTTPS atau localhost.\nGunakan tombol Upload untuk pilih dari galeri.");
                    return;
                }

                cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
                cameraVideo.srcObject = cameraStream;
                cameraVideo.play();
                new bootstrap.Modal(cameraModal).show();
            } catch (err) {
                alert("Gagal mengakses kamera: " + err.message);
            }
        });

        // === Ambil foto dari kamera ===
        captureBtn?.addEventListener("click", () => {
            const canvas = document.createElement("canvas");
            canvas.width = cameraVideo.videoWidth;
            canvas.height = cameraVideo.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(cameraVideo, 0, 0);
            imageBase64 = canvas.toDataURL("image/jpeg");
            previewImg.src = imageBase64;
            previewContainer.classList.remove("d-none");

            if (cameraStream) {
                cameraStream.getTracks().forEach((t) => t.stop());
            }
            const modal = bootstrap.Modal.getInstance(cameraModal);
            modal.hide();
        });

        // === Submit laporan ===
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const newReport = {
                reporterName: document.getElementById("reporterName")?.value.trim() || "Tidak diketahui",
                itemName: document.getElementById("itemName")?.value.trim() || "Tanpa nama",
                itemStatus: document.getElementById("itemStatus")?.value.trim() || "tidak diketahui",
                location: document.getElementById("location")?.value.trim() || "Tidak disebutkan",
                reportDate:
                    document.getElementById("reportDate")?.value.trim() ||
                    new Date().toISOString().split("T")[0],
                description: document.getElementById("description")?.value.trim() || "",
                image: imageBase64 || "",
            };

            const reports = JSON.parse(localStorage.getItem("reports") || "[]");
            reports.push(newReport);
            localStorage.setItem("reports", JSON.stringify(reports));

            form.reset();
            previewContainer.classList.add("d-none");
            imageBase64 = "";

            new bootstrap.Modal(document.getElementById("successModal")).show();
        });

        document.getElementById("addAnother")?.addEventListener("click", () => {
            const modal = bootstrap.Modal.getInstance(document.getElementById("successModal"));
            modal.hide();
        });
    }
});
