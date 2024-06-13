const fileInput = document.getElementById("gameicon");
fileInput.addEventListener('change', (event) => {
    // Get the selected image file
    const imageFile = event.target.files[0];

    if (imageFile) {
        const reader = new FileReader();

        // Convert the image file to a string
        reader.readAsDataURL(imageFile);

        // FileReader will emit the load event when the data URL is ready
        // Access the string using result property inside the callback function
        reader.addEventListener('load', () => {
            // Get the data URL string
            AllConfig.icon = reader.result;
        });
    }
});