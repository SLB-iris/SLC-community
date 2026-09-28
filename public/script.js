// ============================================
// Load Products
// ============================================

async function loadProducts() {

  const container = document.getElementById("products-container");

  container.innerHTML = "";

  try {

    const response = await fetch("/api/products");

    if (!response.ok) {
      throw new Error("ไม่สามารถโหลดข้อมูลสินค้าได้");
    }

    const products = await response.json();


    // ============================================
    // สร้าง Card สินค้า
    // ============================================

    products.forEach(product => {

      const card = document.createElement("article");

      card.className = "card";


      // ============================================
      // รูปสินค้า
      // ============================================

      let imageHTML = "";

      if (product.image_path) {

        let imagePath = product.image_path;

        // ถ้า Server ส่งมาเป็นชื่อไฟล์อย่างเดียว
        // ให้เติม /uploads/ ด้านหน้า
        if (!imagePath.startsWith("/")) {
          imagePath = "/uploads/" + imagePath;
        }

        imageHTML = `
          <div class="card-image">
            <img
              src="${imagePath}"
              alt="${product.name}"
              class="product-image"
            >
          </div>
        `;

      } else {

        imageHTML = `
          <div class="card-image no-image">
            <span>🖼️ ไม่มีรูปภาพ</span>
          </div>
        `;

      }


      // ============================================
      // สร้างข้อมูล Card
      // ============================================

      card.innerHTML = `

        ${imageHTML}


        <!-- ======================================
             ข้อมูลสินค้า
             ====================================== -->

        <div class="card-content">


          <!-- ======================================
               ชื่อสินค้า + หมวดหมู่
               ====================================== -->

          <div class="card-header">

            <h3>
              ${product.name}
            </h3>

            <span class="category-badge">
              ${product.category}
            </span>

          </div>


          <!-- ======================================
               ผู้ผลิต / กลุ่มบุคคล
               ====================================== -->

          <p class="producer">
            👥 ${product.producer}
          </p>


          <!-- ======================================
               เบอร์โทร
               ====================================== -->

          ${
            product.contact
              ? `
                <p class="contact">
                  📞 ${product.contact}
                </p>
              `
              : ""
          }


          <!-- ======================================
               ราคา + ปุ่มแก้ไข + ปุ่มลบ
               ====================================== -->

          <div class="card-footer">

            <span class="price">
              ฿ ${Number(product.price).toLocaleString()}
            </span>


            <div class="card-actions">

              <!-- ปุ่มแก้ไข -->
              <button
                class="edit-btn"
                data-id="${product.id}"
              >
                ✏️ แก้ไข
              </button>


              <!-- ปุ่มลบ -->
              <button
                class="delete-btn"
                data-id="${product.id}"
              >
                🗑️ ลบ
              </button>

            </div>

          </div>

        </div>

      `;


      // เพิ่ม Card ลงหน้าเว็บ

      container.appendChild(card);

    });


    // ============================================
    // ผูก Event ปุ่มแก้ไข
    // ต้องทำหลังจากสร้าง Card เสร็จ
    // ============================================

    attachEditHandlers();


    // ============================================
    // ผูก Event ปุ่มลบ
    // ============================================

    document.querySelectorAll(".delete-btn").forEach(btn => {

      btn.addEventListener("click", () => {

        const id = btn.dataset.id;

        deleteProduct(id);

      });

    });


  } catch (error) {

    console.error(
      "Load Products Error:",
      error
    );

    container.innerHTML = `
      <p style="text-align:center; width:100%;">
        ❌ ไม่สามารถโหลดข้อมูลสินค้าได้
      </p>
    `;

  }

}



// ============================================
// Delete Product
// ============================================

