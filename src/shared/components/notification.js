const showError = (message) => {
  if (typeof window !== 'undefined') {
    const iziToast = require('izitoast');
    iziToast.error({
      title: 'Error!',
      position: 'bottomRight',
      transitionIn: 'flipInX',
      transitionOut: 'flipOutX',
      message,
    });
  }
};

const showSuccess = (message) => {
  if (typeof window !== 'undefined') {
    const iziToast = require('izitoast');
    iziToast.success({
      title: 'OK',
      position: 'bottomRight',
      transitionIn: 'flipInX',
      transitionOut: 'flipOutX',
      message,
    });
  }
};

export { showError, showSuccess };
export default {
  error: showError,
  success: showSuccess,
};