import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

const helperUI = {
    success(message, timer = 1000) {
        return Toast.fire({
            type: 'success',
            title: message,
            timer
        });
    },
    alertError(title, message) {
        return Swal.fire({
            type: 'error',
            title: title || 'Oops...',
            text: message || 'Có lỗi xảy ra, Vui lòng thử lại sau!'
        });
    },
    alertSuccess(title, message) {
        return Swal.fire({
            type: 'success',
            title: title || 'Thực hiện thành công',
            text: message || ''
        });
    }
};

export default helperUI;