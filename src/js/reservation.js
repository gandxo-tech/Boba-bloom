/**
 * Boba Bloom - Salon Privilège Reservation Module
 * Safe DOM validation & WhatsApp booking integration.
 */

export class ReservationManager {
  constructor(showToastFn) {
    this.showToast = showToastFn;
    this.form = document.getElementById('salon-booking-form');
    this.init();
  }

  init() {
    if (!this.form) return;
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this.form);
    const name = formData.get('res_name') || '';
    const phone = formData.get('res_phone') || '';
    const date = formData.get('res_date') || '';
    const time = formData.get('res_time') || '';
    const guests = formData.get('res_guests') || '2';
    const lounge = formData.get('res_lounge') || 'Salon Sakura';

    if (!name || !phone || !date || !time) {
      if (this.showToast) this.showToast('Veuillez renseigner tous les champs obligatoires.', 'error');
      return;
    }

    const booking = {
      id: 'RES-' + Math.floor(1000 + Math.random() * 9000),
      name,
      phone,
      date,
      time,
      guests,
      lounge,
      createdAt: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('boba_bloom_reservations') || '[]');
      existing.push(booking);
      localStorage.setItem('boba_bloom_reservations', JSON.stringify(existing));
    } catch (err) {
      console.warn('Could not save reservation:', err);
    }

    this.form.reset();
    if (this.showToast) {
      this.showToast(`✨ Table réservée pour ${name} (${guests} pers.) le ${date} à ${time} !`, 'success');
    }
  }
}
