class API {
    constructor() {

    }
    async post(endpoint, data, headers = {
        ["content-type"]: "application/json"
    }) {
        let temp = await fetch(endpoint, {
            body: JSON.stringify(data),
            method: "POST",
            headers
        })
        try {
            return await temp.json()
        } catch (error) {
            return temp
        }
    }
}
const api=new API();
const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries())
    let resp=await api.post(form.action??form.getAttribute("action"),data);
    console.log(resp);
})

/* 
//sample data:
    {
        "sender": "918130202879@s.whatsapp.net",
        "sender_name": "Om Prakash Tiwari",
        "content": "Hi",
        "timestamp": "2026-06-16T10:47:53Z",
        "is_group": false,
        "message_id": "AC4B023904A65EE881E7BEB58AAC4E87"
    }

*/