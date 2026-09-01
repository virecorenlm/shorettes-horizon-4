/**
 * Bridges the inline header search field to Horizon's existing predictive search modal.
 *
 * The field in `snippets/search-inline.liquid` is a working GET form on its own, so
 * everything here is progressive enhancement: without JavaScript the form still submits
 * to the search page. With JavaScript, the first interaction hands the query to the
 * modal that already owns `predictive-search-component`, which keeps a single search
 * implementation and avoids duplicated element IDs.
 */

const SEARCH_MODAL_SELECTOR = '#search-modal';
const MODAL_INPUT_SELECTOR = 'input[type="search"]';

class ShorettesHeaderSearch extends HTMLElement {
  #input = null;
  #controller = new AbortController();

  connectedCallback() {
    this.#input = this.querySelector('input[type="search"]');
    if (!this.#input) return;

    const { signal } = this.#controller;

    // `click` and `input` only. Listening for `focus` would re-open the modal each
    // time it closed and returned focus to this field.
    this.#input.addEventListener('click', this.#handleClick, { signal });
    this.#input.addEventListener('input', this.#handleInput, { signal });
  }

  disconnectedCallback() {
    this.#controller.abort();
    this.#controller = new AbortController();
  }

  get #modal() {
    const modal = document.querySelector(SEARCH_MODAL_SELECTOR);
    return typeof modal?.showDialog === 'function' ? modal : null;
  }

  #handleClick = () => {
    this.#openModal('');
  };

  #handleInput = () => {
    const value = this.#input?.value ?? '';
    if (this.#openModal(value) && this.#input) this.#input.value = '';
  };

  /**
   * Opens the search modal and seeds it with the typed value.
   * @param {string} value - Text to carry across.
   * @returns {boolean} Whether the modal was opened.
   */
  #openModal(value) {
    const modal = this.#modal;
    if (!modal || modal.hasAttribute('open')) return false;

    modal.showDialog();

    const modalInput = modal.querySelector(MODAL_INPUT_SELECTOR);
    if (!modalInput) return true;

    if (value) {
      modalInput.value = value;
      // Horizon's predictive search listens for `input` to run a query.
      modalInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    // The dialog moves focus itself; run after it settles so the caret lands here.
    requestAnimationFrame(() => {
      modalInput.focus();
      const end = modalInput.value.length;
      modalInput.setSelectionRange?.(end, end);
    });

    return true;
  }
}

if (!customElements.get('shorettes-header-search')) {
  customElements.define('shorettes-header-search', ShorettesHeaderSearch);
}
