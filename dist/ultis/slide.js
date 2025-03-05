class ProductSlider {
    constructor() {
        // Arrow function methods (ES6)
        this.handleThumbnailClick = (thumbnail) => {
            // Update active class
            this.thumbnails.forEach((t) => t.classList.remove("active"));
            thumbnail.classList.add("active");
            // Update main image
            const imgSrc = thumbnail.getAttribute("data-img");
            if (imgSrc && this.mainImage) {
                this.mainImage.src = imgSrc;
                if (this.zoomedImage) {
                    this.zoomedImage.src = imgSrc;
                }
            }
        };
        this.openZoomModal = () => {
            if (this.zoomModal) {
                this.zoomModal.classList.add("active");
            }
        };
        this.closeZoomModal = () => {
            if (this.zoomModal) {
                this.zoomModal.classList.remove("active");
            }
        };
        // Initialize elements
        this.mainImage = document.getElementById("mainImage");
        this.thumbnails = document.querySelectorAll(".thumbnail");
        this.zoomBtn = document.getElementById("zoomBtn");
        this.zoomModal = document.getElementById("zoomModal");
        this.zoomedImage = document.getElementById("zoomedImage");
        this.closeZoom = document.getElementById("closeZoom");
        // Initialize event listeners
        this.initEventListeners();
    }
    initEventListeners() {
        // Handle thumbnail click using arrow functions (ES6)
        this.thumbnails.forEach((thumbnail) => {
            thumbnail.addEventListener("click", () => this.handleThumbnailClick(thumbnail));
        });
        // Handle zoom functionality using arrow functions (ES6)
        if (this.zoomBtn && this.zoomModal && this.closeZoom) {
            this.zoomBtn.addEventListener("click", () => this.openZoomModal());
            this.closeZoom.addEventListener("click", () => this.closeZoomModal());
            // Close zoom modal when clicking outside the image
            this.zoomModal.addEventListener("click", (e) => {
                if (e.target === this.zoomModal) {
                    this.closeZoomModal();
                }
            });
        }
    }
}
// Initialize the product slider when the DOM is loaded
// Using ES6 arrow function
document.addEventListener("DOMContentLoaded", () => {
    const productSlider = new ProductSlider();
});
// Export the class for module usage
export default ProductSlider;
//# sourceMappingURL=slide.js.map