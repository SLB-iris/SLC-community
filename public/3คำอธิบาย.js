let currentIndex = 0;
const cards = document.querySelectorAll('.card');

// ข้อมูลสำหรับเนื้อหาด้านล่างและรูปพื้นหลัง
const scpData = [
    {
        largeTitle: "S.L.B",
        sections: [
            {
                title: "SLB คืออะไร",
                desc: "ความคิดแต่ละชุดพยายามรักษาเอกลักษณ์ของตนเอง เช่น ความคิดหนึ่งยึดเหตุผล ความคิดหนึ่งยึดอารมณ์ เมื่อทั้งสองถูกวางในบริบทเดียวกัน จะเกิดความขัดแย้งระดับโครงสร้าง เช่น เป้าหมายไม่ตรงกัน วิธีการไม่สอดคล้อง หรือคุณค่าพื้นฐานแตกต่างกัน จุดนี้มักทำให้ผู้คิดรู้สึกสับสน ลังเล หรือเกิดแรงต้านภายใน ช่วงที่สองคือการปรับสมดุล สมองเริ่มคัดเลือกองค์ประกอบที่เข้ากันได้ ลดทอนบางส่วน และขยายบางส่วน กลไกนี้คล้ายการ “หลอมโลหะ” — สิ่งเจือปนถูกแยกออก ส่วนที่มีคุณสมบัติสอดคล้องกันจะผสานเป็นโครงสร้างใหม่ ในเชิงจิตวิทยา นี่คือกระบวนการบูรณาการ (integration) ซึ่งทำให้ความคิดที่เคยแยกจากกันเริ่มสร้างความหมายร่วม ช่วงสุดท้ายคือการเกิดรูปแบบใหม่ เมื่อการรวมตัวเสร็จสมบูรณ์ จะไม่ได้ผลลัพธ์เป็นเพียงผลรวมเชิงเส้น (A + B) แต่เป็นคุณสมบัติใหม่ที่ไม่เคยมีอยู่เดิม เรียกว่า “emergent property” ตัวอย่างเช่น",
                img: "รูป/123.jpg"
            },
            {
                title: "ความผันแปร",
                desc: "มันคือค่าพื้นฐานที่สร้างเกิดการหลายอย่าง",
                img: "รูป/000674.webp"
            },
            {
                title: "EGO",
                desc: "รูปลักษณ์ภายนอก: ความงามที่หลอกล่อ (The Beautiful Exterior)วัตถุชิ้นนี้จะฉายภาพ The World of Beautiful ออกมาเป็นเปลือกนอก มันดูเลอค่า เปล่งประกาย และเย้ายวนใจ เพื่อดึงดูดให้ผู้คนเข้ามาจ้องมอง แต่มันไม่ใช่ความงามที่ว่างเปล่า เพราะมันคือ เกราะ ที่ EGO สร้างขึ้นเพื่อปกป้องจุดที่เปราะบางที่สุดของมนุษย์ แกนกลาง: ห้องนิรภัยแห่งความโหยหา เมื่อมองลึกลงไปในวัตถุชิ้นนี้ คุณจะพบกับ Red Room ที่ซ่อนอยู่ภายใน มันคือพื้นที่ปิดตายที่ EGO ใช้กักเก็บ TheHumanCrave เอาไว้",
                img: "รูป/121.png"
            }
        ]
    },
    // ... ข้อมูลหน้าอื่นๆ ...
    {
        largeTitle: "CANON",
        sections: [{
        title: "แคนนอน",
        desc: "คือผลลัพธ์ของกระบวนการ “คัดทิ้งความเป็นไปได้” จนเหลือเพียงเส้นทางเดียวที่ถูกประกาศว่าเป็นความจริงอย่างเป็นทางการ ในเชิงโครงสร้าง เส้นเวลาโดยธรรมชาติไม่ได้มีเพียงหนึ่งเดียว ทุกเหตุการณ์แตกแขนงเป็นความเป็นไปได้จำนวนมหาศาล บางเส้นทางเต็มไปด้วยความผิดปกติ ความขัดแย้ง หรือผลลัพธ์ที่ทำลายเสถียรภาพของระบบ เรื่องเล่า องค์กร หรือแม้แต่จักรวาลเอง เพื่อรักษาความสอดคล้อง จึงต้องมีการ “ตัด” ความเป็นไปได้เหล่านั้นออก เหลือเพียงชุดเหตุการณ์ที่ผ่านการรับรอง — นั่นคือแคนนอนอย่างไรก็ตาม การตัดทิ้งไม่ได้แปลว่าการลบหายโดยสมบูรณ์เส้นเวลาที่ถูกตัดออก โดยเฉพาะเส้นที่มี “ความผิดปกติ” สูง มักทิ้งร่องรอยตกค้างไว้ในโครงสร้างของความจริง คล้ายสิ่งปนเปื้อนทางมิติ (temporal contamination) แม้จะไม่ถูกยอมรับว่าเป็นส่วนหนึ่งของเรื่องหลัก แต่พลังของมันยังคงพยายามแทรกซึมกลับเข้าสู่เส้นเวลาปัจจุบันสิ่งที่เกิดขึ้นเรียกว่า “เส้นเวลาสกปรก”มันไม่ใช่เส้นหลัก ไม่ใช่แคนนอน แต่ก็ไม่ยอมสลายตัว",
        img: "รูป/122.webp"
        },
        ]
    },
    {
        largeTitle: "ระดับ",
        sections: [
            {
        title: "ระดับ",
        desc: "สถาบันจะมีการตั้งระดับไว้พื้นฐานสำหรับเหตุการณ์ที่ยังไม่สามารถที่จะระบุได้โดยตรงหรือชัดเจนโดยจะมีระดับที่ต่ำสุดอยู่ที่ 1 ไปถึงระดับมากสุดคือระดับที่ 5",
        img: "รูป/111.jpg"
    }
    ]
    }
];

