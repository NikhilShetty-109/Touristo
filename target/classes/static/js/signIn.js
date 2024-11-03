function logIn(){
    let username = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    console.log("Login attempt:", username, password); // Debug log

    if(username == "admin" && password == "admin"){
        console.log("Admin login successful"); // Debug log
        window.location.href = "./Admin/admin.html"; // Changed to relative path
        return; // Added return to stop further execution
    }

    console.log("Attempting user login"); // Debug log

    fetch(`http://localhost:8888/userLogin/${username}/${password}`)
    .then(data => {
        if(data.status == 404 || data.status == 400){
            console.log("Login failed: Wrong Credentials"); // Debug log
            window.alert("Wrong Credentials");
            window.location.reload();
        } else {
            return data.json();
        }
    })
    .then(data => {
        if(data) { // Check if data exists
            console.log("Login successful:", data); // Debug log
            localStorage.setItem("customer", JSON.stringify(data));
            localStorage.setItem("customerId", JSON.stringify(data.customer_id));
            window.location.href = "./index.html"; // Changed to relative path
        }
    })
    .catch((error) => {
        console.error("Login error:", error); // Debug log
        window.location.reload();
    });
}