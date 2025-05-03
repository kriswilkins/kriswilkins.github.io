document.addEventListener("DOMContentLoaded", function() {
    const pageTitles = {
        "index.html": "About",
        "resume.html": "Resume",
        "projects.html": "Projects",
        "contact.html": "Contact"
    };

    // Get current page's file name
    const currentPage = window.location.pathname.split("/").pop();
    
    // Set the dynamic title
    if (pageTitles[currentPage]) {
        document.title = `Kris Wilkins | ${pageTitles[currentPage]}`;
    } else {
        document.title = "Kris Wilkins"; // Fallback title
    }

    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active"); // Highlights current page
        } else {
            link.classList.remove("active");
        }
    });

    
});


document.addEventListener("DOMContentLoaded", function () {
    const uploadInput = document.getElementById("image-upload");

    window.processImage = async function () {
        if (!uploadInput.files.length) {
            alert("Please upload an image.");
            return;
        }

        const file = uploadInput.files[0];
        const reader = new FileReader();

        reader.onload = async function () {
            const img = new Image();
            img.src = reader.result;

            // OCR using Tesseract.js
            const { data: { text } } = await Tesseract.recognize(img, 'eng');
            document.getElementById("extracted-text").innerText = text;

            // Translate Text using LibreTranslate API
            fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`)
            .then(res => res.json())
            .then(data => {
                const translatedText = data[0].map(segment => segment[0]).join(" "); // Join all segments
                document.getElementById("translated-text").innerText = translatedText;
            })
            .catch(error => {
                document.getElementById("translated-text").innerText = "Translation error.";
                console.error("Error fetching translation:", error);
            });
        };

        reader.readAsDataURL(file);
    };

    window.speakText = function () {
        let translatedText = document.getElementById("translated-text").innerText;
    
        if (!translatedText) {
            alert("No translated text available.");
            return;
        }
    
        // Replace multiple newlines with a space for better flow
        translatedText = translatedText.replace(/\n+/g, ' ').trim();
    
        // Create speech synthesis object
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(translatedText);
    
        // Adjust speech properties for natural flow
        utterance.rate = 1;  // Speed (1 = normal)
        utterance.pitch = 1; // Voice pitch (1 = normal)
        utterance.volume = 1; // Full volume
    
        synth.speak(utterance);
    };

    window.stopSpeech = function () {
        window.speechSynthesis.cancel(); // Stop ongoing speech
    };
});