function updateSlider() {
    // 1. จัดการตัวการ์ด 3D
    cards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next', 'hidden');
        
        if (index === currentIndex) {
            card.classList.add('active');
        } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
            card.classList.add('prev');
        } else if (index === (currentIndex + 1) % cards.length) {
            card.classList.add('next');
        } else {
            card.classList.add('hidden');
        }
    });

    // 2. อัปเดตเนื้อหาด้านล่างพร้อม Animation
    updateBottomDetail(currentIndex);
}

function updateBottomDetail(index) {
    const data = scpData[index];
    const container = document.getElementById('dynamic-content-area');
    
    // 1. อัปเดตชื่อตัวใหญ่จางๆ ด้านหลัง
    document.getElementById('large-faded-title').innerText = "";

    // 2. ล้างข้อมูลเก่าในหน้าจอออกก่อน
    container.innerHTML = "";

    // 3. วนลูปสร้างหัวข้อใหม่ตามจำนวนที่คุณเขียนไว้ใน scpData
    // (ใช้ข้อมูลจากตัวแปร sections ที่เราคุยกันไว้)
    data.sections.forEach((item, i) => {
        // ถ้าเป็นรูปแรก ให้ใส่ class first-bg เพื่อให้ด้านบนฟุ้งหายไปกับเว็บ
        const isFirst = i === 0 ? "first-bg" : "";
        
        const html = `
            <div class="content-group animate-up">
                <h1 class="faded-title-inner">${data.largeTitle}</h1>
                
                <div class="group-bg ${isFirst}" style="background-image: url('${item.img}')"></div>
                <div class="group-inner">
                    <h2>${item.title}</h2>
                    <div class="line-divider"></div>
                    <p class="main-desc">${item.desc}</p>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}
 

function nextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlider();
}

function prevCard() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateSlider();
}

// เริ่มต้นทำงานครั้งแรก
updateSlider();