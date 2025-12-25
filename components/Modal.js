export class Modal {
    constructor() {
        this.container = document.getElementById('modal-container');
    }

    show(title, contentHTML) {
        const modalHTML = `
            <div class="modal fade" id="appModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content border-0 shadow-lg rounded-4">
                        <div class="modal-header border-bottom-0 pb-0">
                            <h5 class="modal-title fw-bold text-dark">${title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-4">
                            ${contentHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.container.innerHTML = modalHTML;

        // Initialize Bootstrap modal
        const modalEl = document.getElementById('appModal');
        this.bsModal = new bootstrap.Modal(modalEl);
        this.bsModal.show();

        // Clean up on hidden
        modalEl.addEventListener('hidden.bs.modal', () => {
            this.container.innerHTML = '';
            this.bsModal = null;
        });
    }

    hide() {
        if (this.bsModal) {
            this.bsModal.hide();
        }
    }
}
