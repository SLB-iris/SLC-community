class StoryEngine {
    constructor(game) {
        this.game = game;
        this.currentNode = null;
        this.scriptData = {
            start: {
                name: "SYSTEM",
                text: "คุณต้องการทำอะไรกับ SLB-003?",
                choices: [
                    { text: "ตรวจสอบข้อมูล", next: "check_info" },
                    { text: "พยายามสื่อสาร", next: "talk" }
                ]
            },
            check_info: {
                name: "DATABASE",
                text:"SLB-003: เป็นสิ่งมีชีวิตกึ่งโปร่งแสง สภาพจิตใจไม่คงที่... มักจะปรากฏตัวในรูปของเด็กสาวผมสีเงิน",
                next: "check_info_2" // ถ้ามี next คือให้คลิกกล่องเพื่อไปต่อ
            },
            check_info_2: {
                name: "DATABASE",
                text: "มักจะปรากฏตัวในรูปของเด็กสาวผมสีเงิน...",
                choices: [{ text: "กลับไปหน้าหลัก", next: "start" }] // ถ้ามี choices คือให้หยุดรอเลือก
            },
            talk: {
                name: "SLB-003",
                text: "...ตราบใดที่ยังมีใครจำฉันได้... ฉันจะยังอยู่ที่นี่ใช่ไหม?",
                choices: [
                    { text: "ใช่ คุณจะอยู่ที่นี่", next: "happy" },
                    { text: "ฉันไม่แน่ใจ", next: "sad" }
                ]
            },
            happy: {
                name: "SLB-003",
                text: "ขอบคุณนะ... ฉันรู้สึกอบอุ่นขึ้นมานิดหน่อยแล้วล่ะ",
                choices: [{ text: "จบการสนทนา", next: "start" }]
            },
            sad: {
                name: "SLB-003",
                text: "...นั่นสินะ ทุกอย่างมันก็แค่ภาพลวงตา...",
                choices: [{ text: "ขอโทษนะ", next: "start" }]
            }
        };

        // แก้ไข: ใช้ querySelector เพื่อเลือก class .dialogue-box ที่มีอยู่ใน HTML
        const dialogueBox = document.querySelector(".page-content");
        if (dialogueBox) {
            dialogueBox.onclick = () => this.handleBoxClick();
        }
    }

    renderNode(sceneId) {
        this.currentNode = this.scriptData[sceneId];
        
        const nameElem = document.getElementById("name-tag");
        const textElem = document.getElementById("dialogue-text");
        const choiceContainer = document.getElementById("choices-container");

        if (nameElem) nameElem.innerText = this.currentNode.name;
        if (textElem) textElem.innerText = this.currentNode.text;

        if (choiceContainer) {
            choiceContainer.innerHTML = ""; 
            choiceContainer.style.display = "none";
        }
    }

    handleBoxClick() {
        if (this.currentNode.next) {
        this.renderNode(this.currentNode.next);
    } 
    else {
        this.showChoices();
    }
    }

    showChoices() {
        const choiceContainer = document.getElementById("choices-container");
        if (!this.currentNode || !this.currentNode.choices || choiceContainer.style.display === "flex") return;

        choiceContainer.innerHTML = ""; 
        this.currentNode.choices.forEach(choice => {
            const btn = document.createElement("button");
            btn.className = "choice-btn";
            btn.innerText = choice.text;
            btn.onclick = (e) => {
                e.stopPropagation(); 
                this.renderNode(choice.next);
            };
            choiceContainer.appendChild(btn);
        });
        choiceContainer.style.display = "flex";
    }
}

// สร้าง Class Game เพื่อรวบรวมทุกอย่าง
class Game {
    constructor() {
        this.engine = new StoryEngine(this);
        this.engine.renderNode('start');
    }
}

// เริ่มทำงานเมื่อโหลดหน้าเสร็จ
window.onload = () => {
    window.game = new Game();
};