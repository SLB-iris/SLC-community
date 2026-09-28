    function toggleLeftMenu() {
        const menu = document.getElementById("leftMenu");
        // เช็คว่าเมนูเปิดอยู่หรือเปล่า ถ้ากว้าง 0 หรือยังไม่ได้ตั้งค่า ให้ขยายเป็น 250px
        if (menu.style.width === "250px") {
            menu.style.width = "0";
        } else {
            menu.style.width = "250px";
        }
    }
     // 1. กำหนดฐานข้อมูลที่ต้องการให้ค้นหาเจอ
        const database = [
            { title: "SLB-001: ไอริส ทอมป์สัน", link: "slb001.html" },
            { title: "SLB-002: เหตุการที่ถูกทิ้ง", link: "slb002.html" },
            { title: "SLB-003: แคทอินเดอะบ็อกซ์(ภายในสักวันหนึ่ง)", link: "slb003.html" },
            { title: "SLB-004: ความแปรผัน", link: "slb004.html" },
            { title: "SLB-005: หัวใจดวงที่ 99", link: "slb005.html" },
            { title: "SLB-006: ยามหลับฝันก่อนผีเสื้อโบยบิน", link: "slb006.html" },
            { title: "SLB-007: มนุษย์เพื่อมนุษย์", link: "slb007.html" },
            { title: "SLB-008: เรดรูม", link: "slb008.html" },
            { title: "SLB-009: บทที่สุดท้าย", link: "slb009.html" },
            { title: "SLB-010: เดอะเวิลด์ออฟบิวตี้ฟูล", link: "slb010.html" },
            { title: "เนื้อหลัก", link: "2เนื้อหลัก.html" },
            { title: "คำอธิบายเนื้อหา", link: "3คำอธิบายเนื้อหา.html" },
            { title: "SLB คืออะไร", link: "3คำอธิบายเนื้อหา.html" },
            { title: "ความผันแปร", link: "3คำอธิบายเนื้อหา.html" },
            { title: "แคนนอน", link: "3คำอธิบายเนื้อหา.html" },
            { title: "ระดับ", link: "3คำอธิบายเนื้อหา.html" },
            { title: "EGO", link: "3คำอธิบายเนื้อหา.html" },
            { title: "เกี่ยวกับเรา", link: "6เกี่ยวกับเรา.html" },
            { title: "SLB", link: "6เกี่ยวกับเรา.html" },
            { title: "S.L.B", link: "6เกี่ยวกับเรา.html" },
            { title: "แคนนอนเนื้อหา", link: "5เนื้อหาเสริม.html" },
            { title: "ระดับ", link: "7ระดับ.html" },
            { title: "Safe", link: "8ประเภท.html" },
            { title: "Euclid", link: "8ประเภท.html" },
            { title: "Keter", link: "8ประเภท.html" },
            { title: "Thaumiel", link: "8ประเภท.html" }
        ];

        const searchInput = document.getElementById('searchInput');
        const resultsList = document.getElementById('resultsList');

        // 2. ฟังก์ชันกรองข้อมูล
        searchInput.addEventListener('input', function() {
            const val = this.value.toLowerCase().trim();
            resultsList.innerHTML = '';

            if (val.length > 0) {
                const matches = database.filter(item => 
                    item.title.toLowerCase().includes(val)
                );

                if (matches.length > 0) {
                    matches.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'result-item';
                        div.innerText = item.title;
                        div.onclick = () => window.location.href = item.link;
                        resultsList.appendChild(div);
                    });
                } else {
                    const noRes = document.createElement('div');
                    noRes.className = 'result-item';
                    noRes.style.color = '#666';
                    noRes.innerText = 'ไม่พบข้อมูล...';
                    resultsList.appendChild(noRes);
                }
                resultsList.classList.add('active');
            } else {
                resultsList.classList.remove('active');
            }
        });

        // 3. คลิกข้างนอกเพื่อปิด Dropdown
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-box')) {
                resultsList.classList.remove('active');
            }
        });
        // ขันที 1: ทดสอบว่า fetch ไ
