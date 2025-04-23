// ======================
// Registration Page (index.html)
// ======================
if (window.location.pathname.includes("index.html")) {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const Matno = document.getElementById("matric").value;
        const fingerprint = document.getElementById("fingerprint").files[0];

        if (!fingerprint) {
            alert("Please upload a fingerprint image.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            const base64Image = e.target.result;
            localStorage.setItem("voterName", name);
            localStorage.setItem("Matno", Matno)
            localStorage.setItem("fingerprintData", base64Image);
            window.location.href = "verify.html";
        };

        reader.readAsDataURL(fingerprint); // Convert image to Base64
    });
}

// ======================
// Verification Page (verify.html)
// ======================
if (window.location.pathname.includes("verify.html")) {
    const verifyForm = document.getElementById("verifyForm");

    // Display the voter's name if available
    const voterName = localStorage.getItem("voterName");
    if (voterName) {
        const nameSpan = document.getElementById("voterName");
        if (nameSpan) {
            nameSpan.textContent = voterName;
        }
    }

    verifyForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const uploaded = document.getElementById("verifyFingerprint").files[0];

        if (!uploaded) {
            alert("Please upload a fingerprint image to verify.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            const uploadedBase64 = e.target.result;
            const storedBase64 = localStorage.getItem("fingerprintData");

            if (uploadedBase64 === storedBase64) {
                alert("Fingerprint Verified Successfully!");
                window.location.href = "vote.html";
            } else {
                alert("Fingerprint does not match!");
            }
        };

        reader.readAsDataURL(uploaded); // Convert to Base64 for comparison
    });
}

// ======================
// Voting Page (vote.html)
// ======================
if (window.location.pathname.includes("vote.html")) {
    const voteForm = document.getElementById("voteForm");

    voteForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedCandidate = document.querySelector('input[name="candidate"]:checked');
        if (!selectedCandidate) {
            alert("Please select a candidate to vote for.");
            return;
        }

        // Save selected vote to localStorage (optional for feedback)
        localStorage.setItem("selectedVote", selectedCandidate.value);
        window.location.href = "thankyou.html";
    });
}

// ======================
// Thank You Page (thankyou.html)
// ======================
if (window.location.pathname.includes("thankyou.html")) {
    const votedCandidate = localStorage.getItem("selectedVote");
    const name = localStorage.getItem("voterName");
    const Matno = localStorage.getItem("Matno");

    const thankYouMessage = document.getElementById("thankYouMessage");

    if (thankYouMessage && name && votedCandidate) {
        thankYouMessage.innerHTML = `Thank you, <strong>${name}</strong> with MAT NO. <strong>${Matno}</strong>, for voting!<br>You voted for <strong>${votedCandidate}</strong>.`;
    }
}