async function deleteProduct(id) {

  const confirmDelete = confirm(
    "ต้องการลบสินค้านี้ใช่หรือไม่?"
  );


  if (!confirmDelete) {
    return;
  }


  try {

    const response = await fetch(
      `/api/products/${id}`,
      {
        method: "DELETE"
      }
    );


    if (!response.ok) {

      const error = await response.json();

      throw new Error(
        error.error || "ลบสินค้าไม่สำเร็จ"
      );

    }


    // ============================================
    // โหลดรายการสินค้าใหม่
    // ============================================

    await loadProducts();


    alert("✅ ลบสินค้าสำเร็จ");


  } catch (error) {

    console.error(
      "Delete Product Error:",
      error
    );

    alert(
      "❌ เกิดข้อผิดพลาด: " +
      error.message
    );

  }

}



// ============================================
// Edit Modal Elements
// ============================================

const modal = document.getElementById("edit-modal");

const closeBtn = document.getElementById("modal-close");

const cancelBtn = document.getElementById("cancel-btn");

const editForm = document.getElementById("edit-form");



// ============================================
// Open Edit Modal
// ============================================

function openEditModal(product) {

  // ============================================
  // ใส่ข้อมูลสินค้าลง Form
  // ============================================

  document.getElementById("edit-id").value =
    product.id;

  document.getElementById("edit-name").value =
    product.name;

  document.getElementById("edit-producer").value =
    product.producer;

  document.getElementById("edit-price").value =
    product.price;

  document.getElementById("edit-category").value =
    product.category;

  document.getElementById("edit-contact").value =
    product.contact || "";


  // ============================================
  // แสดง Modal
  // ============================================

  modal.classList.remove("hidden");

}



// ============================================
// Close Edit Modal
// ============================================

function closeEditModal() {

  modal.classList.add("hidden");

  editForm.reset();

}



// ============================================
// ปุ่ม X
// ============================================

if (closeBtn) {

  closeBtn.addEventListener(
    "click",
    closeEditModal
  );

}



// ============================================
// ปุ่ม Cancel
// ============================================

if (cancelBtn) {

  cancelBtn.addEventListener(
    "click",
    closeEditModal
  );

}



// ============================================
// ปิดเมื่อคลิก Overlay
// ============================================

if (modal) {

  modal.addEventListener(
    "click",
    (event) => {

      if (event.target === modal) {

        closeEditModal();

      }

    }
  );

}



// ============================================
// ปิด Modal ด้วย ESC
// ============================================

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      modal &&
      !modal.classList.contains("hidden")
    ) {

      closeEditModal();

    }

  }
);



// ============================================
// Submit Edit Form
// ============================================

