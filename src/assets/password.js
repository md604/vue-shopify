window.Modals = (function() {
  function Modal(id, name, options) {
    var defaults = {
      close: '.js-modal-close',
      open: '.js-modal-open-' + name,
      openClass: 'modal--is-active'
    };

    this.modal = document.getElementById(id);

    if (!this.modal) return false;

    this.nodes = {
      parents: [document.querySelector('html'), document.body]
    };

    this.config = Object.assign(defaults, options);

    this.modalIsOpen = false;

    this.focusOnOpen = this.config.focusOnOpen
      ? document.getElementById(this.config.focusOnOpen)
      : this.modal;

    this.init();
  }

  Modal.prototype.init = function() {
    document
      .querySelector(this.config.open)
      .addEventListener('click', this.open.bind(this));

    this.modal
      .querySelector(this.config.close)
      .addEventListener('click', this.closeModal.bind(this));
  };

  Modal.prototype.open = function(evt) {
    var self = this;
    // Keep track if modal was opened from a click, or called by another function
    var externalCall = false;

    if (this.modalIsOpen) return;

    // Prevent following href if link is clicked
    if (evt) {
      evt.preventDefault();
    } else {
      externalCall = true;
    }

    // Without this, the modal opens, the click event bubbles up to $nodes.page
    // which closes the modal.
    if (evt && evt.stopPropagation) {
      evt.stopPropagation();
    }

    if (this.modalIsOpen && !externalCall) {
      this.closeModal();
    }

    this.modal.classList.add(this.config.openClass);

    this.nodes.parents.forEach(function(node) {
      node.classList.add(self.config.openClass);
    });

    this.modalIsOpen = true;

    slate.a11y.trapFocus({
      container: this.modal,
      elementToFocus: this.focusOnOpen,
      namespace: 'modal_focus'
    });

    this.bindEvents();
  };

  Modal.prototype.closeModal = function() {
    if (!this.modalIsOpen) return;

    document.activeElement.blur();

    this.modal.classList.remove(this.config.openClass);

    var self = this;

    this.nodes.parents.forEach(function(node) {
      node.classList.remove(self.config.openClass);
    });

    this.modalIsOpen = false;

    slate.a11y.removeTrapFocus({
      container: this.modal,
      namespace: 'modal_focus'
    });

    this.unbindEvents();
  };

  Modal.prototype.bindEvents = function() {
    this.keyupHandler = this.keyupHandler.bind(this);
    document.body.addEventListener('keyup', this.keyupHandler);
  };

  Modal.prototype.unbindEvents = function() {
    document.body.removeEventListener('keyup', this.keyupHandler);
  };

  Modal.prototype.keyupHandler = function(event) {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };

  return Modal;
})();


$(function() {
  var selectors = {
    loginModal: '#LoginModal',
    loginField: '[data-login-field]'
  };

  var data = {
    formError: 'data-error'
  };

  var loginModal = document.querySelector(selectors.loginModal);
  var loginField = document.querySelector(selectors.loginField);

  if (!loginModal) {
    return;
  }

  var passwordModal = new window.Modals('LoginModal', 'login-modal', {
    focusOnOpen: 'Password'
  });

  // Open modal if errors exist
  if (loginField.hasAttribute(data.formError)) {
    passwordModal.open();
  }
});