if (editForm) {

  editForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      // ============================================
      // รับ ID สินค้า
      // ============================================

      const id =
        document.getElementById("edit-id").value;


      // ============================================
      // รับข้อมูลใหม่
      // ============================================

      const updatedData = {

        name:
          document.getElementById("edit-name").value.trim(),

        producer:
          document.getElementById("edit-producer").value.trim(),

        price:
          Number(
            document.getElementById("edit-price").value
          ),

        category:
          document.getElementById("edit-category").value,

        contact:
          document.getElementById("edit-contact").value.trim() || null

      };


      // ============================================
      // ส่งข้อมูลไป Server
      // ============================================

      try {

        const response = await fetch(
          `/api/products/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify(updatedData)

          }
        );


        // ============================================
        // ตรวจสอบ Response
        // ============================================

        if (!response.ok) {

          const error =
            await response.json();

          throw new Error(
            error.error ||
            "แก้ไขไม่สำเร็จ"
          );

        }


        // ============================================
        // แก้ไขสำเร็จ
        // ============================================

        closeEditModal();

        await loadProducts();

        alert("✅ บันทึกสำเร็จ");


      } catch (error) {

        console.error(
          "Edit Product Error:",
          error
        );

        alert(
          "❌ " +
          error.message
        );

      }

    }
  );

}



// ============================================
// Attach Edit Handlers
// เรียกหลังจาก Render Card
// ============================================

function attachEditHandlers() {

  document
    .querySelectorAll(".edit-btn")
    .forEach(btn => {

      btn.addEventListener(
        "click",
        async () => {

          try {

            const id =
              btn.dataset.id;


            // ============================================
            // ดึงข้อมูลสินค้าจาก Server
            // ============================================

            const response =
              await fetch(
                `/api/products/${id}`
              );


            if (!response.ok) {

              throw new Error(
                "ไม่สามารถโหลดข้อมูลสินค้าได้"
              );

            }


            const product =
              await response.json();


            // ============================================
            // เปิด Modal พร้อมข้อมูลสินค้า
            // ============================================

            openEditModal(product);


          } catch (error) {

            console.error(
              "Open Edit Error:",
              error
            );

            alert(
              "❌ " +
              error.message
            );

          }

        }
      );

    });

}



// ============================================
// Add Product Form
// ============================================

const addForm = document.getElementById(
  "add-product-form"
);


if (addForm) {

  addForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      // ============================================
      // สร้าง FormData
      // ============================================

      const formData = new FormData();


      // ============================================
      // รับข้อมูลสินค้า
      // ============================================

      const name = document
        .getElementById("product-name")
        .value
        .trim();


      const producer = document
        .getElementById("product-producer")
        .value
        .trim();


      const price = document
        .getElementById("product-price")
        .value;


      const category = document
        .getElementById("product-category")
        .value;


      const contact = document
        .getElementById("product-contact")
        .value
        .trim();


      // ============================================
      // ตรวจสอบข้อมูล
      // ============================================

      if (
        !name ||
        !producer ||
        !price ||
        !category
      ) {

        alert(
          "⚠️ กรุณากรอกข้อมูลให้ครบถ้วน"
        );

        return;

      }


      // ============================================
      // เพิ่มข้อมูลลง FormData
      // ============================================

      formData.append(
        "name",
        name
      );


      formData.append(
        "producer",
        producer
      );


      formData.append(
        "price",
        price
      );


      formData.append(
        "category",
        category
      );


      formData.append(
        "contact",
        contact
      );


      // ============================================
      // รับไฟล์รูปภาพ
      // ============================================

      const fileInput =
        document.getElementById(
          "product-image"
        );


      if (
        fileInput &&
        fileInput.files &&
        fileInput.files[0]
      ) {

        const file =
          fileInput.files[0];


        // ============================================
        // ตรวจสอบขนาดรูป ไม่เกิน 5MB
        // ============================================

        const maxSize =
          5 * 1024 * 1024;


        if (file.size > maxSize) {

          alert(
            "⚠️ รูปภาพต้องมีขนาดไม่เกิน 5MB"
          );

          return;

        }


        // ============================================
        // เพิ่มรูปลง FormData
        // ============================================

        formData.append(
          "image",
          file
        );

      }


      // ============================================
      // ส่งข้อมูลไป Server
      // ============================================

      try {

        const response =
          await fetch(
            "/api/products",
            {
              method: "POST",

              // สำคัญ:
              // ไม่ต้องใส่ Content-Type
              // เพราะ Browser จัดการให้เอง

              body: formData
            }
          );


        // ============================================
        // ตรวจสอบผลลัพธ์
        // ============================================

        if (!response.ok) {

          const error =
            await response.json();

          throw new Error(
            error.error ||
            "เพิ่มสินค้าไม่สำเร็จ"
          );

        }


        // ============================================
        // เพิ่มสินค้าสำเร็จ
        // ============================================

        addForm.reset();


        await loadProducts();


        alert(
          "✅ เพิ่มผลิตภัณฑ์สำเร็จ"
        );


      } catch (error) {

        console.error(
          "Add Product Error:",
          error
        );


        alert(
          "❌ เกิดข้อผิดพลาด: " +
          error.message
        );

      }

    }
  );

}



// ============================================
// โหลดสินค้าเมื่อเปิดหน้าเว็บ
// ============================================

loadProducts();